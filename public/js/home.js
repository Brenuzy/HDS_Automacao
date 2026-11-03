document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('token');

  if (!token) {
    window.location.href = 'paginainicial.html';
    return;
  }

  try {
    const response = await fetch('/api/me', {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (response.ok) {
      const usuario = await response.json();
      document.getElementById('dadosUsuario').innerHTML = `
        <p><strong>ID:</strong> ${usuario.id}</p>
        <p><strong>Nome:</strong> ${usuario.nome}</p>
        <p><strong>E-mail:</strong> ${usuario.email}</p>
      `;
    } else {
      localStorage.removeItem('token');
      window.location.href = 'paginainicial.html';
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
  }
});

document.getElementById('btnLogout').addEventListener('click', () => {
  localStorage.removeItem('token');
  window.location.href = 'paginainicial.html';
});