# MY-CHECKOUT-APP

Este é um projeto de checkout desenvolvido utilizando **Gatsby** e **Tailwind CSS**, que implementa funcionalidades de pagamento com a possibilidade de utilizar cartão de crédito ou outros métodos de pagamento. 

## Índice

- [Descrição do Projeto](#descrição-do-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Rodando o Projeto](#rodando-o-projeto)
- [Estrutura de Pastas](#estrutura-de-pastas)

## Descrição do Projeto

O **MY-CHECKOUT-APP** é um sistema simples de checkout que permite o pagamento por diferentes métodos, com validação de dados e exibição de telas de carregamento e sucesso. O projeto foi estilizado usando **Tailwind CSS**, e utiliza **Gatsby** para gerar um front-end rápido e otimizado.

## Tecnologias Utilizadas

As principais bibliotecas e ferramentas usadas neste projeto incluem:

- **Gatsby**: Framework baseado em React para construir sites estáticos.
- **React**: Biblioteca JavaScript para criar interfaces de usuário.
- **Tailwind CSS**: Framework CSS utilitário para estilizar os componentes.
- **Zod**: Para validação de dados e schemas de formulários.
- **React Router**: Gerenciamento de navegação no projeto.
- **Prettier**: Ferramenta para formatação automática de código.
- **ESLint**: Linting para JavaScript, com regras de acessibilidade (jsx-a11y).

### Outras dependências

- **PostCSS**: Usado junto com Tailwind para processar o CSS.
- **Autoprefixer**: Usado com PostCSS para adicionar prefixos CSS automaticamente para compatibilidade com diferentes navegadores.

## Pré-requisitos

Para rodar este projeto, você precisará ter instalado em sua máquina:

- Node.js (>= 14.x)
- npm ou yarn

## Instalação

1. Clone este repositório:

```bash
git clone https://github.com/seu-usuario/my-checkout-app.git
```

2.Acesse o diretorio do projeto:

```bash
cd my-checkout-app
```

Rodando o Projeto

Para rodar o projeto em modo de desenvolvimento, use o comando:

```bash
npm run develop
# ou
yarn develop
```

O site estará disponível em http://localhost:8000.

## Para fazer o build de produção:

```bash
npm run build
# ou
yarn build
```

## Estrutura de Pastas

Aqui está a estrutura básica de pastas do projeto:

```bash
MY-CHECKOUT-APP/
├── .cache/
├── node_modules/
├── public/
├── src/
│   ├── components/
│   │   ├── Footer.js
│   │   ├── Header.js
│   │   ├── Layout.js
│   │   ├── Loading.jsx
│   │   ├── LoadingScreen.js
│   ├── images/
│   │   ├── icon.png
│   │   └── pagamentoImg.png
│   ├── pages/
│   │   ├── 404.jsx
│   │   ├── Checkout.js
│   │   ├── SolicitarValor.js
│   │   └── sucesso.js
│   ├── styles/
│   │   └── global.css
├── .gitignore
├── gatsby-browser.js
├── gatsby-config.js
├── package-lock.json
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── README.md
```
