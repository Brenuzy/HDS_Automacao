document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const cards = Array.from(document.querySelectorAll('.event-card'));
  const rows = Array.from(document.querySelectorAll('.product-row'));

  const minInput = document.getElementById('minInput');
  const maxInput = document.getElementById('maxInput');
  const minRange = document.getElementById('minRange');
  const maxRange = document.getElementById('maxRange');
  const sliderTrack = document.querySelector('.slider-track');
  const clearBtn = document.getElementById('clearBtn');

  const MAX_LIMIT = 2400;

  function atualizarBarraSlider() {
    if (!sliderTrack || !minRange || !maxRange) return;
    const minPct = (Number(minRange.value) / MAX_LIMIT) * 100;
    const maxPct = (Number(maxRange.value) / MAX_LIMIT) * 100;
    sliderTrack.style.background = `linear-gradient(to right, rgba(255,255,255,0.2) ${minPct}%, #00a8ff ${minPct}%, #00a8ff ${maxPct}%, rgba(255,255,255,0.2) ${maxPct}%)`;
  }

  function filtrarProdutos() {
    const termoBusca = searchInput ? searchInput.value.toLowerCase().trim() : '';

    const parsedMin = minInput ? parseFloat(minInput.value) : 0;
    const parsedMax = maxInput ? parseFloat(maxInput.value) : Infinity;

    const minPreco = Number.isNaN(parsedMin) ? 0 : parsedMin;
    const maxPreco = Number.isNaN(parsedMax) ? Infinity : parsedMax;

    cards.forEach(card => {
      const nomeAttr = (card.getAttribute('data-nome') || '').toLowerCase();
      const tipoAttr = (card.getAttribute('data-tipo') || '').toLowerCase();
      const tituloText = card.querySelector('.event-card-title')?.textContent.toLowerCase() || '';
      const precoVal = parseFloat(card.getAttribute('data-preco')) || 0;

      const atendeTexto =
        nomeAttr.includes(termoBusca) ||
        tituloText.includes(termoBusca) ||
        tipoAttr.includes(termoBusca);

      const atendePreco = precoVal >= minPreco && precoVal <= maxPreco;

      card.style.display = atendeTexto && atendePreco ? 'block' : 'none';
    });

    rows.forEach(row => {
      const temCardsVisiveis = Array.from(row.querySelectorAll('.event-card'))
        .some(card => card.style.display !== 'none');

      row.style.display = temCardsVisiveis ? 'grid' : 'none';
    });
  }

  function sincronizarPrecos(e) {
    let minVal = Number(e.target === minRange ? minRange.value : minInput.value) || 0;
    let maxVal = Number(e.target === maxRange ? maxRange.value : maxInput.value);
    if (Number.isNaN(maxVal)) maxVal = MAX_LIMIT;

    // Impede que o mínimo ultrapasse o máximo e vice-versa
    if (e.target === minRange || e.target === minInput) {
      if (minVal > maxVal) minVal = maxVal;
    } else if (e.target === maxRange || e.target === maxInput) {
      if (maxVal < minVal) maxVal = minVal;
    }

    minInput.value = minVal;
    minRange.value = minVal;
    maxInput.value = maxVal;
    maxRange.value = maxVal;

    atualizarBarraSlider();
    filtrarProdutos();
  }

  function limparFiltros() {
    if (searchInput) searchInput.value = '';
    if (minInput) minInput.value = 0;
    if (maxInput) maxInput.value = MAX_LIMIT;
    if (minRange) minRange.value = 0;
    if (maxRange) maxRange.value = MAX_LIMIT;

    atualizarBarraSlider();
    filtrarProdutos();
  }

  if (searchInput) {
    searchInput.addEventListener('input', filtrarProdutos);
  }

  [minInput, maxInput, minRange, maxRange].forEach(elem => {
    if (elem) elem.addEventListener('input', sincronizarPrecos);
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', limparFiltros);
  }

  atualizarBarraSlider();
});