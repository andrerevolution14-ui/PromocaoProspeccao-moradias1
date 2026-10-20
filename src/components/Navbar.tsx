"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MessageCircle, Menu, X, ArrowRight } from "lucide-react";
import { scrollToLeadForm, trackAndOpenWhatsApp } from "@/lib/tracking";

const NAV_LINKS = [
  { href: "#o-que-compramos", label: "O Que Procuramos" },
  { href: "#como-funciona", label: "Como Funciona" },
  { href: "#mediadores", label: "Mediadores" },
  { href: "#projetos", label: "Sobre Nós" },
  { href: "#faq", label: "FAQ" }
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavWhatsApp = () => {
    trackAndOpenWhatsApp({
      ctaOrigin: "Navbar (WhatsApp)",
      customMessage: "Olá, vi a vossa página de compra de terrenos em Aveiro e gostava de falar sobre um terreno."
    });
  };

  const handleFormCTA = () => {
    setMobileMenuOpen(false);
    scrollToLeadForm();
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#E7DFD5]/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#1C1917] flex items-center justify-center text-[#F5EFEB] font-black text-lg sm:text-xl shadow-md group-hover:bg-[#B45309] transition-colors">
              GF
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-[#1C1917] text-base sm:text-lg tracking-tight leading-tight group-hover:text-[#B45309] transition-colors">
                GRUPO FREITAS
              </span>
              <span className="text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase text-[#78716C]">
                Aquisição de Terrenos • Aveiro
              </span>
            </div>
          </Link>

          {/* Nav Links Desktop */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#44403C]">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-[#B45309] transition-colors">
                {l.label}
              </a>
            ))}
          </nav>

          {/* Right CTAs */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              id="nav-whatsapp"
              onClick={handleNavWhatsApp}
              title="Falar no WhatsApp"
              aria-label="Falar no WhatsApp"
              className="w-10 h-10 inline-flex items-center justify-center rounded-full border border-[#E7DFD5] text-[#25D366] hover:bg-[#25D366]/10 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
            </button>
            <button
              id="nav-form-cta"
              onClick={handleFormCTA}
              className="inline-flex items-center gap-2 bg-[#1C1917] hover:bg-[#B45309] text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-sm hover:shadow-md transition-all active:scale-95"
            >
              Vender sem complicações
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#44403C] hover:text-[#1C1917]"
              aria-label="Abrir menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#FDFBF7] border-b border-[#E7DFD5] px-4 pt-2 pb-6 space-y-1">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2.5 text-sm font-medium text-[#44403C]"
            >
              {l.label}
            </a>
          ))}
          <div className="pt-3 border-t border-[#E7DFD5] flex flex-col gap-2">
            <button
              onClick={handleFormCTA}
              className="w-full flex items-center justify-center gap-2 bg-[#1C1917] text-white py-3 rounded-xl font-bold text-sm shadow"
            >
              Pedir resposta em 48h <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleNavWhatsApp();
              }}
              className="w-full flex items-center justify-center gap-2 border border-[#E7DFD5] text-[#15803D] py-3 rounded-xl font-semibold text-sm"
            >
              <MessageCircle className="w-4 h-4" /> Falar no WhatsApp
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
