"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ShieldCheck, Award, ExternalLink, CheckCircle2, Building, Eye, ChevronRight } from "lucide-react";

export default function SocialProof() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Fotografias reais da pasta /public/social-proof fornecidas pelo Grupo Freitas
  const proofItems = [
    {
      src: "/social-proof/obra-fachada-1.jpeg",
      title: "Construção de Moradia Contemporânea",
      location: "Distrito de Aveiro",
      type: "Obra Real Grupo Freitas",
      desc: "Execução com arquitetura moderna, grandes vãos e isolamento térmico de última geração."
    },
    {
      src: "/social-proof/obra-fachada-2.jpeg",
      title: "Projeto de Moradia em Desenvolvimento",
      location: "Região de Aveiro",
      type: "Terreno com Projeto Adquirido",
      desc: "Terreno comprado diretamente para promoção própria. CPCV firmado com fundos próprios."
    },
    {
      src: "/social-proof/obra-quarto.jpeg",
      title: "Acabamentos Interiores de Alto Padrão",
      location: "Aveiro",
      type: "Qualidade de Execução",
      desc: "Pavimentos flutuantes nobres, iluminação embutida e carpintarias sob medida."
    },
    {
      src: "/social-proof/obra-wc.jpeg",
      title: "Casas de Banho Contemporâneas",
      location: "Aveiro",
      type: "Design & Rigor Construtivo",
      desc: "Revestimentos cerâmicos de grande formato, louças suspensas e torneiras de embutir."
    },
    {
      src: "/social-proof/moradia-1.jpg",
      title: "Moradia T4 Térrea com Cobertura Plana",
      location: "Esgueira, Aveiro",
      type: "Aquisição nos Últimos 6 Meses",
      desc: "Lote de gaveto com projeto aprovado. CPCV assinado em 72h e escritura célere."
    },
    {
      src: "/social-proof/moradia-2.jpg",
      title: "Moradia T3 Isolada com Piscina",
      location: "Ílhavo / Gafanhas",
      type: "Negócio Direto Sem Intermediários",
      desc: "Venda direta pelo proprietário com zero comissões e sinal pago no ato do contrato."
    }
  ];

  return (
    <section id="projetos" className="py-16 sm:py-24 bg-[#FAF7F2] border-t border-[#E7DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Authority & Trust Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#1C1917] text-[#F5EFEB] text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            <Award className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>Social Proof • Resultados & Confiança Real</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1C1917] tracking-tight">
            Social Proof — Quem Somos e o Que Já Realizámos
          </h2>
          
          <p className="mt-4 text-base sm:text-lg text-[#57534E] leading-relaxed">
            Somos o <strong>Grupo Freitas Renovações</strong>, empresa de construção consolidada com atuação no distrito de Aveiro. Já comprámos <strong>mais de 3 terrenos com projeto nos últimos 6 meses</strong> com capital próprio para construção imediata.
          </p>
        </div>

        {/* Corporate Trust Badges & Municipal Authority Bar */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7DFD5] shadow-sm mb-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center divide-y md:divide-y-0 md:divide-x divide-[#E7DFD5]">
            
            {/* Grupo Freitas Brand with REAL LOGO */}
            <div className="flex items-center gap-4 pr-4">
              <div className="relative w-16 h-16 rounded-2xl bg-white p-2 border border-[#E7DFD5] flex items-center justify-center shrink-0 shadow-sm overflow-hidden">
                <img
                  src="/social-proof/logo-freitas.png"
                  alt="Logo Grupo Freitas Renovações"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <div className="font-extrabold text-base text-[#1C1917] leading-tight">
                  Grupo Freitas Renovações
                </div>
                <div className="text-xs text-[#78716C] mt-0.5">
                  Construção e Promoção Imobiliária
                </div>
                <a
                  href="https://grupofreitasrenovacoes.pt/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#B45309] hover:underline mt-1"
                >
                  <span>Visitar grupofreitasrenovacoes.pt</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Municipal Region Authority with REAL CAMARA LOGO */}
            <div className="flex items-center gap-4 pt-4 md:pt-0 md:px-6">
              <div className="relative w-16 h-16 rounded-2xl bg-white p-2 border border-[#E7DFD5] flex items-center justify-center shrink-0 shadow-sm overflow-hidden">
                <img
                  src="/social-proof/camara-aveiro-logo.png"
                  alt="Câmara Municipal de Aveiro"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <div className="font-extrabold text-base text-[#1C1917] leading-tight">
                  Município de Aveiro
                </div>
                <div className="text-xs text-[#78716C] mt-0.5">
                  Articulação técnica rigorosa com o PDM da Câmara Municipal de Aveiro
                </div>
                <div className="text-[11px] font-semibold text-[#15803D] mt-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> +3 terrenos adquiridos nos últimos 6 meses
                </div>
              </div>
            </div>

            {/* Confidentiality Commitment */}
            <div className="flex items-center gap-4 pt-4 md:pt-0 md:pl-6">
              <div className="w-16 h-16 rounded-2xl bg-[#DCFCE7] text-[#15803D] flex items-center justify-center shrink-0 shadow-xs">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div>
                <div className="font-extrabold text-base text-[#1C1917] leading-tight">
                  Compromisso de Confidencialidade
                </div>
                <p className="text-xs text-[#57534E] mt-1 leading-snug">
                  Tratamos os seus documentos com total confidencialidade. Empresa de construção a atuar no distrito de Aveiro.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Gallery Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h3 className="text-2xl font-black text-[#1C1917] tracking-tight">
              Galeria de Social Proof
            </h3>
            <p className="text-sm text-[#78716C] mt-1">
              Imagens reais de obras, interiores e moradias contemporâneas executadas na região de Aveiro.
            </p>
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#B45309] bg-[#F5EFEB] px-3.5 py-1.5 rounded-full border border-[#E7DFD5] w-fit">
            Casos Reais Concluídos
          </span>
        </div>

        {/* 6 Real Images Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {proofItems.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedImage(item.src)}
              className="group bg-white rounded-3xl overflow-hidden border border-[#E7DFD5] shadow-sm hover:shadow-2xl hover:border-[#D4C7B5] transition-all duration-300 cursor-pointer flex flex-col"
            >
              <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#E7DFD5]">
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/95 text-[#1C1917] text-xs font-bold shadow-lg">
                    <Eye className="w-3.5 h-3.5" /> Ver em detalhe
                  </span>
                </div>

                <div className="absolute top-3 left-3 bg-[#1C1917]/85 backdrop-blur-sm text-white px-3 py-1 rounded-full text-[11px] font-semibold">
                  {item.location}
                </div>
              </div>

              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#B45309] mb-1">
                    {item.type}
                  </div>
                  <h4 className="text-lg font-bold text-[#1C1917] group-hover:text-[#B45309] transition-colors leading-tight">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#57534E] mt-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#F5EFEB] flex items-center justify-between text-xs text-[#78716C]">
                  <span>Padrão Grupo Freitas</span>
                  <span className="font-bold text-[#1C1917] flex items-center gap-1">
                    Ver <ChevronRight className="w-3 h-3 text-[#B45309]" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Backlink Banner */}
        <div className="mt-12 text-center p-6 bg-[#F5EFEB] rounded-2xl border border-[#E7DFD5]">
          <p className="text-sm text-[#44403C]">
            Conheça todas as valências da nossa empresa no nosso website institucional:{" "}
            <a
              href="https://grupofreitasrenovacoes.pt/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[#B45309] hover:underline inline-flex items-center gap-1"
            >
              grupofreitasrenovacoes.pt <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </p>
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl w-full max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl bg-black">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 bg-black/60 text-white p-2.5 rounded-full hover:bg-black"
            >
              ✕
            </button>
            <div className="relative w-full h-[70vh] flex items-center justify-center">
              <img
                src={selectedImage}
                alt="Social Proof detalhe de obra Grupo Freitas"
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
