let modoCadastro = false;

function mostrarMsg(texto, tipo) {
  const msg = document.getElementById('msg');
  if (!msg) return;
  msg.textContent = texto;
  msg.className = tipo; // 'error' ou 'success'
}

function alternarModo() {
  modoCadastro = !modoCadastro;

  document.getElementById('titulo').innerText = modoCadastro ? 'CADASTRO' : 'LOGIN';
  document.getElementById('btnSubmit').innerText = modoCadastro ? 'Cadastrar' : 'Entrar';
  document.getElementById('txtSwitch').innerText = modoCadastro ? 'Já tem uma conta, ' : 'Não tem uma conta,';
  document.getElementById('btnToggle').innerText = modoCadastro ? 'Entrar.' : 'Cadastre-se.';

  // Mostra/oculta o campo de nome e só exige ele no cadastro
  document.querySelectorAll('.campo-cadastro').forEach((campo) => {
    campo.style.display = modoCadastro ? 'block' : 'none';
    const input = campo.querySelector('input');
    if (input) {
      input.disabled = !modoCadastro;
      input.required = modoCadastro;
    }
  });

  document.getElementById('msg').textContent = '';
}

// Chamada pelo onsubmit do formulário: <form onsubmit="enviarFormulario(event)">
async function enviarFormulario(event) {
  event.preventDefault();

  const login = document.getElementById('login').value.trim();
  const senha = document.getElementById('senha').value;

  if (modoCadastro) {
    const nome = document.getElementById('nome').value.trim();
    await cadastrar(nome, login, senha);
  } else {
    await logar(login, senha);
  }
}

async function cadastrar(nome, login, senha) {
  try {
    const resposta = await fetch('/api/cadastrar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, login, senha })
    });

    const dados = await resposta.json();

    if (resposta.ok) {
      alternarModo(); // volta para a tela de login
      document.getElementById('senha').value = '';
      mostrarMsg(dados.mensagem, 'success');
    } else {
      mostrarMsg(dados.mensagem, 'error');
    }
  } catch (erro) {
    console.error(erro);
    mostrarMsg('Erro ao conectar com o servidor.', 'error');
  }
}

async function logar(login, senha) {
  try {
    const resposta = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ login, senha })
    });

    const dados = await resposta.json();

    if (resposta.ok) {
      localStorage.setItem('token', dados.token);
      localStorage.setItem('usuario', JSON.stringify(dados.usuario));
      sessionStorage.setItem('boasVindas', dados.usuario.nome);
      window.location.href = '/';
    } else {
      mostrarMsg(dados.mensagem, 'error');
    }
  } catch (erro) {
    console.error(erro);
    mostrarMsg('Erro ao conectar com o servidor.', 'error');
  }
}