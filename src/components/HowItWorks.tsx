"use client";

import React from "react";
import { MessageSquare, Calculator, FileSignature, ArrowRight, CheckCircle2, MessageCircle } from "lucide-react";
import { trackAndOpenWhatsApp } from "@/lib/tracking";

export default function HowItWorks() {
  const handleCTA = () => {
    trackAndOpenWhatsApp({
      ctaOrigin: "Passos Como Funciona",
      customMessage: "Olá André, gostaria de avançar com o Passo 1 e enviar a planta em PDF do meu terreno com projeto em Aveiro."
    });
  };

  const steps = [
    {
      number: "01",
      title: "Envio via WhatsApp",
      subtitle: "3 coisas simples e sem papeladas chatas",
      icon: MessageSquare,
      color: "from-[#B45309] to-[#D97706]",
      items: [
        "Planta do projeto de arquitetura (ficheiro PDF)",
        "Localização exata (pino do Google Maps)",
        "Valor pretendido para a venda do terreno"
      ],
      description: "Envia tudo diretamente no WhatsApp do André. Demora menos de 2 minutos do seu telemóvel."
    },
    {
      number: "02",
      title: "Análise Técnica em 48h",
      subtitle: "A nossa equipa de engenharia faz as contas",
      icon: Calculator,
      color: "from-[#1C1917] to-[#44403C]",
      items: [
        "Cruzamento do projeto com modelo de custos reais",
        "Verificação da implantação e viabilidade construtiva",
        "Cálculo da margem e valor máximo de aquisição"
      ],
      description: "Não andamos a adivinhar. Temos modelos matemáticos próprios que nos dizem em 48 horas se o negócio avança."
    },
    {
      number: "03",
      title: "Proposta Firme e CPCV",
      subtitle: "Negócio fechado e dinheiro garantido",
      icon: FileSignature,
      color: "from-[#15803D] to-[#16A34A]",
      items: [
        "Apresentação de proposta de compra sem rodeios",
        "Assinatura imediata de Contrato-Promessa (CPCV)",
        "Pagamento de sinal com fundos próprios disponíveis",
        "Marcação rápida de escritura pública"
      ],
      description: "Se o preço estiver alinhado, assinamos logo o contrato com sinal no banco. Sem depender de empréstimos bancários."
    }
  ];

  return (
    <section id="como-funciona" className="py-16 sm:py-24 bg-[#F8F5EE] border-t border-[#E7DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B45309]/10 text-[#B45309] text-xs font-bold uppercase tracking-wider mb-3">
            <CheckCircle2 className="w-3.5 h-3.5" /> Processo Direto e Transparente
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1C1917] tracking-tight">
            Como Funciona o Nosso Processo em 3 Passos
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#57534E] leading-relaxed">
            Sem reuniões intermináveis, sem intermediários a cobrar percentagens e sem surpresas de última hora:
          </p>
        </div>

        {/* 3 Step Cards with Connectors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative bg-white rounded-3xl p-7 sm:p-8 border border-[#E7DFD5] shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Step Pill */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl font-black text-[#D4C7B5]">
                    {step.number}
                  </span>
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${step.color} text-white flex items-center justify-center shadow-md`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#1C1917] mb-1">
                    {step.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#B45309] uppercase tracking-wide mb-4">
                    {step.subtitle}
                  </p>
                  
                  <p className="text-xs sm:text-sm text-[#57534E] mb-5 leading-relaxed">
                    {step.description}
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-[#F5EFEB]">
                    <span className="text-[11px] font-bold uppercase text-[#78716C] tracking-wider block">
                      O que acontece aqui:
                    </span>
                    {step.items.map((it, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-[#292524] font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#15803D] shrink-0 mt-0.5" />
                        <span>{it}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#F5EFEB] flex items-center justify-between text-xs text-[#78716C]">
                  <span>Passo {idx + 1} de 3</span>
                  <span className="font-bold text-[#1C1917]">100% Digital & Direto</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Bar below steps */}
        <div className="mt-12 text-center">
          <button
            onClick={handleCTA}
            className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20BD5A] text-white px-8 py-4 sm:py-5 rounded-2xl font-black text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all active:scale-95"
          >
            <MessageCircle className="w-6 h-6 fill-white" />
            <span>Dar o Passo 1: Enviar Projeto no WhatsApp</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}
