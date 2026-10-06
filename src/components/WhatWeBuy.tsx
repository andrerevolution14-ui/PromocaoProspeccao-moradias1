"use client";

import React from "react";
import { MapPin, Compass, Home, Layers, CheckCircle, ArrowRight, MessageCircle } from "lucide-react";
import { trackAndOpenWhatsApp } from "@/lib/tracking";

export default function WhatWeBuy() {
  const handleCTA = () => {
    trackAndOpenWhatsApp({
      ctaOrigin: "Secção O Que Compramos",
      customMessage: "Olá André, tenho um terreno com projeto num raio de 15km de Aveiro que cumpre os vossos critérios. Gostaria de enviar a planta para análise."
    });
  };

  const criteria = [
    {
      id: "localizacao",
      icon: MapPin,
      badge: "Localização Prioritária",
      title: "Localização Estratégica",
      subtitle: "Aveiro Centro e Cintura num Raio de 10 a 15 km",
      description: "Terrenos bem localizados, com bons acessos viários e a menos de 5 minutos dos nós da A17 ou A25. Compramos em toda a área de influência:",
      highlights: [
        "Aveiro Centro (freguesias da Glória e Vera Cruz)",
        "Santa Joana e São Bernardo",
        "Esgueira e Cacia",
        "Aradas e Oliveirinha",
        "Ílhavo e Gafanhas (Nazaré, Encarnação e Carmo)",
        "Todas as freguesias no raio de 10-15 km de Aveiro"
      ],
      note: "Não nos limitamos a uma só freguesia. Analisamos qualquer lote no raio de 15 km."
    },
    {
      id: "maturidade",
      icon: Compass,
      badge: "Pronto a Avançar",
      title: "Maturidade do Projeto",
      subtitle: "Arquitetura já aprovada pela Câmara",
      description: "Queremos avançar sem demoras burocráticas. O projeto deve estar num destes estados:",
      highlights: [
        "Projeto de Arquitetura Aprovado na Câmara Municipal",
        "Com ou sem licenças a pagamento (nós assumimos os custos)",
        "Ou PIP (Pedido de Informação Prévia) Aprovado com projeto de execução completo",
        "Especialidades entregues ou prontas a dar entrada"
      ],
      note: "Poupa meses de espera. Sabemos avaliar o valor real no próprio dia."
    },
    {
      id: "tipologia",
      icon: Home,
      badge: "Tipologia Procurada",
      title: "Tipologia das Casas",
      subtitle: "Moradias térreas T3/T4 ou pequenos conjuntos",
      description: "O modelo com maior procura no mercado de Aveiro e que construímos com máxima perfeição:",
      highlights: [
        "Moradias térreas T3 ou T4 (tudo no mesmo piso)",
        "Lotes para moradias isoladas com jardim",
        "Ou lotes para banda/geminadas (3 a 4 frações por lote)",
        "Áreas de implantação generosas e funcionais"
      ],
      note: "Espaço exterior privativo e estacionamento fácil."
    },
    {
      id: "arquitetura",
      icon: Layers,
      badge: "Estilo Arquitetónico",
      title: "Arquitetura Moderna",
      subtitle: "Linhas retas e coberturas planas",
      description: "Projetos contemporâneos, elegantes e com excelente exposição solar:",
      highlights: [
        "Linhas direitas, limpas e geométricas",
        "Coberturas planas com platibandas (telhados ocultos)",
        "Grandes vãos envidraçados virados a Sul ou Poente",
        "Pormenores em madeira ripada, pedra natural e betão"
      ],
      note: "Design contemporâneo que valoriza o imóvel no longo prazo."
    }
  ];

  return (
    <section id="o-que-compramos" className="py-16 sm:py-24 bg-[#FAF7F2] border-t border-[#E7DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#15803D]/10 text-[#15803D] text-xs font-bold uppercase tracking-wider mb-3">
            <CheckCircle className="w-3.5 h-3.5" /> Critérios de Alta Liquidez
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1C1917] tracking-tight">
            O Que Compramos Diretamente
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#57534E] leading-relaxed">
            Para garantirmos uma decisão rápida, focamo-nos em projetos específicos que o nosso modelo de construção permite executar com máxima eficiência:
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {criteria.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="group bg-white rounded-3xl p-7 sm:p-8 border border-[#E7DFD5] shadow-sm hover:shadow-xl hover:border-[#D4C7B5] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#F5EFEB] text-[#B45309] group-hover:bg-[#B45309] group-hover:text-white flex items-center justify-center transition-colors shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#78716C] bg-[#FAF7F2] px-3 py-1 rounded-full border border-[#E7DFD5]">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-[#1C1917] group-hover:text-[#B45309] transition-colors">
                    {item.title}
                  </h3>
                  <div className="text-sm font-semibold text-[#B45309] mt-0.5 mb-3">
                    {item.subtitle}
                  </div>
                  <p className="text-sm text-[#57534E] mb-4">
                    {item.description}
                  </p>

                  {/* Highlights list */}
                  <ul className="space-y-2 mb-6">
                    {item.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#292524] font-medium">
                        <CheckCircle className="w-4 h-4 text-[#15803D] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-[#F5EFEB] flex items-center justify-between text-xs text-[#78716C]">
                  <span>💡 {item.note}</span>
                  <span className="font-bold text-[#B45309] group-hover:translate-x-1 transition-transform">0{idx + 1}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Section Bottom Action Banner */}
        <div className="mt-12 bg-white rounded-2xl p-6 sm:p-8 border border-[#E7DFD5] shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-lg font-bold text-[#1C1917]">
              O seu terreno cumpre estes critérios?
            </h4>
            <p className="text-sm text-[#78716C]">
              Basta enviar-nos o PDF do projeto e a localização. Em 48 horas dizemos-lhe o valor que pagamos.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={handleCTA}
              className="w-full md:w-auto inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20BD5A] text-white px-7 py-4 rounded-xl font-black text-sm shadow-md hover:shadow-lg transition-all"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>💬 Falar com o André no WhatsApp</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
