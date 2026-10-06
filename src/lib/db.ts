import { neon } from "@neondatabase/serverless";
import { Lead } from "./leads-store";

const connectionString = process.env.DATABASE_URL;

export const hasDb = Boolean(connectionString);

const sql = connectionString ? neon(connectionString) : null;

/**
 * Inicializa a tabela de leads no Neon PostgreSQL se ainda não existir
 */
export async function initDb() {
  if (!sql) return;
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS leads (
        id VARCHAR(100) PRIMARY KEY,
        timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        source VARCHAR(50) NOT NULL,
        cta_origin VARCHAR(100),
        role VARCHAR(100),
        location VARCHAR(150),
        asking_price VARCHAR(100),
        message TEXT,
        referrer TEXT,
        device VARCHAR(50),
        user_agent TEXT,
        status VARCHAR(50) DEFAULT 'Novo',
        notes TEXT
      );
    `;
    console.log("Tabela leads inicializada com sucesso no Neon PostgreSQL.");
  } catch (err) {
    console.error("Erro ao inicializar tabela leads no Neon:", err);
  }
}

/**
 * Obtém todas as leads a partir do Neon PostgreSQL
 */
export async function getDbLeads(): Promise<Lead[]> {
  if (!sql) return [];
  try {
    await initDb();
    const rows = await sql`
      SELECT 
        id, 
        timestamp::text, 
        source, 
        cta_origin as "ctaOrigin", 
        role, 
        location, 
        asking_price as "askingPrice", 
        message, 
        referrer, 
        device, 
        user_agent as "userAgent", 
        status, 
        notes 
      FROM leads 
      ORDER BY timestamp DESC;
    `;
    return rows as unknown as Lead[];
  } catch (err) {
    console.error("Erro ao ler leads do Neon:", err);
    return [];
  }
}

/**
 * Insere uma nova lead no Neon PostgreSQL
 */
export async function insertDbLead(lead: Lead): Promise<boolean> {
  if (!sql) return false;
  try {
    await initDb();
    await sql`
      INSERT INTO leads (
        id, timestamp, source, cta_origin, role, location, asking_price, message, referrer, device, user_agent, status, notes
      ) VALUES (
        ${lead.id}, 
        ${lead.timestamp}, 
        ${lead.source}, 
        ${lead.ctaOrigin}, 
        ${lead.role || null}, 
        ${lead.location || null}, 
        ${lead.askingPrice || null}, 
        ${lead.message || null}, 
        ${lead.referrer || null}, 
        ${lead.device || null}, 
        ${lead.userAgent || null}, 
        ${lead.status || "Novo"}, 
        ${lead.notes || null}
      );
    `;
    return true;
  } catch (err) {
    console.error("Erro ao gravar lead no Neon:", err);
    return false;
  }
}

/**
 * Atualiza o estado ou notas de uma lead no Neon
 */
export async function updateDbLead(id: string, updates: { status?: string; notes?: string }): Promise<boolean> {
  if (!sql) return false;
  try {
    if (updates.status && updates.notes !== undefined) {
      await sql`UPDATE leads SET status = ${updates.status}, notes = ${updates.notes} WHERE id = ${id};`;
    } else if (updates.status) {
      await sql`UPDATE leads SET status = ${updates.status} WHERE id = ${id};`;
    } else if (updates.notes !== undefined) {
      await sql`UPDATE leads SET notes = ${updates.notes} WHERE id = ${id};`;
    }
    return true;
  } catch (err) {
    console.error("Erro ao atualizar lead no Neon:", err);
    return false;
  }
}

/**
 * Elimina uma lead no Neon
 */
export async function deleteDbLead(id: string): Promise<boolean> {
  if (!sql) return false;
  try {
    await sql`DELETE FROM leads WHERE id = ${id};`;
    return true;
  } catch (err) {
    console.error("Erro ao eliminar lead no Neon:", err);
    return false;
  }
}
