"use client";

import React, { useState, useEffect } from "react";
import { MessageCircle, ArrowUp } from "lucide-react";
import { scrollToLeadForm, trackAndOpenWhatsApp } from "@/lib/tracking";

/**
 * CTA fixo: aparece depois de o utilizador passar o formulário do topo.
 * Ação principal = voltar ao formulário (evento Lead). WhatsApp = alternativa secundária.
 */
export default function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const form = document.getElementById("avaliar");
      const threshold = form ? form.getBoundingClientRect().bottom + window.scrollY : 700;
      setVisible(window.scrollY + 80 > threshold);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleWhatsApp = () => {
    trackAndOpenWhatsApp({
      ctaOrigin: "Botão Flutuante WhatsApp",
      customMessage: "Olá, vi a vossa página sobre compra de terrenos em Aveiro e gostava de falar sobre um terreno."
    });
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-3 bottom-3 sm:inset-x-auto sm:right-7 sm:bottom-7 z-40 flex items-center gap-2 lf-fade">
      <button
        id="floating-form-cta"
        onClick={scrollToLeadForm}
        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#B45309] to-[#D97706] text-white py-3.5 px-6 rounded-full font-extrabold text-sm sm:text-base shadow-2xl hover:shadow-[0_10px_30px_rgba(217,119,6,0.5)] hover:scale-[1.03] active:scale-95 transition-all"
      >
        <ArrowUp className="w-4 h-4" />
        Vender rápido sem complicações
      </button>
      <button
        id="floating-whatsapp"
        onClick={handleWhatsApp}
        aria-label="Falar no WhatsApp"
        title="Falar no WhatsApp"
        className="w-12 h-12 sm:w-13 sm:h-13 shrink-0 inline-flex items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl hover:scale-105 active:scale-95 transition-transform"
      >
        <MessageCircle className="w-6 h-6 fill-white" />
      </button>
    </div>
  );
}
