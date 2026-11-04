(function verificarAcessoAdmin() {
  // 1. Busca os dados salvos no navegador
  const usuarioSalvo = localStorage.getItem("usuario");
  
  // 2. Converte a string JSON para objeto
  const usuario = usuarioSalvo ? JSON.parse(usuarioSalvo) : null;

  // 3. Valida se o usuário existe E se é administrador
  if (!usuario || usuario.perfil !== "admin") {
    alert("Acesso restrito! Você não tem permissão para acessar esta página.");
    window.location.href = "/login"; // Redireciona para o login ou home
  }
})();