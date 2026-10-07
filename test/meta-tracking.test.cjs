const test = require("node:test");
const assert = require("node:assert/strict");
const crypto = require("node:crypto");

// Reimplementação do extrator para teste unitário
function extractHighestValue(sources) {
  if (!sources) return 0;
  const list = Array.isArray(sources) ? sources : [sources];
  const candidates = [];

  for (const item of list) {
    if (item === undefined || item === null) continue;

    if (typeof item === "number") {
      if (Number.isFinite(item) && item > 0) {
        candidates.push(item);
      }
      continue;
    }

    const text = String(item).trim();
    if (!text) continue;

    // 1. Procura formatos com "k" ou "mil" (ex: "150k", "150 mil")
    const kRegex = /(\d+(?:[.,]\d+)?)\s*(?:k|mil)\b/gi;
    let kMatch;
    while ((kMatch = kRegex.exec(text)) !== null) {
      const numStr = kMatch[1].replace(",", ".");
      const parsed = parseFloat(numStr) * 1000;
      if (Number.isFinite(parsed) && parsed > 0) {
        candidates.push(parsed);
      }
    }

    // 2. Procura números formatados com pontos ou espaços como milhares (ex: 140.000, 150 000, 1.200.000)
    const formattedRegex = /\b\d{1,3}(?:[.\s]\d{3})+(?:,\d+)?\b/g;
    let fmtMatch;
    while ((fmtMatch = formattedRegex.exec(text)) !== null) {
      const clean = fmtMatch[0].replace(/[.\s]/g, "").replace(",", ".");
      const parsed = parseFloat(clean);
      if (Number.isFinite(parsed) && parsed > 0) {
        candidates.push(parsed);
      }
    }

    // 3. Procura números inteiros diretos (ex: "140000", "200000")
    const plainRegex = /\b\d{4,12}\b/g;
    let plainMatch;
    while ((plainMatch = plainRegex.exec(text)) !== null) {
      const parsed = parseFloat(plainMatch[0]);
      if (Number.isFinite(parsed) && parsed > 0) {
        candidates.push(parsed);
      }
    }

    // 4. Se ainda não encontrou candidatos e o texto contiver um número simples
    if (candidates.length === 0) {
      const cleanNum = text.replace(/[^0-9.]/g, "");
      const simpleNum = parseFloat(cleanNum);
      if (Number.isFinite(simpleNum) && simpleNum > 0) {
        candidates.push(simpleNum);
      }
    }
  }

  if (candidates.length === 0) return 0;
  return Math.max(...candidates);
}

function hashPhone(phone) {
  if (!phone) return undefined;
  let digits = phone.replace(/\D/g, "");
  if (!digits) return undefined;
  if (digits.length === 9 && (digits.startsWith("9") || digits.startsWith("2"))) {
    digits = `351${digits}`;
  }
  return crypto.createHash("sha256").update(digits).digest("hex");
}

function hashData(value) {
  if (!value) return undefined;
  const normalized = value.trim().toLowerCase();
  if (!normalized) return undefined;
  return crypto.createHash("sha256").update(normalized).digest("hex");
}

test("extractHighestValue identifica valores em formato português com ponto", () => {
  assert.equal(extractHighestValue("140.000 €"), 140000);
  assert.equal(extractHighestValue("250.000,00 €"), 250000);
});

test("extractHighestValue identifica o valor mais alto numa faixa de preços", () => {
  assert.equal(extractHighestValue("Entre 140.000 € e 180.000 €"), 180000);
  assert.equal(extractHighestValue("120 000 a 160 000 EUR"), 160000);
});

test("extractHighestValue suporta 'mil' e 'k'", () => {
  assert.equal(extractHighestValue("150k"), 150000);
  assert.equal(extractHighestValue("220 mil euros"), 220000);
});

test("extractHighestValue escolhe o maior entre múltiplas fontes", () => {
  const sources = [
    "Preço pretendido: 130.000 €",
    "Gostaria de vender por 175.000 €",
    "Notas: avaliação prévia de 150k"
  ];
  assert.equal(extractHighestValue(sources), 175000);
});

test("extractHighestValue lida com inputs vazios e inválidos", () => {
  assert.equal(extractHighestValue(""), 0);
  assert.equal(extractHighestValue(null), 0);
  assert.equal(extractHighestValue(undefined), 0);
  assert.equal(extractHighestValue("Sem valor especificado"), 0);
});

test("hashPhone normaliza número português e gera hash SHA-256", () => {
  const hash1 = hashPhone("920 601 700");
  const expectedHash1 = crypto.createHash("sha256").update("351920601700").digest("hex");
  assert.equal(hash1, expectedHash1);

  const hash2 = hashPhone("+351 920 601 700");
  assert.equal(hash2, expectedHash1);
});

test("Meta Conversions API valida credenciais com evento de teste", async () => {
  const pixelId = "979841341182458";
  const token =
    "EAAT9k03bEqsBSgjVoa82Fet3Yiurus5KtnXVbjnPh6eVD42uNpHjz4uJsZAgZCRYrg4jcPZBZCIXZBPbNrCdrMzKryYhF0c07LSM2qmkIBvJ2OpsgIigbbcBVLFByCi6d8ZALAg87QREmel4XtaTh75xWR60eKdNYeYjvkTdCZAp4jZCk0dGoJiFVJAxneHXYAZDZD";

  const res = await fetch(`https://graph.facebook.com/v20.0/${pixelId}/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data: [
        {
          event_name: "Lead",
          event_time: Math.floor(Date.now() / 1000),
          event_id: "unit_test_" + Date.now(),
          action_source: "website",
          user_data: {
            ph: [hashPhone("920601700")],
            client_user_agent: "Node.js Unit Test"
          },
          custom_data: {
            currency: "EUR",
            value: 160000
          }
        }
      ],
      test_event_code: "TEST_UNIT",
      access_token: token
    })
  });

  const data = await res.json();
  assert.equal(res.status, 200);
  assert.equal(data.events_received, 1);
});
