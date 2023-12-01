const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

// Cria e conecta ao banco de dados SQLite
const db = new sqlite3.Database('./usuarios.db', (err) => {
 if (err) {
   return console.error(err.message);
 }
 console.log('Conectado com sucesso ao banco de dados usuarios.db');
});

// Cria a tabela Usuarios dentro do banco de dados
db.run('CREATE TABLE IF NOT EXISTS Usuarios (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, email TEXT, data_nascimento TEXT)', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Tabela Usuarios criada com sucesso');
});
   
const app = express();

// Configura o body-parser para analisar o corpo das solicitações JSON
app.use(bodyParser.json());

// Rota para criar um novo usuário
app.post('/usuarios', (req, res) => {
 const sql = `INSERT INTO Usuarios (nome, email, data_nascimento) VALUES (?, ?, ?)`;
 const usuario = [req.body.nome, req.body.email, req.body.data_nascimento];
 db.run(sql, usuario, function(err) {
   if (err) {
     return console.error(err.message);
   }
   res.json({id: this.lastID});
 });
});

// Rota para obter todos os usuários
app.get('/usuarios', (req, res) => {
 db.all('SELECT * FROM Usuarios', [], (err, rows) => {
   if (err) {
     return console.error(err.message);
   }
   res.json(rows);
 });
});

// Rota para obter um usuário específico
app.get('/usuarios/:id', (req, res) => {
 db.get('SELECT * FROM Usuarios WHERE id = ?', [req.params.id], (err, row) => {
   if (err) {
     return console.error(err.message);
   }
   res.json(row);
 });
});

// Rota para atualizar um usuário
app.patch('/usuarios/:id', (req, res) => {
 const sql = `UPDATE Usuarios
              SET nome = ?, email = ?, data_nascimento = ?
              WHERE id = ?`;
 const usuario = [req.body.nome, req.body.email, req.body.data_nascimento, req.params.id];
 db.run(sql, usuario, function(err) {
   if (err) {
     return console.error(err.message);
   }
   res.json({id: this.lastID});
 });
});

// Rota para deletar um usuário
app.delete('/usuarios/:id', (req, res) => {
 db.run('DELETE FROM Usuarios WHERE id = ?', req.params.id, function(err) {
   if (err) {
     return console.error(err.message);
   }
   res.json({id: req.params.id});
 });
});

// Inicia o servidor
app.listen(3000, () => {
 console.log('Servidor rodando na porta 3000');
});
