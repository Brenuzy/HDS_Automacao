const productsData = [
  {
    id: 1,
    title: "13.56 MHz Others/Specials",
    price: 1302.35,
    image: "https://via.placeholder.com/200x180/ffffff/000000?text=Case"
  },
  {
    id: 2,
    title: "13.56 MHz Read/Write Module Basic M18 Mm",
    price: 353.25,
    image: "https://via.placeholder.com/200x180/ffffff/000000?text=M18+Sensor"
  },
  {
    id: 3,
    title: "13.56 MHz Read/Write Module Basic M30 Mm",
    price: 353.25,
    image: "https://via.placeholder.com/200x180/ffffff/000000?text=M30+Sensor"
  },
  {
    id: 4,
    title: "13.56 MHz Read/Write Module IO Link 40 X 40 (C44) Mm",
    price: 265.25,
    image: "https://via.placeholder.com/200x180/ffffff/000000?text=C44+Sensor"
  }
];

function renderProducts(items) {
  const grid = document.getElementById('produtosProductGrid');
  if (!grid) return;

  grid.innerHTML = items.map(product => `
    <div class="produtos-cat-card">
      <div>
        <div class="produtos-cat-badge-iolink">
          <i class="fa-solid fa-arrows-rotate"></i> IO-Link
        </div>
        <img src="${product.image}" alt="${product.title}" class="produtos-cat-img">
      </div>
      <div>
        <div class="produtos-cat-price">$${product.price.toFixed(2)}</div>
        <div class="produtos-cat-title">${product.title}</div>
        <div class="produtos-cat-stock-status">Re-stocking soon</div>
      </div>
    </div>
  `).join('');
}

renderProducts(productsData);