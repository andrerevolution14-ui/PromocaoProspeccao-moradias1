import { getWhatsAppUrl } from "./config";
import { extractHighestValue, generateEventId, getCookie, getFbcParam } from "./tracking-utils";

export interface TrackLeadParams {
  ctaOrigin: string;
  role?: string;
  location?: string;
  askingPrice?: string;
  customMessage?: string;
  notes?: string;
  phone?: string;
  email?: string;
  name?: string;
}

/**
 * Dispara o evento Lead no Meta Pixel (lado do cliente) e envia para a API de Conversões (lado do servidor).
 * Usa o valor monetário mais alto preenchido e garante desduplicação através do mesmo eventID.
 */
export function trackMetaLead(params: {
  eventId: string;
  value: number;
  currency?: string;
  contentName?: string;
}): void {
  if (typeof window !== "undefined" && typeof (window as any).fbq === "function") {
    try {
      const eventData: Record<string, any> = {
        currency: params.currency || "EUR"
      };

      if (params.value > 0) {
        eventData.value = params.value;
      }
      if (params.contentName) {
        eventData.content_name = params.contentName;
      }

      (window as any).fbq("track", "Lead", eventData, { eventID: params.eventId });
    } catch (pixelErr) {
      console.warn("Erro ao registar Meta Pixel Lead:", pixelErr);
    }
  }
}

/**
 * Regista o evento de lead no backend, dispara o Meta Pixel & CAPI com o valor mais alto e abre o WhatsApp
 */
export async function trackAndOpenWhatsApp(params: TrackLeadParams): Promise<void> {
  const url = getWhatsAppUrl({
    customMessage: params.customMessage,
    role: params.role,
    location: params.location,
    askingPrice: params.askingPrice
  });

  // 1. Extração do valor mais alto do formulário / inputs
  const highestValue = extractHighestValue([
    params.askingPrice,
    params.customMessage,
    params.notes
  ]);

  // 2. Identificador único de evento para desduplicação Pixel + CAPI
  const eventId = generateEventId();

  // 3. Disparo imediato no Meta Pixel (navegador)
  trackMetaLead({
    eventId,
    value: highestValue,
    currency: "EUR",
    contentName: `${params.role || "Lead"} - ${params.location || "Aveiro"}`
  });

  // 4. Parâmetros de atribuição Meta
  const fbp = getCookie("_fbp") || undefined;
  const fbc = getFbcParam() || undefined;
  const pageUrl = typeof window !== "undefined" ? window.location.href : "";
  const referrer = typeof window !== "undefined" ? window.document.referrer || window.location.href : "";

  // 5. Registo assíncrono não-bloqueante no servidor (/api/leads dispara CAPI)
  try {
    const payload = {
      ctaOrigin: params.ctaOrigin,
      role: params.role || "Não especificado",
      location: params.location || "Região de Aveiro",
      askingPrice: params.askingPrice || (highestValue > 0 ? `${highestValue} €` : ""),
      message: params.customMessage || "Olá André, tenho um terreno com projeto aprovado em Aveiro. Gostaria de enviar os detalhes.",
      referrer: referrer,
      notes: params.notes || "",
      phone: params.phone,
      email: params.email,
      name: params.name,
      // Metadados Meta CAPI
      eventId: eventId,
      value: highestValue,
      currency: "EUR",
      fbp: fbp,
      fbc: fbc,
      pageUrl: pageUrl
    };

    if (typeof navigator !== "undefined" && navigator.sendBeacon) {
      const blob = new Blob([JSON.stringify(payload)], { type: "application/json" });
      navigator.sendBeacon("/api/leads", blob);
    } else {
      fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true
      }).catch((err) => console.warn("Erro ao registar lead em background:", err));
    }
  } catch (err) {
    console.warn("Tracking lead error:", err);
  }

  // 6. Abrir WhatsApp imediatamente
  if (typeof window !== "undefined") {
    window.open(url, "_blank", "noopener,noreferrer");
  }
}
