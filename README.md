# Grupo Freitas Renovações — Landing Page de Aquisição de Terrenos (Aveiro) & Painel de Leads

Aplicação web completa, de alta conversão e pronta para produção, desenvolvida em **Next.js (App Router)** com **Tailwind CSS**. Serve como funil de aquisição direta de terrenos com projetos aprovados no raio de 15 km de Aveiro e inclui um painel administrativo privado para o André gerir todas as oportunidades recebidas via WhatsApp.

---

## 🚀 Principais Funcionalidades

### 1. Funil de Alta Conversão (Landing Page)
- **Estrutura Exata de Secções**:
  1. **Hero**: Pre-título enfático, proposta de valor direta, selos de confiança (48h, 0% comissões, capital próprio), botões de ação e imagem aérea de terreno em Aveiro com implantação arquitetónica.
  2. **O Que Compramos (Critérios de Alta Liquidez)**: 4 cartões detalhados com localização (<5 min da A17/A25: Esgueira, Cacia, Aradas, Oliveirinha, Ílhavo, Gafanhas), maturidade camarária (arquitetura aprovada ou PIP), tipologia (moradias térreas T3/T4 e banda/geminadas) e arquitetura moderna (linhas direitas e coberturas planas com platibanda).
  3. **O Que Não Compramos (Linhas Vermelhas)**: 5 cartões transparentes com ícones ❌ (REN/RAN, terrenos encravados, avos indivisos/heranças por partilhar, documentação divergente e terrenos sem aprovação camarária).
  4. **Como Funciona (3 Passos)**: Envio via WhatsApp (planta PDF + Maps + preço) ➔ Análise em 48h ➔ Proposta firme e CPCV imediato com sinal garantido.
  5. **Caixa de Resumo Rápido (Destaque Mobile-First)**: Bloco de alto contraste focado no que o proprietário/mediador precisa de enviar, sem fricção.
  6. **Prova Social & Autoridade**: Marca Grupo Freitas Renovações, alinhamento camarário com concelho de Aveiro, galeria de 6 moradias térreas modernas concluídas na região e backlink oficial.
  7. **Rodapé Final & CTA de Fecho**: Grande botão `📲 Tenho o Terreno Ideal. Quero Enviar o Projeto.` com mensagem WhatsApp pré-formatada.
- **Botão Flutuante Sticky**: Acesso permanente no canto inferior direito com indicador de status ao vivo (*André online • Resposta em 48h*).
- **Assistente Rápido (Lead Modal)**: Modal que permite ao utilizador escolher se é Proprietário Direto ou Mediador/Consultor, selecionar a freguesia e o valor pretendido, abrindo o WhatsApp com mensagem personalizada.
- **Rastreio Automático**: Cada clique em qualquer botão CTA regista imediatamente uma nova oportunidade no backend (`/api/leads`).

### 2. Painel de Gestão de Leads (`/dashboard`)
- **Acesso Protegido**: Login seguro em `/dashboard/login` por PIN rápido (`2026`) ou Email/Senha (`andre@grupofreitasrenovacoes.pt` / `freitas2026`).
- **Métricas em Tempo Real**:
  - Total de Leads
  - Leads provenientes da Landing Page
  - Leads recebidas Hoje
  - Leads nos últimos 7 dias
- **Tabela Completa de Contactos**:
  - Data e hora (fuso horário de Portugal)
  - Origem da página e botão acionado (Hero, Flutuante, Resumo, etc.)
  - Perfil (Proprietário vs Mediador) e Localização do terreno
  - Valor pretendido para a venda
  - Mensagem enviada
  - Seletor rápido de estado (*Novo*, *Em Análise*, *Contactado*, *CPCV Assinado*, *Desqualificado*)
  - Notas internas editáveis e graváveis em tempo real
  - Eliminação de contactos
- **Exportação CSV**: Botão para descarregar relatório formatado para Excel em Portugal (ponto e vírgula e suporte a caracteres acentuados via UTF-8 BOM).
- **Simulador de Lead**: Botão para gerar e testar leads instantaneamente no painel.

---

## 🛠️ Tecnologias Utilizadas

- **Framework**: [Next.js](https://nextjs.org/) (App Router, React 19)
- **Estilos**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Ícones**: [Lucide React](https://lucide.dev/)
- **Tipografia**: Plus Jakarta Sans (Google Fonts)
- **Persistência de Dados**: Ficheiro JSON no servidor (`data/leads.json`) com suporte preparado para base de dados (ex: Supabase / Firebase / Postgres)
- **Otimização**: Imagens em Next/Image com lazy-loading e suporte a Vercel

---

## ⚙️ Configuração & Variáveis de Ambiente

Crie ou edite o ficheiro `.env.local`:

```env
# Número de WhatsApp do André (formato internacional sem '+' nem espaços: Ex: 351912345678)
NEXT_PUBLIC_WHATSAPP_NUMBER=351910000000

# Credenciais de acesso ao Painel (/dashboard)
ADMIN_EMAIL=andre@grupofreitasrenovacoes.pt
ADMIN_PASSWORD=freitas2026
ADMIN_PIN=2026
```

---

## 🏃 Como Executar Localmente

1. **Instalar dependências** (já efetuado no ambiente):
   ```bash
   npm install
   ```

2. **Iniciar servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```
   Aceda a [http://localhost:3000](http://localhost:3000).

3. **Aceder ao Painel de Leads**:
   Aceda a [http://localhost:3000/dashboard](http://localhost:3000/dashboard) ou [http://localhost:3000/dashboard/login](http://localhost:3000/dashboard/login).
   - **PIN padrão**: `2026`
   - **Ou Email**: `andre@grupofreitasrenovacoes.pt` / Senha: `freitas2026`

4. **Gerar Build de Produção**:
   ```bash
   npm run build
   npm run start
   ```

---

## ☁️ Como Fazer Deploy na Vercel

1. Submeta o repositório para o GitHub ou GitLab.
2. Na [Vercel](https://vercel.com/), clique em **"Add New Project"** e selecione este repositório.
3. Adicione as variáveis de ambiente (`NEXT_PUBLIC_WHATSAPP_NUMBER`, `ADMIN_PIN`, `ADMIN_PASSWORD`, `ADMIN_EMAIL`).
4. Clique em **Deploy**. A página fica disponível imediatamente com HTTPS gratuito e CDN global.
