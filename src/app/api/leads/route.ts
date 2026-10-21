import { NextResponse } from "next/server";
import { getLeads, saveLead, deleteLeads } from "@/lib/leads-store";
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
    // Quer seja submissão do formulário curto, quer seja clique para WhatsApp,
    // o registo entra sempre no painel para que nenhum contacto se perca
    const leadName = name || (isForm ? "Contacto do Formulário" : "Contacto WhatsApp");
    const newLead = await saveLead({
      source: isForm ? "Formulário" : "Clique WhatsApp",
      ctaOrigin: body.ctaOrigin || (isForm ? "Formulário" : "Botão WhatsApp"),
      role: body.role || (isForm ? "Proprietário" : "Não especificado"),
      location: body.location || "Aveiro",
      askingPrice: body.askingPrice || "",
      message: body.message || (isForm ? "Formulário submetido" : "Contacto iniciado via WhatsApp"),
      referrer: referrer,
      device: device,
      userAgent: userAgent,
      status: "Novo",
      notes: body.notes || (isForm ? "Recebido via formulário interativo" : "Contacto iniciado via WhatsApp"),
      name: leadName,
      phone: phone || undefined,
      projectStatus: body.projectStatus || undefined,
      area: body.area || undefined
    });
    const createdLeadId = newLead.id;

    // 3. Envio para a Meta Conversions API (CAPI)
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

    if (isForm) await capiPromise;

    return NextResponse.json(
      {
        success: true,
        lead: createdLeadId ? { id: createdLeadId } : undefined,
        metaTracking: { eventId, eventType }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("API POST Lead erro:", error);
    return NextResponse.json({ success: false, error: "Falha ao processar pedido" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { ids, all, exceptId } = body;

    if (Array.isArray(ids) && ids.length > 0) {
      const ok = await deleteLeads(ids);
      return NextResponse.json({ success: ok, count: ids.length, message: `${ids.length} leads eliminadas` });
    }

    if (all) {
      const allLeads = await getLeads();
      const toDelete = exceptId ? allLeads.filter(l => l.id !== exceptId).map(l => l.id) : allLeads.map(l => l.id);
      const ok = await deleteLeads(toDelete);
      return NextResponse.json({ success: ok, count: toDelete.length, message: `${toDelete.length} leads eliminadas` });
    }

    return NextResponse.json({ success: false, error: "Nenhum identificador fornecido" }, { status: 400 });
  } catch (err) {
    console.error("API DELETE Leads erro:", err);
    return NextResponse.json({ success: false, error: "Falha ao eliminar leads" }, { status: 500 });
  }
}
