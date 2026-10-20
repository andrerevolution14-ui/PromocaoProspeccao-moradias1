"use client";

import React from "react";
import { MapPin, FileCheck2, Handshake, CheckCircle, ArrowRight, Sparkles } from "lucide-react";
import { scrollToLeadForm } from "@/lib/tracking";

export default function WhatWeBuy() {
  const points = [
    {
      id: "zona",
      icon: MapPin,
      title: "Na região de Aveiro",
      subtitle: "Até 15 km do centro",
      highlights: [
        "Aveiro Centro, Santa Joana, São Bernardo",
        "Esgueira, Cacia, Aradas, Oliveirinha",
        "Ílhavo e Gafanhas",
        "Outras freguesias no raio de 15 km"
      ]
    },
    {
      id: "projeto",
      icon: FileCheck2,
      title: "Com projeto ou PIP",
      subtitle: "Para habitação",
      highlights: [
        "Projeto de arquitetura aprovado",
        "Ou PIP aprovado com projeto entregue",
        "Projeto em curso? Fale connosco na mesma",
        "Licenças por pagar não são problema"
      ]
    },
    {
      id: "venda",
      icon: Handshake,
      title: "Venda simples e direta",
      subtitle: "Sem intermediários a cobrar-lhe",
      highlights: [
        "Compramos com capital próprio",
        "Proposta firme, sem rodeios",
        "CPCV com sinal e escritura rápida",
        "0% de comissão para o proprietário"
      ]
    }
  ];

  return (
    <section
      id="o-que-compramos"
      className="py-20 sm:py-24 bg-[#181615] text-white relative overflow-hidden border-t-2 border-[#B45309]/30"
    >
      <div className="absolute top-0 right-10 w-[500px] h-[500px] bg-[#D97706]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-[#B45309]/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:28px_28px] opacity-40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B45309]/30 border border-[#F59E0B]/40 text-[#F59E0B] text-xs font-bold uppercase tracking-wider mb-4 shadow-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Compra direta pelo construtor</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Que terrenos procuramos
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#D6D3D1] leading-relaxed">
            Não sabe se o seu terreno encaixa? Não tem problema. Diga-nos onde fica e nós analisamos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {points.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="group bg-[#231F1D] rounded-3xl p-7 border border-[#443D39] hover:border-[#F59E0B]/60 shadow-xl hover:shadow-[0_10px_35px_rgba(217,119,6,0.15)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#B45309]/20 text-[#F59E0B] border border-[#B45309]/40 group-hover:bg-[#B45309] group-hover:text-white flex items-center justify-center transition-colors shadow-md">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="font-extrabold text-[#F59E0B]/60 text-sm">0{idx + 1}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-[#FBBF24] transition-colors">
                  {item.title}
                </h3>
                <div className="text-sm font-semibold text-[#F59E0B] mt-1 mb-5">{item.subtitle}</div>
                <ul className="space-y-2.5">
                  {item.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2.5 text-sm text-[#E7E5E4] font-medium">
                      <CheckCircle className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="mt-12 bg-gradient-to-r from-[#231F1D] via-[#2A2421] to-[#231F1D] rounded-3xl p-6 sm:p-9 border-2 border-[#B45309]/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <h3 className="text-xl font-black text-white">Tem um terreno assim, ou parecido?</h3>
            <p className="text-sm text-[#D6D3D1]">4 perguntas rápidas. Não precisa de documentos nem de dizer o preço.</p>
          </div>
          <button
            id="whatwebuy-cta"
            onClick={scrollToLeadForm}
            className="w-full md:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#B45309] to-[#D97706] text-white px-8 py-4 rounded-2xl font-black text-base shadow-xl hover:shadow-[0_0_30px_rgba(217,119,6,0.45)] hover:-translate-y-0.5 transition-all"
          >
            <span>Pedir resposta em 48h</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
