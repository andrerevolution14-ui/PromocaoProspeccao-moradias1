"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ExecutiveBannerDark from "@/components/ExecutiveBannerDark";
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
        {/* 1. Hero Section (Above Fold with Dynamic Parameters & Single Main CTA) */}
        <Hero />

        {/* 1.5 Executive Dark & Warm Orange Highlight Banner (+3 Terrenos Comprados nos Últimos 6 Meses) */}
        <ExecutiveBannerDark />

        {/* 2. What We Buy Section (High-Liquidity Criteria & Aveiro Range) */}
        <WhatWeBuy />

        {/* 3. What We Don't Buy Section (Red Flags / Disqualifiers) */}
        <WhatWeDontBuy />

        {/* 4. How Our Process Works (3-Step Flow) */}
        <HowItWorks />

        {/* 5. Quick Summary Box (Visual Highlight, Mobile-First) */}
        <QuickSummaryBox />

        {/* 6. Social Proof & Authority Section */}
        <SocialProof />
      </main>

      {/* 7. Final CTA Section (Footer) */}
      <FinalCTA />

      {/* Floating CTA Button (Sticky to viewport) */}
      <FloatingWhatsApp />

    </div>
  );
}
