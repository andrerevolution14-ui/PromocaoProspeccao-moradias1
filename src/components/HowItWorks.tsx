"use client";

import React from "react";
import { ClipboardList, PhoneCall, FileSignature, ArrowRight, CheckCircle2 } from "lucide-react";
import { scrollToLeadForm } from "@/lib/tracking";

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Responde a 4 perguntas",
      subtitle: "30 segundos, no telemóvel",
      icon: ClipboardList,
      color: "from-[#B45309] to-[#D97706]",
      items: ["Freguesia do terreno", "Se tem projeto ou PIP", "Área aproximada", "Nome e telemóvel"],
      description: "Sem documentos, sem preço, sem compromisso."
    },
    {
      number: "02",
      title: "Nós contactamos",
      subtitle: "Em menos de 48 horas",
      icon: PhoneCall,
      color: "from-[#1C1917] to-[#44403C]",
      items: [
        "Telefonema ou WhatsApp",
        "Pedimos a planta e a localização",
        "Analisamos a viabilidade connosco"
      ],
      description: "Somos nós que pedimos o que for preciso. Não tem de preparar nada."
    },
    {
      number: "03",
      title: "Proposta e CPCV",
      subtitle: "Negócio fechado com sinal",
      icon: FileSignature,
      color: "from-[#15803D] to-[#16A34A]",
      items: [
        "Proposta firme por escrito",
        "CPCV com sinal (capital próprio)",
        "Escritura marcada rapidamente"
      ],
      description: "Sem depender de crédito bancário. Sem comissões para o proprietário."
    }
  ];

  return (
    <section id="como-funciona" className="py-16 sm:py-24 bg-[#F8F5EE] border-t border-[#E7DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B45309]/10 text-[#B45309] text-xs font-bold uppercase tracking-wider mb-3">
            <CheckCircle2 className="w-3.5 h-3.5" /> Simples e direto
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1C1917] tracking-tight">Como funciona</h2>
          <p className="mt-4 text-base sm:text-lg text-[#57534E] leading-relaxed">
            O primeiro passo é seu e demora 30 segundos. O resto é connosco.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative bg-white rounded-3xl p-7 sm:p-8 border border-[#E7DFD5] shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl font-black text-[#D4C7B5]">{step.number}</span>
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${step.color} text-white flex items-center justify-center shadow-md`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#1C1917] mb-1">{step.title}</h3>
                <p className="text-xs font-semibold text-[#B45309] uppercase tracking-wide mb-4">{step.subtitle}</p>
                <p className="text-sm text-[#57534E] mb-5 leading-relaxed">{step.description}</p>
                <div className="space-y-2.5 pt-4 border-t border-[#F5EFEB] mt-auto">
                  {step.items.map((it) => (
                    <div key={it} className="flex items-start gap-2 text-sm text-[#292524] font-medium">
                      <CheckCircle2 className="w-4 h-4 text-[#15803D] shrink-0 mt-0.5" />
                      <span>{it}</span>
                    </div>
                  ))}
                </div>
                {idx < steps.length - 1 && (
                  <div className="hidden md:flex absolute top-1/2 -right-5 z-10 w-8 h-8 rounded-full bg-white border border-[#E7DFD5] items-center justify-center shadow-sm">
                    <ArrowRight className="w-4 h-4 text-[#B45309]" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <button
            id="howitworks-cta"
            onClick={scrollToLeadForm}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-[#B45309] to-[#D97706] text-white px-8 py-4 sm:py-5 rounded-2xl font-black text-base sm:text-lg shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all active:scale-95"
          >
            <span>Começar: 4 perguntas rápidas</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
