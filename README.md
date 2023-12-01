# Aplicação CRUD com Node.js, Express.js e SQLite

Esta aplicação realiza operações CRUD (Create, Read, Update, Delete) em um banco de dados SQLite usando Node.js e Express.js.

## Dependências

- express: O servidor web.
- body-parser: Analisa o corpo das solicitações HTTP.
- sqlite3: Interage com o banco de dados SQLite.

## Como executar

1. Instale as dependências com `npm install`.
2. Inicie o servidor com `node server.js`.
3. O servidor estará rodando na porta 3000.

## Rotas

- POST /usuarios: Cria um novo usuário.
- GET /usuarios: Obtém todos os usuários.
- GET /usuarios/:id: Obtém um usuário específico.
- PATCH /usuarios/:id: Atualiza um usuário.
- DELETE /usuarios/:id: Deleta um usuário.
