function logar() {
  const loginDigitado = document.getElementById('login').value;
  const senhaDigitada = document.getElementById('senha').value;

  let usuarioLogado = null;

  // 1. Validação simples das credenciais
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

  // 2. Se a autenticação der certo, SALVA NO LOCALSTORAGE
  if (usuarioLogado) {
    // Converte o objeto para texto JSON e grava na chave "usuario"
    localStorage.setItem("usuario", JSON.stringify(usuarioLogado));
    
    alert(`Bem-vindo, ${usuarioLogado.nome}!`);

    // Redireciona para a página inicial
    window.location.href = "/";
  } else {
    alert("Login ou senha incorretos!");
  }
}