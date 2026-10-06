import { NextResponse } from "next/server";
import { getLeads, saveLead } from "@/lib/leads-store";

export async function GET() {
  try {
    const leads = await getLeads();

    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const sevenDaysAgo = now.getTime() - 7 * 24 * 60 * 60 * 1000;

    const totalLeads = leads.length;
    const leadsLandingPage = leads.filter(l => l.source === "Landing Page").length;
    const leadsToday = leads.filter(l => new Date(l.timestamp).getTime() >= todayStart).length;
    const leadsWeek = leads.filter(l => new Date(l.timestamp).getTime() >= sevenDaysAgo).length;

    // Breakdown por CTA
    const ctaCounts: Record<string, number> = {};
    leads.forEach(l => {
      ctaCounts[l.ctaOrigin] = (ctaCounts[l.ctaOrigin] || 0) + 1;
    });

    // Breakdown por Estado
    const statusCounts: Record<string, number> = {};
    leads.forEach(l => {
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
    const isMobile = /mobile|iphone|ipod|android|blackberry|opera mini|iemobile/i.test(userAgent);
    const isTablet = /tablet|ipad/i.test(userAgent);
    const device = isTablet ? "Tablet" : isMobile ? "Mobile" : "Desktop";

    const referrer = body.referrer || request.headers.get("referer") || "Acesso Direto";

    const newLead = await saveLead({
      source: "Landing Page",
      ctaOrigin: body.ctaOrigin || "Botão Geral WhatsApp",
      role: body.role || "Não especificado",
      location: body.location || "Região de Aveiro",
      askingPrice: body.askingPrice || "",
      message: body.message || "Clique para WhatsApp",
      referrer: referrer,
      device: device,
      userAgent: userAgent,
      status: "Novo",
      notes: body.notes || ""
    });

    return NextResponse.json({ success: true, lead: newLead }, { status: 201 });
  } catch (error) {
    console.error("API POST Lead erro:", error);
    return NextResponse.json({ success: false, error: "Falha ao gravar lead" }, { status: 500 });
  }
}
