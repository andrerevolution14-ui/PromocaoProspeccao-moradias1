import fs from "fs";
import path from "path";
import { hasDb, getDbLeads, insertDbLead, updateDbLead, deleteDbLead, deleteDbLeads } from "./db";

export interface Lead {
  id: string;
  timestamp: string; // ISO string
  source: string; // "Landing Page"
  ctaOrigin: string; // e.g. "Hero Principal", "Botão Flutuante", "Resumo Rápido", "Rodapé Final"
  role?: string; // "Proprietário", "Mediador / Consultor", "Outro"
  location?: string; // e.g. "Aveiro Centro", "Esgueira", "Santa Joana", etc.
  askingPrice?: string;
  message: string;
  referrer: string;
  device: "Mobile" | "Desktop" | "Tablet";
  userAgent?: string;
  status: "Novo" | "Em Análise" | "Contactado" | "CPCV Assinado" | "Desqualificado";
  notes?: string;
  name?: string;
  phone?: string;
  projectStatus?: string; // "Aprovado" | "PIP + Projeto não aprovado" | "Em curso" | "Não"
  area?: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(LEADS_FILE)) {
    fs.writeFileSync(LEADS_FILE, JSON.stringify([], null, 2), "utf-8");
  }
}

export async function getLeads(): Promise<Lead[]> {
  if (hasDb) {
    try {
      const dbLeads = await getDbLeads();
      if (dbLeads && dbLeads.length > 0) return dbLeads;
    } catch (e) {
      console.warn("Fallback para ficheiro JSON após erro Neon:", e);
    }
  }

  try {
    ensureDataFile();
    const raw = fs.readFileSync(LEADS_FILE, "utf-8");
    const data: Lead[] = JSON.parse(raw);
    return data.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  } catch (err) {
    console.error("Erro ao ler ficheiro de leads:", err);
    return [];
  }
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

  // Grava sempre também no ficheiro local para redundância
  try {
    ensureDataFile();
    const raw = fs.readFileSync(LEADS_FILE, "utf-8");
    const leads: Lead[] = JSON.parse(raw);
    leads.unshift(newLead);
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
  } catch (err) {
    console.warn("Aviso ao escrever em data/leads.json:", err);
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
    ensureDataFile();
    const raw = fs.readFileSync(LEADS_FILE, "utf-8");
    const leads: Lead[] = JSON.parse(raw);
    const index = leads.findIndex(l => l.id === id);
    if (index !== -1) {
      leads[index] = { ...leads[index], ...updates };
      fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
      return leads[index];
    }
  } catch (err) {
    console.error("Erro ao atualizar lead em ficheiro:", err);
  }

  return null;
}

export async function deleteLead(id: string): Promise<boolean> {
  if (hasDb) {
    try {
      await deleteDbLead(id);
    } catch (e) {
      console.warn("Erro no delete Neon DB:", e);
    }
  }

  try {
    ensureDataFile();
    const raw = fs.readFileSync(LEADS_FILE, "utf-8");
    const leads: Lead[] = JSON.parse(raw);
    const filtered = leads.filter(l => l.id !== id);
    fs.writeFileSync(LEADS_FILE, JSON.stringify(filtered, null, 2), "utf-8");
    return true;
  } catch {
    return false;
  }
}

export async function deleteLeads(ids: string[]): Promise<boolean> {
  if (!ids || ids.length === 0) return true;

  if (hasDb) {
    try {
      await deleteDbLeads(ids);
    } catch (e) {
      console.warn("Erro no bulk delete Neon DB:", e);
    }
  }

  try {
    ensureDataFile();
    const raw = fs.readFileSync(LEADS_FILE, "utf-8");
    const leads: Lead[] = JSON.parse(raw);
    const idSet = new Set(ids);
    const filtered = leads.filter(l => !idSet.has(l.id));
    fs.writeFileSync(LEADS_FILE, JSON.stringify(filtered, null, 2), "utf-8");
    return true;
  } catch {
    return false;
  }
}
