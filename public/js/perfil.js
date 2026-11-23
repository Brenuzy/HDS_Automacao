(function () {
  function sair() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    window.location.href = "/login";
  }

  async function carregarPerfil() {
    const token = localStorage.getItem("token");
    if (!token) return sair();

    try {
      // O servidor descobre quem é pelo token. O front não envia ID nenhum.
      const resposta = await fetch("/api/me", {
        headers: { Authorization: "Bearer " + token }
      });

      if (resposta.status === 401 || resposta.status === 404) {
        return sair(); // token inválido/expirado ou conta removida
      }

      const usuario = await resposta.json();
      if (!resposta.ok) throw new Error(usuario.mensagem || "Erro ao carregar perfil.");

      document.getElementById("perfil-nome").textContent = usuario.nome;
      document.getElementById("perfil-login").textContent = usuario.login;
      document.getElementById("perfil-tipo").textContent =
        usuario.perfil === "admin" ? "Administrador" : "Cliente";
      document.getElementById("avatar").textContent = usuario.nome.charAt(0).toUpperCase();

      // Mantém o dado local em sincronia com o que o servidor confirmou
      localStorage.setItem("usuario", JSON.stringify(usuario));
    } catch (erro) {
      console.error(erro);
      document.getElementById("perfil-nome").textContent = "Não foi possível carregar";
      document.getElementById("perfil-msg").textContent = "Erro ao conectar com o servidor.";
    }
  }

  document.getElementById("btn-sair").addEventListener("click", sair);
  carregarPerfil();
})();   