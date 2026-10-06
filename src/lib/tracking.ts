import { getWhatsAppUrl } from "./config";

export interface TrackLeadParams {
  ctaOrigin: string;
  role?: string;
  location?: string;
  askingPrice?: string;
  customMessage?: string;
  notes?: string;
}

/**
 * Regista o evento de lead no backend e abre diretamente a conversa do WhatsApp
 */
export async function trackAndOpenWhatsApp(params: TrackLeadParams): Promise<void> {
  const url = getWhatsAppUrl({
    customMessage: params.customMessage,
    role: params.role,
    location: params.location,
    askingPrice: params.askingPrice
  });

  // Registo assíncrono não-bloqueante
  try {
    const payload = {
      ctaOrigin: params.ctaOrigin,
      role: params.role || "Não especificado",
      location: params.location || "Região de Aveiro",
      askingPrice: params.askingPrice || "",
      message: params.customMessage || "Olá André, tenho um terreno com projeto aprovado em Aveiro. Gostaria de enviar os detalhes.",
      referrer: typeof window !== "undefined" ? window.document.referrer || window.location.href : "",
      notes: params.notes || ""
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
      }).catch(err => console.warn("Erro ao registar lead em background:", err));
    }
  } catch (err) {
    console.warn("Tracking lead error:", err);
  }

  // Abrir WhatsApp imediatamente
  if (typeof window !== "undefined") {
    window.open(url, "_blank", "noopener,noreferrer");
  }
}
