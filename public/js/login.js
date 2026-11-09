let modoCadastro = false;

function alternarModo() {
  modoCadastro = !modoCadastro;

  // Alterna textos da interface
  document.getElementById('titulo').innerText = modoCadastro ? 'CADASTRO' : 'LOGIN';
  document.getElementById('btnSubmit').innerText = modoCadastro ? 'Cadastrar' : 'Entrar';
  document.getElementById('txtSwitch').innerText = modoCadastro ? 'Já tem uma conta, ' : 'Não tem uma conta,';
  document.getElementById('btnToggle').innerText = modoCadastro ? 'Entrar.' : 'Cadastre-se.';

  // Exibe/oculta e ativa/desativa os campos de cadastro
  const camposCadastro = document.querySelectorAll('.campo-cadastro');
  camposCadastro.forEach(campo => {
    campo.style.display = modoCadastro ? 'block' : 'none';
    const input = campo.querySelector('input');
    if (input) {
      input.disabled = !modoCadastro; // Evita que campos ocultos bloqueiem o envio do formulário
    }
  });
}

// A sua função principal acionada pelo onsubmit
function logar() {
  const loginInput = document.getElementById('login').value;
  const senhaInput = document.getElementById('senha').value;

  if (modoCadastro) {
    const nomeInput = document.getElementById('nome').value;
    console.log("Executando Cadastro:", { nome: nomeInput, login: loginInput, senha: senhaInput });
    // Insira aqui o seu código de cadastro
  } else {
    console.log("Executando Login:", { login: loginInput, senha: senhaInput });
    // Insira aqui o seu código de login
  }
}



function logar(event) {
  if (event) event.preventDefault(); // Impede o recarregamento automático do formulário ao errar a senha

  const loginDigitado = document.getElementById('login').value;
  const senhaDigitada = document.getElementById('senha').value;

  let usuarioLogado = null;

  if (loginDigitado === "admin" && senhaDigitada === "admin") {
    usuarioLogado = {
      nome: "Administrador",
      login: "admin",
      perfil: "admin"
    };
  } else if (loginDigitado === "user" && senhaDigitada === "user") {
    usuarioLogado = {
      nome: "user",
      login: "user",
      perfil: "user"
    };
  }

  if (usuarioLogado) {
    // Guarda o utilizador no localStorage e salva a mensagem temporária para a próxima página
    localStorage.setItem("usuario", JSON.stringify(usuarioLogado));
    sessionStorage.setItem("boasVindas", usuarioLogado.nome);

    // Redireciona imediatamente
    window.location.href = "/";
  } else {
    // Exibe a mensagem de erro na página de login sem usar alert
    const msgElement = document.getElementById("msg");
    if (msgElement) {
      msgElement.textContent = "Login ou senha incorretos!";
      msgElement.className = "error";
    }
  }
}