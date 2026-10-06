"use client";

import React, { useState } from "react";
import { ShieldCheck, Award, ExternalLink, CheckCircle2, Eye, ChevronRight } from "lucide-react";

export default function SocialProof() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Apenas as fotografias REAIS das obras do Grupo Freitas (sem imagens geradas por IA)
  const realWorks = [
    {
      src: "/social-proof/obra-fachada-1.jpeg",
      title: "Construção de Moradia Contemporânea",
      location: "Distrito de Aveiro",
      type: "Estrutura & Alvenarias",
      desc: "Execução de moradia com isolamento térmico avançado, vãos amplos e conformidade rigorosa com o projeto de arquitetura."
    },
    {
      src: "/social-proof/obra-fachada-2.jpeg",
      title: "Desenvolvimento e Execução de Obra",
      location: "Região de Aveiro",
      type: "Construção de Raiz",
      desc: "Acompanhamento diário por encarregados e engenheiros do Grupo Freitas para garantir máxima qualidade construtiva."
    },
    {
      src: "/social-proof/obra-quarto.jpeg",
      title: "Acabamentos Interiores de Alto Padrão",
      location: "Aveiro",
      type: "Carpintarias & Pavimentos",
      desc: "Pavimentos nobres flutuantes, iluminação LED embutida e acabamentos de requinte prontos a habitar."
    },
    {
      src: "/social-proof/obra-wc.jpeg",
      title: "Instalações Sanitárias Contemporâneas",
      location: "Aveiro",
      type: "Design & Materiais Nobres",
      desc: "Revestimentos cerâmicos de grande formato, louças suspensas e soluções modernas de canalização e eficiência hídrica."
    }
  ];

  return (
    <section id="projetos" className="py-16 sm:py-24 bg-[#FAF7F2] border-t border-[#E7DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header - Mais Sobre Nós */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#1C1917] text-[#F5EFEB] text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            <Award className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>Empresa de Construção em Aveiro</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1C1917] tracking-tight">
            Mais Sobre Nós
          </h2>
          
          <p className="mt-4 text-base sm:text-lg text-[#57534E] leading-relaxed">
            Somos o <strong>Grupo Freitas Renovações</strong>, empresa de construção civil e desenvolvimento imobiliário sediada e ativa no distrito de Aveiro. Quando compramos o seu terreno com projeto, compramos com <strong>capital próprio</strong> para iniciar a execução da obra no menor prazo possível.
          </p>
        </div>

        {/* Corporate Trust Badges & Municipal Authority Bar */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7DFD5] shadow-sm mb-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center divide-y md:divide-y-0 md:divide-x divide-[#E7DFD5]">
            
            {/* Grupo Freitas Brand with REAL LOGO */}
            <div className="flex items-center gap-4 pr-4">
              <div className="relative w-16 h-16 rounded-2xl bg-white p-2 border border-[#E7DFD5] flex items-center justify-center shrink-0 shadow-sm overflow-hidden">
                <img
                  src="/logo-freitas.png"
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
                  src="/camara-aveiro-logo.png"
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
                  Tratamos os seus documentos com total sigilo e proteção. Empresa de construção consolidada no distrito de Aveiro.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Gallery Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h3 className="text-2xl font-black text-[#1C1917] tracking-tight">
              Obras e Execuções Reais
            </h3>
            <p className="text-sm text-[#78716C] mt-1">
              Registo fotográfico de trabalhos reais de construção e acabamento desenvolvidos pela nossa equipa técnica.
            </p>
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#B45309] bg-[#F5EFEB] px-3.5 py-1.5 rounded-full border border-[#E7DFD5] w-fit">
            Obras Concluídas em Aveiro
          </span>
        </div>

        {/* 4 Real Images Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {realWorks.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedImage(item.src)}
              className="group bg-white rounded-3xl overflow-hidden border border-[#E7DFD5] shadow-sm hover:shadow-2xl hover:border-[#D4C7B5] transition-all duration-300 cursor-pointer flex flex-col"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#E7DFD5]">
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 text-[#1C1917] text-xs font-bold shadow-lg">
                    <Eye className="w-3.5 h-3.5" /> Ampliar foto
                  </span>
                </div>

                <div className="absolute top-3 left-3 bg-[#1C1917]/85 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-[11px] font-semibold">
                  {item.location}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#B45309] mb-1">
                    {item.type}
                  </div>
                  <h4 className="text-base font-bold text-[#1C1917] group-hover:text-[#B45309] transition-colors leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#57534E] mt-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-3 mt-4 border-t border-[#F5EFEB] flex items-center justify-between text-xs text-[#78716C]">
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
              grupofreitasrenovacoes.pt <ExternalLink className="w-3 h-3" />
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
          <div className="relative max-w-4xl w-full max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl bg-black">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 bg-black/60 text-white p-2.5 rounded-full hover:bg-black"
            >
              ✕
            </button>
            <div className="relative w-full h-[75vh] flex items-center justify-center p-2">
              <img
                src={selectedImage}
                alt="Fotografia real de obra do Grupo Freitas"
                className="max-h-full max-w-full object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
