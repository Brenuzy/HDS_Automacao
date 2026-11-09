const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
const DOOR = 3000;

// ------------------------------------------------------------------
//                      M I D D L E W A R E S
// ------------------------------------------------------------------
app.use(cors());
app.use(express.json());
// Servir ficheiros estáticos (CSS, JS, Imagens da pasta public)
app.use(express.static(path.join(__dirname, 'public')));

// ------------------------------------------------------------------
//                 B A N C O   D E   D A D O S
// ------------------------------------------------------------------
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Sua senha do MySQL
  database: 'BDHDS'
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao ligar ao MySQL:', err.message);
    return;
  }
  console.log('Conectado à base de dados BDHDS!');
});

// ------------------------------------------------------------------
//                   R O T A S   D E   P Á G I N A S
// ------------------------------------------------------------------
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'paginainicial.html'));
});

app.get('/sobre', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'sobre.html'));
});

app.get('/solucoes', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'solucoes.html'));
});

app.get('/contatos', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'contatos.html'));
});

app.get('/produtos', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'produtos.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'login.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'admin.html'));
});

// ------------------------------------------------------------------
//                      A P I / A U T E N T I C A Ç Ã O
// ------------------------------------------------------------------
app.post('/cadastrar', async (req, res) => {
  const { nome, login, senha } = req.body;

  try {
    const senhaHash = await bcrypt.hash(senha, 10);
    const sql = 'INSERT INTO usuarios (nome, login, senha) VALUES (?, ?, ?)';

    db.query(sql, [nome, login, senhaHash], (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ mensagem: 'Este login já existe.' });
        }
        return res.status(500).json({ mensagem: 'Erro ao guardar utilizador.' });
      }
      return res.status(201).json({ mensagem: 'Utilizador cadastrado com sucesso!' });
    });
  } catch (erro) {
    res.status(500).json({ mensagem: 'Erro interno no servidor.' });
  }
});

// Rota dinâmica para produtos específicos (ex: /produto1)
app.get('/produto/:id', (req, res, next) => {
  const { id } = req.params;
  const file = path.join(__dirname, 'pages', 'allproducts', `${id}.html`);
  
  res.sendFile(file, (err) => {
    if (err) {
      next(); // Passa para a rota 404 caso o ficheiro não exista
    }
  });
});

// ------------------------------------------------------------------
//              E R R O   4 0 4 (Sempre no final de tudo)
// ------------------------------------------------------------------
app.use((req, res) => {
  res.status(404).send('<h1>Página não encontrada!</h1>');
});

// ------------------------------------------------------------------
//                          S E R V I D O R
// ------------------------------------------------------------------
app.listen(DOOR, () => {
  console.log(`Servidor a rodar em http://localhost:${DOOR}`);
});