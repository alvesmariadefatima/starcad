import "dotenv/config";

import cors from "cors";
import express from "express";

import { verificarSmtp } from "./lib/email.js";
import { rotaContato } from "./rotas/contato.js";

/**
 * API da landing page da Starcad.
 * Responsabilidade única: receber o formulário de contato, validar, notificar
 * a equipe por e-mail (Nodemailer) e guardar uma cópia do registro.
 */

const app = express();
const PORTA = Number(process.env.PORT ?? 4000);

// Confia no proxy (Render, Railway, Nginx) para obter o IP real no rate limit.
app.set("trust proxy", 1);

// Body JSON pequeno — o formulário não precisa de mais que isso.
app.use(express.json({ limit: "16kb" }));

/* CORS: em desenvolvimento libera qualquer origem; em produção, só as URLs
   listadas em ORIGENS_PERMITIDAS (separadas por vírgula). */
const origensPermitidas = (process.env.ORIGENS_PERMITIDAS ?? "http://localhost:3000")
  .split(",")
  .map((origem) => origem.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origem, callback) {
      // Requisições sem Origin (curl, Postman, health check) passam.
      if (!origem) return callback(null, true);
      if (process.env.NODE_ENV !== "production") return callback(null, true);
      if (origensPermitidas.includes(origem)) return callback(null, true);
      return callback(new Error(`Origem não permitida: ${origem}`));
    },
    methods: ["POST", "GET", "OPTIONS"],
  }),
);

// Health check para monitoramento e para o deploy saber que subiu.
app.get("/saude", (_requisicao, resposta) => {
  resposta.json({ ok: true, servico: "starcad-api", horario: new Date().toISOString() });
});

app.use(rotaContato);

// 404
app.use((_requisicao, resposta) => {
  resposta.status(404).json({ ok: false, mensagem: "Rota não encontrada." });
});

// Tratador de erros — última linha de defesa.
app.use((erro, _requisicao, resposta, _proximo) => {
  console.error("[erro]", erro.message);
  const status = erro.message?.startsWith("Origem não permitida") ? 403 : 500;
  resposta.status(status).json({ ok: false, mensagem: "Erro ao processar a requisição." });
});

app.listen(PORTA, () => {
  console.log(`[starcad-api] rodando em http://localhost:${PORTA}`);
  console.log(`[starcad-api] origens permitidas: ${origensPermitidas.join(", ")}`);
  void verificarSmtp();
});
