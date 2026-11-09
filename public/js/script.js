let modoCadastro = false;

function alternarModo() {
  modoCadastro = !modoCadastro;

  document.getElementById('titulo').innerText = modoCadastro ? 'CADASTRO' : 'LOGIN';
  document.getElementById('btnSubmit').innerText = modoCadastro ? 'Cadastrar' : 'Entrar';
  document.getElementById('txtSwitch').innerText = modoCadastro ? 'Já tem uma conta?' : 'Não tem uma conta?';
  document.getElementById('btnToggle').innerText = modoCadastro ? 'Entrar.' : 'Cadastre-se.';

  const camposCadastro = document.querySelectorAll('.campo-cadastro');
  camposCadastro.forEach(campo => {
    campo.style.display = modoCadastro ? 'block' : 'none';
    const input = campo.querySelector('input');
    if (input) input.disabled = !modoCadastro;
  });
}

// Função principal acionada pelo envio do formulário
async function tratarSubmissao(event) {
  event.preventDefault(); // Evita recarregar a página

  const loginInput = document.getElementById('login').value;
  const senhaInput = document.getElementById('senha').value;

  if (modoCadastro) {
    const nomeInput = document.getElementById('nome').value;
    await cadastrar(nomeInput, loginInput, senhaInput);
  } else {
    await logar(loginInput, senhaInput);
  }
}

// Envia os dados para a rota do server.js
async function cadastrar(nome, login, senha) {
  try {
    const resposta = await fetch('http://localhost:3000/cadastrar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, login, senha })
    });

    const dados = await resposta.json();
    alert(dados.mensagem);

    if (resposta.ok) {
      alternarModo(); // Volta para a tela de login após cadastrar
    }
  } catch (erro) {
    alert('Erro ao ligar ao servidor.');
  }
}

async function logar(login, senha) {
  // Sua lógica de fetch para a rota de login...
}