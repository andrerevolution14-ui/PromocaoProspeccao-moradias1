import { NextResponse } from "next/server";
import { getLeads, saveLead } from "@/lib/leads-store";
import { sendMetaConversionsApiEvent } from "@/lib/meta-capi";

export async function GET() {
  try {
    const leads = await getLeads();

    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const sevenDaysAgo = now.getTime() - 7 * 24 * 60 * 60 * 1000;

    const totalLeads = leads.length;
    // Leads reais = formulários submetidos (inclui registos antigos "Landing Page")
    const leadsLandingPage = leads.filter(
      (l) => l.source === "Formulário" || l.source === "Landing Page"
    ).length;
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

    const eventType: "Lead" | "Contact" = body.eventType === "Contact" ? "Contact" : "Lead";
    const isForm = eventType === "Lead";

    // Validação mínima: uma lead de formulário tem de trazer telemóvel
    const phone = typeof body.phone === "string" ? body.phone.trim().slice(0, 30) : "";
    const name = typeof body.name === "string" ? body.name.trim().slice(0, 120) : "";
    if (isForm && phone.replace(/\D/g, "").length < 9) {
      return NextResponse.json({ success: false, error: "Telemóvel inválido" }, { status: 400 });
    }

    // 1. Event ID para desduplicação Pixel + CAPI
    const eventId =
      body.eventId || `lead_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    // 2. Gravar no CRM / Base de Dados
    const newLead = await saveLead({
      source: isForm ? "Formulário" : "Clique WhatsApp",
      ctaOrigin: body.ctaOrigin || (isForm ? "Formulário" : "Botão WhatsApp"),
      role: body.role || "Não especificado",
      location: body.location || "",
      askingPrice: body.askingPrice || "",
      message: body.message || (isForm ? "Formulário submetido" : "Clique para WhatsApp"),
      referrer: referrer,
      device: device,
      userAgent: userAgent,
      status: "Novo",
      notes: body.notes || "",
      name: name || undefined,
      phone: phone || undefined,
      projectStatus: body.projectStatus || undefined,
      area: body.area || undefined
    });

    // 3. Envio para a Meta Conversions API (CAPI) — Lead só para formulários
    const firstName = name.split(/\s+/)[0] || undefined;
    const capiPromise = sendMetaConversionsApiEvent({
      eventName: eventType,
      eventId: eventId,
      contentName: isForm
        ? `${body.projectStatus || "Projeto"} - ${body.location || "Aveiro"}`
        : body.ctaOrigin || "WhatsApp",
      sourceUrl: body.pageUrl || referrer,
      userAgent: userAgent,
      ipAddress: ipAddress,
      fbp: body.fbp,
      fbc: body.fbc,
      phone: phone || undefined,
      firstName
    }).catch((err) => {
      console.warn("Meta CAPI background error:", err);
      return null;
    });

    // Em serverless o processo pode terminar antes do envio: aguardamos nas leads reais
    if (isForm) await capiPromise;

    return NextResponse.json(
      {
        success: true,
        lead: { id: newLead.id },
        metaTracking: { eventId, eventType }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("API POST Lead erro:", error);
    return NextResponse.json({ success: false, error: "Falha ao gravar lead" }, { status: 500 });
  }
}
