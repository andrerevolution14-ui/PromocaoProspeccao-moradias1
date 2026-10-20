"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhatWeBuy from "@/components/WhatWeBuy";
import HowItWorks from "@/components/HowItWorks";
import ForMediators from "@/components/ForMediators";
import SocialProof from "@/components/SocialProof";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1C1917] flex flex-col font-sans selection:bg-[#B45309]/20 selection:text-[#B45309]">
      {/* 0. Top Navigation Bar */}
      <Navbar />

      <main className="flex-1">
        {/* 1. Hero: mensagem aberta + formulário de 4 passos (evento Lead) */}
        <Hero />

        {/* 2. Que terrenos procuramos (critérios detalhados ficam para uso interno) */}
        <WhatWeBuy />

        {/* 3. Como funciona (o 1.º passo são só 4 perguntas) */}
        <HowItWorks />

        {/* 4. Mediadores: comissão de referência */}
        <ForMediators />

        {/* 5. Sobre nós: avaliações Google + obras reais */}
        <SocialProof />

        {/* 6. FAQ (inclui as antigas "Linhas Vermelhas") */}
        <FAQ />
      </main>

      {/* 7. Final CTA Section (Footer) */}
      <FinalCTA />

      {/* CTA fixo */}
      <FloatingWhatsApp />
    </div>
  );
}
