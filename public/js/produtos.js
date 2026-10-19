document.addEventListener('DOMContentLoaded', () => {
  // Elementos da Busca e Cards
  const searchInput = document.getElementById('searchInput');
  const cards = Array.from(document.querySelectorAll('.event-card'));
  const rows = Array.from(document.querySelectorAll('.product-row'));

  // Filtros de Preço
  const minInput = document.getElementById('minInput');
  const maxInput = document.getElementById('maxInput');
  const minRange = document.getElementById('minRange');
  const maxRange = document.getElementById('maxRange');
  const clearBtn = document.getElementById('clearBtn');

  // Função de Filtragem Integrada (Nome + Tipo + Preço)
  function filtrarProdutos() {
    const termoBusca = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const minPreco = minInput ? parseFloat(minInput.value) || 0 : 0;
    const maxPreco = maxInput ? parseFloat(maxInput.value) || Infinity : Infinity;

    // 1. Oculta ou exibe individualmente cada card
    cards.forEach(card => {
      const nomeAttr = (card.getAttribute('data-nome') || '').toLowerCase();
      const tipoAttr = (card.getAttribute('data-tipo') || '').toLowerCase();
      const tituloText = card.querySelector('.event-card-title')?.textContent.toLowerCase() || '';
      const precoVal = parseFloat(card.getAttribute('data-preco')) || 0;

      // Verifica se o termo digitado está no nome, no tipo ou no título
      const atendeTexto = nomeAttr.includes(termoBusca) || 
                          tituloText.includes(termoBusca) || 
                          tipoAttr.includes(termoBusca);

      const atendePreco = precoVal >= minPreco && precoVal <= maxPreco;

      if (atendeTexto && atendePreco) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });

    // 2. Oculta fileiras que não contêm cards visíveis
    rows.forEach(row => {
      const temCardsVisiveis = Array.from(row.querySelectorAll('.event-card'))
        .some(card => card.style.display !== 'none');

      row.style.display = temCardsVisiveis ? 'grid' : 'none';
    });
  }

  // Sincronização dos Sliders de Preço
  function sincronizarPrecos(e) {
    if (e.target === minRange) minInput.value = minRange.value;
    if (e.target === maxRange) maxInput.value = maxRange.value;
    if (e.target === minInput) minRange.value = minInput.value;
    if (e.target === maxInput) maxRange.value = maxInput.value;

    filtrarProdutos();
  }

  // Limpeza de Filtros
  function limparFiltros() {
    if (searchInput) searchInput.value = '';
    if (minInput) minInput.value = 0;
    if (maxInput) maxInput.value = 2400;
    if (minRange) minRange.value = 0;
    if (maxRange) maxRange.value = 2400;

    filtrarProdutos();
  }

  // Event Listeners
  if (searchInput) {
    searchInput.addEventListener('input', filtrarProdutos);
  }

  [minInput, maxInput, minRange, maxRange].forEach(elem => {
    if (elem) elem.addEventListener('input', sincronizarPrecos);
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', limparFiltros);
  }
});