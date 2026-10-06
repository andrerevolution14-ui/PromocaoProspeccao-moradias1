"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, User, ArrowRight, ShieldCheck, KeyRound } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      if (data.success) {
        router.push("/dashboard");
      } else {
        setError(data.error || "Credenciais inválidas");
      }
    } catch {
      setError("Erro ao contactar o servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col justify-center items-center px-4 py-12">
      <div className="w-full max-w-md">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-xl bg-[#1C1917] flex items-center justify-center text-[#F5EFEB] font-black text-xl shadow-md">
              GF
            </div>
            <span className="font-extrabold text-xl text-[#1C1917] tracking-tight">
              GRUPO FREITAS
            </span>
          </Link>
          <h1 className="text-2xl font-black text-[#1C1917] tracking-tight">
            Área Reservada (André)
          </h1>
          <p className="text-sm text-[#78716C] mt-1">
            Acesso privado e restrito para gestão de oportunidades e leads.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl p-8 border border-[#E7DFD5] shadow-xl">
          
          <div className="flex items-center gap-2 mb-6 px-3.5 py-2 rounded-xl bg-[#F5EFEB] text-xs font-bold text-[#57534E]">
            <Lock className="w-3.5 h-3.5 text-[#B45309]" />
            <span>Autenticação Obrigatória de Segurança</span>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-medium text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#44403C] mb-1.5">
                Nome de Utilizador
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="andre"
                  required
                  autoCapitalize="none"
                  className="w-full bg-[#FAF8F5] border border-[#E7DFD5] rounded-xl py-3 pl-10 pr-4 text-sm font-semibold text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#B45309]/50"
                />
                <User className="w-4 h-4 text-[#A8A29E] absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#44403C] mb-1.5">
                Palavra-passe
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••"
                  required
                  className="w-full bg-[#FAF8F5] border border-[#E7DFD5] rounded-xl py-3 pl-10 pr-4 text-sm font-semibold text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#B45309]/50 tracking-wider"
                />
                <KeyRound className="w-4 h-4 text-[#A8A29E] absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-[#1C1917] hover:bg-[#292524] text-white py-3.5 px-4 rounded-xl font-bold text-sm shadow-md transition-all disabled:opacity-60 mt-2"
            >
              <span>{loading ? "A autenticar..." : "Entrar no Painel Privado"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-[#F5EFEB] flex items-center justify-between text-xs text-[#78716C]">
            <Link href="/" className="hover:text-[#1C1917]">
              ← Voltar à Landing Page
            </Link>
            <span className="flex items-center gap-1 text-[#15803D]">
              <ShieldCheck className="w-3.5 h-3.5" /> Acesso Protegido
            </span>
          </div>

        </div>

      </div>
    </div>
  );
}
