"use client";

import React from "react";
import { Star } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config";

/**
 * Selo de avaliações Google. Só é mostrado quando `SITE_CONFIG.googleReviews.rating`
 * estiver preenchido com os dados reais do perfil — nunca inventamos números.
 */
export default function GoogleRatingBadge({ dark = false }: { dark?: boolean }) {
  const { rating, count, profileUrl } = SITE_CONFIG.googleReviews;
  if (rating === null) return null;

  const content = (
    <>
      <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" aria-hidden="true">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
        <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z" />
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38z" />
      </svg>
      <span className={`font-extrabold ${dark ? "text-white" : "text-[#1C1917]"}`}>{rating.toFixed(1)}</span>
      <span className="flex">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star
            key={i}
            className={`w-3.5 h-3.5 ${i < Math.round(rating) ? "fill-[#FBBC05] text-[#FBBC05]" : "text-[#D6D3D1]"}`}
          />
        ))}
      </span>
      {count !== null && (
        <span className={dark ? "text-[#A8A29E]" : "text-[#78716C]"}>({count} avaliações Google)</span>
      )}
    </>
  );

  const cls = `inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs border ${
    dark ? "bg-white/5 border-white/10" : "bg-white border-[#E7DFD5] shadow-xs"
  }`;

  return profileUrl ? (
    <a href={profileUrl} target="_blank" rel="noopener noreferrer" className={`${cls} hover:border-[#B45309]/50 transition-colors`}>
      {content}
    </a>
  ) : (
    <div className={cls}>{content}</div>
  );
}
