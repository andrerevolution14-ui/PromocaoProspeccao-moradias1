"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhatWeBuy from "@/components/WhatWeBuy";
import WhatWeDontBuy from "@/components/WhatWeDontBuy";
import HowItWorks from "@/components/HowItWorks";
import QuickSummaryBox from "@/components/QuickSummaryBox";
import SocialProof from "@/components/SocialProof";
import FinalCTA from "@/components/FinalCTA";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1C1917] flex flex-col font-sans selection:bg-[#B45309]/20 selection:text-[#B45309]">
      
      {/* 0. Top Navigation Bar */}
      <Navbar />

      <main className="flex-1">
        {/* 1. Hero Section (Above Fold - Single Main CTA) */}
        <Hero />

        {/* 2. What We Buy Section (Com Design Escuro & Laranja Quente) */}
        <WhatWeBuy />

        {/* 3. What We Don't Buy Section (Linhas Vermelhas) */}
        <WhatWeDontBuy />

        {/* 4. How Our Process Works (Fluxo de 3 Passos) */}
        <HowItWorks />

        {/* 5. Quick Summary Box (Destaque dos 3 Requisitos) */}
        <QuickSummaryBox />

        {/* 6. Mais Sobre Nós (Antigo Social Proof - Apenas Fotos Reais das Obras) */}
        <SocialProof />
      </main>

      {/* 7. Final CTA Section (Footer) */}
      <FinalCTA />

      {/* Floating CTA Button (Sticky) */}
      <FloatingWhatsApp />

    </div>
  );
}
