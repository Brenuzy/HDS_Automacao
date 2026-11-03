const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Chave secreta para assinar o Token (mantenha em local seguro em produção)
const SECRET_KEY = 'chave_secreta_hds_automacao';

// Conexão com o banco de dados MySQL
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',      // Altere para o seu utilizador do MySQL
  password: '',      // Altere para a sua palavra-passe do MySQL
  database: 'sistema_cadastro',
  waitForConnections: true,
  connectionLimit: 10
});

// Endpoint de Registo + Autologin
app.post('/api/cadastro', async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
    }

    // 1. Verificar se o e-mail já existe na base de dados
    const [existentes] = await db.query(
      'SELECT id FROM usuarios WHERE email = ?',
      [email]
    );

    if (existentes.length > 0) {
      return res.status(409).json({ erro: 'Este e-mail já está em uso.' });
    }

    // 2. Criptografar a palavra-passe
    const senhaHash = await bcrypt.hash(senha, 10);

    // 3. Inserir o novo utilizador no MySQL
    const [resultado] = await db.query(
      'INSERT INTO usuarios (nome, email, senha_hash) VALUES (?, ?, ?)',
      [nome, email, senhaHash]
    );

    const novoId = resultado.insertId;

    // 4. Gerar Token JWT para autenticação automática
    const token = jwt.sign(
      { id: novoId, email },
      SECRET_KEY,
      { expiresIn: '2h' }
    );

    return res.status(201).json({
      mensagem: 'Conta criada com sucesso!',
      token
    });

  } catch (error) {
    console.error('Erro no servidor:', error);
    return res.status(500).json({ erro: 'Erro interno no servidor.' });
  }
});

// Middleware para verificar se o utilizador possui token válido
function autenticarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ erro: 'Acesso negado.' });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ erro: 'Sessão expirada ou inválida.' });
    req.user = user;
    next();
  });
}

// Endpoint protegido para puxar os dados do utilizador logado
app.get('/api/me', autenticarToken, async (req, res) => {
  try {
    const [linhas] = await db.query(
      'SELECT id, nome, email, criado_em FROM usuarios WHERE id = ?',
      [req.user.id]
    );

    if (linhas.length === 0) {
      return res.status(404).json({ erro: 'Utilizador não encontrado.' });
    }

    return res.json(linhas[0]);
  } catch (error) {
    return res.status(500).json({ erro: 'Erro ao procurar os dados.' });
  }
});

app.listen(3000, () => {
  console.log('Servidor a rodar em http://localhost:3000');
});