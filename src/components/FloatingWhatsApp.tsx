"use client";

import React, { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import { trackAndOpenWhatsApp } from "@/lib/tracking";

export default function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Mostrar após 300px de scroll ou após 2 segundos
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setVisible(true);
      }
    };

    const timer = setTimeout(() => {
      setVisible(true);
    }, 2000);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const handleClick = () => {
    trackAndOpenWhatsApp({
      ctaOrigin: "Botão Flutuante WhatsApp",
      customMessage: "Olá André, vi o vosso anúncio sobre compra de terrenos em Aveiro. Gostaria de falar consigo no WhatsApp."
    });
  };

  if (dismissed || !visible) return null;

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-40 flex items-center gap-2 group animate-in fade-in slide-in-from-bottom-5 duration-300">
      
      {/* Speech bubble hint */}
      <div className="hidden md:flex items-center bg-[#1C1917] text-white text-xs font-bold py-2 px-3.5 rounded-2xl shadow-xl border border-[#44403C]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#25D366] animate-ping" />
          <span>André online • Resposta em 48h</span>
        </div>
      </div>

      {/* Main Sticky WhatsApp Pill */}
      <button
        onClick={handleClick}
        className="flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20BD5A] text-white py-3.5 px-5 sm:py-4 sm:px-6 rounded-full font-extrabold text-sm sm:text-base shadow-2xl hover:shadow-[0_10px_30px_rgba(37,211,102,0.5)] transition-all duration-300 hover:scale-105 active:scale-95"
        aria-label="Falar com o André no WhatsApp"
      >
        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 fill-white shrink-0 animate-bounce" />
        <span className="whitespace-nowrap">Falar com o André</span>
      </button>

      {/* Dismiss Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setDismissed(true);
        }}
        className="w-6 h-6 rounded-full bg-black/40 text-white/70 hover:text-white flex items-center justify-center text-xs transition-opacity"
        title="Ocultar botão"
      >
        <X className="w-3.5 h-3.5" />
      </button>

    </div>
  );
}
