"use client";

import React from "react";
import Link from "next/link";
import { MessageCircle, ShieldCheck, CheckCircle2, Lock, ArrowUp, ExternalLink } from "lucide-react";
import { trackAndOpenWhatsApp } from "@/lib/tracking";
import { SITE_CONFIG } from "@/lib/config";

export default function FinalCTA() {
  const handleFinalWhatsApp = () => {
    trackAndOpenWhatsApp({
      ctaOrigin: "Rodapé Final (Botão Principal)",
      customMessage: SITE_CONFIG.defaultWhatsAppMessage
    });
  };

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#1C1917] text-[#F5EFEB] pt-20 pb-12 relative overflow-hidden border-t-4 border-[#B45309]">
      
      {/* Background radial highlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-80 bg-gradient-to-b from-[#B45309]/20 to-transparent blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Pre-title & Headline */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B45309]/20 border border-[#B45309]/40 text-[#F59E0B] text-xs font-bold uppercase tracking-wider mb-6">
          <CheckCircle2 className="w-4 h-4" />
          <span>Fase Ativa de Aquisições • Distrito de Aveiro</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight max-w-3xl mx-auto">
          Tem um Terreno que Cumpre os Nossos Requisitos?
        </h2>

        <p className="mt-5 text-base sm:text-lg text-[#D6D3D1] max-w-2xl mx-auto leading-relaxed">
          Proprietários e mediadores: não deixe o seu projeto parado no papel. Fale diretamente com quem tem capital próprio pronto para avançar com CPCV e escritura célere.
        </p>

        {/* Big Final Main CTA Button */}
        <div className="mt-10 max-w-xl mx-auto space-y-4">
          <button
            onClick={handleFinalWhatsApp}
            className="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20BD5A] text-white py-5 px-8 rounded-2xl font-black text-lg sm:text-xl shadow-2xl hover:shadow-[0_0_40px_rgba(37,211,102,0.4)] hover:-translate-y-1 transition-all duration-300 active:translate-y-0"
          >
            <MessageCircle className="w-7 h-7 fill-white shrink-0" />
            <span>📲 Tenho o Terreno Ideal. Quero Enviar o Projeto.</span>
          </button>

          <div className="flex items-center justify-center gap-4 text-xs text-[#A8A29E]">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
              Confidencialidade Rigorosa
            </span>
            <span>•</span>
            <span>Resposta em 48 Horas</span>
            <span>•</span>
            <span>Zero Comissões (0%)</span>
          </div>
        </div>

        {/* Geographic Focus Badges */}
        <div className="mt-14 pt-10 border-t border-white/10 flex flex-wrap items-center justify-center gap-2 text-xs text-[#A8A29E]">
          <span className="font-bold text-white mr-2">Foco Geográfico:</span>
          {SITE_CONFIG.locations.map((loc) => (
            <span key={loc} className="bg-white/5 border border-white/10 px-3 py-1 rounded-full">
              {loc}
            </span>
          ))}
        </div>

        {/* Footer Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-[#A8A29E]">
          
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span className="font-bold text-white">Grupo Freitas Renovações</span>
            <span>•</span>
            <span>Aveiro, Portugal</span>
            <span>•</span>
            <a
              href="https://grupofreitasrenovacoes.pt/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors underline flex items-center gap-1"
            >
              grupofreitasrenovacoes.pt <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="/dashboard/login"
              className="text-[#78716C] hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Área Reservada (André)</span>
            </Link>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Voltar ao Topo"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        <div className="mt-6 text-[11px] text-[#78716C]">
          © {new Date().getFullYear()} Grupo Freitas Renovações. Todos os direitos reservados. Todas as propostas estão sujeitas a validação técnica de engenharia e conformidade jurídica.
        </div>

      </div>
    </footer>
  );
}
