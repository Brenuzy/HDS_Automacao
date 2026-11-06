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