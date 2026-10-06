"use client";

import React from "react";
import Image from "next/image";
import { MessageCircle, Clock, ShieldCheck, Banknote, Sparkles, MapPin, CheckCircle2 } from "lucide-react";
import { trackAndOpenWhatsApp } from "@/lib/tracking";
import { SITE_CONFIG } from "@/lib/config";

export default function Hero() {
  const handleMainCTA = () => {
    trackAndOpenWhatsApp({
      ctaOrigin: "Hero Main CTA",
      customMessage: SITE_CONFIG.defaultWhatsAppMessage
    });
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-20 bg-gradient-to-b from-[#FDFBF7] via-[#F8F4EE] to-[#F3ECE1]">
      
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#D4C7B5_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Badges: Pre-title & 3 Terrenos Comprados */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B45309]/10 border border-[#B45309]/20 text-[#B45309] text-xs sm:text-sm font-bold tracking-wider uppercase shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>INVESTIDORES / CONSTRUTORES COMPRAM DIRETAMENTE</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1C1917] text-white text-xs font-bold shadow-xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" />
            <span>+3 Terrenos com Projeto Comprados nos Últimos 6 Meses</span>
          </div>
        </div>

        {/* Main Title & Subtitle */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#1C1917] leading-[1.12]">
            Tem um Terreno com Projeto em Aveiro?{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B45309] via-[#D97706] to-[#92400E]">
              Compramos, Assinamos CPCV e Escrituramos Rápido.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-[#57534E] leading-relaxed max-w-3xl mx-auto font-normal">
            Procuramos terrenos com <strong>projeto aprovado (ou PIP)</strong> em <strong>Aveiro Centro e freguesias num raio de 10 a 15 km</strong> (Santa Joana, Esgueira, Aradas, Oliveirinha, Ílhavo, Cacia e arredores). Avaliamos a viabilidade em <strong>48 horas</strong>. Venda direta, dinheiro rápido e <strong>zero comissões de imobiliárias</strong>.
          </p>
        </div>

        {/* Main Single CTA Button - Limpo, Direto e de Alta Conversão */}
        <div className="mt-8 sm:mt-10 flex flex-col items-center justify-center gap-2.5 max-w-md mx-auto">
          <button
            onClick={handleMainCTA}
            className="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20BD5A] text-white py-4.5 sm:py-5 px-8 rounded-2xl font-black text-lg sm:text-xl shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
          >
            <MessageCircle className="w-6 h-6 fill-white shrink-0" />
            <span>Falar com o André no WhatsApp</span>
          </button>
          <p className="text-xs text-center text-[#78716C] font-semibold">
            ⚡ Resposta direta pelo construtor em menos de 48 horas
          </p>
        </div>

        {/* 4 Trust Value Badges */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
          <div className="bg-white/90 backdrop-blur-sm border border-[#E7DFD5] rounded-2xl p-3.5 sm:p-4 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#FEF3C7] text-[#B45309] flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase text-[#78716C] tracking-wide">Decisão Rápida</div>
              <div className="text-sm font-extrabold text-[#1C1917]">Resposta em 48 Horas</div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm border border-[#E7DFD5] rounded-2xl p-3.5 sm:p-4 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#DCFCE7] text-[#15803D] flex items-center justify-center shrink-0">
              <Banknote className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase text-[#78716C] tracking-wide">Sem Intermediários</div>
              <div className="text-sm font-extrabold text-[#1C1917]">Zero Comissões (0%)</div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm border border-[#E7DFD5] rounded-2xl p-3.5 sm:p-4 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#E0E7FF] text-[#4338CA] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase text-[#78716C] tracking-wide">Solidez Financeira</div>
              <div className="text-sm font-extrabold text-[#1C1917]">Capital Próprio Garantido</div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm border border-[#E7DFD5] rounded-2xl p-3.5 sm:p-4 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#FFEDD5] text-[#C2410C] flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase text-[#78716C] tracking-wide">Foco Regional</div>
              <div className="text-sm font-extrabold text-[#1C1917]">Aveiro e Raio 15km</div>
            </div>
          </div>
        </div>

        {/* Hero Visual Banner (Plot of land with approved project overlay) */}
        <div className="mt-10 sm:mt-12 relative rounded-3xl overflow-hidden border border-[#D4C7B5] shadow-2xl bg-[#1C1917]">
          <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full">
            <Image
              src="/images/hero-terreno.jpg"
              alt="Terreno com projeto aprovado em Aveiro - Compra direta Grupo Freitas"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
            
            {/* Live Floating Badge over Hero Image */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto max-w-md bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/40 shadow-xl">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B45309]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-ping" />
                Compra Ativa neste momento
              </div>
              <div className="text-sm sm:text-base font-extrabold text-[#1C1917] mt-1">
                Aveiro Centro • Santa Joana • Esgueira • Cacia • Aradas • Oliveirinha • Ílhavo
              </div>
              <div className="text-xs text-[#78716C] mt-1">
                Mais de 3 terrenos adquiridos nos últimos 6 meses. Capital próprio disponível para fechar CPCV este mês.
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
