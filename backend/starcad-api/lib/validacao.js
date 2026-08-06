/**
 * Validação e limpeza dos dados do formulário de contato.
 *
 * Espelha as regras do frontend (starcad-lp/src/lib/validacao.ts), mas quem
 * manda é este arquivo: a validação do navegador pode ser burlada facilmente.
 */

const RE_EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

/**
 * Remove caracteres de controle (preservando quebra de linha e tabulação)
 * e espaços das pontas. Evita cabeçalhos forjados e lixo invisível no e-mail.
 */
function limpar(valor) {
  if (typeof valor !== "string") return "";

  let saida = "";
  for (const caractere of valor) {
    const codigo = caractere.codePointAt(0);
    const ehControle = (codigo < 32 && caractere !== "\n" && caractere !== "\t") || codigo === 127;
    if (!ehControle) saida += caractere;
  }
  return saida.trim();
}

/**
 * @param {unknown} corpo body da requisição
 * @returns {{ ok: boolean, erros: Record<string,string>, dados: {nome:string,email:string,telefone:string,mensagem:string} }}
 */
export function validarContato(corpo) {
  const entrada = corpo && typeof corpo === "object" ? corpo : {};

  const dados = {
    nome: limpar(entrada.nome).slice(0, 80),
    email: limpar(entrada.email).slice(0, 160).toLowerCase(),
    telefone: limpar(entrada.telefone).slice(0, 20),
    mensagem: limpar(entrada.mensagem).slice(0, 1500),
  };

  const erros = {};

  if (!dados.nome) erros.nome = "Informe seu nome.";
  else if (dados.nome.length < 2) erros.nome = "O nome precisa ter pelo menos 2 letras.";

  if (!dados.email) erros.email = "Informe seu e-mail.";
  else if (!RE_EMAIL.test(dados.email)) erros.email = "E-mail inválido.";

  const digitos = dados.telefone.replace(/\D/g, "");
  if (digitos && (digitos.length < 10 || digitos.length > 11)) {
    erros.telefone = "Informe DDD + número, ex.: (11) 99999-9999.";
  }

  if (!dados.mensagem) erros.mensagem = "Escreva sua mensagem.";
  else if (dados.mensagem.length < 10)
    erros.mensagem = "Mensagem muito curta (mínimo de 10 caracteres).";

  return { ok: Object.keys(erros).length === 0, erros, dados };
}

/** Escapa HTML para montar o corpo do e-mail sem risco de injeção. */
export function escaparHtml(texto) {
  return String(texto)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
