const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;

// Chave usada para assinar os tokens de login.
// Em produção, defina a variável de ambiente JWT_SECRET com um valor longo e aleatório.
const JWT_SECRET = process.env.JWT_SECRET || 'troque-esta-chave-em-desenvolvimento';
if (!process.env.JWT_SECRET) {
  console.warn('AVISO: JWT_SECRET não definido. Usando chave de desenvolvimento.');
}

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ------------------------------------------------------------------
//                        B A N C O   D E   D A D O S
// ------------------------------------------------------------------
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'andrade@2710', // coloque a senha do MySQL se houver
  database: 'BDHDS'
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err.message);
    return;
  }
  console.log('Conectado ao banco BDHDS com sucesso!');
});

// ------------------------------------------------------------------
//                              A P I
// ------------------------------------------------------------------

// Cadastro
app.post('/api/cadastrar', async (req, res) => {
  const { nome, login, senha } = req.body;

  if (!nome || !login || !senha) {
    return res.status(400).json({ mensagem: 'Preencha nome, login e senha.' });
  }

  try {
    const senhaHash = await bcrypt.hash(senha, 10);
    const sql = 'INSERT INTO usuarios (nome, login, senha) VALUES (?, ?, ?)';

    db.query(sql, [nome, login, senhaHash], (err) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ mensagem: 'Este login já está em uso.' });
        }
        console.error('Erro na query de cadastro:', err);
        return res.status(500).json({ mensagem: 'Erro ao salvar usuário no banco.' });
      }
      return res.status(201).json({ mensagem: 'Cadastro realizado! Faça login.' });
    });
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ mensagem: 'Erro interno no servidor.' });
  }
});

// Login
app.post('/api/login', (req, res) => {
  const { login, senha } = req.body;

  if (!login || !senha) {
    return res.status(400).json({ mensagem: 'Informe login e senha.' });
  }

  const sql = 'SELECT nome, login, senha, perfil FROM usuarios WHERE login = ?';

  db.query(sql, [login], async (err, rows) => {
    if (err) {
      console.error('Erro na query de login:', err);
      return res.status(500).json({ mensagem: 'Erro ao consultar o banco.' });
    }

    if (rows.length === 0) {
      return res.status(401).json({ mensagem: 'Login ou senha incorretos!' });
    }

    try {
      const usuario = rows[0];
      const senhaOk = await bcrypt.compare(senha, usuario.senha);

      if (!senhaOk) {
        return res.status(401).json({ mensagem: 'Login ou senha incorretos!' });
      }

      // Token que prova quem está logado (vale por 2 horas)
      const token = jwt.sign({ login: usuario.login }, JWT_SECRET, { expiresIn: '2h' });

      return res.json({
        mensagem: 'Login realizado com sucesso!',
        token,
        usuario: { nome: usuario.nome, login: usuario.login, perfil: usuario.perfil }
      });
    } catch (erro) {
      console.error(erro);
      return res.status(500).json({ mensagem: 'Erro interno no servidor.' });
    }
  });
});

// Middleware: só deixa passar quem enviou um token válido
function autenticar(req, res, next) {
  const cabecalho = req.headers.authorization || '';
  const token = cabecalho.startsWith('Bearer ') ? cabecalho.slice(7) : null;

  if (!token) {
    return res.status(401).json({ mensagem: 'Não autenticado.' });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.login = payload.login; // quem está logado, definido pelo servidor
    next();
  } catch (erro) {
    return res.status(401).json({ mensagem: 'Sessão inválida ou expirada.' });
  }
}

// Perfil da conta logada (o servidor descobre quem é pelo token, nunca pela URL)
app.get('/api/me', autenticar, (req, res) => {
  const sql = 'SELECT nome, login, perfil FROM usuarios WHERE login = ?';

  db.query(sql, [req.login], (err, rows) => {
    if (err) {
      console.error('Erro na query de perfil:', err);
      return res.status(500).json({ mensagem: 'Erro ao consultar o banco.' });
    }
    if (rows.length === 0) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
    }
    return res.json(rows[0]);
  });
});

// ------------------------------------------------------------------
//                          P Á G I N A S
// ------------------------------------------------------------------
const pagina = (arquivo) => (req, res) =>
  res.sendFile(path.join(__dirname, 'pages', arquivo));

app.get('/', pagina('paginainicial.html'));
app.get('/sobre', pagina('sobre.html'));
app.get('/solucoes', pagina('solucoes.html'));
app.get('/contatos', pagina('contatos.html'));
app.get('/cart', pagina('carrinho.html'));
app.get('/produtos', pagina('produtos.html'));
app.get('/login', pagina('login.html'));
app.get('/perfil', pagina('perfil.html'));
app.get('/admin', pagina('admin.html'));

// Todos os produtos: /nome-do-produto -> pages/allproducts/nome-do-produto.html
app.get('/:id', (req, res, next) => {
  const id = path.basename(req.params.id); // evita "../" na URL
  res.sendFile(path.join(__dirname, 'pages', 'allproducts', `${id}.html`), (err) => {
    if (err) next(); // não achou o arquivo: cai no 404 abaixo
  });
});

// Rota não encontrada
app.use((req, res) => {
  res.status(404).send('<h1>Página não encontrada!</h1>');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});