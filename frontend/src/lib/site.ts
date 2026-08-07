/**
 * Dados da Starcad em um único lugar.
 * Trocar contato, endereço, horários ou catálogo aqui reflete na página inteira
 * (navbar, hero, contato, footer, WhatsApp flutuante e dados estruturados de SEO).
 *
 * TODO(cliente): substituir os valores marcados com "placeholder" pelos reais.
 */

export const site = {
  nome: "Starcad",
  slogan: "Transforme suas ideias em papel",
  descricao:
    "Papelaria criativa com cadernos, canetas, adesivos, material escolar e personalizados para quem gosta de criar, organizar e se inspirar.",
  url: "https://www.starcad.com.br", // placeholder — ajustar no deploy

  contato: {
    // placeholder — formato internacional, só dígitos (usado no link do WhatsApp)
    whatsapp: "5511999999999",
    whatsappExibicao: "(11) 99999-9999",
    email: "contato@starcad.com.br",
    telefone: "(11) 3333-3333",
  },

  endereco: {
    rua: "Rua das Artes, 120 — Loja 4",
    bairro: "Centro",
    cidade: "São Paulo",
    estado: "SP",
    cep: "01000-000",
    mapa: "https://maps.google.com/?q=Rua+das+Artes+120+Sao+Paulo",
  },

  horarios: [
    { dias: "Segunda a sexta", horas: "09h às 18h30" },
    { dias: "Sábado", horas: "09h às 14h" },
    { dias: "Domingo e feriados", horas: "Fechado" },
  ],

  redes: {
    instagram: "https://instagram.com/starcad",
    facebook: "https://facebook.com/starcad",
    pinterest: "https://br.pinterest.com/starcad",
  },
} as const;

/** Mensagem pré-preenchida ao abrir a conversa no WhatsApp. */
export const linkWhatsApp = `https://wa.me/${site.contato.whatsapp}?text=${encodeURIComponent(
  "Olá! Vim pelo site da Starcad e gostaria de mais informações.",
)}`;

/** Itens do menu fixo — a ordem aqui é a ordem exibida na navbar. */
export const navegacao = [
  { rotulo: "Home", href: "#home" },
  { rotulo: "Sobre", href: "#sobre" },
  { rotulo: "Produtos", href: "#produtos" },
  { rotulo: "Contato", href: "#contato" },
] as const;
