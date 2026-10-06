import { NextResponse } from "next/server";
import { getLeads } from "@/lib/leads-store";

export async function GET() {
  try {
    const leads = await getLeads();

    // Cabeçalhos CSV em Português
    const headers = [
      "ID",
      "Data e Hora",
      "Origem",
      "Botão / Gatilho",
      "Perfil",
      "Localização Terreno",
      "Valor Pretendido",
      "Mensagem / Conteúdo",
      "Estado",
      "Dispositivo",
      "Referência / Link",
      "Notas Internas"
    ];

    const escapeCsv = (val: string | undefined | null) => {
      if (!val) return '""';
      const clean = String(val).replace(/"/g, '""');
      return `"${clean}"`;
    };

    const rows = leads.map(l => {
      const dateStr = new Date(l.timestamp).toLocaleString("pt-PT", {
        timeZone: "Europe/Lisbon"
      });
      return [
        escapeCsv(l.id),
        escapeCsv(dateStr),
        escapeCsv(l.source),
        escapeCsv(l.ctaOrigin),
        escapeCsv(l.role || "N/A"),
        escapeCsv(l.location || "N/A"),
        escapeCsv(l.askingPrice || "N/A"),
        escapeCsv(l.message),
        escapeCsv(l.status),
        escapeCsv(l.device),
        escapeCsv(l.referrer),
        escapeCsv(l.notes || "")
      ].join(";"); // Ponto e vírgula é padrão europeu para Excel em Portugal
    });

    // UTF-8 BOM (\uFEFF) para garantir caracteres acentuados no Excel
    const csvContent = "\uFEFF" + headers.join(";") + "\n" + rows.join("\n");

    const dateSlug = new Date().toISOString().slice(0, 10);
    const filename = `leads-terrenos-aveiro-${dateSlug}.csv`;

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`
      }
    });
  } catch (error) {
    console.error("API CSV Export erro:", error);
    return NextResponse.json({ success: false, error: "Falha ao exportar CSV" }, { status: 500 });
  }
}
