"use client";

import React from "react";
import { MapPin, Compass, Home, Layers, CheckCircle, ArrowRight, MessageCircle, Award, Sparkles } from "lucide-react";
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
      description: "Terrenos bem localizados, com bons acessos viários e a menos de 5 minutos dos nós da A17 ou A25. Compramos em toda a área envolvente:",
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
    <section id="o-que-compramos" className="py-20 sm:py-28 bg-[#181615] text-white relative overflow-hidden border-t-2 border-[#B45309]/30">
      
      {/* Radiant Orange / Amber Glows (O Design Escuro/Laranja Pedido) */}
      <div className="absolute top-0 right-10 w-[500px] h-[500px] bg-[#D97706]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-[#B45309]/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:28px_28px] opacity-40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Warm Orange Tag */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B45309]/30 border border-[#F59E0B]/40 text-[#F59E0B] text-xs font-bold uppercase tracking-wider mb-4 shadow-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Critérios de Alta Liquidez • Compra Direta</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            O Que Compramos Diretamente
          </h2>
          
          <p className="mt-4 text-base sm:text-lg text-[#D6D3D1] leading-relaxed">
            Para garantirmos uma decisão rápida e assinatura imediata de CPCV, focamo-nos em projetos específicos que o nosso modelo de construção permite executar com máxima eficiência:
          </p>

          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 border border-white/10 text-xs sm:text-sm font-semibold text-[#FDE68A]">
            <Award className="w-4 h-4 text-[#F59E0B]" />
            <span>Mais de 3 Terrenos com Projeto Comprados nos Últimos 6 Meses em Aveiro</span>
          </div>
        </div>

        {/* 4 Cards Grid with Dark & Warm Amber Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {criteria.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="group bg-[#231F1D] rounded-3xl p-7 sm:p-9 border border-[#443D39] hover:border-[#F59E0B]/60 shadow-xl hover:shadow-[0_10px_35px_rgba(217,119,6,0.15)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-13 h-13 rounded-2xl bg-[#B45309]/20 text-[#F59E0B] border border-[#B45309]/40 group-hover:bg-[#B45309] group-hover:text-white flex items-center justify-center transition-colors shadow-md">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#F59E0B] bg-[#B45309]/15 px-3 py-1 rounded-full border border-[#B45309]/30">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-[#FBBF24] transition-colors">
                    {item.title}
                  </h3>
                  <div className="text-sm font-semibold text-[#F59E0B] mt-1 mb-3">
                    {item.subtitle}
                  </div>
                  <p className="text-sm text-[#A8A29E] mb-5 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Highlights list */}
                  <ul className="space-y-2.5 mb-6">
                    {item.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#E7E5E4] font-medium">
                        <CheckCircle className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#A8A29E]">
                  <span>💡 {item.note}</span>
                  <span className="font-extrabold text-[#F59E0B] text-sm">0{idx + 1}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Section Bottom Action Banner */}
        <div className="mt-12 bg-gradient-to-r from-[#231F1D] via-[#2A2421] to-[#231F1D] rounded-3xl p-6 sm:p-9 border-2 border-[#B45309]/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <h4 className="text-xl font-black text-white">
              O seu terreno cumpre estes critérios?
            </h4>
            <p className="text-sm text-[#D6D3D1]">
              Basta enviar-nos o PDF do projeto e a localização. Em 48 horas dizemos-lhe o valor que pagamos.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={handleCTA}
              className="w-full md:w-auto inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20BD5A] text-white px-8 py-4.5 rounded-2xl font-black text-base shadow-xl hover:shadow-[0_0_30px_rgba(37,211,102,0.4)] transition-all"
            >
              <MessageCircle className="w-5 h-5 fill-white shrink-0" />
              <span>Falar com o André no WhatsApp</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
