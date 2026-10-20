"use client";

import React from "react";
import { Building2, HandCoins, Clock, ShieldCheck, MessageCircle, ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config";
import { scrollToLeadForm, trackAndOpenWhatsApp } from "@/lib/tracking";

/**
 * Secção para mediadores / consultores imobiliários.
 * "Zero comissões" é só para o proprietário; os mediadores recebem comissão de referência.
 */
export default function ForMediators() {
  const commission = SITE_CONFIG.mediatorCommissionLabel;

  const handleWhatsApp = () => {
    trackAndOpenWhatsApp({
      ctaOrigin: "Secção Mediadores (WhatsApp)",
      customMessage: "Olá, sou mediador imobiliário e tenho um terreno com projeto na zona de Aveiro que vos pode interessar."
    });
  };

  return (
    <section id="mediadores" className="py-16 sm:py-20 bg-[#1C1917] text-white relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#B45309]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#D97706]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#292524] to-[#1C1917] border-2 border-[#B45309]/50 rounded-3xl p-6 sm:p-10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B45309] text-white text-xs font-black uppercase tracking-wider shadow-sm mb-5">
              <Building2 className="w-4 h-4" />
              <span>Para mediadores e consultores</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              Tem um cliente com terreno?{" "}
              <span className="text-[#F59E0B]">Pagamos comissão de referência.</span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#D6D3D1] leading-relaxed">
              O proprietário não paga comissão. O mediador que nos apresenta o negócio é pago por nós
              {commission ? <> (<strong className="text-white">{commission}</strong>)</> : null}, com tudo acordado por escrito antes de avançarmos.
            </p>

            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { icon: HandCoins, t: "Comissão garantida", d: "Acordada por escrito" },
                { icon: Clock, t: "Resposta em 48h", d: "Sem fazer o cliente esperar" },
                { icon: ShieldCheck, t: "Cliente protegido", d: "Não contornamos o mediador" }
              ].map(({ icon: Icon, t, d }) => (
                <li key={t} className="flex items-start gap-3 bg-black/40 border border-white/10 p-3.5 rounded-2xl">
                  <span className="w-9 h-9 rounded-xl bg-[#B45309] text-white flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4" />
                  </span>
                  <span>
                    <span className="block text-sm font-bold">{t}</span>
                    <span className="block text-xs text-[#A8A29E]">{d}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5 bg-black/50 border border-white/15 p-6 sm:p-7 rounded-2xl text-center space-y-4">
            <div className="text-lg font-black">Apresente-nos o terreno</div>
            <p className="text-xs text-[#A8A29E]">
              Use o mesmo formulário e assinale <strong className="text-white">&quot;Sou mediador&quot;</strong> no último passo.
            </p>
            <button
              id="mediators-form-cta"
              onClick={scrollToLeadForm}
              className="w-full inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#B45309] to-[#D97706] text-white py-4 px-6 rounded-2xl font-black text-base shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all"
            >
              Indicar um terreno <ArrowRight className="w-5 h-5" />
            </button>
            <button
              id="mediators-whatsapp"
              onClick={handleWhatsApp}
              className="w-full inline-flex items-center justify-center gap-2 text-sm text-[#D6D3D1] hover:text-white transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" /> Ou fale connosco no WhatsApp
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
