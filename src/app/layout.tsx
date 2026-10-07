import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import { SITE_CONFIG } from "@/lib/config";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-sans"
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#1C1917"
};

export const metadata: Metadata = {
  title: "Compramos Terrenos com Projeto em Aveiro | Grupo Freitas Renovações",
  description:
    "Compramos diretamente terrenos com projeto de arquitetura aprovado ou PIP num raio de 15 km de Aveiro. Decisão em 48h, CPCV imediato e zero comissões imobiliárias.",
  keywords: [
    "terrenos aveiro",
    "comprar terreno com projeto aveiro",
    "vender terreno aveiro",
    "esgueira",
    "cacia",
    "aradas",
    "oliveirinha",
    "ilhavo",
    "gafanhas",
    "grupo freitas renovações",
    "investidores imobiliarios aveiro",
    "cpcv terreno",
    "venda direta sem comissao"
  ],
  authors: [{ name: "Grupo Freitas Renovações" }],
  openGraph: {
    title: "Compramos Terrenos com Projeto Aprovado em Aveiro | Grupo Freitas",
    description:
      "Avaliação em 48 horas. Venda direta, dinheiro rápido e zero comissões de imobiliárias. Raio 15km de Aveiro.",
    url: "https://grupofreitasrenovacoes.pt",
    siteName: "Grupo Freitas Renovações",
    locale: "pt_PT",
    type: "website"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt" className={`${jakarta.variable} scroll-smooth`}>
      <head>
        {/* Meta Pixel Code */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${SITE_CONFIG.metaPixelId}');
              fbq('track', 'PageView');
            `
          }}
        />
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${SITE_CONFIG.metaPixelId}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
      </head>
      <body className="min-h-screen flex flex-col font-sans bg-[#FDFBF7] text-[#1C1917] antialiased">
        {children}
      </body>
    </html>
  );
}
