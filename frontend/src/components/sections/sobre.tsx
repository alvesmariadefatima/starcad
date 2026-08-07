import { Heart, Palette, Sparkles, Star, Truck, Wand2 } from "lucide-react";

import { Reveal } from "@/components/reveal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Seção 2 — Sobre
 * História da Starcad, missão e valores, e cards de diferenciais com ícones.
 */

const valores = [
  {
    icone: Star,
    titulo: "Qualidade",
    texto:
      "Cada item é testado antes de entrar na prateleira. Papel que aguenta caneta-tinteiro, cola que cola de verdade.",
    cor: "bg-sol-pastel text-[#8a6200]",
  },
  {
    icone: Palette,
    titulo: "Criatividade",
    texto:
      "Curadoria de coleções autorais e edições limitadas, feitas com ilustradores independentes.",
    cor: "bg-lavanda-pastel text-lavanda",
  },
  {
    icone: Heart,
    titulo: "Atendimento",
    texto:
      "Gente de verdade respondendo — te ajudamos a escolher o presente ou montar a lista escolar inteira.",
    cor: "bg-rosa-pastel text-rosa",
  },
];

const diferenciais = [
  {
    icone: Sparkles,
    titulo: "Produtos exclusivos",
    texto: "Coleções autorais que você não encontra em papelaria de rede.",
    cor: "bg-ceu-pastel text-[#0b6f95]",
  },
  {
    icone: Wand2,
    titulo: "Personalização",
    texto: "Nome, cor, capa e recadinho: agendas, canetas e kits do seu jeito.",
    cor: "bg-menta-pastel text-[#0f7a5c]",
  },
  {
    icone: Truck,
    titulo: "Entrega rápida",
    texto: "Envio em até 24h para a cidade e frete grátis nas compras acima de R$ 149.",
    cor: "bg-laranja-pastel text-[#a34a00]",
  },
];

export function Sobre() {
  return (
    <section id="sobre" className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* História */}
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full bg-ceu-pastel px-4 py-1.5 text-sm font-semibold text-[#0b6f95]">
              Nossa história
            </p>
            <h2 className="mt-4 font-heading text-3xl leading-tight font-semibold text-balance text-tinta sm:text-4xl">
              Nasceu de uma mesa bagunçada e muita vontade de organizar
            </h2>
            <div className="mt-5 space-y-4 text-lg leading-relaxed text-muted-foreground">
              <p>
                A Starcad começou em 2015, numa lojinha de esquina com três prateleiras e uma ideia
                simples: reunir num só lugar o material bonito e resistente que a gente mesma
                gostaria de usar.
              </p>
              <p>
                Dez anos depois somos ponto de encontro de estudantes, professores, ilustradores e
                de quem só quer um caderno que dê vontade de escrever. O propósito segue o mesmo —
                levar <strong className="font-semibold text-tinta">criatividade e organização</strong>{" "}
                para o dia a dia de quem passa por aqui.
              </p>
            </div>
          </Reveal>

          {/* Missão em destaque */}
          <Reveal delay={120}>
            <div className="relative rounded-3xl bg-gradient-to-br from-rosa to-laranja p-1 shadow-xl shadow-rosa/20">
              <div className="rounded-[calc(1.5rem-1px)] bg-white p-8 sm:p-10">
                <h3 className="font-heading text-xl font-semibold text-tinta">Nossa missão</h3>
                <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
                  Tornar o ato de escrever, planejar e criar um prazer diário — com produtos que
                  duram, encantam e cabem no orçamento.
                </p>

                <h3 className="mt-8 font-heading text-xl font-semibold text-tinta">Nossos valores</h3>
                <ul className="mt-4 space-y-4">
                  {valores.map((valor) => (
                    <li key={valor.titulo} className="flex gap-4">
                      <span
                        className={`inline-flex size-11 shrink-0 items-center justify-center rounded-2xl ${valor.cor}`}
                        aria-hidden="true"
                      >
                        <valor.icone className="size-5" />
                      </span>
                      <span>
                        <strong className="block font-heading font-semibold text-tinta">
                          {valor.titulo}
                        </strong>
                        <span className="text-sm leading-relaxed text-muted-foreground">
                          {valor.texto}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Diferenciais */}
        <div className="mt-20">
          <Reveal>
            <h3 className="text-center font-heading text-2xl font-semibold text-tinta sm:text-3xl">
              Por que comprar na Starcad
            </h3>
          </Reveal>

          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {diferenciais.map((item, i) => (
              <Reveal as="li" key={item.titulo} delay={i * 100}>
                <Card className="h-full rounded-3xl p-2 ring-border/60 transition-transform duration-300 hover:-translate-y-1.5">
                  <CardHeader>
                    <span
                      className={`inline-flex size-14 items-center justify-center rounded-2xl ${item.cor}`}
                      aria-hidden="true"
                    >
                      <item.icone className="size-6" />
                    </span>
                    <CardTitle className="mt-4 text-lg">{item.titulo}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="leading-relaxed text-muted-foreground">{item.texto}</p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
