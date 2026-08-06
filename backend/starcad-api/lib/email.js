import nodemailer from "nodemailer";

import { escaparHtml } from "./validacao.js";

/**
 * Envio de e-mail via SMTP (Nodemailer).
 *
 * O transporte só é criado se SMTP_HOST, SMTP_USER e SMTP_PASS existirem no
 * ambiente. Sem eles a API continua funcionando e grava o contato em arquivo
 * (ver armazenamento.js) — útil em desenvolvimento e como rede de segurança.
 */

let transporte = null;

export function emailConfigurado() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

function obterTransporte() {
  if (transporte) return transporte;
  if (!emailConfigurado()) return null;

  const porta = Number(process.env.SMTP_PORT ?? 587);

  transporte = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: porta,
    secure: porta === 465, // 465 usa TLS direto; 587 faz STARTTLS
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  return transporte;
}

/** Monta e envia o e-mail com os dados do formulário. */
export async function enviarEmailContato(dados) {
  const smtp = obterTransporte();
  if (!smtp) return { enviado: false, motivo: "smtp-nao-configurado" };

  const assunto = `[Site Starcad] Novo contato de ${dados.nome}`;

  const texto = [
    "Nova mensagem pelo formulário do site:",
    "",
    `Nome: ${dados.nome}`,
    `E-mail: ${dados.email}`,
    `Telefone: ${dados.telefone || "não informado"}`,
    "",
    "Mensagem:",
    dados.mensagem,
  ].join("\n");

  const html = `
    <div style="font-family:system-ui,Segoe UI,Arial,sans-serif;color:#2f2a45;line-height:1.6">
      <h2 style="color:#ff4d80;margin:0 0 16px">Novo contato pelo site</h2>
      <p><strong>Nome:</strong> ${escaparHtml(dados.nome)}</p>
      <p><strong>E-mail:</strong> <a href="mailto:${escaparHtml(dados.email)}">${escaparHtml(dados.email)}</a></p>
      <p><strong>Telefone:</strong> ${escaparHtml(dados.telefone || "não informado")}</p>
      <p style="margin-top:16px"><strong>Mensagem:</strong></p>
      <p style="background:#fff3cc;padding:12px 16px;border-radius:12px;white-space:pre-wrap">${escaparHtml(dados.mensagem)}</p>
    </div>
  `;

  await smtp.sendMail({
    from: process.env.EMAIL_REMETENTE ?? `"Site Starcad" <${process.env.SMTP_USER}>`,
    to: process.env.EMAIL_DESTINO ?? process.env.SMTP_USER,
    replyTo: `"${dados.nome}" <${dados.email}>`, // responder vai direto para o cliente
    subject: assunto,
    text: texto,
    html,
  });

  return { enviado: true };
}

/** Testa a conexão SMTP na subida do servidor (log apenas, não derruba a API). */
export async function verificarSmtp() {
  const smtp = obterTransporte();
  if (!smtp) {
    console.warn("[email] SMTP não configurado — os contatos serão salvos em arquivo.");
    return false;
  }

  try {
    await smtp.verify();
    console.log("[email] SMTP conectado com sucesso.");
    return true;
  } catch (erro) {
    console.error("[email] Falha ao conectar no SMTP:", erro.message);
    return false;
  }
}
