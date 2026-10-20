"use client";

import React from "react";
import Image from "next/image";
import { MessageCircle, Clock, Banknote, MapPin, CheckCircle2, ShieldCheck } from "lucide-react";
import { trackAndOpenWhatsApp } from "@/lib/tracking";
import { SITE_CONFIG } from "@/lib/config";
import LeadForm from "@/components/LeadForm";
import GoogleRatingBadge from "@/components/GoogleRatingBadge";

export default function Hero() {
  const handleWhatsApp = () => {
    trackAndOpenWhatsApp({
      ctaOrigin: "Hero (WhatsApp secundário)",
      customMessage: SITE_CONFIG.defaultWhatsAppMessage
    });
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-14 md:pt-14 md:pb-20 bg-gradient-to-b from-[#FDFBF7] via-[#F8F4EE] to-[#F3ECE1]">
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#D4C7B5_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full bg-[#F59E0B]/10 blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Coluna esquerda — mensagem */}
          <div className="lg:col-span-6 text-center lg:text-left">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-5">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1C1917] text-white text-xs font-bold shadow-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" />
                <span>+3 terrenos comprados último mês</span>
              </div>
              <GoogleRatingBadge />
            </div>

            <h1 className="text-[2.1rem] sm:text-5xl lg:text-[3.25rem] font-black tracking-tight text-[#1C1917] leading-[1.08]">
              Aprovou o projeto mas não vai construir?{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B45309] via-[#D97706] to-[#92400E]">
                Compramos já, com CPCV este mês.
              </span>
            </h1>

            <p className="mt-4 text-lg sm:text-2xl font-bold text-[#44403C]">
              Precisa de vender rápido e sem complicações em Aveiro?
            </p>

            <p className="mt-3 text-base text-[#57534E] leading-relaxed max-w-xl mx-auto lg:mx-0">
              Somos construtores com <strong>capital próprio disponível</strong>. Sem visitas intermináveis, sem intermediários e com <strong>0% de comissões</strong> para o proprietário. Diga-nos onde fica e receba proposta formal em 48h.
            </p>

            {/* Trust points */}
            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-2.5 max-w-xl mx-auto lg:mx-0 text-left">
              {[
                { icon: Clock, title: "Resposta em 48h", color: "bg-[#FEF3C7] text-[#B45309]" },
                { icon: Banknote, title: "0% comissão para o proprietário", color: "bg-[#DCFCE7] text-[#15803D]" },
                { icon: MapPin, title: "Aveiro e raio de 15 km", color: "bg-[#FFEDD5] text-[#C2410C]" }
              ].map(({ icon: Icon, title, color }) => (
                <li
                  key={title}
                  className="flex items-center gap-2.5 bg-white/80 backdrop-blur-sm border border-[#E7DFD5] rounded-xl px-3 py-2.5 shadow-xs"
                >
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${color}`}>
                    <Icon className="w-4 h-4" />
                  </span>
                  <span className="text-xs font-bold text-[#1C1917] leading-snug">{title}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna direita — formulário */}
          <div className="lg:col-span-6">
            <div
              id="avaliar"
              className="scroll-mt-28 relative bg-white rounded-3xl border border-[#E7DFD5] shadow-[0_20px_60px_-15px_rgba(120,53,15,0.25)] p-5 sm:p-7"
            >
              <div className="absolute -top-3 left-6 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#B45309] to-[#D97706] px-3 py-1 text-[11px] font-black uppercase tracking-wider text-white shadow-md">
                <ShieldCheck className="w-3.5 h-3.5" /> 30 segundos • sem compromisso
              </div>
              <div className="pt-2">
                <LeadForm ctaOrigin="Hero Formulário" />
              </div>
            </div>

            <div className="mt-4 text-center">
              <button
                type="button"
                id="hero-whatsapp"
                onClick={handleWhatsApp}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#57534E] hover:text-[#15803D] transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                Prefere WhatsApp? <span className="underline decoration-[#D4C7B5] underline-offset-2">Fale connosco</span>
              </button>
            </div>
          </div>
        </div>

        {/* Hero Visual Banner */}
        <div className="mt-12 sm:mt-16 relative rounded-3xl overflow-hidden border border-[#D4C7B5] shadow-2xl bg-[#1C1917]">
          <div className="relative aspect-[16/9] sm:aspect-[21/8] w-full">
            <Image
              src="/images/hero-terreno.jpg"
              alt="Terreno com projeto aprovado em Aveiro - Compra direta Grupo Freitas"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto max-w-md bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/40 shadow-xl">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B45309]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-ping" />
                A comprar neste momento
              </div>
              <div className="text-sm sm:text-base font-extrabold text-[#1C1917] mt-1">
                Aveiro Centro • Santa Joana • Esgueira • Cacia • Aradas • Oliveirinha • Ílhavo
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
