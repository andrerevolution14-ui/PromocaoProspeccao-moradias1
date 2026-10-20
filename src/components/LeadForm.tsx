"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Loader2,
  MapPin,
  FileCheck2,
  Ruler,
  UserRound,
  MessageCircle,
  Lock
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/config";
import { submitLeadForm, trackAndOpenWhatsApp, trackFormStep } from "@/lib/tracking";

interface LeadFormProps {
  ctaOrigin: string;
  variant?: "light" | "dark";
}

const STEPS = [
  { key: "location", label: "Freguesia", icon: MapPin },
  { key: "project", label: "Projeto", icon: FileCheck2 },
  { key: "area", label: "Área", icon: Ruler },
  { key: "contact", label: "Contacto", icon: UserRound }
] as const;

function isValidPhone(raw: string): boolean {
  const digits = raw.replace(/\D/g, "");
  if (digits.startsWith("351")) return digits.length === 12;
  if (digits.startsWith("00")) return digits.length >= 11;
  return digits.length === 9 && /^[29]/.test(digits);
}

export default function LeadForm({ ctaOrigin, variant = "light" }: LeadFormProps) {
  const [step, setStep] = useState(0);
  const [location, setLocation] = useState("");
  const [projectStatus, setProjectStatus] = useState("");
  const [area, setArea] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isMediator, setIsMediator] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const dark = variant === "dark";

  const goTo = (next: number) => {
    setError("");
    setStep(next);
    if (next > step) trackFormStep(next + 1, STEPS[next].key);
  };

  const choose = (setter: (v: string) => void, value: string) => {
    setter(value);
    // Avança automaticamente — menos toques no telemóvel
    window.setTimeout(() => goTo(step + 1), 160);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) {
      setError("Indique o seu nome.");
      return;
    }
    if (!isValidPhone(phone)) {
      setError("Indique um telemóvel válido (ex: 912 345 678).");
      return;
    }
    setSubmitting(true);
    setError("");
    const ok = await submitLeadForm({
      ctaOrigin,
      location,
      projectStatus,
      area,
      name: name.trim(),
      phone: phone.trim(),
      role: isMediator ? "Mediador / Consultor" : "Proprietário"
    });
    setSubmitting(false);
    if (ok) {
      setDone(true);
    } else {
      setError("Não conseguimos enviar. Tente novamente ou fale connosco pelo WhatsApp.");
    }
  };

  const optionBtn = (selected: boolean) =>
    `group w-full text-left rounded-2xl border px-4 py-3.5 transition-all duration-200 active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D97706] ${
      selected
        ? "border-[#B45309] bg-[#B45309] text-white shadow-lg shadow-[#B45309]/20"
        : dark
          ? "border-white/10 bg-white/5 text-white hover:border-[#F59E0B]/60 hover:bg-white/10"
          : "border-[#E7DFD5] bg-white text-[#1C1917] hover:border-[#B45309]/60 hover:bg-[#FFFBF5] hover:-translate-y-px"
    }`;

  const inputCls = `w-full rounded-xl border px-4 py-3.5 text-base font-medium focus:outline-none focus:ring-2 focus:ring-[#D97706]/60 ${
    dark
      ? "bg-white/5 border-white/15 text-white placeholder:text-white/40"
      : "bg-white border-[#E7DFD5] text-[#1C1917] placeholder:text-[#A8A29E]"
  }`;

  const muted = dark ? "text-[#A8A29E]" : "text-[#78716C]";
  const strong = dark ? "text-white" : "text-[#1C1917]";

  // ---------- Ecrã de sucesso ----------
  if (done) {
    const firstName = name.trim().split(/\s+/)[0];
    const waMsg = `Olá, sou ${name.trim()}. Acabei de preencher o formulário (terreno em ${location}, projeto: ${projectStatus}). Envio já a planta em PDF.`;
    return (
      <div className="lf-fade text-center py-4" role="status" aria-live="polite">
        <div className="mx-auto w-16 h-16 rounded-full bg-[#DCFCE7] text-[#15803D] flex items-center justify-center mb-4 lf-pop">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <h3 className={`text-2xl font-black tracking-tight ${strong}`}>Obrigado, {firstName}!</h3>
        <p className={`mt-2 text-sm leading-relaxed ${muted}`}>
          Recebemos os dados do seu terreno. Vamos ligar-lhe ou enviar mensagem para o{" "}
          <strong className={strong}>{phone}</strong> nas próximas <strong className={strong}>48 horas</strong>.
        </p>
        <div className={`mt-6 pt-5 border-t ${dark ? "border-white/10" : "border-[#F0E9DF]"}`}>
          <p className={`text-xs mb-3 ${muted}`}>Quer adiantar? Pode enviar já a planta (opcional):</p>
          <button
            type="button"
            id="lf-success-whatsapp"
            onClick={() => trackAndOpenWhatsApp({ ctaOrigin: `${ctaOrigin} (pós-formulário)`, customMessage: waMsg })}
            className="inline-flex items-center gap-2 rounded-xl border border-[#25D366]/40 bg-[#25D366]/10 px-4 py-2.5 text-sm font-bold text-[#15803D] hover:bg-[#25D366]/20 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Enviar planta pelo WhatsApp
          </button>
        </div>
      </div>
    );
  }

  const progress = ((step + 1) / STEPS.length) * 100;

  return (
    <div>
      {/* Progresso */}
      <div className="flex items-center justify-between mb-2">
        <div className={`text-[11px] font-bold uppercase tracking-wider ${muted}`}>
          Passo {step + 1} de {STEPS.length}
        </div>
        <div className="flex items-center gap-1.5">
          {STEPS.map((s, i) => (
            <span
              key={s.key}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i <= step ? "w-6 bg-[#B45309]" : dark ? "w-3 bg-white/15" : "w-3 bg-[#E7DFD5]"
              }`}
            />
          ))}
        </div>
      </div>
      <div className={`h-1 w-full rounded-full overflow-hidden mb-5 ${dark ? "bg-white/10" : "bg-[#F0E9DF]"}`}>
        <div
          className="h-full bg-gradient-to-r from-[#B45309] to-[#F59E0B] transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div key={step} className="lf-slide">
        {/* PASSO 1 — Freguesia */}
        {step === 0 && (
          <fieldset>
            <legend className={`text-lg sm:text-xl font-extrabold mb-1 ${strong}`}>Em que freguesia fica o terreno?</legend>
            <p className={`text-xs mb-4 ${muted}`}>Aveiro e arredores, num raio de 15 km.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[340px] overflow-y-auto pr-1 -mr-1">
              {SITE_CONFIG.locations.map((loc) => (
                <button
                  key={loc}
                  type="button"
                  id={`lf-loc-${loc.split(" ")[0].toLowerCase()}`}
                  onClick={() => choose(setLocation, loc)}
                  className={`${optionBtn(location === loc)} !py-3 text-sm font-semibold`}
                >
                  {loc.replace("Outra zona num raio de 10 a 15 km de Aveiro", "Outra zona (até 15 km)")}
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {/* PASSO 2 — Projeto */}
        {step === 1 && (
          <fieldset>
            <legend className={`text-lg sm:text-xl font-extrabold mb-1 ${strong}`}>O terreno tem projeto?</legend>
            <p className={`text-xs mb-4 ${muted}`}>Não precisa de ter os documentos à mão.</p>
            <div className="space-y-2">
              {SITE_CONFIG.projectStatusOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  id={`lf-project-${opt.value.split(" ")[0].toLowerCase()}`}
                  onClick={() => choose(setProjectStatus, opt.value)}
                  className={optionBtn(projectStatus === opt.value)}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-sm sm:text-base font-bold">{opt.label}</div>
                      <div className={`text-xs ${projectStatus === opt.value ? "text-white/80" : muted}`}>{opt.hint}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0" />
                  </div>
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {/* PASSO 3 — Área */}
        {step === 2 && (
          <fieldset>
            <legend className={`text-lg sm:text-xl font-extrabold mb-1 ${strong}`}>Qual a área aproximada do terreno?</legend>
            <p className={`text-xs mb-4 ${muted}`}>Uma estimativa chega.</p>
            <div className="grid grid-cols-2 gap-2">
              {SITE_CONFIG.areaOptions.map((a) => (
                <button
                  key={a}
                  type="button"
                  id={`lf-area-${a.replace(/[^a-z0-9]/gi, "").toLowerCase()}`}
                  onClick={() => choose(setArea, a)}
                  className={`${optionBtn(area === a)} text-center text-sm font-bold`}
                >
                  {a}
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {/* PASSO 4 — Contacto */}
        {step === 3 && (
          <form onSubmit={handleSubmit} noValidate>
            <h3 className={`text-lg sm:text-xl font-extrabold mb-1 ${strong}`}>Para quem ligamos?</h3>
            <p className={`text-xs mb-4 ${muted}`}>Respondemos em 48 horas. Sem compromisso.</p>
            <div className="space-y-2.5">
              <label className="block">
                <span className="sr-only">Nome</span>
                <input
                  id="lf-name"
                  type="text"
                  autoComplete="name"
                  placeholder="O seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputCls}
                  autoFocus
                />
              </label>
              <label className="block">
                <span className="sr-only">Telemóvel</span>
                <input
                  id="lf-phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="Telemóvel (ex: 912 345 678)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={inputCls}
                />
              </label>
              <label className={`flex items-center gap-2.5 text-sm cursor-pointer select-none py-1 ${muted}`}>
                <input
                  id="lf-mediator"
                  type="checkbox"
                  checked={isMediator}
                  onChange={(e) => setIsMediator(e.target.checked)}
                  className="w-4 h-4 accent-[#B45309]"
                />
                Sou mediador / consultor imobiliário
              </label>
            </div>

            {error && (
              <p className="mt-3 text-sm font-semibold text-[#DC2626]" role="alert">
                {error}
              </p>
            )}

            <button
              id="lf-submit"
              type="submit"
              disabled={submitting}
              className="mt-4 w-full inline-flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-[#B45309] to-[#D97706] px-6 py-4 text-base sm:text-lg font-black text-white shadow-xl shadow-[#B45309]/25 hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-70 disabled:hover:translate-y-0"
            >
              {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle2 className="w-5 h-5" />}
              {submitting ? "A enviar..." : "Quero vender sem complicações"}
            </button>
            <p className={`mt-2.5 flex items-center justify-center gap-1.5 text-[11px] ${muted}`}>
              <Lock className="w-3 h-3" /> Sem compromisso. Proposta firme de compra com CPCV este mês.
            </p>
          </form>
        )}
      </div>

      {/* Navegação */}
      {step > 0 && (
        <button
          type="button"
          id="lf-back"
          onClick={() => goTo(step - 1)}
          className={`mt-4 inline-flex items-center gap-1.5 text-xs font-semibold transition-colors ${
            dark ? "text-[#A8A29E] hover:text-white" : "text-[#78716C] hover:text-[#1C1917]"
          }`}
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Voltar
        </button>
      )}
    </div>
  );
}
