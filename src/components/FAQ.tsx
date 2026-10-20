"use client";

import React from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { scrollToLeadForm } from "@/lib/tracking";

const FAQS: { q: string; a: React.ReactNode }[] = [
  {
    q: "Preciso de ter a planta ou o projeto em PDF para começar?",
    a: "Não. Basta responder às 4 perguntas do formulário. Se o terreno nos interessar, somos nós que lhe pedimos a planta e a localização depois, por telefone ou WhatsApp."
  },
  {
    q: "Tenho de dizer logo o preço que quero?",
    a: "Não. Falamos de valores só depois de vermos o projeto. Apresentamos sempre uma proposta firme, por escrito."
  },
  {
    q: "O meu projeto ainda não está aprovado. Vale a pena contactar?",
    a: "Sim. Damos prioridade a terrenos com projeto aprovado ou PIP, mas analisamos também projetos em curso. Diga-nos em que fase está."
  },
  {
    q: "Pagam comissão a imobiliárias ou mediadores?",
    a: "O proprietário não paga comissão nenhuma. Se for mediador e nos apresentar um terreno, pagamos uma comissão de referência, acordada por escrito."
  },
  {
    q: "Quanto tempo demora até receber o dinheiro?",
    a: "Respondemos em 48 horas. Se o negócio avançar, assinamos CPCV com sinal (compramos com capital próprio, sem depender de crédito) e marcamos a escritura o mais rápido possível."
  },
  {
    q: "Há terrenos que não compram?",
    a: (
      <>
        <p className="mb-3">Sim. Para sermos transparentes, não conseguimos avançar nestes casos:</p>
        <ul className="space-y-2">
          <li><strong className="text-[#1C1917]">Terrenos em REN ou RAN</strong>: zonas de reserva ecológica ou agrícola onde não se pode construir.</li>
          <li><strong className="text-[#1C1917]">Terrenos sem acesso a via pública</strong>: que dependem de passar por terrenos de vizinhos.</li>
          <li><strong className="text-[#1C1917]">Heranças por partilhar ou com litígios</strong>: todos os herdeiros têm de estar de acordo e com a habilitação feita.</li>
          <li><strong className="text-[#1C1917]">Divergências de áreas</strong>: entre a Caderneta Predial, a Certidão do Registo e o terreno real.</li>
        </ul>
        <p className="mt-3">Não tem a certeza se é o seu caso? Diga-nos na mesma. Muitas vezes há solução.</p>
      </>
    )
  },
  {
    q: "Os meus dados ficam confidenciais?",
    a: "Sim. Usamos o seu nome e telemóvel apenas para o contactar sobre este terreno. Não partilhamos com terceiros."
  }
];

export default function FAQ() {
  return (
    <section id="faq" className="py-16 sm:py-24 bg-[#FDFBF7] border-t border-[#E7DFD5]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B45309]/10 text-[#B45309] text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" /> Perguntas frequentes
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1C1917] tracking-tight">Dúvidas comuns</h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((item, i) => (
            <details
              key={item.q}
              id={`faq-${i + 1}`}
              className="faq-item group bg-white rounded-2xl border border-[#E7DFD5] shadow-xs open:shadow-md open:border-[#D4C7B5] transition-all"
            >
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-5 py-4 sm:px-6 sm:py-5">
                <span className="text-sm sm:text-base font-bold text-[#1C1917]">{item.q}</span>
                <ChevronDown className="faq-chevron w-5 h-5 text-[#B45309] shrink-0 transition-transform duration-200" />
              </summary>
              <div className="px-5 pb-5 sm:px-6 sm:pb-6 -mt-1 text-sm text-[#57534E] leading-relaxed">{item.a}</div>
            </details>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            id="faq-cta"
            onClick={scrollToLeadForm}
            className="text-sm font-bold text-[#B45309] hover:text-[#92400E] underline decoration-[#D4C7B5] underline-offset-4"
          >
            Ainda com dúvidas? Responda às 4 perguntas e nós ligamos-lhe.
          </button>
        </div>
      </div>
    </section>
  );
}
