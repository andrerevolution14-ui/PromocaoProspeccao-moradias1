export const OFFICIAL_WHATSAPP_NUMBER = "351920601070";
export const OFFICIAL_WHATSAPP_DISPLAY = "+351 920 601 070";

/**
 * Garante que o número de WhatsApp seja sempre o correto (+351 920 601 070 -> 351920601070).
 * Protege ativamente contra variáveis de ambiente antigas na Vercel ou cache do Next.js
 * que contenham o erro antigo (35192060170 sem o dígito zero).
 */
export function getCleanWhatsAppNumber(): string {
  const envVal = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  if (!envVal || typeof envVal !== "string") {
    return OFFICIAL_WHATSAPP_NUMBER;
  }
  const digits = envVal.replace(/[^0-9]/g, "");
  // Se for o número antigo com falta de dígito ou tamanho incorreto
  if (
    digits === "35192060170" ||
    digits === "92060170" ||
    digits.length !== 12 ||
    digits.startsWith("35192060170")
  ) {
    return OFFICIAL_WHATSAPP_NUMBER;
  }
  return digits;
}

// Configuração central da landing page e contactos
export const SITE_CONFIG = {
  companyName: "Grupo Freitas Renovações",
  websiteUrl: "https://grupofreitasrenovacoes.pt/",
  contactPerson: "André",
  // Número WhatsApp: +351 920 601 070 (formato wa.me: 351920601070)
  whatsappNumber: getCleanWhatsAppNumber(),
  defaultWhatsAppMessage: "Olá, tenho um terreno com projeto em Aveiro e gostava de saber se vos interessa.",
  locations: [
    "Aveiro Centro (Glória e Vera Cruz)",
    "Santa Joana",
    "São Bernardo",
    "Esgueira",
    "Cacia",
    "Aradas",
    "Oliveirinha",
    "Ílhavo",
    "Gafanhas (Nazaré, Encarnação, Carmo)",
    "Outra zona num raio de 10 a 15 km de Aveiro"
  ],
  // Opções do formulário curto (1 pergunta por ecrã)
  projectStatusOptions: [
    { value: "Aprovado", label: "Sim, projeto aprovado", hint: "Arquitetura aprovada na Câmara" },
    { value: "PIP + Projeto não aprovado", label: "PIP + projeto não aprovado", hint: "Tem PIP e projeto entregue" },
    { value: "Em curso", label: "Está em curso", hint: "Projeto a ser feito ou em apreciação" },
    { value: "Não", label: "Ainda não tem projeto", hint: "Só o terreno" }
  ],
  areaOptions: [
    "Menos de 300 m²",
    "300 a 500 m²",
    "500 a 800 m²",
    "800 a 1.200 m²",
    "Mais de 1.200 m²",
    "Não sei"
  ],
  /**
   * Avaliações Google — preencher com os dados REAIS do perfil Google Business.
   * Enquanto `rating` for null, o bloco de avaliações não é mostrado na página.
   */
  googleReviews: {
    rating: null as number | null, // ex: 4.9
    count: null as number | null, // ex: 27
    profileUrl: "", // link "Ver no Google" (Google Maps / Business Profile)
    reviews: [] as { author: string; text: string; rating: number; when?: string }[]
  },
  // Comissão de referência para mediadores (texto livre; vazio = "comissão de referência" sem valor)
  mediatorCommissionLabel: "",
  adminCredentials: {
    username: process.env.ADMIN_USERNAME || "andre",
    email: process.env.ADMIN_EMAIL || "andre@grupofreitasrenovacoes.pt",
    password: process.env.ADMIN_PASSWORD || "2005",
    pin: process.env.ADMIN_PIN || "2005"
  },
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || "979841341182458",
  metaConversionsApiToken:
    process.env.META_CONVERSIONS_API_ACCESS_TOKEN ||
    "EAAT9k03bEqsBSgjVoa82Fet3Yiurus5KtnXVbjnPh6eVD42uNpHjz4uJsZAgZCRYrg4jcPZBZCIXZBPbNrCdrMzKryYhF0c07LSM2qmkIBvJ2OpsgIigbbcBVLFByCi6d8ZALAg87QREmel4XtaTh75xWR60eKdNYeYjvkTdCZAp4jZCk0dGoJiFVJAxneHXYAZDZD"
};

/**
 * Constrói a URL direta do WhatsApp com as informações inseridas pelo vendedor
 * Se a pessoa meter "Esgueira", "Projeto Aprovado", "Valor X", na mensagem vão exatamente esses dados!
 */
export function getWhatsAppUrl(params?: {
  location?: string;
  projectStatus?: string;
  askingPrice?: string;
  role?: string;
  customMessage?: string;
}): string {
  const cleanNumber = getCleanWhatsAppNumber();

  if (params?.customMessage) {
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(params.customMessage)}`;
  }

  const loc = params?.location || "Aveiro (raio 15km)";
  const status = params?.projectStatus || "projeto aprovado";
  const price = params?.askingPrice ? ` com valor pretendido de ${params.askingPrice}` : "";
  const roleText = params?.role && params.role !== "Não especificado" ? ` (${params.role})` : "";

  const message = `Olá André, tenho um terreno em ${loc} com ${status}${price}${roleText}. Gostaria de enviar a planta em PDF para análise.`;
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}
