"use client";

import React, { useState } from "react";
import { X, Send, CheckCircle2, Building2, User, MapPin, Euro } from "lucide-react";
import { trackAndOpenWhatsApp } from "@/lib/tracking";
import { SITE_CONFIG } from "@/lib/config";

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  ctaOrigin: string;
}

export default function LeadModal({ isOpen, onClose, ctaOrigin }: LeadModalProps) {
  const [role, setRole] = useState<"Proprietário" | "Mediador / Consultor">("Proprietário");
  const [location, setLocation] = useState<string>("Esgueira");
  const [projectStatus, setProjectStatus] = useState<string>("Projeto Arquitetura Aprovado");
  const [askingPrice, setAskingPrice] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const priceInfo = askingPrice ? ` | Valor pretendido: ${askingPrice}` : "";
    const msg = `Olá André, tenho um terreno em ${location} com ${projectStatus} (${role})${priceInfo}. Gostaria de enviar a planta em PDF para análise.`;

    await trackAndOpenWhatsApp({
      ctaOrigin: ctaOrigin,
      role: role,
      location: location,
      askingPrice: askingPrice,
      customMessage: msg,
      notes: `Submetido via Modal Rápido (${projectStatus})`
    });

    setIsSubmitting(false);
    onClose();
  };

  const handleDirectWhatsApp = async () => {
    await trackAndOpenWhatsApp({
      ctaOrigin: `${ctaOrigin} (Direto)`,
      role: role,
      location: location,
      customMessage: SITE_CONFIG.defaultWhatsAppMessage
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-[#FAF8F5] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#E7DFD5] text-[#1C1917] max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#78716C] hover:text-[#1C1917] hover:bg-[#EFE8DD] transition-colors"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B45309]/10 text-[#B45309] text-xs font-bold tracking-wide uppercase mb-3">
            <CheckCircle2 className="w-3.5 h-3.5" /> Análise Direta em 48h
          </div>
          <h3 className="text-2xl font-extrabold tracking-tight text-[#1C1917]">
            Falar Diretamente com o André
          </h3>
          <p className="text-sm text-[#78716C] mt-1">
            Indique os detalhes rápidos do terreno para o André responder com a proposta no WhatsApp.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Perfil: Proprietário vs Mediador */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#44403C] mb-1.5">
              Qual é a sua relação com o imóvel?
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setRole("Proprietário")}
                className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl border text-sm font-semibold transition-all ${
                  role === "Proprietário"
                    ? "bg-[#1C1917] text-white border-[#1C1917] shadow-sm"
                    : "bg-white text-[#44403C] border-[#E7DFD5] hover:bg-[#F5EFEB]"
                }`}
              >
                <User className="w-4 h-4" />
                <span>Sou Proprietário</span>
              </button>
              <button
                type="button"
                onClick={() => setRole("Mediador / Consultor")}
                className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl border text-sm font-semibold transition-all ${
                  role === "Mediador / Consultor"
                    ? "bg-[#1C1917] text-white border-[#1C1917] shadow-sm"
                    : "bg-white text-[#44403C] border-[#E7DFD5] hover:bg-[#F5EFEB]"
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>Sou Mediador</span>
              </button>
            </div>
          </div>

          {/* Localização */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#44403C] mb-1.5">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#B45309]" /> Localização do Terreno
              </span>
            </label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-white border border-[#E7DFD5] rounded-xl px-3.5 py-3 text-sm font-medium text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#B45309]/50"
            >
              {SITE_CONFIG.locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* Estado do Projeto */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#44403C] mb-1.5">
              Estado do Projeto
            </label>
            <select
              value={projectStatus}
              onChange={(e) => setProjectStatus(e.target.value)}
              className="w-full bg-white border border-[#E7DFD5] rounded-xl px-3.5 py-3 text-sm font-medium text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#B45309]/50"
            >
              <option value="Projeto Arquitetura Aprovado">Projeto de Arquitetura Aprovado</option>
              <option value="Arquitetura Aprovada com Licenças a Pagamento">Arquitetura com Licenças a Pagamento</option>
              <option value="PIP Aprovado com Projeto Completo">PIP Aprovado + Projeto Completo</option>
              <option value="Outro em fase de aprovação">Outro em fase final de aprovação</option>
            </select>
          </div>

          {/* Valor Pretendido (Opcional) */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#44403C] mb-1.5">
              <span className="flex items-center gap-1.5">
                <Euro className="w-3.5 h-3.5 text-[#B45309]" /> Valor Pretendido (Opcional)
              </span>
            </label>
            <input
              type="text"
              placeholder="Ex: 140.000 €"
              value={askingPrice}
              onChange={(e) => setAskingPrice(e.target.value)}
              className="w-full bg-white border border-[#E7DFD5] rounded-xl px-3.5 py-3 text-sm font-medium text-[#1C1917] placeholder:text-[#A8A29E] focus:outline-none focus:ring-2 focus:ring-[#B45309]/50"
            />
          </div>

          {/* Submit CTA */}
          <div className="pt-2 space-y-2.5">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20BD5A] text-white py-3.5 px-4 rounded-xl font-bold text-base shadow-md hover:shadow-lg transition-all active:scale-[0.99] disabled:opacity-70"
            >
              <Send className="w-5 h-5 fill-white" />
              <span>Abrir WhatsApp com o André Agora</span>
            </button>

            <button
              type="button"
              onClick={handleDirectWhatsApp}
              className="w-full text-center text-xs text-[#78716C] hover:text-[#1C1917] underline decoration-[#D4C7B5]"
            >
              Ou avançar direto sem preencher nada ↗
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
