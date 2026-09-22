function fazerLogin(event) {
  // Impede o formulário de recarregar a página imediatamente
  event.preventDefault();

  // Pega os valores digitados
  const email = document.getElementById('loginEmail').value;
  const senha = document.getElementById('loginSenha').value;

  // Validação simples (Substitua depois pela validação no seu backend)
  if (email === "usuario@email.com" && senha === "123456") {
    alert("Login realizado com sucesso!");
    
    window.location.href = "../paginainicial/paginainicial.html";
  } else {
    alert("E-mail ou senha incorretos!");
  }
}