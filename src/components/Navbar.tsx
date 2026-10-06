"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MessageCircle, ShieldCheck, MapPin, Lock, Menu, X } from "lucide-react";
import { trackAndOpenWhatsApp } from "@/lib/tracking";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavWhatsApp = () => {
    trackAndOpenWhatsApp({
      ctaOrigin: "Navbar Topo",
      customMessage: "Olá André, vi a vossa página de compra de terrenos em Aveiro. Gostaria de enviar detalhes de um projeto."
    });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#E7DFD5]/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 rounded-xl bg-white p-1 border border-[#E7DFD5] flex items-center justify-center shadow-xs overflow-hidden">
              <img
                src="/social-proof/logo-freitas.png"
                alt="Logo Grupo Freitas"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-[#1C1917] text-lg tracking-tight leading-tight group-hover:text-[#B45309] transition-colors">
                GRUPO FREITAS
              </span>
              <span className="text-[11px] font-semibold tracking-wider uppercase text-[#78716C]">
                Aquisição de Terrenos • Aveiro
              </span>
            </div>
          </Link>

          {/* Nav Links Desktop */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#44403C]">
            <a href="#o-que-compramos" className="hover:text-[#B45309] transition-colors">
              O Que Compramos
            </a>
            <a href="#o-que-nao-compramos" className="hover:text-[#B45309] transition-colors">
              Linhas Vermelhas
            </a>
            <a href="#como-funciona" className="hover:text-[#B45309] transition-colors">
              Como Funciona
            </a>
            <a href="#projetos" className="hover:text-[#B45309] transition-colors">
              Obras & Confiança
            </a>
            <a 
              href="https://grupofreitasrenovacoes.pt/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs px-2.5 py-1 rounded-full bg-[#F4EFEA] text-[#78716C] hover:text-[#1C1917] border border-[#E7DFD5] transition-colors"
            >
              Website Oficial ↗
            </a>
          </nav>

          {/* Right CTA & Private Access */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/dashboard"
              title="Acesso Privado André"
              className="p-2 text-[#A8A29E] hover:text-[#1C1917] rounded-lg transition-colors"
            >
              <Lock className="w-4 h-4" />
            </Link>

            <button
              onClick={handleNavWhatsApp}
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-2.5 rounded-full font-semibold text-sm shadow-sm hover:shadow-md transition-all active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Falar no WhatsApp</span>
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#44403C] hover:text-[#1C1917]"
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#FDFBF7] border-b border-[#E7DFD5] px-4 pt-2 pb-6 space-y-3">
          <a
            href="#o-que-compramos"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-[#44403C]"
          >
            O Que Compramos
          </a>
          <a
            href="#o-que-nao-compramos"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-[#44403C]"
          >
            Linhas Vermelhas
          </a>
          <a
            href="#como-funciona"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-[#44403C]"
          >
            Como Funciona
          </a>
          <a
            href="#projetos"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-[#44403C]"
          >
            Obras Realizadas
          </a>
          <div className="pt-3 border-t border-[#E7DFD5] flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleNavWhatsApp();
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 rounded-xl font-bold text-sm shadow"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              Falar com o André no WhatsApp
            </button>
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center py-2 text-xs text-[#78716C] hover:text-[#1C1917]"
            >
              🔒 Acesso Privado (Dashboard)
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
