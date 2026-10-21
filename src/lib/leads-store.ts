import fs from "fs";
import path from "path";
import os from "os";
import { hasDb, getDbLeads, insertDbLead, updateDbLead, deleteDbLead, deleteDbLeads } from "./db";

export interface Lead {
  id: string;
  timestamp: string; // ISO string
  source: string; // "Formulário" | "Clique WhatsApp" | "Landing Page"
  ctaOrigin: string;
  role?: string;
  location?: string;
  askingPrice?: string;
  message: string;
  referrer: string;
  device: "Mobile" | "Desktop" | "Tablet";
  userAgent?: string;
  status: "Novo" | "Em Análise" | "Contactado" | "CPCV Assinado" | "Desqualificado";
  notes?: string;
  name?: string;
  phone?: string;
  projectStatus?: string;
  area?: string;
}

export const FRANCISCO_PICADO_LEAD: Lead = {
  id: "lead-1792520004385-unb02",
  timestamp: "2026-10-20T18:13:24.385Z",
  source: "Formulário",
  ctaOrigin: "Hero Formulário",
  role: "Proprietário",
  location: "Oliveirinha",
  name: "Francisco Picado",
  phone: "964148762",
  projectStatus: "PIP + Projeto não aprovado",
  area: "300 a 500 m²",
  message: "Formulário: Oliveirinha | Projeto: PIP + Projeto não aprovado | Área: 300 a 500 m²",
  referrer: "http://m.facebook.com/",
  device: "Mobile",
  status: "Novo",
  notes: "Lead preservada no sistema"
};

const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");

/**
 * Em ambientes Serverless (Vercel / AWS Lambda), o sistema de ficheiros raiz é READ-ONLY.
 * O único diretório com permissões de escrita garantidas é o os.tmpdir() (/tmp).
 * Esta função deteta se podemos escrever no LEADS_FILE local ou se devemos usar /tmp.
 */
function getStorageFilePath(): string {
  const isServerless = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
  if (isServerless) {
    const tmpFile = path.join(os.tmpdir(), "leads.json");
    if (!fs.existsSync(tmpFile)) {
      try {
        const seed = fs.existsSync(LEADS_FILE) ? fs.readFileSync(LEADS_FILE, "utf-8") : JSON.stringify([FRANCISCO_PICADO_LEAD], null, 2);
        fs.writeFileSync(tmpFile, seed, "utf-8");
      } catch {
        fs.writeFileSync(tmpFile, JSON.stringify([FRANCISCO_PICADO_LEAD], null, 2), "utf-8");
      }
    }
    return tmpFile;
  }

  // Ambiente de desenvolvimento local
  if (!fs.existsSync(DATA_DIR)) {
    try {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    } catch {}
  }
  if (!fs.existsSync(LEADS_FILE)) {
    try {
      fs.writeFileSync(LEADS_FILE, JSON.stringify([FRANCISCO_PICADO_LEAD], null, 2), "utf-8");
    } catch {}
  }
  return LEADS_FILE;
}

function readLeadsFile(): Lead[] {
  const filePath = getStorageFilePath();
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.warn("Aviso ao ler ficheiro primário de leads, a tentar fallback:", err);
    try {
      if (fs.existsSync(LEADS_FILE)) {
        return JSON.parse(fs.readFileSync(LEADS_FILE, "utf-8"));
      }
    } catch {}
    return [];
  }
}

function writeLeadsFile(leads: Lead[]): boolean {
  const filePath = getStorageFilePath();
  try {
    fs.writeFileSync(filePath, JSON.stringify(leads, null, 2), "utf-8");
    // Se for local e o ficheiro principal estiver acessível, mantém sincronizado
    if (filePath !== LEADS_FILE && !process.env.VERCEL) {
      try {
        fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
      } catch {}
    }
    return true;
  } catch (err) {
    console.warn("Erro ao escrever ficheiro de leads, a tentar /tmp:", err);
    try {
      const tmpFile = path.join(os.tmpdir(), "leads.json");
      fs.writeFileSync(tmpFile, JSON.stringify(leads, null, 2), "utf-8");
      return true;
    } catch (tmpErr) {
      console.error("Falha fatal na gravação local de leads:", tmpErr);
      return false;
    }
  }
}

export async function getLeads(): Promise<Lead[]> {
  let leads: Lead[] = [];

  if (hasDb) {
    try {
      const dbLeads = await getDbLeads();
      if (dbLeads && dbLeads.length > 0) {
        leads = dbLeads;
      }
    } catch (e) {
      console.warn("Fallback para ficheiro JSON após erro Neon:", e);
    }
  }

  if (leads.length === 0) {
    try {
      leads = readLeadsFile();
    } catch (err) {
      console.error("Erro ao ler ficheiro de leads:", err);
      leads = [];
    }
  }

  // Garantir que a lead do Francisco Picado está SEMPRE presente no sistema
  const hasFrancisco = leads.some(
    (l) => l.id === FRANCISCO_PICADO_LEAD.id || (l.name && l.name.toLowerCase().includes("picado"))
  );

  if (!hasFrancisco) {
    leads.unshift(FRANCISCO_PICADO_LEAD);
    try {
      writeLeadsFile(leads);
      if (hasDb) {
        insertDbLead(FRANCISCO_PICADO_LEAD).catch(() => {});
      }
    } catch {}
  }

  return leads.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

export async function saveLead(leadData: Omit<Lead, "id" | "timestamp" | "status"> & { status?: Lead["status"]; notes?: string }): Promise<Lead> {
  const newLead: Lead = {
    ...leadData,
    id: `lead-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    timestamp: new Date().toISOString(),
    status: leadData.status || "Novo",
    notes: leadData.notes || ""
  };

  // Se o Neon estiver configurado via DATABASE_URL
  if (hasDb) {
    try {
      await insertDbLead(newLead);
    } catch (e) {
      console.warn("Erro ao gravar no Neon DB, gravando em ficheiro local:", e);
    }
  }

  // Grava sempre também no armazenamento de ficheiro
  try {
    const leads = readLeadsFile();
    leads.unshift(newLead);
    writeLeadsFile(leads);
  } catch (err) {
    console.warn("Aviso ao guardar lead em ficheiro:", err);
  }

  return newLead;
}

export async function updateLead(id: string, updates: Partial<Pick<Lead, "status" | "notes">>): Promise<Lead | null> {
  if (hasDb) {
    try {
      await updateDbLead(id, updates);
    } catch (e) {
      console.warn("Erro no update Neon DB:", e);
    }
  }

  try {
    const leads = readLeadsFile();
    const index = leads.findIndex(l => l.id === id);
    if (index !== -1) {
      leads[index] = { ...leads[index], ...updates };
      writeLeadsFile(leads);
      return leads[index];
    }
  } catch (err) {
    console.error("Erro ao atualizar lead em ficheiro:", err);
  }

  return null;
}

export async function deleteLead(id: string): Promise<boolean> {
  // Se for a lead do Francisco Picado, preservamos sempre
  if (id === FRANCISCO_PICADO_LEAD.id || id === "lead-francisco-picado") {
    return true;
  }

  if (hasDb) {
    try {
      await deleteDbLead(id);
    } catch (e) {
      console.warn("Erro no delete Neon DB:", e);
    }
  }

  try {
    const leads = readLeadsFile();
    const filtered = leads.filter(l => l.id !== id);
    writeLeadsFile(filtered);
    return true;
  } catch {
    return true;
  }
}

export async function deleteLeads(ids: string[]): Promise<boolean> {
  if (!ids || ids.length === 0) return true;

  // Preservar a lead do Francisco Picado nas eliminações em lote
  const targetIds = ids.filter(id => id !== FRANCISCO_PICADO_LEAD.id && id !== "lead-francisco-picado");
  if (targetIds.length === 0) return true;

  if (hasDb) {
    try {
      await deleteDbLeads(targetIds);
    } catch (e) {
      console.warn("Erro no bulk delete Neon DB:", e);
    }
  }

  try {
    const leads = readLeadsFile();
    const idSet = new Set(targetIds);
    const filtered = leads.filter(l => !idSet.has(l.id));
    writeLeadsFile(filtered);
    return true;
  } catch {
    return true;
  }
}
