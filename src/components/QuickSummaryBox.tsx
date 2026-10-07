"use client";

import React, { useState } from "react";
import { FileText, MapPin, Euro, MessageCircle, Zap, ShieldCheck } from "lucide-react";
import { trackAndOpenWhatsApp } from "@/lib/tracking";
import LeadModal from "@/components/LeadModal";

export default function QuickSummaryBox() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleQuickCTA = () => {
    trackAndOpenWhatsApp({
      ctaOrigin: "Caixa Resumo Rápido",
      customMessage: "Olá André, tenho os 3 pontos prontos (Planta PDF + Localização Maps + Preço). Gostaria de enviar para análise em 48h."
    });
  };

  return (
    <section className="py-12 sm:py-16 bg-[#1C1917] text-white relative overflow-hidden">
      
      {/* Subtle Glow Background */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#B45309]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#D97706]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main High Contrast Container */}
        <div className="bg-gradient-to-br from-[#292524] to-[#1C1917] border-2 border-[#B45309]/50 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
          
          {/* Top Tag */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B45309] text-white text-xs font-black uppercase tracking-wider shadow-sm">
              <Zap className="w-4 h-4 fill-white" />
              <span>Resumo Rápido • Sem Perda de Tempo</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#D6D3D1] font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
              <span>100% Confidencial</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Explanation & 3 Points */}
            <div className="lg:col-span-7 space-y-4">
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
                O Que Precisamos Para Lhe Fazer Uma Proposta em 48 Horas:
              </h3>
              <p className="text-sm sm:text-base text-[#D6D3D1] leading-relaxed">
                Não precisa de relatórios complicados nem reuniões presenciais. Só precisamos destes <strong>3 dados simples</strong> no WhatsApp:
              </p>

              {/* 3 High Contrast Items */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3.5 bg-black/40 border border-white/10 p-3.5 rounded-2xl">
                  <div className="w-10 h-10 rounded-xl bg-[#B45309] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase font-bold text-[#F59E0B] tracking-wide">Ponto 1</div>
                    <div className="text-sm sm:text-base font-bold text-white">Planta do Projeto em PDF</div>
                    <div className="text-xs text-[#A8A29E]">Ficheiro da arquitetura aprovada com implantação e áreas.</div>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 bg-black/40 border border-white/10 p-3.5 rounded-2xl">
                  <div className="w-10 h-10 rounded-xl bg-[#B45309] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase font-bold text-[#F59E0B] tracking-wide">Ponto 2</div>
                    <div className="text-sm sm:text-base font-bold text-white">Localização Exata (Pino do Google Maps)</div>
                    <div className="text-xs text-[#A8A29E]">Para vermos os acessos, a rua e a orientação solar do lote.</div>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 bg-black/40 border border-white/10 p-3.5 rounded-2xl">
                  <div className="w-10 h-10 rounded-xl bg-[#B45309] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Euro className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase font-bold text-[#F59E0B] tracking-wide">Ponto 3</div>
                    <div className="text-sm sm:text-base font-bold text-white">Valor Pretendido para a Venda</div>
                    <div className="text-xs text-[#A8A29E]">O valor líquido que o proprietário pretende receber.</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Anchored Frictionless CTA Action */}
            <div className="lg:col-span-5 bg-black/50 border border-white/15 p-6 sm:p-7 rounded-2xl text-center flex flex-col justify-between space-y-6">
              <div className="space-y-2">
                <span className="text-xs uppercase font-extrabold tracking-widest text-[#22C55E] block">
                  ● Linha Direta com o André
                </span>
                <div className="text-xl font-black text-white">
                  Envie Agora e Receba Resposta em 48 Horas
                </div>
                <p className="text-xs text-[#A8A29E] leading-relaxed">
                  Sem intermediários. Venda direta ao construtor. Assinatura de CPCV com sinal garantido.
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleQuickCTA}
                  className="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20BD5A] text-white py-4 sm:py-5 px-6 rounded-2xl font-black text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all active:scale-[0.98]"
                >
                  <MessageCircle className="w-6 h-6 fill-white shrink-0" />
                  <span>💬 Enviar estes 3 dados no WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="w-full text-center text-xs text-[#F59E0B] hover:text-[#FBBF24] underline decoration-white/20 py-1 transition-colors"
                >
                  Ou preencher formulário rápido no site ↗
                </button>
              </div>

              {/* Modal de Lead */}
              <LeadModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                ctaOrigin="Caixa Resumo Formulário"
              />

              <div className="text-[11px] text-[#A8A29E] pt-2 border-t border-white/10">
                🔒 Total confidencialidade garantida pela equipa técnica do Grupo Freitas.
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
