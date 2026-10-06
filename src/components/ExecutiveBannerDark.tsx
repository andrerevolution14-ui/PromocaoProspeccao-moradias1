"use client";

import React from "react";
import { ShieldCheck, Zap, TrendingUp, CheckCircle, ArrowRight, Building, Award } from "lucide-react";
import { trackAndOpenWhatsApp } from "@/lib/tracking";

export default function ExecutiveBannerDark() {
  const handleBannerWhatsApp = () => {
    trackAndOpenWhatsApp({
      ctaOrigin: "Faixa Executiva Escura/Laranja",
      customMessage: "Olá André, vi que têm capital próprio e compraram mais de 3 terrenos em Aveiro recentemente. Tenho um terreno com projeto para vos apresentar."
    });
  };

  return (
    <section className="bg-[#1C1917] text-white py-12 sm:py-16 relative overflow-hidden border-y-2 border-[#B45309]/30">
      
      {/* Radiant Orange / Amber Glows */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-[#D97706]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#B45309]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Tag */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B45309] text-white text-xs font-black uppercase tracking-wider shadow-md">
            <Award className="w-4 h-4 fill-white" />
            <span>Histórico Real Comprovado • Aveiro</span>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-[#F59E0B]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E] animate-pulse" />
            <span>Fundos Próprios Alocados para Aquisição este Mês</span>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8 space-y-4">
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Mais de <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F59E0B] via-[#D97706] to-[#FBBF24]">3 Terrenos com Projeto Comprados</span> nos Últimos 6 Meses.
            </h2>
            
            <p className="text-sm sm:text-base text-[#D6D3D1] leading-relaxed max-w-2xl">
              Não somos uma imobiliária à procura de angariações nem intermediários à espera de financiamento bancário. Somos <strong>construtores e investidores diretos</strong> do Grupo Freitas. Quando o projeto cumpre os critérios técnicos, avançamos imediatamente para CPCV com sinal garantido.
            </p>

            {/* 3 Metric Pills with Warm Amber Accents */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xs">
                <div className="text-2xl sm:text-3xl font-black text-[#F59E0B]">48 Horas</div>
                <div className="text-xs text-[#A8A29E] font-medium mt-1">Tempo máximo para resposta técnica e proposta firme.</div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xs">
                <div className="text-2xl sm:text-3xl font-black text-white">0% Comissões</div>
                <div className="text-xs text-[#A8A29E] font-medium mt-1">Negócio 100% direto. O valor acordado é o valor líquido recebido.</div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xs">
                <div className="text-2xl sm:text-3xl font-black text-[#22C55E]">100% Sinal</div>
                <div className="text-xs text-[#A8A29E] font-medium mt-1">Assinatura de CPCV com pagamento imediato de sinal.</div>
              </div>
            </div>
          </div>

          {/* Right Action Box */}
          <div className="lg:col-span-4 bg-gradient-to-b from-[#292524] to-[#1C1917] p-6 sm:p-7 rounded-3xl border-2 border-[#B45309]/50 shadow-2xl text-center space-y-4">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#F59E0B] block">
              ● Janela de Aquisição Ativa
            </span>
            <div className="text-xl font-black text-white">
              Tem um terreno elegível num raio de 15 km de Aveiro?
            </div>
            <p className="text-xs text-[#A8A29E] leading-relaxed">
              Aceitamos propostas de proprietários e mediadores em Aveiro Centro, Santa Joana, Esgueira, Aradas e concelhos vizinhos.
            </p>
            <button
              onClick={handleBannerWhatsApp}
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white py-3.5 px-5 rounded-xl font-black text-sm shadow-lg hover:shadow-2xl transition-all"
            >
              <span>Apresentar Terreno ao André</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
