# Starcad Landing Page

Landing page da Starcad, criada para apresentar a marca, destacar produtos, explicar a proposta da empresa e capturar contatos por meio de um formulário integrado.

## Objetivo principal

O projeto tem como foco transformar a presença online da Starcad em uma experiência moderna, visualmente atrativa e preparada para conversão. A página principal reúne:

- apresentação da marca e proposta de valor;
- seção de produtos e diferenciais;
- área de contato com formulário;
- integração com WhatsApp e informações de contato;
- fluxo de captura de leads para a equipe.

## Tecnologias utilizadas

### Frontend
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui e Radix UI
- Lucide React

### Backend
- Node.js
- Express
- CORS
- dotenv
- nodemailer
- express-rate-limit

## Estrutura do projeto

- frontend: pasta `frontend/starcad-lp`
- backend: pasta `backend/starcad-api`

O frontend é a landing page, enquanto o backend recebe as mensagens do formulário, valida os dados, salva um registro e pode enviar e-mail via SMTP.

## Requisitos

- Node.js 20+ (recomendado 20.9+ para o backend)
- npm

## Executando o frontend localmente

Entre na pasta do frontend:

```bash
cd frontend/starcad-lp
npm install
npm run dev
```

A aplicação ficará disponível em:

- http://localhost:3000

## Executando o backend localmente

Entre na pasta do backend:

```bash
cd backend/starcad-api
npm install
cp .env.example .env
npm run dev
```

O backend ficará disponível em:

- http://localhost:4000

## Variáveis de ambiente

O backend usa um arquivo `.env` para configurar portas e envio de e-mail. O exemplo está em `backend/starcad-api/.env.example`.

As principais variáveis são:

- `PORT` — porta da API (padrão: 4000)
- `NODE_ENV` — ambiente de execução
- `ORIGENS_PERMITIDAS` — origens autorizadas a chamar a API
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` — configuração do SMTP para envio de e-mail
- `EMAIL_REMETENTE`, `EMAIL_DESTINO` — remetente e destino das notificações

Se o SMTP não estiver configurado, a API continua funcionando e salva os contatos em arquivo.

## Testando a API

Você pode validar a saúde do backend com:

```bash
curl http://localhost:4000/saude
```

## Fluxo de uso

1. Inicie o frontend e o backend localmente.
2. Acesse a landing page no navegador.
3. Preencha o formulário de contato.
4. A mensagem é validada, salva e, se configurado, enviada por e-mail.

## Deploy

- frontend: pode ser hospedado em plataformas como Vercel;
- backend: pode ser hospedado em Render, Railway ou ambientes similares.

Para o frontend, o endpoint da API pode ser apontado com a variável de ambiente `NEXT_PUBLIC_API_URL`.
