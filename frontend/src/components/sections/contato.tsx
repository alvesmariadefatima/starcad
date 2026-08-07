"use client";

import { useState, type FormEvent } from "react";
import {
  CircleAlert,
  CircleCheck,
  Clock,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import { toast } from "sonner";

import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { linkWhatsApp, site } from "@/lib/site";
import {
  formatarTelefone,
  validarContato,
  type DadosContato,
  type ErrosContato,
} from "@/lib/validacao";

/**
 * Seção 4 — Contato
 * Formulário validado no cliente que envia para a API Express (POST /contato),
 * com feedback visual de sucesso/erro, mais os dados da loja física.
 */

/** URL da API. Em produção, definir NEXT_PUBLIC_API_URL no ambiente da Vercel. */
const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

const VAZIO: DadosContato = { nome: "", email: "", telefone: "", mensagem: "" };

type Status = "parado" | "enviando" | "sucesso" | "erro";

export function Contato() {
  const [dados, setDados] = useState<DadosContato>(VAZIO);
  const [erros, setErros] = useState<ErrosContato>({});
  const [status, setStatus] = useState<Status>("parado");
  const [aviso, setAviso] = useState("");

  function atualizar(campo: keyof DadosContato, valor: string) {
    setDados((atual) => ({ ...atual, [campo]: valor }));
    // Limpa o erro do campo assim que o usuário começa a corrigir
    setErros((atual) => ({ ...atual, [campo]: undefined }));
  }

  async function enviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    const encontrados = validarContato(dados);
    setErros(encontrados);

    if (Object.keys(encontrados).length > 0) {
      setStatus("erro");
      setAviso("Confere os campos destacados — falta pouco.");
      // Leva o foco para o primeiro campo com problema (acessibilidade)
      const primeiro = Object.keys(encontrados)[0];
      document.getElementById(primeiro)?.focus();
      return;
    }

    setStatus("enviando");
    setAviso("");

    try {
      const resposta = await fetch(`${API}/contato`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });

      const corpo = await resposta.json().catch(() => ({}));

      if (!resposta.ok) {
        // O backend devolve { erros: { campo: "mensagem" } } quando a validação falha lá
        if (corpo?.erros) setErros(corpo.erros as ErrosContato);
        throw new Error(corpo?.mensagem ?? "Não conseguimos enviar sua mensagem.");
      }

      setStatus("sucesso");
      setAviso("Mensagem enviada! Respondemos em até 24 horas úteis.");
      setDados(VAZIO);
      toast.success("Mensagem enviada com sucesso!");
    } catch (erro) {
      const texto =
        erro instanceof TypeError
          ? "Não conseguimos falar com o servidor. Tente novamente ou chame no WhatsApp."
          : erro instanceof Error
            ? erro.message
            : "Algo deu errado.";
      setStatus("erro");
      setAviso(texto);
      toast.error(texto);
    }
  }

  const enviando = status === "enviando";

  return (
    <section id="contato" className="relative py-20 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -bottom-24 -left-16 size-80 rounded-full bg-menta-pastel blur-3xl" />
        <div className="absolute -top-10 right-0 size-80 rounded-full bg-rosa-pastel blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-sol-pastel px-4 py-1.5 text-sm font-semibold text-[#8a6200]">
            Fale com a gente
          </p>
          <h2 className="mt-4 font-heading text-3xl leading-tight font-semibold text-balance text-tinta sm:text-4xl">
            Conta o que você precisa
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Orçamento, personalização, lista escolar ou só uma dúvida: escreve aqui que a gente
            responde rapidinho.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.15fr_1fr]">
          {/* ------------------------------- Formulário ------------------------------- */}
          <Reveal>
            <form
              onSubmit={enviar}
              noValidate
              className="rounded-3xl bg-white p-6 shadow-xl shadow-tinta/5 ring-1 ring-border sm:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                {/* Nome */}
                <div className="sm:col-span-2">
                  <Label htmlFor="nome" className="mb-2 text-sm font-semibold text-tinta">
                    Nome <span className="text-rosa">*</span>
                  </Label>
                  <Input
                    id="nome"
                    name="nome"
                    autoComplete="name"
                    placeholder="Como podemos te chamar?"
                    value={dados.nome}
                    onChange={(e) => atualizar("nome", e.target.value)}
                    aria-invalid={Boolean(erros.nome)}
                    aria-describedby={erros.nome ? "erro-nome" : undefined}
                    className="h-12 rounded-2xl"
                  />
                  {erros.nome && (
                    <p id="erro-nome" className="mt-1.5 text-sm font-medium text-destructive">
                      {erros.nome}
                    </p>
                  )}
                </div>

                {/* E-mail */}
                <div>
                  <Label htmlFor="email" className="mb-2 text-sm font-semibold text-tinta">
                    E-mail <span className="text-rosa">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="voce@email.com"
                    value={dados.email}
                    onChange={(e) => atualizar("email", e.target.value)}
                    aria-invalid={Boolean(erros.email)}
                    aria-describedby={erros.email ? "erro-email" : undefined}
                    className="h-12 rounded-2xl"
                  />
                  {erros.email && (
                    <p id="erro-email" className="mt-1.5 text-sm font-medium text-destructive">
                      {erros.email}
                    </p>
                  )}
                </div>

                {/* Telefone */}
                <div>
                  <Label htmlFor="telefone" className="mb-2 text-sm font-semibold text-tinta">
                    Telefone <span className="font-normal text-muted-foreground">(opcional)</span>
                  </Label>
                  <Input
                    id="telefone"
                    name="telefone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="(11) 99999-9999"
                    value={dados.telefone}
                    onChange={(e) => atualizar("telefone", formatarTelefone(e.target.value))}
                    aria-invalid={Boolean(erros.telefone)}
                    aria-describedby={erros.telefone ? "erro-telefone" : undefined}
                    className="h-12 rounded-2xl"
                  />
                  {erros.telefone && (
                    <p id="erro-telefone" className="mt-1.5 text-sm font-medium text-destructive">
                      {erros.telefone}
                    </p>
                  )}
                </div>

                {/* Mensagem */}
                <div className="sm:col-span-2">
                  <Label htmlFor="mensagem" className="mb-2 text-sm font-semibold text-tinta">
                    Mensagem <span className="text-rosa">*</span>
                  </Label>
                  <Textarea
                    id="mensagem"
                    name="mensagem"
                    rows={5}
                    maxLength={1500}
                    placeholder="Ex.: quero 20 cadernos personalizados com o nome da turma..."
                    value={dados.mensagem}
                    onChange={(e) => atualizar("mensagem", e.target.value)}
                    aria-invalid={Boolean(erros.mensagem)}
                    aria-describedby={erros.mensagem ? "erro-mensagem" : undefined}
                    className="min-h-32 rounded-2xl"
                  />
                  {erros.mensagem && (
                    <p id="erro-mensagem" className="mt-1.5 text-sm font-medium text-destructive">
                      {erros.mensagem}
                    </p>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                disabled={enviando}
                className="mt-6 h-13 w-full rounded-full text-base shadow-lg shadow-rosa/25"
              >
                {enviando ? (
                  <>
                    <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                    Enviando...
                  </>
                ) : (
                  <>
                    Enviar mensagem
                    <Send className="size-4" aria-hidden="true" />
                  </>
                )}
              </Button>

              {/* Feedback visual — role="status" faz o leitor de tela anunciar */}
              {aviso && (
                <p
                  role="status"
                  aria-live="polite"
                  className={`mt-4 flex items-start gap-2 rounded-2xl px-4 py-3 text-sm font-medium ${
                    status === "sucesso"
                      ? "bg-menta-pastel text-[#0f7a5c]"
                      : "bg-destructive/10 text-destructive"
                  }`}
                >
                  {status === "sucesso" ? (
                    <CircleCheck className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  ) : (
                    <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  )}
                  {aviso}
                </p>
              )}

              <p className="mt-4 text-center text-xs text-muted-foreground">
                Seus dados são usados só para responder este contato.
              </p>
            </form>
          </Reveal>

          {/* --------------------------- Informações da loja --------------------------- */}
          <Reveal delay={120} className="flex flex-col gap-6">
            <div className="rounded-3xl bg-white p-6 shadow-lg shadow-tinta/5 ring-1 ring-border sm:p-8">
              <h3 className="font-heading text-xl font-semibold text-tinta">Nossa loja</h3>

              <ul className="mt-5 space-y-5 text-sm">
                <li className="flex gap-3">
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-2xl bg-rosa-pastel text-rosa">
                    <MapPin className="size-5" aria-hidden="true" />
                  </span>
                  <span>
                    <strong className="block font-semibold text-tinta">Endereço</strong>
                    <a
                      href={site.endereco.mapa}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground underline-offset-4 hover:text-rosa hover:underline"
                    >
                      {site.endereco.rua} — {site.endereco.bairro}
                      <br />
                      {site.endereco.cidade}/{site.endereco.estado} · CEP {site.endereco.cep}
                    </a>
                  </span>
                </li>

                <li className="flex gap-3">
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-2xl bg-menta-pastel text-[#0f7a5c]">
                    <MessageCircle className="size-5" aria-hidden="true" />
                  </span>
                  <span>
                    <strong className="block font-semibold text-tinta">WhatsApp</strong>
                    <a
                      href={linkWhatsApp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground underline-offset-4 hover:text-rosa hover:underline"
                    >
                      {site.contato.whatsappExibicao}
                    </a>
                  </span>
                </li>

                <li className="flex gap-3">
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-2xl bg-ceu-pastel text-[#0b6f95]">
                    <Mail className="size-5" aria-hidden="true" />
                  </span>
                  <span>
                    <strong className="block font-semibold text-tinta">E-mail</strong>
                    <a
                      href={`mailto:${site.contato.email}`}
                      className="text-muted-foreground underline-offset-4 hover:text-rosa hover:underline"
                    >
                      {site.contato.email}
                    </a>
                  </span>
                </li>

                <li className="flex gap-3">
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-2xl bg-sol-pastel text-[#8a6200]">
                    <Phone className="size-5" aria-hidden="true" />
                  </span>
                  <span>
                    <strong className="block font-semibold text-tinta">Telefone</strong>
                    <a
                      href={`tel:+55${site.contato.telefone.replace(/\D/g, "")}`}
                      className="text-muted-foreground underline-offset-4 hover:text-rosa hover:underline"
                    >
                      {site.contato.telefone}
                    </a>
                  </span>
                </li>
              </ul>
            </div>

            {/* Horário de funcionamento */}
            <div className="rounded-3xl bg-gradient-to-br from-lavanda to-ceu p-6 text-white shadow-lg sm:p-8">
              <h3 className="flex items-center gap-2 font-heading text-xl font-semibold">
                <Clock className="size-5" aria-hidden="true" />
                Horário de funcionamento
              </h3>
              <ul className="mt-4 space-y-2 text-sm">
                {site.horarios.map((h) => (
                  <li
                    key={h.dias}
                    className="flex items-baseline justify-between gap-4 border-b border-white/25 pb-2 last:border-0"
                  >
                    <span className="text-white/90">{h.dias}</span>
                    <strong className="font-semibold">{h.horas}</strong>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
