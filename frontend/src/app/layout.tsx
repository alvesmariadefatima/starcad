import type { Metadata, Viewport } from "next";
import { Fredoka, Nunito } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";
import { site } from "@/lib/site";
import "./globals.css";

/* Tipografia arredondada e amigável:
   Fredoka nos títulos, Nunito no corpo. Ambas variáveis (um arquivo por família),
   auto-hospedadas pelo next/font — sem requisição ao Google e sem layout shift. */
const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-heading-family",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-body-family",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.nome} — Papelaria criativa | ${site.slogan}`,
    template: `%s | ${site.nome}`,
  },
  description: site.descricao,
  keywords: [
    "papelaria",
    "papelaria criativa",
    "cadernos",
    "canetas",
    "adesivos",
    "washi tape",
    "material escolar",
    "papelaria personalizada",
    "presentes criativos",
    site.endereco.cidade,
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: site.url,
    siteName: site.nome,
    title: `${site.nome} — ${site.slogan}`,
    description: site.descricao,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.nome} — ${site.slogan}`,
    description: site.descricao,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#fffaf2",
  width: "device-width",
  initialScale: 1,
};

/** Dados estruturados: ajuda o Google a exibir endereço, horário e telefone. */
const dadosEstruturados = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: site.nome,
  description: site.descricao,
  url: site.url,
  telephone: site.contato.telefone,
  email: site.contato.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.endereco.rua,
    addressLocality: site.endereco.cidade,
    addressRegion: site.endereco.estado,
    postalCode: site.endereco.cep,
    addressCountry: "BR",
  },
  openingHours: ["Mo-Fr 09:00-18:30", "Sa 09:00-14:00"],
  sameAs: [site.redes.instagram, site.redes.facebook, site.redes.pinterest],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${fredoka.variable} ${nunito.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background">
        {/* Atalho de teclado para pular direto ao conteúdo (acessibilidade) */}
        <a
          href="#home"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-rosa focus:px-5 focus:py-2.5 focus:font-semibold focus:text-white"
        >
          Pular para o conteúdo
        </a>

        {children}

        <Toaster theme="light" position="bottom-center" richColors />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(dadosEstruturados) }}
        />

        {/*
          Google Analytics / Tag Manager
          --------------------------------------------------------------------
          Espaço reservado. Para ativar:
          1. instale o pacote oficial:  npm i @next/third-parties
          2. defina NEXT_PUBLIC_GA_ID (ou NEXT_PUBLIC_GTM_ID) no .env.local
          3. descomente o bloco correspondente abaixo.

          import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

          {process.env.NEXT_PUBLIC_GA_ID && (
            <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
          )}
          {process.env.NEXT_PUBLIC_GTM_ID && (
            <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
          )}

          O componente carrega o script com estratégia afterInteractive,
          sem bloquear o carregamento inicial (protege o LCP).
        */}
      </body>
    </html>
  );
}
