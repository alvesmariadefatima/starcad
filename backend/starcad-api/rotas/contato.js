import { Router } from "express";
import rateLimit from "express-rate-limit";

import { salvarContato } from "../lib/armazenamento.js";
import { emailConfigurado, enviarEmailContato } from "../lib/email.js";
import { validarContato } from "../lib/validacao.js";

export const rotaContato = Router();

/** Limite anti-spam: 5 envios por IP a cada 10 minutos. */
const limitador = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: {
    ok: false,
    mensagem: "Você já enviou várias mensagens. Aguarde alguns minutos e tente de novo.",
  },
});

/**
 * POST /contato
 *
 * Body: { nome, email, telefone?, mensagem }
 *
 * 200 → { ok: true, mensagem }
 * 400 → { ok: false, erros: { campo: "motivo" } }
 * 429 → limite de envios atingido
 * 500 → falha ao processar (a mensagem ainda assim é gravada em arquivo)
 */
rotaContato.post("/contato", limitador, async (requisicao, resposta) => {
  const { ok, erros, dados } = validarContato(requisicao.body);

  if (!ok) {
    return resposta.status(400).json({
      ok: false,
      mensagem: "Confira os campos destacados.",
      erros,
    });
  }

  // Honeypot: campo invisível preenchido = robô. Responde 200 para não dar pista.
  if (typeof requisicao.body?.website === "string" && requisicao.body.website.trim() !== "") {
    return resposta.status(200).json({ ok: true, mensagem: "Mensagem recebida." });
  }

  let emailEnviado = false;
  let erroEmail = null;

  try {
    if (emailConfigurado()) {
      await enviarEmailContato(dados);
      emailEnviado = true;
    }
  } catch (erro) {
    erroEmail = erro;
    console.error("[contato] Falha no envio do e-mail:", erro.message);
  }

  // Guarda sempre — o arquivo é o backup do que chegou.
  try {
    await salvarContato(dados, {
      emailEnviado,
      ip: requisicao.ip,
      origem: requisicao.get("origin") ?? null,
    });
  } catch (erro) {
    console.error("[contato] Falha ao gravar o contato:", erro.message);

    // Nem e-mail nem arquivo: aí sim é erro de verdade para o cliente.
    if (!emailEnviado) {
      return resposta.status(500).json({
        ok: false,
        mensagem: "Não conseguimos registrar sua mensagem agora. Tente pelo WhatsApp, por favor.",
      });
    }
  }

  if (!emailEnviado && erroEmail) {
    // O contato está salvo, mas a equipe não foi notificada por e-mail.
    return resposta.status(200).json({
      ok: true,
      mensagem: "Recebemos sua mensagem! Em breve entramos em contato.",
      aviso: "notificacao-por-email-indisponivel",
    });
  }

  return resposta.status(200).json({
    ok: true,
    mensagem: "Mensagem enviada com sucesso! Respondemos em até 24 horas úteis.",
  });
});
