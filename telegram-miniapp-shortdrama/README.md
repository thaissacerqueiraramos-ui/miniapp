# ShortDrama Telegram Mini App

Mini app em React + JavaScript para Telegram, inspirado em plataformas de mini séries verticais.

## O que vem pronto

- Home com destaque principal
- Busca por título
- Filtro por categorias
- Sessões “Lançamento Novo” e “Mais Popular”
- Página de detalhes da série
- Grade de episódios com episódios grátis e bloqueados
- Integração básica com Telegram WebApp SDK
- Popup nativo do Telegram para episódio bloqueado

## Rodar localmente

```bash
npm install
npm run dev
```

Abra o endereço local gerado pelo Vite.

## Como transformar em Mini App do Telegram

1. Crie um bot no Telegram usando o BotFather.
2. Faça deploy do projeto em um domínio HTTPS, como Vercel, Netlify ou Render.
3. No BotFather, configure o menu button ou Web App URL apontando para sua URL publicada.
4. Para pagamentos, conecte o fluxo do botão “Ver planos” com Telegram Payments, Stripe, Mercado Pago ou Pix via backend próprio.

## Onde trocar os conteúdos

Os dados das séries ficam no array `series`, em `src/main.jsx`.
Troque título, categoria, número de episódios, episódios grátis, capa e sinopse.

## Observação importante

Use apenas vídeos, imagens, músicas e roteiros próprios ou licenciados. Não suba séries de terceiros sem autorização.
