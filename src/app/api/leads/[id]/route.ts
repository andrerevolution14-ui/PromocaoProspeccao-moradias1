import { NextResponse } from "next/server";
import { updateLead, deleteLead } from "@/lib/leads-store";

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    const updated = await updateLead(id, {
      status: body.status,
      notes: body.notes
    });

    if (!updated) {
      return NextResponse.json({ success: false, error: "Lead não encontrada" }, { status: 404 });
    }

    return NextResponse.json({ success: true, lead: updated });
  } catch (error) {
    console.error("API PATCH Lead erro:", error);
    return NextResponse.json({ success: false, error: "Falha ao atualizar lead" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const deleted = await deleteLead(id);

    if (!deleted) {
      return NextResponse.json({ success: false, error: "Lead não encontrada" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Lead eliminada com sucesso" });
  } catch (error) {
    console.error("API DELETE Lead erro:", error);
    return NextResponse.json({ success: false, error: "Falha ao eliminar lead" }, { status: 500 });
  }
}
