import { NextResponse } from "next/server";
import { getLeads, saveLead } from "@/lib/leads-store";
import { sendMetaConversionsApiEvent } from "@/lib/meta-capi";
import { extractHighestValue } from "@/lib/tracking-utils";

export async function GET() {
  try {
    const leads = await getLeads();

    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const sevenDaysAgo = now.getTime() - 7 * 24 * 60 * 60 * 1000;

    const totalLeads = leads.length;
    const leadsLandingPage = leads.filter((l) => l.source === "Landing Page").length;
    const leadsToday = leads.filter((l) => new Date(l.timestamp).getTime() >= todayStart).length;
    const leadsWeek = leads.filter((l) => new Date(l.timestamp).getTime() >= sevenDaysAgo).length;

    // Breakdown por CTA
    const ctaCounts: Record<string, number> = {};
    leads.forEach((l) => {
      ctaCounts[l.ctaOrigin] = (ctaCounts[l.ctaOrigin] || 0) + 1;
    });

    // Breakdown por Estado
    const statusCounts: Record<string, number> = {};
    leads.forEach((l) => {
      statusCounts[l.status] = (statusCounts[l.status] || 0) + 1;
    });

    return NextResponse.json({
      success: true,
      stats: {
        totalLeads,
        leadsLandingPage,
        leadsToday,
        leadsWeek,
        ctaCounts,
        statusCounts
      },
      leads
    });
  } catch (error) {
    console.error("API GET Leads erro:", error);
    return NextResponse.json({ success: false, error: "Falha ao obter leads" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const userAgent = request.headers.get("user-agent") || "";
    const ipAddress =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      undefined;

    const isMobile = /mobile|iphone|ipod|android|blackberry|opera mini|iemobile/i.test(userAgent);
    const isTablet = /tablet|ipad/i.test(userAgent);
    const device = isTablet ? "Tablet" : isMobile ? "Mobile" : "Desktop";

    const referrer = body.referrer || request.headers.get("referer") || "Acesso Direto";

    // 1. Extração do valor mais alto do formulário
    const leadValue =
      typeof body.value === "number" && body.value > 0
        ? body.value
        : extractHighestValue([body.askingPrice, body.message, body.notes]);

    // 2. Event ID para desduplicação Pixel + CAPI
    const eventId =
      body.eventId || `lead_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    // 3. Gravar lead no CRM / Base de Dados
    const newLead = await saveLead({
      source: "Landing Page",
      ctaOrigin: body.ctaOrigin || "Botão Geral WhatsApp",
      role: body.role || "Não especificado",
      location: body.location || "Região de Aveiro",
      askingPrice: body.askingPrice || (leadValue > 0 ? `${leadValue} €` : ""),
      message: body.message || "Clique para WhatsApp",
      referrer: referrer,
      device: device,
      userAgent: userAgent,
      status: "Novo",
      notes: body.notes || ""
    });

    // 4. Envio assíncrono para a Meta Conversions API (CAPI)
    sendMetaConversionsApiEvent({
      eventId: eventId,
      value: leadValue,
      currency: "EUR",
      contentName: `${body.role || "Lead"} - ${body.location || "Aveiro"}`,
      sourceUrl: body.pageUrl || referrer,
      userAgent: userAgent,
      ipAddress: ipAddress,
      fbp: body.fbp,
      fbc: body.fbc,
      phone: body.phone,
      email: body.email,
      firstName: body.name
    }).catch((err) => console.warn("Meta CAPI background error:", err));

    return NextResponse.json(
      {
        success: true,
        lead: newLead,
        metaTracking: {
          eventId: eventId,
          value: leadValue,
          currency: "EUR"
        }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("API POST Lead erro:", error);
    return NextResponse.json({ success: false, error: "Falha ao gravar lead" }, { status: 500 });
  }
}
