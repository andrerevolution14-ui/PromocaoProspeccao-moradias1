/**
 * Utilitários para extração do valor mais alto e identificadores de eventos Meta (Pixel & CAPI)
 */

/**
 * Extrai todos os valores monetários/numéricos válidos de uma string ou lista de strings e retorna o valor mais alto.
 * Suporta formatos portugueses (ex: "140.000 €", "150 000", "160k", "140.000€ a 180.000€", "150 mil").
 */
export function extractHighestValue(
  sources: (string | number | undefined | null)[] | string | number | undefined | null
): number {
  if (!sources) return 0;

  const list = Array.isArray(sources) ? sources : [sources];
  const candidates: number[] = [];

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

    // 1. Procura formatos com "k" ou "mil" (ex: "150k", "150 mil", "150.5k")
    const kRegex = /(\d+(?:[.,]\d+)?)\s*(?:k|mil)\b/gi;
    let kMatch: RegExpExecArray | null;
    while ((kMatch = kRegex.exec(text)) !== null) {
      const numStr = kMatch[1].replace(",", ".");
      const parsed = parseFloat(numStr) * 1000;
      if (Number.isFinite(parsed) && parsed > 0) {
        candidates.push(parsed);
      }
    }

    // 2. Procura números formatados com pontos ou espaços como milhares (ex: 140.000, 150 000, 1.200.000)
    const formattedRegex = /\b\d{1,3}(?:[.\s]\d{3})+(?:,\d+)?\b/g;
    let fmtMatch: RegExpExecArray | null;
    while ((fmtMatch = formattedRegex.exec(text)) !== null) {
      // Remove pontos e espaços, troca vírgula decimal por ponto
      const clean = fmtMatch[0].replace(/[.\s]/g, "").replace(",", ".");
      const parsed = parseFloat(clean);
      if (Number.isFinite(parsed) && parsed > 0) {
        candidates.push(parsed);
      }
    }

    // 3. Procura números inteiros diretos (ex: "140000", "200000")
    const plainRegex = /\b\d{4,12}\b/g;
    let plainMatch: RegExpExecArray | null;
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

/**
 * Gera um identificador único de evento para desduplicação entre o Meta Pixel (browser) e a API de Conversões (servidor).
 */
export function generateEventId(): string {
  return `lead_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Lê o valor de um cookie específico no browser.
 */
export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(?:^|;\\s*)" + name + "=([^;]*)"));
  return match ? decodeURIComponent(match[1]) : null;
}

/**
 * Obtém o valor do _fbc a partir do cookie ou constrói o fallback através do parâmetro `fbclid` do URL.
 */
export function getFbcParam(): string | null {
  if (typeof window === "undefined") return null;
  const fbc = getCookie("_fbc");
  if (fbc) return fbc;

  try {
    const urlParams = new URLSearchParams(window.location.search);
    const fbclid = urlParams.get("fbclid");
    if (fbclid) {
      return `fb.1.${Date.now()}.${fbclid}`;
    }
  } catch {
    // Ignore URL parsing errors
  }
  return null;
}
