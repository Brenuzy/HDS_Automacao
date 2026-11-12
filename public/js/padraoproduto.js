document.addEventListener('DOMContentLoaded', () => {
  const qtyInput = document.getElementById('quantity');
  const btnInc = document.getElementById('btn-inc-qty');
  const btnDec = document.getElementById('btn-dec-qty');
  const btnOrder = document.getElementById('btn-order-now');
  const container = document.getElementById('produto-container');

  // ================= 1. CONTROLE DE QUANTIDADE =================
  function atualizarQtd(delta) {
    if (!qtyInput) return;
    const atual = parseInt(qtyInput.value, 10) || 1;
    const novoValor = Math.max(1, atual + delta);
    qtyInput.value = novoValor;
  }

  if (btnInc) btnInc.addEventListener('click', () => atualizarQtd(1));
  if (btnDec) btnDec.addEventListener('click', () => atualizarQtd(-1));

  if (qtyInput) {
    qtyInput.addEventListener('change', () => {
      const val = parseInt(qtyInput.value, 10);
      qtyInput.value = Number.isNaN(val) || val < 1 ? 1 : val;
    });
  }

  // ================= 2. GALERIA DE MINIATURAS =================
  const mainImg = document.getElementById('main-product-img');
  const thumbBtns = document.querySelectorAll('.thumb-btn');

  thumbBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const novaSrc = btn.getAttribute('data-img');
      if (mainImg && novaSrc) {
        mainImg.src = novaSrc;
      }
      thumbBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // ================= 3. SELEÇÃO DE VARIANTES (PILLS) =================
  const skuTag = document.getElementById('product-sku');
  document.querySelectorAll('.variant-pills').forEach((grupo) => {
    const pills = grupo.querySelectorAll('.variant-pill');
    pills.forEach((pill) => {
      pill.addEventListener('click', () => {
        pills.forEach((p) => p.classList.remove('active'));
        pill.classList.add('active');

        const novoSku = pill.getAttribute('data-sku');
        if (novoSku && skuTag && container) {
          skuTag.textContent = `Part No: ${novoSku}`;
          container.setAttribute('data-produto-id', novoSku);
        }
      });
    });
  });

  // ================= 4. ABAS DE INFORMAÇÃO (CONTRINEX) =================
  const tabTriggers = document.querySelectorAll('.tab-trigger');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const alvoId = trigger.getAttribute('data-tab');

      tabTriggers.forEach((t) => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tabPanels.forEach((p) => p.classList.remove('active'));

      trigger.classList.add('active');
      trigger.setAttribute('aria-selected', 'true');
      const painel = document.getElementById(alvoId);
      if (painel) painel.classList.add('active');
    });
  });

  // ================= 5. ADICIONAR AO CARRINHO =================
  if (btnOrder && container) {
    btnOrder.addEventListener('click', () => {
      const produto = {
        produto_id: container.getAttribute('data-produto-id'),
        nome: container.getAttribute('data-nome'),
        preco: parseFloat(container.getAttribute('data-preco')) || 0,
        imagem: container.getAttribute('data-imagem') || '/images/PLACEHOLDER.png',
        quantidade: qtyInput ? Math.max(1, parseInt(qtyInput.value, 10) || 1) : 1
      };

      if (typeof window.adicionarAoCarrinho === 'function') {
        window.adicionarAoCarrinho(produto);
      } else {
        window.location.href = '/login';
      }
    });
  }
});