"use client";

import React from "react";
import { XCircle, AlertTriangle, ShieldAlert } from "lucide-react";

export default function WhatWeDontBuy() {
  const redFlags = [
    {
      id: "ren-ran",
      title: "Terrenos em REN ou RAN",
      tag: "Reserva Ecológica / Agrícola",
      reason: "Zonas com restrições ambientais ou agrícolas onde a construção é proibida ou altamente condicionada pelas entidades do Estado.",
      simpleExplanation: "Exemplo simples: Se o terreno é zona de proteção ecológica ou reserva agrícola, não é possível construir casas."
    },
    {
      id: "sem-acesso",
      title: "Terrenos Encravados (Sem Acesso Público)",
      tag: "Sem Via Pública Direta",
      reason: "Terrenos sem frente de estrada pavimentada ou que dependam de servidões de passagem por terrenos de vizinhos.",
      simpleExplanation: "Exemplo simples: O terreno tem de ter acesso direto a uma rua pública, sem precisar de passar pelo quintal de terceiros."
    },
    {
      id: "herancas-indivisas",
      title: "Compropriedade e Heranças por Partilhar",
      tag: "Avos Indivisos / Litígios",
      reason: "Imóveis pertencentes a múltiplos herdeiros sem partilhas concluídas, sem acordo unânime ou com litígios judiciais pendentes.",
      simpleExplanation: "Exemplo simples: Todos os herdeiros têm de estar 100% de acordo e com a habilitação de herdeiros legalmente resolvida."
    },
    {
      id: "documentos-divergentes",
      title: "Documentação Irregular ou Divergente",
      tag: "Caderneta vs Certidão",
      reason: "Divergências de áreas graves entre a Caderneta Predial das Finanças, a Certidão do Registo Predial e a realidade do terreno.",
      simpleExplanation: "Exemplo simples: O papel das Finanças e o papel do Registo Predial têm de dizer a mesma área e o mesmo número de artigo."
    },
    {
      id: "sem-aprovacao",
      title: "Sem Qualquer Aprovação Camarária",
      tag: "Apenas Ideias em Papel",
      reason: "Terrenos que nunca tiveram projeto submetido ou aprovado na Câmara Municipal de Aveiro / Ílhavo.",
      simpleExplanation: "Exemplo simples: Não compramos 'terrenos para depois tentar aprovar'. Compramos terrenos que já têm a luz verde da Câmara."
    }
  ];

  return (
    <section id="o-que-nao-compramos" className="py-16 sm:py-24 bg-[#FAF5F3] border-t border-[#EBDAD4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EF4444]/10 text-[#DC2626] text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldAlert className="w-3.5 h-3.5" /> Transparência Total
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1C1917] tracking-tight">
            O Que Não Compramos (Linhas Vermelhas)
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#57534E] leading-relaxed">
            Valorizamos o seu tempo e o nosso. Para sermos transparentes, não analisamos propostas que se enquadrem nas seguintes situações:
          </p>
        </div>

        {/* 5 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {redFlags.map((item, idx) => (
            <div
              key={item.id}
              className={`bg-white rounded-3xl p-6 sm:p-7 border border-[#F0D5CE] shadow-sm hover:shadow-md transition-all flex flex-col justify-between ${
                idx === 4 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center shrink-0">
                    <XCircle className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#991B1B] bg-[#FEF2F2] px-2.5 py-1 rounded-md border border-[#FCA5A5]/40">
                    {item.tag}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#1C1917] mb-2">
                  {item.title}
                </h3>
                
                <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed mb-4">
                  {item.reason}
                </p>
              </div>

              <div className="pt-3 border-t border-[#F5EBE8] text-xs text-[#78716C] bg-[#FAF5F3] p-3 rounded-xl font-medium">
                <span className="font-bold text-[#1C1917]">💡 Para entender fácil:</span> {item.simpleExplanation}
              </div>
            </div>
          ))}
        </div>

        {/* Informative Note */}
        <div className="mt-10 p-5 rounded-2xl bg-white border border-[#E7DFD5] text-center max-w-2xl mx-auto shadow-xs">
          <p className="text-xs sm:text-sm text-[#57534E]">
            <strong className="text-[#1C1917]">Porque somos tão diretos?</strong> Porque quando um terreno está livre destes problemas, assinamos o Contrato de Compra (CPCV) e passamos o cheque de sinal em tempo recorde.
          </p>
        </div>

      </div>
    </section>
  );
}
