# SCoordena

O Scoordena é uma aplicação fullstack desenvolvida como parte do projeto final do curso de backend ofertado pelo SENAC PE. Esta plataforma é projetada com duas visões distintas para atender diferentes necessidades: a visão do administrador e a visão do usuário. Os administradores do sistema têm a capacidade de cadastrar novos eventos, gerenciar informações detalhadas dos mesmos e analisar diversas métricas. Por outro lado, os usuários podem explorar uma ampla gama de eventos disponíveis, inscrever-se neles e fornecer feedbacks detalhados, avaliando os eventos.

## 👾 Experimente

Para acessar o projeto, clique no link: [SCoordena](https://scoordena.vercel.app/).

## 💻 Imagens da plataforma

<img src="https://i.imgur.com/41qOQU2.png" width="1920"/>

### Dashboard

<img src="https://i.imgur.com/1fZac5Y.png" width="1920"/>

### Eventos

<img src="https://i.imgur.com/wJTgrwG.png" width="1920"/>

## 🚀 Início

Estas instruções permitirão que você obtenha uma cópia do projeto em execução na sua máquina local para fins de desenvolvimento e teste.

### 📋 Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas:

- [Git](https://git-scm.com)
- [NodeJS](https://nodejs.org/en)
- [PostgreSQL](https://www.postgresql.org/download/)
- Um IDE como [Visual Studio Code](https://code.visualstudio.com/Download) (opcional, mas recomendado)

### 🔧 Instalação

Siga os passos abaixo para configurar e executar o projeto localmente:

```bash
# Clone o repositório
$ git clone https://github.com/GabrielFeijo/SCoordena
```

```bash
# Acesse a pasta do projeto em terminal/cmd
$ cd SCoordena/app

# Instale as dependências
npm install

# Configure as variáveis de ambiente no arquivo .env
DATABASE_URL="string"
GOOGLE_CLIENT_ID="string"
GOOGLE_CLIENT_SECRET="string"
NEXTAUTH_SECRET="string"
NEXTAUTH_URL="http://localhost:3000"
NODE_ENV="development"

# Inicie a aplicação em DEV:
$ npm run dev
```

## 🛠️ Feito utilizando

### FrontEnd

<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="40" height="45" /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" width="40" height="45" /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" width="40" height="45" /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" width="45" height="45"/>

### BackEnd

<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="40" height="45" /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastify/fastify-plain.svg" width="40" height="45" /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" width="40" height="45" /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg" width="40" height="45" />
