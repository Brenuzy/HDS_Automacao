const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { MercadoPagoConfig, Payment } = require('mercadopago');

const app = express();
const PORT = 3000;

const JWT_SECRET = process.env.JWT_SECRET || 'troque-esta-chave-em-desenvolvimento';
if (!process.env.JWT_SECRET) {
  console.warn('AVISO: JWT_SECRET não definido. Usando chave de desenvolvimento.');
}

const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN || 'SEU_ACCESS_TOKEN_AQUI';
const mpClient = new MercadoPagoConfig({ accessToken: MP_ACCESS_TOKEN });
const mpPayment = new Payment(mpClient);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ------------------------------------------------------------------
//                        B A N C O   D E   D A D O S
// ------------------------------------------------------------------
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'andrade@2710',
  database: 'BDHDS'
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err.message);
    return;
  }
  console.log('Conectado ao banco BDHDS com sucesso!');

  const sqlCriarPedidos = `
    CREATE TABLE IF NOT EXISTS pedidos (
      id INT AUTO_INCREMENT PRIMARY KEY,
      usuario_login VARCHAR(100) NOT NULL,
      mp_payment_id VARCHAR(100),
      status_pagamento VARCHAR(50) NOT NULL,
      metodo_pagamento VARCHAR(50),
      valor_total DECIMAL(10, 2) NOT NULL,
      itens_json LONGTEXT NOT NULL,
      criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  db.query(sqlCriarPedidos, (errTab) => {
    if (errTab) console.error('Erro ao verificar/criar tabela pedidos:', errTab.message);
  });
});

// ------------------------------------------------------------------
//                        H E L P E R S   E   A U T H
// ------------------------------------------------------------------
function autenticar(req, res, next) {
  const cabecalho = req.headers.authorization || '';
  const token = cabecalho.startsWith('Bearer ') ? cabecalho.slice(7) : null;

  if (!token) {
    return res.status(401).json({ mensagem: 'Não autenticado.' });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.login = payload.login;
    next();
  } catch (_) {
    return res.status(401).json({ mensagem: 'Sessão inválida ou expirada.' });
  }
}

function exigirAdmin(req, res, next) {
  db.query('SELECT perfil FROM usuarios WHERE login = ?', [req.login], (err, rows) => {
    if (err) {
      console.error('Erro ao verificar admin:', err);
      return res.status(500).json({ mensagem: 'Erro interno no servidor.' });
    }
    if (!rows.length || rows[0].perfil !== 'admin') {
      return res.status(403).json({ mensagem: 'Acesso restrito.' });
    }
    next();
  });
}

function buscarCarrinhoComTotal(login, callback) {
  const sql = `
    SELECT produto_id, nome, preco, imagem, quantidade
    FROM carrinho
    WHERE usuario_login = ?
  `;
  db.query(sql, [login], (err, itens) => {
    if (err) return callback(err);
    const lista = itens || [];
    const valorTotal = Number(
      lista
        .reduce((acc, item) => acc + Number(item.preco) * Number(item.quantidade), 0)
        .toFixed(2)
    );
    callback(null, lista, valorTotal);
  });
}

// ------------------------------------------------------------------
//                              A P I
// ------------------------------------------------------------------

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
//                     A P I   D O   C A R R I N H O
// ------------------------------------------------------------------

app.get('/api/carrinho', autenticar, (req, res) => {
  const sql = `
    SELECT produto_id, nome, preco, imagem, quantidade
    FROM carrinho
    WHERE usuario_login = ?
    ORDER BY criado_em DESC
  `;

  db.query(sql, [req.login], (err, rows) => {
    if (err) {
      console.error('Erro ao buscar carrinho:', err);
      return res.status(500).json({ mensagem: 'Erro ao carregar o carrinho.' });
    }
    return res.json(rows);
  });
});

app.post('/api/carrinho', autenticar, (req, res) => {
  const { produto_id, nome, preco, imagem, quantidade } = req.body;
  const qtd = Math.max(1, parseInt(quantidade, 10) || 1);

  if (!produto_id || !nome || preco === undefined) {
    return res.status(400).json({ mensagem: 'Dados do produto incompletos.' });
  }

  const sql = `
    INSERT INTO carrinho (usuario_login, produto_id, nome, preco, imagem, quantidade)
    VALUES (?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      quantidade = quantidade + VALUES(quantidade),
      nome = VALUES(nome),
      preco = VALUES(preco),
      imagem = COALESCE(VALUES(imagem), imagem)
  `;

  db.query(
    sql,
    [req.login, String(produto_id), nome, Number(preco), imagem || '/images/PLACEHOLDER.png', qtd],
    (err) => {
      if (err) {
        console.error('Erro ao adicionar ao carrinho:', err);
        return res.status(500).json({ mensagem: 'Erro ao salvar item no carrinho.' });
      }
      return res.status(201).json({ mensagem: 'Produto adicionado ao carrinho!' });
    }
  );
});

app.put('/api/carrinho/:produtoId', autenticar, (req, res) => {
  const { produtoId } = req.params;
  const quantidade = parseInt(req.body.quantidade, 10);

  if (Number.isNaN(quantidade)) {
    return res.status(400).json({ mensagem: 'Quantidade inválida.' });
  }

  if (quantidade <= 0) {
    const sqlDelete = 'DELETE FROM carrinho WHERE usuario_login = ? AND produto_id = ?';
    db.query(sqlDelete, [req.login, produtoId], (err) => {
      if (err) {
        console.error('Erro ao remover item:', err);
        return res.status(500).json({ mensagem: 'Erro ao atualizar carrinho.' });
      }
      return res.json({ mensagem: 'Item removido.' });
    });
    return;
  }

  const sqlUpdate = 'UPDATE carrinho SET quantidade = ? WHERE usuario_login = ? AND produto_id = ?';
  db.query(sqlUpdate, [quantidade, req.login, produtoId], (err) => {
    if (err) {
      console.error('Erro ao atualizar quantidade:', err);
      return res.status(500).json({ mensagem: 'Erro ao atualizar quantidade.' });
    }
    return res.json({ mensagem: 'Quantidade atualizada.' });
  });
});

app.delete('/api/carrinho/:produtoId', autenticar, (req, res) => {
  const { produtoId } = req.params;
  const sql = 'DELETE FROM carrinho WHERE usuario_login = ? AND produto_id = ?';

  db.query(sql, [req.login, produtoId], (err) => {
    if (err) {
      console.error('Erro ao excluir item do carrinho:', err);
      return res.status(500).json({ mensagem: 'Erro ao remover item.' });
    }
    return res.json({ mensagem: 'Item removido com sucesso.' });
  });
});

// ------------------------------------------------------------------
//             P A G A M E N T O   E   P E D I D O S
// ------------------------------------------------------------------

// Solicitação direta de ADMIN (sem pagamento)
app.post('/api/admin/solicitar-pedido', autenticar, exigirAdmin, (req, res) => {
  buscarCarrinhoComTotal(req.login, (err, itens, valorTotal) => {
    if (err) {
      console.error('Erro ao consultar carrinho na solicitação admin:', err);
      return res.status(500).json({ mensagem: 'Erro ao consultar carrinho.' });
    }

    if (!itens.length) {
      return res.status(400).json({ mensagem: 'Seu carrinho está vazio.' });
    }

    const sqlPedido = `
      INSERT INTO pedidos
        (usuario_login, mp_payment_id, status_pagamento, metodo_pagamento, valor_total, itens_json)
      VALUES (?, NULL, 'solicitacao_admin', 'admin_bypass', ?, ?)
    `;

    db.query(sqlPedido, [req.login, valorTotal, JSON.stringify(itens)], (errPedido, result) => {
      if (errPedido) {
        console.error('Erro ao salvar solicitação admin:', errPedido);
        return res.status(500).json({ mensagem: 'Erro ao salvar solicitação.' });
      }

      db.query('DELETE FROM carrinho WHERE usuario_login = ?', [req.login], (errLimpa) => {
        if (errLimpa) console.error('Erro ao limpar carrinho:', errLimpa);
      });

      return res.status(201).json({
        pedido_id: result.insertId,
        status: 'solicitacao_admin',
        valor_total: valorTotal
      });
    });
  });
});

// Processar pagamento via Mercado Pago
app.post('/api/pagamento/processar', autenticar, (req, res) => {
  buscarCarrinhoComTotal(req.login, async (err, itens, valorTotal) => {
    if (err) {
      console.error('Erro ao consultar carrinho no pagamento:', err);
      return res.status(500).json({ mensagem: 'Erro ao consultar carrinho.' });
    }

    if (!itens.length) {
      return res.status(400).json({ mensagem: 'Seu carrinho está vazio.' });
    }

    const { token, installments, payment_method_id, issuer_id, payer } = req.body;

    if (!payer?.email || !payment_method_id) {
      return res.status(400).json({ mensagem: 'Informe e-mail do pagador e método de pagamento.' });
    }

    try {
      const mpBody = {
        transaction_amount: valorTotal,
        description: `Pedido HDS Automação - ${req.login}`,
        payment_method_id,
        payer: {
          email: payer.email,
          first_name: payer.first_name || 'Cliente',
          last_name: payer.last_name || 'HDS',
          ...(payer.identification ? { identification: payer.identification } : {})
        }
      };

      if (token) mpBody.token = token;
      if (installments) mpBody.installments = Number(installments);
      if (issuer_id) mpBody.issuer_id = Number(issuer_id);

      const response = await mpPayment.create({ body: mpBody });

      const mpId = String(response.id);
      const statusPagamento = response.status || 'pending';
      const metodoPagamento = response.payment_method_id || payment_method_id;

      const sqlPedido = `
        INSERT INTO pedidos
          (usuario_login, mp_payment_id, status_pagamento, metodo_pagamento, valor_total, itens_json)
        VALUES (?, ?, ?, ?, ?, ?)
      `;

      db.query(
        sqlPedido,
        [req.login, mpId, statusPagamento, metodoPagamento, valorTotal, JSON.stringify(itens)],
        (errPedido, result) => {
          if (errPedido) {
            console.error('Erro ao salvar pedido:', errPedido);
            return res.status(500).json({ mensagem: 'Erro ao salvar o pedido.' });
          }

          db.query('DELETE FROM carrinho WHERE usuario_login = ?', [req.login], (errLimpa) => {
            if (errLimpa) console.error('Erro ao limpar carrinho:', errLimpa);
          });

          return res.status(201).json({
            pedido_id: result.insertId,
            mp_payment_id: mpId,
            status: statusPagamento,
            metodo_pagamento: metodoPagamento,
            valor_total: valorTotal,
            status_detail: response.status_detail,
            qr_code: response.point_of_interaction?.transaction_data?.qr_code || null,
            qr_code_base64: response.point_of_interaction?.transaction_data?.qr_code_base64 || null,
            ticket_url: response.transaction_details?.external_resource_url || null
          });
        }
      );
    } catch (erroMp) {
      console.error('Erro Mercado Pago:', erroMp);
      const msg = erroMp?.cause?.[0]?.description || erroMp?.message || 'Falha ao processar pagamento.';
      return res.status(400).json({ mensagem: msg });
    }
  });
});

app.get('/api/admin/pedidos', autenticar, exigirAdmin, (req, res) => {
  const sql = `
    SELECT
      p.id,
      p.usuario_login,
      u.nome AS usuario_nome,
      p.mp_payment_id,
      p.status_pagamento,
      p.metodo_pagamento,
      p.valor_total,
      p.itens_json,
      p.criado_em
    FROM pedidos p
    LEFT JOIN usuarios u ON u.login = p.usuario_login
    ORDER BY p.criado_em DESC
  `;

  db.query(sql, (err, rows) => {
    if (err) {
      console.error('Erro ao buscar pedidos:', err);
      return res.status(500).json({ mensagem: 'Erro ao buscar pedidos.' });
    }

    const pedidos = rows.map((r) => {
      let itens = [];
      try {
        itens = JSON.parse(r.itens_json || '[]');
      } catch (_) {
        itens = [];
      }
      return {
        id: r.id,
        usuario_login: r.usuario_login,
        usuario_nome: r.usuario_nome || r.usuario_login,
        mp_payment_id: r.mp_payment_id,
        status_pagamento: r.status_pagamento,
        metodo_pagamento: r.metodo_pagamento,
        valor_total: Number(r.valor_total),
        itens,
        criado_em: r.criado_em
      };
    });

    return res.json(pedidos);
  });
});

process.on('uncaughtException', (err) => {
  console.error('Erro não capturado no Node:', err);
});

process.on('unhandledRejection', (err) => {
  console.error('Promise rejeitada sem catch:', err);
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
app.get('/carrinho', pagina('carrinho.html'));
app.get('/compra', pagina('compra.html'));
app.get('/produtos', pagina('produtos.html'));
app.get('/login', pagina('login.html'));
app.get('/perfil', pagina('perfil.html'));
app.get('/admin', pagina('admin.html'));

app.get('/:id', (req, res, next) => {
  const id = path.basename(req.params.id);
  res.sendFile(path.join(__dirname, 'pages', 'allproducts', `${id}.html`), (err) => {
    if (err) next();
  });
});

app.use((req, res) => {
  res.status(404).send('<h1>Página não encontrada!</h1>');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});