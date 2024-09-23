# MY-CHECKOUT-APP

Este projeto é um sistema de checkout desenvolvido como parte de um teste técnico para uma vaga de estágio. Utilizando Gatsby e Tailwind CSS, o projeto implementa funcionalidades de pagamento com suporte para cartões de crédito e outros métodos de pagamento.

## Descrição do Projeto

O **MY-CHECKOUT-APP** é uma aplicação de checkout simples projetada para demonstrar habilidades de desenvolvimento e design. O sistema permite a seleção entre diferentes métodos de pagamento, valida a entrada de dados do usuário e exibe telas de carregamento e sucesso. O front-end é construído usando Gatsby para garantir um desempenho rápido e otimizado, enquanto o Tailwind CSS é usado para criar um design moderno e responsivo.

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
- **React-icons**: Icones no geral
- **React-spinners**: Icones de Loading

## Pré-requisitos

Para rodar este projeto, você precisará ter instalado em sua máquina:

- Node.js (>= 14.x)
- npm ou yarn

## Instalação

1. Clone este repositório:

```bash
https://github.com/Emaus-Leonardo/my-checkout-app.git
```

2.Acesse o diretorio do projeto:

```bash
cd my-checkout-app
```

3.Instale as dependencias:

```bash
npm install
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
│   │   ├── InputField.js
│   │   ├── Layout.js
│   │   ├── Loading.jsx
│   │   ├── LoadingScreen.js
│   ├── images/
│   │   ├── icon.png
│   │   └── pagamentoImg.png
│   ├── pages/
│   │   ├── 404.jsx
│   │   ├── Checkout.js
│   │   ├── index.js
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
## Demo do Layout

![checkoutApp-demo](https://github.com/user-attachments/assets/1b37f859-ba12-4989-bf5d-03d63248eb8b)


