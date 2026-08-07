"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  /** Atraso em ms — usado para escalonar cards de uma mesma grade. */
  delay?: number;
  /** Tag renderizada (div por padrão). Ex.: "li", "article". */
  as?: ElementType;
  className?: string;
};

/**
 * Animação de entrada leve (fade-in + subida) quando o elemento aparece na tela.
 *
 * Usa IntersectionObserver, sem biblioteca de animação, e dispara uma única vez.
 * O atributo `data-reveal` é escrito direto no DOM (não via estado do React):
 * assim não há re-render em cascata nem risco de erro de hidratação, e o
 * conteúdo continua visível no HTML servido — bom para SEO e para quem está
 * sem JS. O CSS em globals.css respeita `prefers-reduced-motion`.
 */
export function Reveal({ children, delay = 0, as, className }: RevealProps) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const elemento = ref.current;
    if (!elemento) return;

    // Sem suporte ao observer: mantém tudo visível, sem animação.
    if (typeof IntersectionObserver === "undefined") return;

    elemento.dataset.reveal = "hidden";

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada.isIntersecting) return;
        elemento.dataset.reveal = "visible";
        observador.disconnect();
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
    );

    observador.observe(elemento);
    return () => observador.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
      className={cn(className)}
    >
      {children}
    </Tag>
  );
}
