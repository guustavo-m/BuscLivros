# BuscLivros

O **BuscLivros** é uma aplicação web para gerenciamento de livros, com autenticação de usuários e uma API REST integrada a um banco de dados PostgreSQL.

O projeto está dividido em duas partes:

- **Frontend:** interface desenvolvida com React, Vite, Tailwind CSS e React Router.
- **Backend:** API desenvolvida com Node.js e Express, utilizando PostgreSQL, JWT e bcryptjs.

## Funcionalidades

- Tela inicial do BuscLivros.
- Login de usuários.
- Cadastro de usuários.
- Autenticação com token JWT.
- Operações CRUD de livros.
- Operações CRUD de usuários.
- Proteção das rotas de livros e usuários por token.

> O formulário de login já está conectado à API. O formulário de cadastro do frontend ainda está em desenvolvimento e, no momento, apenas valida e exibe os dados no console. O endpoint de cadastro do backend está disponível.

## Tecnologias

- React 19
- Vite
- Tailwind CSS
- React Router
- Node.js
- Express
- PostgreSQL
- JSON Web Token (JWT)
- bcryptjs

## Pré-requisitos

Antes de executar o projeto, instale:

- Node.js e npm
- PostgreSQL
- Um banco de dados PostgreSQL criado para a aplicação

## Configuração do backend

1. Acesse a pasta do backend:

   ```bash
   cd backend
   npm install
   ```

2. Copie o arquivo de exemplo de variáveis de ambiente:

   ```bash
   copy .env.example .env
   ```

   No Linux ou macOS, use `cp .env.example .env`.

3. Edite o arquivo `.env` com os dados do seu PostgreSQL e defina uma chave para o JWT:

   ```env
   DB_USER=seu_usuario_postgres
   DB_HOST=localhost
   DB_NAME=nome_do_banco
   DB_PASSWORD=sua_senha
   DB_PORT=5432
   PORT=3000
   NODE_ENV=development
   JWT_SECRET=uma_chave_secreta
   ```

4. Inicie a API:

   ```bash
   node app.js
   ```

   A API ficará disponível em `http://localhost:3000`.

## Configuração do frontend

Em outro terminal, execute:

```bash
cd frontend
npm install
npm run dev
```

O Vite exibirá no terminal o endereço local do frontend, normalmente `http://localhost:5173`.

Para gerar uma versão de produção:

```bash
npm run build
```

Para verificar o código com ESLint:

```bash
npm run lint
```

## Rotas da API

### Autenticação

| Método | Rota | Descrição | Autenticação |
| --- | --- | --- | --- |
| `POST` | `/api/auth/login` | Realiza login e retorna um token JWT | Não |
| `POST` | `/api/auth/cadastro` | Cadastra um novo usuário | Não |

### Livros

As rotas de livros exigem o cabeçalho `Authorization: Bearer <token>`.

| Método | Rota | Descrição |
| --- | --- | --- |
| `GET` | `/livros` | Lista todos os livros |
| `GET` | `/livros/:id` | Busca um livro pelo ID |
| `POST` | `/livros` | Cadastra um livro |
| `PUT` | `/livros/:id` | Atualiza um livro |
| `DELETE` | `/livros/:id` | Remove um livro |

### Usuários

As rotas de usuários também exigem o cabeçalho `Authorization: Bearer <token>`.

| Método | Rota | Descrição |
| --- | --- | --- |
| `GET` | `/usuarios` | Lista todos os usuários |
| `GET` | `/usuarios/:id` | Busca um usuário pelo ID |
| `POST` | `/usuarios` | Cadastra um usuário |
| `PUT` | `/usuarios/:id` | Atualiza um usuário |
| `DELETE` | `/usuarios/:id` | Remove um usuário |

## Estrutura do projeto

```text
BuscLivros/
├── backend/
│   ├── app.js
│   └── src/
│       ├── config/        # Conexão com o PostgreSQL
│       ├── controllers/   # Regras das requisições
│       ├── middlewares/   # Autenticação JWT
│       ├── models/        # Consultas ao banco
│       └── routes/        # Rotas da API
└── frontend/
    └── src/
        ├── components/    # Componentes reutilizáveis
        ├── pages/         # Telas da aplicação
        └── services/      # Comunicação com a API
```

## Observações

- O PostgreSQL precisa estar em execução antes de iniciar o backend.
- O banco deve conter as tabelas utilizadas pela API, incluindo `usuarios` e `livros`.
- O token JWT gerado no login expira em 2 horas.
- Nunca publique o arquivo `.env` nem compartilhe suas credenciais do banco.

## Autoria

Projeto desenvolvido pelo **Grupo 2** para o curso de Análise e Desenvolvimento de Sistemas do **SENAI - Serviço Nacional de Aprendizagem Industrial**.

## Alunos

- **Líder** - Manuella da Silva Piva.
- **Vice-Líder** - Ayla Cristina da Silva Vilela.
- **Integrante 1** - Maria Vitória Guedes Ferreira.
- **Integrante 2** - Gabriella Camacho Stavarengo.
- **Integrante 3** - Gustavo Millamonte.