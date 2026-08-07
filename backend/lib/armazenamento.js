import { appendFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";

/**
 * Persistência simples dos contatos em arquivo JSONL (um JSON por linha).
 *
 * Serve como registro histórico e como plano B quando o SMTP não está
 * configurado ou falha — assim nenhuma mensagem de cliente se perde.
 *
 * Para trocar por um banco de verdade (Postgres, Mongo, Supabase), basta
 * reimplementar `salvarContato` mantendo a mesma assinatura.
 */

const ARQUIVO = resolve(process.cwd(), process.env.ARQUIVO_CONTATOS ?? "dados/contatos.jsonl");

export async function salvarContato(dados, extras = {}) {
  const registro = {
    recebidoEm: new Date().toISOString(),
    ...dados,
    ...extras,
  };

  await mkdir(dirname(ARQUIVO), { recursive: true });
  await appendFile(ARQUIVO, `${JSON.stringify(registro)}\n`, "utf8");

  return registro;
}

export const caminhoArquivoContatos = ARQUIVO;
