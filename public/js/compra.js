(function () {
  async function inicializarPagamento() {
    function obterTokenValido() {
      const t = localStorage.getItem('token');
      if (!t || t === 'null' || t === 'undefined' || !t.trim()) {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        window.location.replace('/login');
        return null;
      }
      return t.trim();
    }

    const token = obterTokenValido();
    if (!token) return;

    function criarHeaders() {
      const currentToken = obterTokenValido();
      if (!currentToken) return null;
      return {
        Authorization: `Bearer ${currentToken}`,
        'Content-Type': 'application/json'
      };
    }

    function redirecionarSessaoExpirada() {
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
      window.location.replace('/login');
    }

    const subtituloEl = document.getElementById('compra-subtitulo');
    const listaEl = document.getElementById('compra-lista-itens');
    const blocoTotalEl = document.getElementById('compra-bloco-total');
    const totalEl = document.getElementById('compra-total');
    const areaAdminEl = document.getElementById('area-admin-solicitar');
    const btnAdminEl = document.getElementById('btn-enviar-admin');
    const areaCheckoutEl = document.getElementById('area-checkout');
    const confirmacaoEl = document.getElementById('compra-confirmacao');
    const avisoMpEl = document.getElementById('aviso-mp-status');

    function formatarBRL(valor) {
      return Number(valor || 0).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      });
    }

    function obterDadosCliente() {
      const nome = (document.getElementById('cliente-nome')?.value || '').trim();
      const email = (document.getElementById('cliente-email')?.value || '').trim();
      const cpfEl = document.getElementById('cliente-cpf');
      const cpfLimpo = cpfEl ? cpfEl.value.replace(/\D/g, '') : '';
      const cep = (document.getElementById('cliente-cep')?.value || '').trim();
      const cidade = (document.getElementById('cliente-cidade')?.value || '').trim();
      const endereco = (document.getElementById('cliente-endereco')?.value || '').trim();
      const numero = (document.getElementById('cliente-numero')?.value || '').trim();

      if (!nome || !email || !cep || !cidade || !endereco || !numero) {
        alert('Preencha nome, e-mail e endereço completo para continuar.');
        return null;
      }

      if (cpfEl && cpfLimpo.length !== 11 && cpfLimpo.length !== 14) {
        alert('Informe um CPF (11 dígitos) ou CNPJ (14 dígitos) válido.');
        return null;
      }

      return {
        nome,
        email,
        identification:
          cpfLimpo.length === 11 || cpfLimpo.length === 14
            ? { type: cpfLimpo.length === 14 ? 'CNPJ' : 'CPF', number: cpfLimpo }
            : undefined,
        endereco: `${endereco}, ${numero} - ${cidade} (CEP: ${cep})`
      };
    }

    async function enviarPagamento(payloadExtra) {
      const headers = criarHeaders();
      if (!headers) return;

      const cliente = obterDadosCliente();
      if (!cliente) return;

      const bodyEnvio = {
        ...payloadExtra,
        cliente_nome: cliente.nome,
        endereco_entrega: cliente.endereco,
        payer: {
          ...(payloadExtra.payer || {}),
          email: (payloadExtra.payer && payloadExtra.payer.email) || cliente.email,
          ...(payloadExtra.payer?.identification || cliente.identification
            ? { identification: payloadExtra.payer?.identification || cliente.identification }
            : {})
        }
      };

      const res = await fetch('/api/pagamento/processar', {
        method: 'POST',
        headers,
        body: JSON.stringify(bodyEnvio)
      });

      if (res.status === 401) {
        redirecionarSessaoExpirada();
        return;
      }

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        alert(data.mensagem || 'Não foi possível concluir o pagamento.');
        throw new Error(data.mensagem || 'Erro no pagamento');
      }

      areaCheckoutEl.style.display = 'none';
      listaEl.innerHTML = '';
      blocoTotalEl.style.display = 'none';
      subtituloEl.textContent = 'Pedido registrado com sucesso!';

      if (typeof carregarCarrinho === 'function') {
        carregarCarrinho();
      }

      let detalhePagamentoHtml = '';
      if (data.qr_code_base64) {
        detalhePagamentoHtml = `
          <div class="pix-area">
            <h3>Pagamento via Pix</h3>
            <img src="data:image/png;base64,${data.qr_code_base64}" alt="QR Code Pix">
            <div class="pix-copia">${data.qr_code || ''}</div>
          </div>
        `;
      } else if (data.ticket_url) {
        detalhePagamentoHtml = `
          <p><a href="${data.ticket_url}" target="_blank" class="compra-btn-link">Ver Boleto / Comprovante</a></p>
        `;
      }

      confirmacaoEl.innerHTML = `
        <div class="comprovante-box">
          <h2>Compra Finalizada — Pedido #${data.pedido_id}</h2>
          <p><strong>Cliente:</strong> ${cliente.nome} (${cliente.email})</p>
          <p><strong>Endereço:</strong> ${cliente.endereco}</p>
          <p><strong>Status do pagamento:</strong> ${data.status}</p>
          <p><strong>Método:</strong> ${data.metodo_pagamento || '-'}</p>
          <p><strong>ID Mercado Pago:</strong> ${data.mp_payment_id}</p>
          <p><strong>Valor Total:</strong> ${formatarBRL(data.valor_total)}</p>
          ${detalhePagamentoHtml}
          <a href="/produtos" class="compra-btn-link">Voltar ao Catálogo</a>
        </div>
      `;
    }

    try {
      const usuarioSalvo = JSON.parse(localStorage.getItem('usuario') || 'null');
      const isAdmin = Boolean(usuarioSalvo && usuarioSalvo.perfil === 'admin');

      const headers = criarHeaders();
      if (!headers) return;

      const resp = await fetch('/api/carrinho', { headers });
      if (resp.status === 401) {
        redirecionarSessaoExpirada();
        return;
      }

      const itens = await resp.json().catch(() => []);
      if (!Array.isArray(itens) || itens.length === 0) {
        subtituloEl.textContent = 'Seu carrinho está vazio.';
        listaEl.innerHTML = `
          <div class="compra-vazio">
            <p>Adicione produtos antes de avançar para o pagamento.</p>
            <a href="/produtos" class="compra-btn-link">Ir para Produtos</a>
          </div>
        `;
        return;
      }

      const valorTotal = Number(
        itens.reduce((acc, item) => acc + Number(item.preco || 0) * Number(item.quantidade || 1), 0).toFixed(2)
      );

      listaEl.innerHTML = itens
        .map((item) => {
          const qtd = Number(item.quantidade || 1);
          const subtotalItem = Number(item.preco || 0) * qtd;
          const img = item.imagem || '/images/PLACEHOLDER.png';
          return `
            <li class="compra-item">
              <div class="compra-item-esq">
                <img src="${img}" alt="${item.nome}" onerror="this.src='/images/PLACEHOLDER.png'">
                <div>
                  <div class="compra-item-nome">${item.nome}</div>
                  <div class="compra-item-qtd">Unitário: ${formatarBRL(item.preco)} • Qtd: ${qtd}</div>
                </div>
              </div>
              <div class="compra-item-preco">${formatarBRL(subtotalItem)}</div>
            </li>
          `;
        })
        .join('');

      totalEl.textContent = formatarBRL(valorTotal);
      blocoTotalEl.style.display = 'flex';

      if (isAdmin) {
        subtituloEl.textContent = 'Confira os itens abaixo e envie a solicitação para a página de admin:';
        areaCheckoutEl.style.display = 'none';
        if (areaAdminEl) areaAdminEl.style.display = 'block';

        if (btnAdminEl) {
          btnAdminEl.addEventListener('click', async () => {
            btnAdminEl.disabled = true;
            try {
              const resAdmin = await fetch('/api/admin/solicitar-pedido', {
                method: 'POST',
                headers
              });
              if (resAdmin.status === 401) {
                redirecionarSessaoExpirada();
                return;
              }
              const dataAdmin = await resAdmin.json().catch(() => ({}));
              if (!resAdmin.ok) {
                alert(dataAdmin.mensagem || 'Erro ao enviar solicitação para admin.');
                return;
              }
              if (typeof carregarCarrinho === 'function') {
                carregarCarrinho();
              }
              window.location.href = '/admin';
            } finally {
              btnAdminEl.disabled = false;
            }
          });
        }
        return;
      }

      if (usuarioSalvo && usuarioSalvo.nome) {
        document.getElementById('cliente-nome').value = usuarioSalvo.nome;
      }

      subtituloEl.textContent = 'Confira os itens abaixo e escolha a forma de pagamento:';
      areaCheckoutEl.style.display = 'block';

      const btnPag = document.getElementById('btn-confirmar-pagamento');
      if (btnPag) {
        btnPag.addEventListener('click', async () => {
          const metodoSelecionado = document.getElementById('metodo-pagamento-select').value;
          btnPag.disabled = true;
          try {
            await enviarPagamento({ payment_method_id: metodoSelecionado });
          } catch (_) {
            // erro já exibido em enviarPagamento
          } finally {
            btnPag.disabled = false;
          }
        });
      }

      const PUBLIC_KEY = 'SUA_PUBLIC_KEY_AQUI';
      if (typeof MercadoPago !== 'undefined' && PUBLIC_KEY && !PUBLIC_KEY.startsWith('SUA_')) {
        const mp = new MercadoPago(PUBLIC_KEY, { locale: 'pt-BR' });
        const bricksBuilder = mp.bricks();

        await bricksBuilder.create('payment', 'paymentBrick_container', {
          initialization: { amount: valorTotal },
          customization: {
            visual: { style: { theme: 'dark' } },
            paymentMethods: {
              creditCard: 'all',
              debitCard: 'all',
              ticket: 'all',
              bankTransfer: 'all',
              maxInstallments: 12
            }
          },
          callbacks: {
            onReady: () => {
              const boxPadrao = document.getElementById('pagamento-padrao-box');
              if (boxPadrao) boxPadrao.style.display = 'none';
            },
            onSubmit: ({ formData }) => {
              return new Promise((resolve, reject) => {
                enviarPagamento(formData).then(resolve).catch(reject);
              });
            },
            onError: (err) => {
              console.error('Erro no Payment Brick:', err);
              if (avisoMpEl) {
                avisoMpEl.textContent = 'Checkout externo indisponível no momento; use a opção acima.';
              }
            }
          }
        });
      } else if (avisoMpEl) {
        avisoMpEl.textContent = 'Configure sua Public Key do Mercado Pago no compra.js para ativar o Brick completo.';
      }
    } catch (erro) {
      console.error('Erro ao carregar checkout:', erro);
      subtituloEl.textContent = 'Erro ao carregar os dados de compra.';
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarPagamento);
  } else {
    inicializarPagamento();
  }
})();