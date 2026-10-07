import crypto from "crypto";
import { SITE_CONFIG } from "./config";

export interface MetaCapiLeadParams {
  eventId: string;
  value?: number;
  currency?: string;
  contentName?: string;
  sourceUrl?: string;
  userAgent?: string;
  ipAddress?: string;
  fbp?: string;
  fbc?: string;
  phone?: string;
  email?: string;
  firstName?: string;
  testEventCode?: string;
}

export interface MetaCapiResponse {
  success: boolean;
  eventsReceived?: number;
  fbtraceId?: string;
  error?: string;
}

/**
 * Normaliza e gera o hash SHA-256 exigido pela Meta para dados de utilizador (email, telefone, nome)
 */
export function hashData(value: string | undefined | null): string | undefined {
  if (!value) return undefined;
  const normalized = value.trim().toLowerCase();
  if (!normalized) return undefined;
  return crypto.createHash("sha256").update(normalized).digest("hex");
}

/**
 * Normaliza número de telefone (remove caracteres não numéricos) e gera hash SHA-256
 */
export function hashPhone(phone: string | undefined | null): string | undefined {
  if (!phone) return undefined;
  let digits = phone.replace(/\D/g, "");
  if (!digits) return undefined;
  // Se for número português sem indicativo 351 (ex: 920601700), adiciona 351
  if (digits.length === 9 && (digits.startsWith("9") || digits.startsWith("2"))) {
    digits = `351${digits}`;
  }
  return crypto.createHash("sha256").update(digits).digest("hex");
}

/**
 * Envia evento Lead para a Meta Conversions API (CAPI) via Graph API v20.0
 */
export async function sendMetaConversionsApiEvent(
  params: MetaCapiLeadParams
): Promise<MetaCapiResponse> {
  const pixelId = SITE_CONFIG.metaPixelId;
  const accessToken = SITE_CONFIG.metaConversionsApiToken;

  if (!pixelId || !accessToken) {
    console.warn("Meta CAPI ignorado: Pixel ID ou Access Token em falta.");
    return { success: false, error: "Pixel ID ou Token em falta" };
  }

  try {
    const eventTime = Math.floor(Date.now() / 1000);

    // Preparar dados de utilizador
    const userData: Record<string, any> = {};

    if (params.userAgent) userData.client_user_agent = params.userAgent;
    if (params.ipAddress) userData.client_ip_address = params.ipAddress;
    if (params.fbp) userData.fbp = params.fbp;
    if (params.fbc) userData.fbc = params.fbc;

    const hashedPhone = hashPhone(params.phone);
    if (hashedPhone) userData.ph = [hashedPhone];

    const hashedEmail = hashData(params.email);
    if (hashedEmail) userData.em = [hashedEmail];

    const hashedFn = hashData(params.firstName);
    if (hashedFn) userData.fn = [hashedFn];

    // Dados customizados (valor monetário mais alto)
    const customData: Record<string, any> = {
      currency: params.currency || "EUR"
    };

    if (typeof params.value === "number" && params.value > 0) {
      customData.value = params.value;
    }
    if (params.contentName) {
      customData.content_name = params.contentName;
    }

    const eventPayload: Record<string, any> = {
      event_name: "Lead",
      event_time: eventTime,
      event_id: params.eventId,
      action_source: "website",
      user_data: userData,
      custom_data: customData
    };

    if (params.sourceUrl) {
      eventPayload.event_source_url = params.sourceUrl;
    }

    const requestBody: Record<string, any> = {
      data: [eventPayload],
      access_token: accessToken
    };

    const testCode = params.testEventCode || process.env.META_TEST_EVENT_CODE;
    if (testCode) {
      requestBody.test_event_code = testCode;
    }

    const endpoint = `https://graph.facebook.com/v20.0/${pixelId}/events`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    });

    const result = await response.json();

    if (!response.ok) {
      console.warn("Erro ao enviar Meta CAPI:", JSON.stringify(result));
      return {
        success: false,
        error: result.error?.message || "Erro na resposta da Meta Graph API",
        fbtraceId: result.error?.fbtrace_id
      };
    }

    return {
      success: true,
      eventsReceived: result.events_received,
      fbtraceId: result.fbtrace_id
    };
  } catch (error: any) {
    console.error("Exceção ao chamar Meta Conversions API:", error);
    return {
      success: false,
      error: error.message || "Exceção de rede ao contactar a Meta"
    };
  }
}
