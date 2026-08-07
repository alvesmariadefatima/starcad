import { ArrowRight } from "lucide-react";

import {
  IlustracaoAdesivos,
  IlustracaoCadernos,
  IlustracaoCanetas,
  IlustracaoCorporativa,
  IlustracaoEscolar,
  IlustracaoPresentes,
} from "@/components/illustrations";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { site } from "@/lib/site";

/**
 * Seção 3 — Produtos
 * Grid responsivo de categorias (1 coluna no mobile → 2 no tablet → 3 no desktop).
 * Cada card tem ilustração, nome, descrição curta e CTA "Ver mais" que abre o
 * WhatsApp já com a categoria escrita na mensagem.
 */

const categorias = [
  {
    nome: "Cadernos",
    descricao:
      "Espirais, brochuras e bullet journals com papel 90g que não borra e capas que dão vontade de abrir.",
    Ilustracao: IlustracaoCadernos,
    fundo: "bg-ceu-pastel",
    etiqueta: "Mais vendido",
  },
  {
    nome: "Canetas & Lápis",
    descricao:
      "Gel, esferográfica, brush pen, lápis de cor e grafite — do básico da escola ao kit do ilustrador.",
    Ilustracao: IlustracaoCanetas,
    fundo: "bg-sol-pastel",
  },
  {
    nome: "Adesivos & Washi Tapes",
    descricao:
      "Rolos, cartelas e recortes para dar personalidade ao planner, ao caderno e às cartas.",
    Ilustracao: IlustracaoAdesivos,
    fundo: "bg-rosa-pastel",
    etiqueta: "Novidade",
  },
  {
    nome: "Presentes Personalizados",
    descricao:
      "Kits montados com nome gravado, embalagem caprichada e cartão escrito à mão por nós.",
    Ilustracao: IlustracaoPresentes,
    fundo: "bg-lavanda-pastel",
  },
  {
    nome: "Material Escolar",
    descricao:
      "Lista escolar completa conferida item por item, com mochilas, estojos e réguas que aguentam o ano todo.",
    Ilustracao: IlustracaoEscolar,
    fundo: "bg-menta-pastel",
  },
  {
    nome: "Papelaria Corporativa",
    descricao:
      "Blocos, envelopes, agendas e brindes com a identidade da sua empresa. Orçamento em até 24h.",
    Ilustracao: IlustracaoCorporativa,
    fundo: "bg-laranja-pastel",
  },
];

/** Abre o WhatsApp com a categoria já mencionada na mensagem. */
function linkCategoria(nome: string) {
  const texto = `Olá! Vim pelo site da Starcad e quero saber mais sobre: ${nome}.`;
  return `https://wa.me/${site.contato.whatsapp}?text=${encodeURIComponent(texto)}`;
}

export function Produtos() {
  return (
    <section id="produtos" className="relative scroll-mt-24 py-20 lg:py-28">
      {/* Faixa de fundo levemente colorida para separar da seção anterior */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-white/60" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-rosa-pastel px-4 py-1.5 text-sm font-semibold text-rosa">
            Nosso catálogo
          </p>
          <h2 className="mt-4 font-heading text-3xl leading-tight font-semibold text-balance text-tinta sm:text-4xl">
            Tudo para criar, organizar e se inspirar
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Seis categorias, mais de 800 itens na loja. Não achou o que procura? A gente busca para
            você.
          </p>
        </Reveal>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categorias.map((categoria, i) => (
            <Reveal as="li" key={categoria.nome} delay={(i % 3) * 100}>
              <Card className="group/produto h-full rounded-3xl ring-border/60 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-tinta/5">
                {/* "Imagem" do produto — ilustração vetorial em bloco 3:2 */}
                <div
                  className={`relative aspect-[3/2] overflow-hidden rounded-t-3xl ${categoria.fundo}`}
                >
                  <categoria.Ilustracao className="size-full transition-transform duration-500 group-hover/produto:scale-105" />
                  {categoria.etiqueta && (
                    <span className="absolute top-3 left-3 rounded-full bg-white/95 px-3 py-1 text-xs font-bold tracking-wide text-tinta uppercase shadow-sm">
                      {categoria.etiqueta}
                    </span>
                  )}
                </div>

                <CardHeader className="pt-5">
                  <CardTitle className="text-xl">{categoria.nome}</CardTitle>
                </CardHeader>

                <CardContent className="flex flex-1 flex-col">
                  <p className="leading-relaxed text-muted-foreground">{categoria.descricao}</p>
                  <Button
                    asChild
                    variant="outline"
                    className="mt-5 h-11 w-full rounded-full border-2 text-sm font-semibold group-hover/produto:border-rosa group-hover/produto:text-rosa"
                  >
                    <a
                      href={linkCategoria(categoria.nome)}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Ver mais sobre ${categoria.nome} no WhatsApp`}
                    >
                      Ver mais
                      <ArrowRight
                        className="size-4 transition-transform group-hover/produto:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
