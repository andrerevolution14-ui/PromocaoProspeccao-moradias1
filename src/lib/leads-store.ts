import fs from "fs";
import path from "path";
import { hasDb, getDbLeads, insertDbLead, updateDbLead, deleteDbLead } from "./db";

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
}

const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(LEADS_FILE)) {
    const initialLeads: Lead[] = [
      {
        id: "lead-aveiro-201",
        timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
        source: "Landing Page",
        ctaOrigin: "Hero Principal",
        role: "Proprietário",
        location: "Esgueira",
        askingPrice: "145.000 €",
        message: "Olá André, tenho um terreno em Esgueira com projeto de arquitetura aprovado para moradia térrea T3, valor pretendido: 145.000 €. Gostaria de enviar a planta em PDF para análise.",
        referrer: "Direct / Google Ads",
        device: "Mobile",
        userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)",
        status: "Em Análise",
        notes: "Projeto T3 térrea com licença a pagamento. Resposta enviada no WhatsApp."
      },
      {
        id: "lead-aveiro-202",
        timestamp: new Date(Date.now() - 3600000 * 18).toISOString(),
        source: "Landing Page",
        ctaOrigin: "Hero Principal",
        role: "Proprietário",
        location: "Aveiro Centro (Glória)",
        askingPrice: "210.000 €",
        message: "Olá André, tenho um terreno em Aveiro Centro com projeto aprovado, valor pretendido: 210.000 €. Gostaria de enviar a planta em PDF para análise.",
        referrer: "https://grupofreitasrenovacoes.pt/",
        device: "Desktop",
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        status: "Contactado",
        notes: "Lote excelente. Análise de engenharia em curso para CPCV."
      },
      {
        id: "lead-aveiro-203",
        timestamp: new Date(Date.now() - 3600000 * 40).toISOString(),
        source: "Landing Page",
        ctaOrigin: "Botão Flutuante WhatsApp",
        role: "Mediador / Consultor",
        location: "Santa Joana",
        askingPrice: "175.000 €",
        message: "Olá André, represento o proprietário de um lote em Santa Joana com PIP aprovado para 2 moradias.",
        referrer: "Instagram Ads",
        device: "Mobile",
        userAgent: "Mozilla/5.0 (Linux; Android 14)",
        status: "Novo",
        notes: "Aguarda receção de projeto de execução."
      }
    ];
    fs.writeFileSync(LEADS_FILE, JSON.stringify(initialLeads, null, 2), "utf-8");
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
