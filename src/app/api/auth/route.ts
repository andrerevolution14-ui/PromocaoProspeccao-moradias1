import { NextResponse } from "next/server";
import { SITE_CONFIG } from "@/lib/config";

export async function POST(request: Request) {
  try {
    const { username, email, password, pin } = await request.json();

    const inputUser = (username || email || "").toLowerCase().trim();
    const inputPass = String(password || pin || "").trim();

    // Credenciais solicitadas: nome: andre | pass: 2005
    const isUserValid =
      inputUser === "andre" ||
      inputUser === "andre@grupofreitasrenovacoes.pt" ||
      inputUser === SITE_CONFIG.adminCredentials.username.toLowerCase() ||
      inputUser === SITE_CONFIG.adminCredentials.email.toLowerCase();

    const isPassValid =
      inputPass === "2005" ||
      inputPass === SITE_CONFIG.adminCredentials.password ||
      inputPass === SITE_CONFIG.adminCredentials.pin;

    if (isUserValid && isPassValid) {
      const response = NextResponse.json({
        success: true,
        user: { name: "André", username: "andre" }
      });

      // Definir cookie seguro de autenticação
      response.cookies.set("gf_admin_auth", "authenticated_andre_2005", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7 // 7 dias
      });

      return response;
    }

    return NextResponse.json({ success: false, error: "Nome de utilizador ou senha incorretos." }, { status: 401 });
  } catch (error) {
    console.error("API Auth erro:", error);
    return NextResponse.json({ success: false, error: "Erro de autenticação" }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true, message: "Sessão terminada" });
  response.cookies.delete("gf_admin_auth");
  return response;
}
