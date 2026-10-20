import { getWhatsAppUrl } from "./config";
import { generateEventId, getCookie, getFbcParam } from "./tracking-utils";

/**
 * Estratégia de tracking:
 * - "Lead"    → só quando o formulário é submetido (nome + telemóvel). É este o evento
 *               para otimizar as campanhas Meta (Pixel + CAPI com o mesmo eventID).
 * - "Contact" → clique num botão de WhatsApp. Útil para medir, mas NÃO é lead, para não
 *               ensinar o algoritmo a trazer curiosos baratos.
 * - "LeadFormStep" (custom) → progresso no formulário, para diagnosticar abandono.
 */

export type MetaEventName = "Lead" | "Contact";

export interface LeadFormPayload {
  ctaOrigin: string;
  location: string;
  projectStatus: string;
  area: string;
  name: string;
  phone: string;
  role: string;
}

export interface TrackContactParams {
  ctaOrigin: string;
  customMessage?: string;
}

function fbq(...args: unknown[]): void {
  if (typeof window === "undefined") return;
  const fn = (window as unknown as { fbq?: (...a: unknown[]) => void }).fbq;
  if (typeof fn !== "function") return;
  try {
    fn(...args);
  } catch (err) {
    console.warn("Erro Meta Pixel:", err);
  }
}

function attributionData() {
  return {
    fbp: getCookie("_fbp") || undefined,
    fbc: getFbcParam() || undefined,
    pageUrl: typeof window !== "undefined" ? window.location.href : "",
    referrer:
      typeof window !== "undefined" ? window.document.referrer || window.location.href : ""
  };
}

/** Regista progresso no formulário (evento custom, não afeta a otimização). */
export function trackFormStep(step: number, stepName: string): void {
  fbq("trackCustom", "LeadFormStep", { step, step_name: stepName });
}

/**
 * Submete o formulário curto: grava no CRM, dispara "Lead" no Pixel e na CAPI (desduplicado).
 * Devolve true se o servidor gravou a lead.
 */
export async function submitLeadForm(data: LeadFormPayload): Promise<boolean> {
  const eventId = generateEventId();
  const contentName = `${data.projectStatus} - ${data.location}`;

  fbq(
    "track",
    "Lead",
    { content_name: contentName, content_category: data.projectStatus },
    { eventID: eventId }
  );

  const message = `Formulário: ${data.location} | Projeto: ${data.projectStatus} | Área: ${data.area}`;

  try {
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({
        eventType: "Lead",
        eventId,
        ctaOrigin: data.ctaOrigin,
        role: data.role,
        location: data.location,
        projectStatus: data.projectStatus,
        area: data.area,
        name: data.name,
        phone: data.phone,
        message,
        ...attributionData()
      })
    });
    return res.ok;
  } catch (err) {
    console.warn("Erro ao submeter lead:", err);
    return false;
  }
}

/**
 * Clique de WhatsApp (alternativa secundária): dispara "Contact" e abre a conversa.
 */
export function trackAndOpenWhatsApp(params: TrackContactParams): void {
  const url = getWhatsAppUrl({ customMessage: params.customMessage });
  const eventId = generateEventId();

  fbq("track", "Contact", { content_name: params.ctaOrigin }, { eventID: eventId });

  try {
    const payload = JSON.stringify({
      eventType: "Contact",
      eventId,
      ctaOrigin: params.ctaOrigin,
      message: params.customMessage || "Clique WhatsApp",
      ...attributionData()
    });
    if (typeof navigator !== "undefined" && navigator.sendBeacon) {
      navigator.sendBeacon("/api/leads", new Blob([payload], { type: "application/json" }));
    } else {
      fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        keepalive: true
      }).catch(() => {});
    }
  } catch (err) {
    console.warn("Tracking contact error:", err);
  }

  if (typeof window !== "undefined") {
    window.open(url, "_blank", "noopener,noreferrer");
  }
}

/** Faz scroll até ao formulário principal e foca o primeiro campo. */
export function scrollToLeadForm(): void {
  if (typeof document === "undefined") return;
  const el = document.getElementById("avaliar");
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}
