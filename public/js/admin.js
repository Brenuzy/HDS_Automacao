(function () {
  const token = localStorage.getItem('token');
  const usuarioSalvo = localStorage.getItem('usuario');
  const usuario = usuarioSalvo ? JSON.parse(usuarioSalvo) : null;

  if (!token || !usuario || usuario.perfil !== 'admin') {
    alert('Acesso restrito! Você não tem permissão para acessar esta página.');
    window.location.href = '/login';
    return;
  }

  function formatarMoeda(valor) {
    return Number(valor || 0).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }

  function formatarData(iso) {
    if (!iso) return '-';
    return new Date(iso).toLocaleString('pt-BR');
  }

  async function carregarPedidosAdmin() {
    const container = document.getElementById('pedidos-admin');
    if (!container) return;

    container.innerHTML = '<p>Carregando pedidos...</p>';

    try {
      const resp = await fetch('/api/admin/pedidos', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (resp.status === 401 || resp.status === 403) {
        alert('Sessão expirada ou sem permissão de administrador.');
        window.location.href = '/login';
        return;
      }

      const dados = await resp.json();

      if (!resp.ok) {
        container.innerHTML = `<p>${dados.mensagem || 'Erro ao carregar pedidos.'}</p>`;
        return;
      }

      const pedidos = dados;

      if (!Array.isArray(pedidos) || pedidos.length === 0) {
        container.innerHTML = '<p>Nenhum pedido registrado ainda.</p>';
        return;
      }

      container.innerHTML = pedidos
        .map((pedido) => {
          const itensHtml = (pedido.itens || [])
            .map((i) => `<li>${i.nome} — Qtd: ${i.quantidade} — ${formatarMoeda(i.preco)}</li>`)
            .join('');

          const isAdminReq = pedido.status_pagamento === 'solicitacao_admin';
          const statusTexto = isAdminReq
            ? 'SOLICITAÇÃO ADMIN (SEM PAGAMENTO)'
            : pedido.status_pagamento;

          return `
            <div class="pedido-card" style="border:1px solid #334155;padding:16px;margin-bottom:14px;border-radius:8px;">
              <div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px;">
                <strong>Pedido #${pedido.id}</strong>
                <span>Status: <strong>${statusTexto}</strong></span>
                <span>Total: <strong>${formatarMoeda(pedido.valor_total)}</strong></span>
              </div>
              <p style="margin:6px 0;font-size:13px;">
                Cliente: <strong>${pedido.usuario_nome}</strong> (${pedido.usuario_login}) |
                Método: ${pedido.metodo_pagamento || '-'} |
                MP ID: ${pedido.mp_payment_id || '-'} |
                Data: ${formatarData(pedido.criado_em)}
              </p>
              <ul style="margin:8px 0 0 18px;font-size:13px;">
                ${itensHtml}
              </ul>
            </div>
          `;
        })
        .join('');
    } catch (erro) {
      console.error('Erro ao carregar pedidos:', erro);
      container.innerHTML = '<p>Erro ao carregar pedidos do servidor.</p>';
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', carregarPedidosAdmin);
  } else {
    carregarPedidosAdmin();
  }
})();