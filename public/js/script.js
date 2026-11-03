document.getElementById('cadForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const senha = document.getElementById('senha').value;
  const confirmarSenha = document.getElementById('confirmarSenha').value;
  const msgDiv = document.getElementById('msg');

  if (senha !== confirmarSenha) {
    msgDiv.textContent = 'As senhas não coincidem!';
    msgDiv.className = 'error';
    return;
  }

  try {
    const response = await fetch('/api/cadastro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, senha })
    });

    const data = await response.json();

    if (response.ok) {
      // Salva o token da sessão no navegador
      localStorage.setItem('token', data.token);
      // Redireciona imediatamente para a página inicial
      window.location.href = 'home.html';
    } else {
      msgDiv.textContent = data.erro;
      msgDiv.className = 'error';
    }
  } catch (err) {
    msgDiv.textContent = 'Erro ao conectar com o servidor.';
    msgDiv.className = 'error';
  }
});