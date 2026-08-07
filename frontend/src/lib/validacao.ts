/**
 * Validação do formulário de contato (frontend).
 * As mesmas regras existem no backend em `starcad-api/src/lib/validacao.js` —
 * validar no cliente é conveniência; o servidor é quem realmente garante.
 */

export type DadosContato = {
  nome: string;
  email: string;
  telefone: string;
  mensagem: string;
};

export type ErrosContato = Partial<Record<keyof DadosContato, string>>;

/** Aceita formatos comuns de e-mail sem ser restritivo demais. */
const RE_EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

export function validarContato(dados: DadosContato): ErrosContato {
  const erros: ErrosContato = {};

  const nome = dados.nome.trim();
  if (!nome) erros.nome = "Conta pra gente como podemos te chamar.";
  else if (nome.length < 2) erros.nome = "O nome precisa ter pelo menos 2 letras.";
  else if (nome.length > 80) erros.nome = "Nome muito longo (máximo de 80 caracteres).";

  const email = dados.email.trim();
  if (!email) erros.email = "Precisamos do e-mail para responder.";
  else if (!RE_EMAIL.test(email)) erros.email = "Esse e-mail parece incompleto. Confere?";

  // Telefone é opcional; se preenchido, precisa ter DDD + número (10 ou 11 dígitos)
  const digitos = dados.telefone.replace(/\D/g, "");
  if (digitos && (digitos.length < 10 || digitos.length > 11)) {
    erros.telefone = "Informe DDD + número, ex.: (11) 99999-9999.";
  }

  const mensagem = dados.mensagem.trim();
  if (!mensagem) erros.mensagem = "Escreve um recadinho para a gente.";
  else if (mensagem.length < 10) erros.mensagem = "Conta um pouco mais (mínimo de 10 caracteres).";
  else if (mensagem.length > 1500) erros.mensagem = "Mensagem muito longa (máximo de 1500 caracteres).";

  return erros;
}

/** Máscara progressiva: (11) 99999-9999 */
export function formatarTelefone(valor: string): string {
  const d = valor.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}
