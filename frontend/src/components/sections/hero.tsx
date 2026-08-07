import { PencilLine, Sparkles, Stars } from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { IlustracaoHero } from "@/components/illustrations";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { linkWhatsApp, site } from "@/lib/site";

/**
 * Seção 1 — Home (Hero)
 * Logo em destaque, frase de impacto, subtítulo, CTA para a seção de contato
 * e ilustração de itens de papelaria ao fundo.
 */
export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-28 pb-20 sm:pt-32 lg:pt-36 lg:pb-28">
      {/* Fundo decorativo: manchas pastel + grade de pontinhos de caderno */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 size-96 rounded-full bg-rosa-pastel blur-3xl" />
        <div className="absolute top-10 -right-20 size-96 rounded-full bg-ceu-pastel blur-3xl" />
        <div className="absolute bottom-0 left-1/3 size-72 rounded-full bg-sol-pastel blur-3xl" />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: "radial-gradient(#e6d9c6 1.5px, transparent 1.5px)",
            backgroundSize: "26px 26px",
          }}
        />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-8">
        {/* Coluna de texto */}
        <div className="text-center lg:text-left">
          <Reveal>
            <Logo comTexto={false} className="mb-5 scale-150 justify-center lg:justify-start" />
            <p className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-lavanda ring-1 ring-lavanda-pastel">
              <Sparkles className="size-4" aria-hidden="true" />
              Papelaria criativa desde 2015
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-5 font-heading text-4xl leading-[1.08] font-semibold tracking-tight text-balance text-tinta sm:text-5xl lg:text-6xl">
              Transforme suas ideias{" "}
              <span className="relative inline-block">
                <span className="relative z-10">em papel</span>
                {/* grifo de marca-texto atrás da palavra */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-1 z-0 h-3 -rotate-1 rounded-full bg-sol sm:h-4"
                />
              </span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground lg:mx-0">
              Cadernos, canetas, adesivos, material escolar e personalizados escolhidos com carinho —
              tudo para criar, organizar e se inspirar todos os dias.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
              <Button asChild className="h-13 w-full rounded-full px-8 text-base shadow-lg shadow-rosa/25 sm:w-auto">
                <a href="#contato">
                  Fale com a gente
                  <PencilLine className="size-4" aria-hidden="true" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-13 w-full rounded-full border-2 px-8 text-base sm:w-auto"
              >
                <a href="#produtos">Ver produtos</a>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <dl className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-4 lg:justify-start">
              {[
                { valor: "+2.000", rotulo: "clientes felizes" },
                { valor: "+800", rotulo: "itens no catálogo" },
                { valor: "24h", rotulo: "para responder" },
              ].map((item) => (
                <div key={item.rotulo} className="text-center lg:text-left">
                  <dt className="sr-only">{item.rotulo}</dt>
                  <dd>
                    <span className="block font-heading text-2xl font-semibold text-rosa">
                      {item.valor}
                    </span>
                    <span className="text-sm text-muted-foreground">{item.rotulo}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* Coluna da ilustração */}
        <Reveal delay={120} className="relative mx-auto w-full max-w-lg">
          <IlustracaoHero className="h-auto w-full" />

          {/* Etiquetas flutuantes */}
          <span
            className="animate-flutuar absolute top-4 -left-2 hidden items-center gap-2 rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-tinta shadow-lg ring-1 ring-border sm:inline-flex"
            style={{ "--giro": "-4deg" } as React.CSSProperties}
          >
            <Stars className="size-4 text-sol" aria-hidden="true" />
            Feito à mão
          </span>
          <span
            className="animate-flutuar absolute -right-1 bottom-8 hidden items-center gap-2 rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-tinta shadow-lg ring-1 ring-border sm:inline-flex"
            style={{ "--giro": "5deg", animationDelay: "1.5s" } as React.CSSProperties}
          >
            <span className="size-2.5 rounded-full bg-menta" aria-hidden="true" />
            Entrega rápida
          </span>
        </Reveal>
      </div>

      {/* Atalho discreto para o WhatsApp, além do botão flutuante */}
      <p className="mt-12 text-center text-sm text-muted-foreground">
        Prefere conversar agora?{" "}
        <a
          href={linkWhatsApp}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-rosa underline underline-offset-4 hover:text-rosa/80"
        >
          Chame no WhatsApp {site.contato.whatsappExibicao}
        </a>
      </p>
    </section>
  );
}
