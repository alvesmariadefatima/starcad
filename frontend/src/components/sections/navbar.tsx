"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { navegacao } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Navegação fixa no topo.
 *
 * - Fundo translúcido que ganha sombra depois de rolar a página
 * - Marca a seção ativa conforme o usuário rola (IntersectionObserver)
 * - Menu sanfona no mobile, fechado ao clicar em um link
 * - O scroll suave vem do CSS (`scroll-behavior: smooth` em globals.css),
 *   então os links continuam sendo âncoras normais e funcionam sem JS
 */
export function Navbar() {
  const [rolou, setRolou] = useState(false);
  const [aberto, setAberto] = useState(false);
  const [ativo, setAtivo] = useState<string>("#home");

  // Sombra/fundo sólido a partir de 20px de rolagem
  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 20);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  // Destaque do item correspondente à seção visível
  useEffect(() => {
    const secoes = navegacao
      .map((item) => document.querySelector<HTMLElement>(item.href))
      .filter((el): el is HTMLElement => el !== null);

    const observador = new IntersectionObserver(
      (entradas) => {
        const visivel = entradas
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visivel) setAtivo(`#${visivel.target.id}`);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5] },
    );

    secoes.forEach((secao) => observador.observe(secao));
    return () => observador.disconnect();
  }, []);

  // Trava o scroll do fundo enquanto o menu mobile está aberto
  useEffect(() => {
    document.body.style.overflow = aberto ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [aberto]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        rolou
          ? "border-b border-border/70 bg-creme/90 shadow-[0_6px_24px_-16px_rgba(47,42,69,0.5)] backdrop-blur-md"
          : "bg-creme/40 backdrop-blur-sm",
      )}
    >
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#home" aria-label="Starcad — ir para o início">
          <Logo />
        </a>

        {/* Menu desktop */}
        <nav aria-label="Navegação principal" className="hidden items-center gap-1 md:flex">
          {navegacao.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={ativo === item.href ? "true" : undefined}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                ativo === item.href
                  ? "bg-rosa-pastel text-rosa"
                  : "text-tinta/70 hover:bg-sol-pastel hover:text-tinta",
              )}
            >
              {item.rotulo}
            </a>
          ))}
          <Button asChild className="ml-2 h-10 rounded-full px-5 text-sm">
            <a href="#contato">Fale com a gente</a>
          </Button>
        </nav>

        {/* Botão do menu mobile */}
        <button
          type="button"
          onClick={() => setAberto((v) => !v)}
          aria-expanded={aberto}
          aria-controls="menu-mobile"
          aria-label={aberto ? "Fechar menu" : "Abrir menu"}
          className="inline-flex size-11 items-center justify-center rounded-full bg-white text-tinta ring-1 ring-border transition-colors hover:bg-sol-pastel focus-visible:ring-3 focus-visible:ring-ring/50 md:hidden"
        >
          {aberto ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Painel mobile */}
      <nav
        id="menu-mobile"
        aria-label="Navegação principal"
        hidden={!aberto}
        className="border-t border-border bg-creme px-4 pt-2 pb-6 md:hidden"
      >
        <ul className="flex flex-col gap-1">
          {navegacao.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setAberto(false)}
                className={cn(
                  "block rounded-2xl px-4 py-3 text-base font-semibold transition-colors",
                  ativo === item.href
                    ? "bg-rosa-pastel text-rosa"
                    : "text-tinta hover:bg-sol-pastel",
                )}
              >
                {item.rotulo}
              </a>
            </li>
          ))}
        </ul>
        <Button asChild className="mt-3 h-12 w-full rounded-full text-base">
          <a href="#contato" onClick={() => setAberto(false)}>
            Fale com a gente
          </a>
        </Button>
      </nav>
    </header>
  );
}
