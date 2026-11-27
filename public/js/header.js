(function () {
  const headerHTML = `
  <!-- Top Bar -->
    <div class="top-bar">
      <span>Soluções para automação industrial de alta performance</span>
      <span class="region">Brasil (BRL R$)</span>
    </div>

    <!-- Header Principal -->
    <header class="header-container">
      <div class="header-left">
        <button type="button" class="menu-toggle" aria-label="Alternar menu" aria-expanded="false">
          <span class="bar bar-top"></span>
          <span class="bar bar-bottom"></span>
        </button>

        <div class="logo">
          <a href="/"><img src="/images/logohdsv3.png" alt="Logo"></a>
        </div>
      </div>
      
      <nav class="main-nav">
        <ul>
          <li><a href="/produtos">Produtos</a></li>
          <li><a href="/solucoes">Soluções</a></li>
          <li><a href="https://www.us.contrinex.com/pages/downloads/">Manuais</a></li>
          <li><a href="/sobre">Sobre nós</a></li>
          <li><a href="/admin" id="menu-admin" style="display: none;">Admin</a></li>
        </ul>
      </nav>

      <!-- Ações do Header (Pesquisa, Perfil e Carrinho) -->
      <div class="header-actions">
        <div class="searchbar-box">
          <svg class="searchbar-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input type="text" placeholder="Search for..." class="searchbar-input">
        </div>

        <a href="/login" class="profile-btn" aria-label="Perfil">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </a>

        <a href="/cart" class="cart-link" id="btn-abrir-carrinho" aria-label="Carrinho de Compras">
          <div class="cart-button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              <circle cx="9" cy="20" r="1" fill="currentColor"></circle>
              <circle cx="18" cy="20" r="1" fill="currentColor"></circle>
            </svg>
            <span class="cart-badge" id="cart-badge" style="display: none;">0</span>
          </div>
        </a>
      </div>
  </header>

  <!-- ================= GAVETA LATERAL DO CARRINHO ================= -->
  <div class="cart-overlay" id="cart-overlay"></div>

  <aside class="cart-drawer" id="cart-drawer" aria-hidden="true">
    <div class="cart-drawer-header">
      <div class="cart-drawer-title">
        <div class="cart-title-row">
          <h3>SEU CARRINHO</h3>
          <span class="cart-count-pill" id="cart-count-pill" style="display: none;"></span>
        </div>
        <span class="cart-user-tag" id="cart-user-tag"></span>
      </div>
      <button type="button" class="cart-close-btn" id="cart-close-btn" aria-label="Fechar carrinho">&times;</button>
    </div>

    <div class="cart-drawer-body" id="cart-drawer-body">
      <p class="cart-status-msg">Carregando itens...</p>
    </div>

    <div class="cart-drawer-footer" id="cart-drawer-footer" style="display: none;">
      <div class="cart-subtotal-row">
        <span>Subtotal</span>
        <strong id="cart-subtotal">R$ 0,00</strong>
      </div>
      <a href="/compra" class="cart-checkout-btn">Finalizar Compra</a>
    </div>
  </aside>

<style>
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  background-color: #06184c;
  background: linear-gradient(-90deg, #06184c 30.67%, #0e2259 100%);
  font-size: 12px;
  color: #a0aec0;
}

.header-container {
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 1000;
  background-color: #0b132b;
  background: linear-gradient(90deg, #06184c 30.67%, #0c2661 50.96%, #143885 68.88%, #0d2b7c);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  box-sizing: border-box;
}

.header-left {
  display: flex;
  align-items: center;
}

.menu-toggle {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 0;
  height: 38px;
  margin-right: 0;
  padding: 0;
  border: none;
  border-radius: 50%;
  background-color: transparent;
  cursor: pointer;
  opacity: 0;
  overflow: hidden;
  pointer-events: none;
  flex-shrink: 0;
  transform: translateX(-10px);
  transition:
    width 0.3s ease,
    margin-right 0.3s ease,
    opacity 0.25s ease,
    transform 0.3s ease,
    background-color 0.2s ease;
}

.header-container.is-sticky .menu-toggle {
  width: 38px;
  margin-right: 16px;
  opacity: 1;
  pointer-events: auto;
  transform: translateX(0);
}

.menu-toggle .bar {
  position: absolute;
  width: 18px;
  height: 2px;
  background-color: #ffffff;
  border-radius: 2px;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.menu-toggle .bar-top {
  transform: translateY(-4px);
}

.menu-toggle .bar-bottom {
  transform: translateY(4px);
}

.menu-toggle.is-open .bar-top {
  transform: translateY(0) rotate(45deg);
}

.menu-toggle.is-open .bar-bottom {
  transform: translateY(0) rotate(-45deg);
}

.logo {
  margin-left: 0px;
}

.logo img {
  max-height: 30px;
  width: auto;
  display: block;
  transform: scale(2);
  transform-origin: left center;
}

.main-nav {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 40px;
  padding: 35px 0;
  box-sizing: border-box;
}

.main-nav ul {
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  display: flex;
  gap: 50px;
  list-style: none;
  margin: 0;
  padding: 0;
  opacity: 1;
  transition:
    transform 0.35s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.25s ease;
}

.header-container.is-sticky:not(.menu-open) .main-nav ul {
  transform: translate(-50%, -35px);
  opacity: 0;
  pointer-events: none;
}

.main-nav ul li a {
  color: #ffffff;
  text-decoration: none;
  font-weight: bold;
}

.main-nav a {
  display: inline-block;
  text-align: center;
  justify-content: center;
  margin: 0 auto;
  color: #ffffff;
  text-decoration: none;
  font-size: 15px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  position: relative;
}

.main-nav a:hover {
  transform: scale(1.4);
  color: #ffffff;
  font-weight: bold;
  text-shadow: 0 0 10px rgba(0, 168, 255, 0.8), 0 0 20px rgba(0, 168, 255, 0.4);
  border-color: #00a8ff;
  border-radius: 16px;
}

.main-nav a::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: -4px;
  width: 0%;
  height: 2px;
  background: linear-gradient(to right, transparent, #ffffff 15%, #ffffff 85%, transparent);
  box-shadow: 0 0 8px #ffffff;
  transition: all 0.5s ease;
  transform: translateX(-50%);
  opacity: 0;
}

.main-nav a:hover::after {
  width: 100%;
  opacity: 1;
}

.main-nav a:active {
  transform: scale(1);
  color: #ffffff;
  transition: transform 0.1s ease;
}

.main-nav a:active::after {
  width: 120%;
  height: 3px;
  box-shadow: 0 0 16px #ffffff, 0 0 25px #00a8ff;
  transition: all 0.1s ease;
  opacity: 1;
}

.active {
  transform: scale(1.5);
  color: #00a8ff;
  font-weight: bold;
  text-shadow: 0 0 10px rgba(0, 168, 255, 0.8), 0 0 20px rgba(0, 168, 255, 0.4);
  border-color: #00a8ff;
  border-radius: 16px;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.searchbar-box {
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 0 16px;
  height: 38px;
  max-width: 180px;
  box-sizing: border-box;
  transition: background-color 0.2s ease;
}

.searchbar-icon {
  width: 18px;
  height: 18px;
  stroke: #ffffff;
  margin-right: 8px;
  flex-shrink: 0;
  display: block;
}

.searchbar-input {
  background: transparent;
  border: none;
  outline: none;
  color: #ffffff;
  font-size: 14px;
  width: 100%;
  height: 100%;
  padding: 0;
}

.searchbar-input::placeholder {
  color: #ffffff;
  opacity: 0.85;
}

.profile-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.05);
  text-decoration: none;
  box-sizing: border-box;
  transition: background-color 0.2s ease, transform 0.2s ease;
  flex-shrink: 0;
}

.profile-btn:hover {
  background-color: rgba(255, 255, 255, 0.08);
}

.profile-btn svg {
  width: 20px;
  height: 20px;
  stroke: #ffffff;
  display: block;
}

.cart-link {
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.cart-button {
  position: relative;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-sizing: border-box;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.cart-button:hover {
  background-color: rgba(255, 255, 255, 0.12);
}

.cart-button svg {
  width: 20px;
  height: 20px;
  stroke: #ffffff;
  color: #ffffff;
  display: block;
}

.cart-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: 999px;
  background-color: #00a8ff;
  color: #ffffff;
  font-size: 11px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 8px rgba(0, 168, 255, 0.8);
  box-sizing: border-box;
}

.cart-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(4, 12, 34, 0.65);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  z-index: 9990;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.cart-overlay.is-open {
  opacity: 1;
  pointer-events: auto;
}

.cart-drawer {
  position: fixed;
  top: 0;
  right: 0;
  width: 400px;
  max-width: 92vw;
  height: 100vh;
  background: linear-gradient(180deg, #06194f 0%, #0e2d81 55%, #10338e 100%);
  box-shadow: -10px 0 35px rgba(0, 0, 0, 0.55);
  color: #ffffff;
  font-family: Arial, sans-serif;
  z-index: 9995;
  display: flex;
  flex-direction: column;
  transform: translateX(105%);
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}

.cart-drawer.is-open {
  transform: translateX(0);
}

.cart-drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: transparent;
}

.cart-title-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.cart-drawer-title h3 {
  margin: 0;
  font-size: 25px;
  font-weight: 800;
  letter-spacing: 1px;
  color: #ffffff;
}

.cart-count-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 2px 10px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.35);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.75);
}

.cart-user-tag {
  display: block;
  margin-top: 12px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.65);
}

.cart-close-btn {
  width: 34px;
  height: 34px;
  margin-top: -25px;
  border-radius: 50%;
  border: transparent;
  background: transparent;
  color: #ffffff;
  font-size: 22px;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
}

.cart-close-btn:hover {
  transform: scale(1.05);
}

.cart-drawer-body {
  flex: 1;
  overflow-y: auto;
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.cart-status-msg {
  text-align: center;
  color: #a0aec0;
  font-size: 14px;
  margin: auto 0;
}

.cart-empty-box {
  margin: auto 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
}

.cart-empty-box p {
  margin: 0;
  color: #ffffff;
  font-size: 14px;
}

.cart-empty-link {
  display: inline-block;
  padding: 10px 18px;
  border: 1px solid #ffffff;
  color: #ffffff;
  text-decoration: none;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.cart-empty-link:hover {
  background-color: #ffffff;
  color: #000000;
}

.cart-item-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
}

.cart-item-card.is-added-glow {
  animation: cartItemGlow 1.35s ease-out forwards;
}

.cart-item-card.is-removing {
  pointer-events: none;
  animation: cartItemRemove 0.35s ease-in forwards;
}

@keyframes cartItemGlow {
  0% {
    background: rgba(56, 189, 248, 0.28);
    border-color: #7dd3fc;
    box-shadow: 0 0 18px rgba(56, 189, 248, 0.75), inset 0 0 12px rgba(125, 211, 252, 0.35);
    transform: scale(1.02);
  }
  55% {
    background: rgba(56, 189, 248, 0.14);
    border-color: rgba(125, 211, 252, 0.7);
    box-shadow: 0 0 10px rgba(56, 189, 248, 0.35);
    transform: scale(1);
  }
  100% {
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(255, 255, 255, 0.1);
    box-shadow: none;
    transform: scale(1);
  }
}

@keyframes cartItemRemove {
  0% {
    opacity: 1;
    transform: translateX(0) scale(1);
    border-color: rgba(248, 113, 113, 0.65);
    box-shadow: 0 0 12px rgba(248, 113, 113, 0.35);
  }
  100% {
    opacity: 0;
    transform: translateX(28px) scale(0.96);
  }
}

.cart-item-img {
  width: 62px;
  height: 62px;
  border-radius: 4px;
  object-fit: cover;
  background-color: #031548;
  flex-shrink: 0;
}

.cart-item-info {
  flex: 1;
  min-width: 0;
}

.cart-item-name {
  margin: 0 0 4px 0;
  font-size: 14px;
  font-weight: 700;
  color: #ffffff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cart-item-price {
  margin: 0 0 10px 0;
  font-size: 13px;
  font-weight: 600;
  color: #7dd3fc;
}

.cart-item-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.cart-qty-group {
  display: inline-flex;
  align-items: center;
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.16);
  overflow: hidden;
}

.cart-qty-btn {
  width: 26px;
  height: 26px;
  border: none;
  background: transparent;
  color: #ffffff;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.cart-qty-btn:hover {
  background: rgba(0, 168, 255, 0.28);
}

.cart-qty-val {
  min-width: 26px;
  text-align: center;
  font-size: 13px;
  font-weight: 700;
}

.cart-remove-btn {
  background: none;
  border: none;
  color: #94a3b8;
  font-size: 12px;
  cursor: pointer;
  padding: 4px 6px;
  transition: color 0.2s ease;
}

.cart-remove-btn:hover {
  color: #f87171;
  text-decoration: underline;
}

.cart-drawer-footer {
  padding: 20px 24px;
  border-top: transparent;
}

.cart-subtotal-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  font-size: 15px;
  color: #e2e8f0;
}

.cart-subtotal-row strong {
  font-size: 18px;
  color: #ffffff;
}

.cart-checkout-btn {
  display: block;
  width: 100%;
  padding: 13px 16px;
  box-sizing: border-box;
  background-color: transparent;
  border: 2px solid #ffffff;
  color: #ffffff;
  text-align: center;
  text-decoration: none;
  font-size: 13px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  transition: background-color 0.25s ease, box-shadow 0.25s ease;
}

.cart-checkout-btn:hover {
  background-color: #fff;
  color: #000;
  box-shadow: 0 6px 20px rgba(0, 168, 255, 0.45);
}

.cart-toast-msg {
  position: fixed;
  top: 20px;
  left: 20px;
  background-color: rgba(6, 24, 76, 0.88);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: #ffffff;
  padding: 12px 20px;
  border: transparent;
  border-radius: 6px;
  font-family: Arial, sans-serif;
  font-weight: bold;
  font-size: 14px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.35);
  z-index: 10000;
}

.cart-toast-msg.is-error {
  border-color: #f87171;
  color: #fecaca;
}

/* ================= TOAST BOAS-VINDAS ================= */
.toast-glass {
  position: fixed;
  top: 20px;
  left: 20px;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: #ffffff;
  padding: 14px 24px;
  border: 2px solid #ffffff;
  font-weight: bold;
  font-size: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  z-index: 9999;
  animation: slideInLeft 0.5s ease-out forwards, slideOutLeft 0.5s ease-in 3.5s forwards;
}

@keyframes slideInLeft {
  from { transform: translateX(-120%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

@keyframes slideOutLeft {
  from { transform: translateX(0); opacity: 1; }
  to { transform: translateX(-120%); opacity: 0; }
}

/* ================= RESPONSIVIDADE DO HEADER ================= */
@media (max-width: 1024px) {
  .header-container { padding: 0 24px; }
  .main-nav ul { gap: 28px; }
  .main-nav a { font-size: 13px; }
  .searchbar-box { max-width: 140px; }
}

@media (max-width: 768px) {
  .top-bar { padding: 12px 20px; font-size: 11px; }
  .header-container { padding: 12px 20px; }
  .logo img { max-height: 24px; transform: scale(1.5); }
  .main-nav { padding: 20px 0; }
  .main-nav ul { gap: 18px; }
  .main-nav a { font-size: 12px; }
  .searchbar-box { display: none; }
}

@media (max-width: 480px) {
  .top-bar { flex-direction: column; gap: 4px; text-align: center; padding: 10px 16px; }
  .main-nav ul {
    position: fixed;
    top: 62px;
    left: 0;
    right: 0;
    transform: none;
    flex-direction: column;
    align-items: center;
    gap: 18px;
    padding: 24px 16px;
    background: linear-gradient(180deg, #06184c 0%, #0d2b7c 100%);
    border-bottom: 1px solid rgba(255, 255, 255, 0.15);
    opacity: 0;
    pointer-events: none;
  }
  .header-container.menu-open .main-nav ul {
    opacity: 1;
    pointer-events: auto;
    transform: none;
  }
  .menu-toggle {
    width: 36px;
    height: 36px;
    margin-right: 12px;
    opacity: 1;
    pointer-events: auto;
    transform: translateX(0);
  }
  .logo img { max-height: 22px; transform: scale(1.3); }
}
</style>
  `;

  let ultimoAdicionadoId = null;

  function mostrarMensagemCarrinho(texto, ehErro = false) {
    const anterior = document.getElementById("cart-toast-msg");
    if (anterior) anterior.remove();

    const toast = document.createElement("div");
    toast.id = "cart-toast-msg";
    toast.className = ehErro ? "cart-toast-msg is-error" : "cart-toast-msg";
    toast.textContent = texto;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3500);
  }

  function formatarBRL(valor) {
    return Number(valor || 0).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });
  }

  function encerrarSessaoExpirada() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    window.location.href = "/login";
  }

  function atualizarBadge(itens) {
    const badge = document.getElementById("cart-badge");
    if (!badge) return;

    const totalQtd = Array.isArray(itens)
      ? itens.reduce((acc, item) => acc + Number(item.quantidade || 0), 0)
      : 0;

    if (totalQtd > 0) {
      badge.textContent = totalQtd;
      badge.style.display = "flex";
    } else {
      badge.style.display = "none";
    }
  }

  function destacarProdutoAdicionado(produtoId) {
    if (!produtoId) return;
    const body = document.getElementById("cart-drawer-body");
    if (!body) return;

    const cards = Array.from(body.querySelectorAll(".cart-item-card"));
    const alvo = cards.find((el) => el.getAttribute("data-produto-id") === String(produtoId));
    if (!alvo) return;

    alvo.classList.remove("is-added-glow");
    void alvo.offsetWidth;
    alvo.classList.add("is-added-glow");
    alvo.scrollIntoView({ behavior: "smooth", block: "nearest" });

    setTimeout(() => {
      alvo.classList.remove("is-added-glow");
    }, 1400);
  }

  function animarRemocaoCard(produtoId) {
    return new Promise((resolve) => {
      const body = document.getElementById("cart-drawer-body");
      if (!body) return resolve();

      const cards = Array.from(body.querySelectorAll(".cart-item-card"));
      const alvo = cards.find((el) => el.getAttribute("data-produto-id") === String(produtoId));
      if (!alvo) return resolve();

      alvo.classList.add("is-removing");
      setTimeout(resolve, 350);
    });
  }

  function renderizarItensCarrinho(itens) {
    const body = document.getElementById("cart-drawer-body");
    const subtotalEl = document.getElementById("cart-subtotal");
    const footerEl = document.getElementById("cart-drawer-footer");
    const pillEl = document.getElementById("cart-count-pill");
    if (!body || !subtotalEl) return;

    atualizarBadge(itens);

    const lista = Array.isArray(itens) ? itens : [];
    const totalQtd = lista.reduce((acc, item) => acc + Number(item.quantidade || 0), 0);

    if (pillEl) {
      if (totalQtd > 0) {
        pillEl.textContent = `${totalQtd} ${totalQtd === 1 ? "ITEM" : "ITENS"}`;
        pillEl.style.display = "inline-flex";
      } else {
        pillEl.textContent = "";
        pillEl.style.display = "none";
      }
    }

    if (lista.length === 0) {
      subtotalEl.textContent = formatarBRL(0);
      if (footerEl) footerEl.style.display = "none";
      body.innerHTML = `
        <div class="cart-empty-box">
          <p>Seu carrinho está vazio no momento.</p>
          <a href="/produtos" class="cart-empty-link">Ver produtos</a>
        </div>
      `;
      return;
    }

    if (footerEl) footerEl.style.display = "";

    let subtotal = 0;
    body.innerHTML = lista
      .map((item) => {
        const precoUnit = Number(item.preco) || 0;
        const qtd = Number(item.quantidade) || 1;
        subtotal += precoUnit * qtd;

        return `
          <div class="cart-item-card" data-produto-id="${item.produto_id}">
            <img src="${item.imagem || "/images/PLACEHOLDER.png"}" alt="${item.nome}" class="cart-item-img">
            <div class="cart-item-info">
              <h4 class="cart-item-name" title="${item.nome}">${item.nome}</h4>
              <p class="cart-item-price">${formatarBRL(precoUnit)}</p>
              <div class="cart-item-controls">
                <div class="cart-qty-group">
                  <button type="button" class="cart-qty-btn" data-acao="diminuir" data-id="${item.produto_id}" data-qtd="${qtd}">-</button>
                  <span class="cart-qty-val">${qtd}</span>
                  <button type="button" class="cart-qty-btn" data-acao="aumentar" data-id="${item.produto_id}" data-qtd="${qtd}">+</button>
                </div>
                <button type="button" class="cart-remove-btn" data-acao="remover" data-id="${item.produto_id}">Remover</button>
              </div>
            </div>
          </div>
        `;
      })
      .join("");

    subtotalEl.textContent = formatarBRL(subtotal);

    if (ultimoAdicionadoId) {
      const idDestaque = ultimoAdicionadoId;
      ultimoAdicionadoId = null;
      requestAnimationFrame(() => destacarProdutoAdicionado(idDestaque));
    }
  }

  async function carregarCarrinho() {
    const token = localStorage.getItem("token");
    if (!token) return;

    const body = document.getElementById("cart-drawer-body");
    const footerEl = document.getElementById("cart-drawer-footer");

    try {
      const resposta = await fetch("/api/carrinho", {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (resposta.status === 401) {
        encerrarSessaoExpirada();
        return;
      }

      const dados = await resposta.json();
      if (!resposta.ok) {
        const msg = dados.mensagem || "Erro ao carregar o carrinho.";
        if (body) body.innerHTML = `<p class="cart-status-msg">${msg}</p>`;
        if (footerEl) footerEl.style.display = "none";
        mostrarMensagemCarrinho(msg, true);
        return;
      }

      renderizarItensCarrinho(dados);
    } catch (erro) {
      console.error("Erro ao carregar carrinho:", erro);
      const msg = "Erro de conexão ao carregar o carrinho.";
      if (body) body.innerHTML = `<p class="cart-status-msg">${msg}</p>`;
      if (footerEl) footerEl.style.display = "none";
      mostrarMensagemCarrinho(msg, true);
    }
  }

  async function alterarQuantidadeItem(produtoId, novaQtd) {
    const token = localStorage.getItem("token");
    if (!token) return encerrarSessaoExpirada();

    const qtdNormalizada = Math.max(0, parseInt(novaQtd, 10) || 0);
    if (qtdNormalizada <= 0) {
      await animarRemocaoCard(produtoId);
    }

    try {
      const resposta = await fetch(`/api/carrinho/${encodeURIComponent(produtoId)}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ quantidade: qtdNormalizada })
      });

      if (resposta.status === 401) return encerrarSessaoExpirada();

      const dados = await resposta.json().catch(() => ({}));
      if (resposta.ok) {
        await carregarCarrinho();
        mostrarMensagemCarrinho(dados.mensagem || "Quantidade atualizada.");
      } else {
        mostrarMensagemCarrinho(dados.mensagem || "Erro ao atualizar quantidade.", true);
      }
    } catch (erro) {
      console.error("Erro ao atualizar quantidade:", erro);
      mostrarMensagemCarrinho("Erro de conexão ao atualizar quantidade.", true);
    }
  }

  async function removerItemCarrinho(produtoId) {
    const token = localStorage.getItem("token");
    if (!token) return encerrarSessaoExpirada();

    await animarRemocaoCard(produtoId);

    try {
      const resposta = await fetch(`/api/carrinho/${encodeURIComponent(produtoId)}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });

      if (resposta.status === 401) return encerrarSessaoExpirada();

      const dados = await resposta.json().catch(() => ({}));
      if (resposta.ok) {
        await carregarCarrinho();
        mostrarMensagemCarrinho(dados.mensagem || "Item removido do carrinho.");
      } else {
        mostrarMensagemCarrinho(dados.mensagem || "Erro ao remover item.", true);
      }
    } catch (erro) {
      console.error("Erro ao remover item:", erro);
      mostrarMensagemCarrinho("Erro de conexão ao remover item.", true);
    }
  }

  function abrirCarrinho() {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    const drawer = document.getElementById("cart-drawer");
    const overlay = document.getElementById("cart-overlay");
    const userTag = document.getElementById("cart-user-tag");
    const usuario = JSON.parse(localStorage.getItem("usuario") || "null");

    if (userTag) {
      userTag.textContent = usuario && usuario.nome ? `Conta: ${usuario.nome}` : "";
    }

    if (drawer && overlay) {
      drawer.classList.add("is-open");
      overlay.classList.add("is-open");
      drawer.setAttribute("aria-hidden", "false");
      carregarCarrinho();
    }
  }

  function fecharCarrinho() {
    const drawer = document.getElementById("cart-drawer");
    const overlay = document.getElementById("cart-overlay");

    if (drawer && overlay) {
      drawer.classList.remove("is-open");
      overlay.classList.remove("is-open");
      drawer.setAttribute("aria-hidden", "true");
    }
  }

  function extrairProdutoDaPagina() {
    const container =
      document.getElementById("produto-container") ||
      document.querySelector("[data-produto-id]") ||
      document.querySelector(".product-main");
    if (!container) return null;

    const skuEl = document.getElementById("product-sku") || document.querySelector(".sku-tag");
    const tituloEl = document.querySelector(".product-title") || document.querySelector("h1");
    const precoEl = document.querySelector(".price-main");
    const imgEl = document.getElementById("main-product-img") || document.querySelector(".gallery-main img");
    const qtyInput = document.getElementById("quantity");

    let precoNum = parseFloat(container.getAttribute("data-preco"));
    if (Number.isNaN(precoNum) && precoEl) {
      const limpo = precoEl.textContent.replace(/[^\d,.-]/g, "").replace(",", ".");
      precoNum = parseFloat(limpo) || 0;
    }

    const produtoId =
      container.getAttribute("data-produto-id") ||
      (skuEl ? skuEl.textContent.replace(/^(SKU:|Part No:)\s*/i, "").trim() : "") ||
      window.location.pathname.replace(/^\/+|\/+$/g, "") ||
      "produto";

    const nome =
      container.getAttribute("data-nome") ||
      (tituloEl ? tituloEl.textContent.trim() : "") ||
      "Produto";

    const imagem =
      container.getAttribute("data-imagem") ||
      (imgEl ? imgEl.getAttribute("src") : "") ||
      "/images/PLACEHOLDER.png";

    const quantidade = qtyInput ? Math.max(1, parseInt(qtyInput.value, 10) || 1) : 1;

    return {
      produto_id: produtoId,
      nome,
      preco: precoNum,
      imagem,
      quantidade
    };
  }

  let enviandoAdd = false;

  window.adicionarAoCarrinho = async function (produto) {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    if (enviandoAdd) return;
    enviandoAdd = true;

    const base = produto || extrairProdutoDaPagina();
    if (!base) {
      enviandoAdd = false;
      mostrarMensagemCarrinho("Produto não encontrado na página.", true);
      return;
    }

    const payload = {
      produto_id: base.produto_id ? String(base.produto_id) : "",
      nome: base.nome ? String(base.nome) : "",
      preco: Number(base.preco) || 0,
      imagem: base.imagem || "/images/PLACEHOLDER.png",
      quantidade: Math.max(1, parseInt(base.quantidade, 10) || 1)
    };

    try {
      const resposta = await fetch("/api/carrinho", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (resposta.status === 401) {
        encerrarSessaoExpirada();
        return;
      }

      const dados = await resposta.json().catch(() => ({}));
      if (resposta.ok) {
        ultimoAdicionadoId = payload.produto_id;
        mostrarMensagemCarrinho(dados.mensagem || "Produto adicionado ao carrinho!");
        abrirCarrinho();
      } else {
        mostrarMensagemCarrinho(dados.mensagem || "Não foi possível adicionar o item ao carrinho.", true);
      }
    } catch (erro) {
      console.error("Erro ao adicionar produto:", erro);
      mostrarMensagemCarrinho("Erro de conexão ao adicionar produto ao carrinho.", true);
    } finally {
      enviandoAdd = false;
    }
  };

  function configurarCarrinho() {
    const btnCarrinho = document.getElementById("btn-abrir-carrinho");
    const btnFechar = document.getElementById("cart-close-btn");
    const overlay = document.getElementById("cart-overlay");
    const drawerBody = document.getElementById("cart-drawer-body");
    let ocupacaoCarrinho = false;

    if (btnCarrinho) {
      btnCarrinho.addEventListener("click", (e) => {
        if (window.location.pathname !== "/cart") {
          e.preventDefault();
          abrirCarrinho();
        }
      });
    }

    if (btnFechar) btnFechar.addEventListener("click", fecharCarrinho);
    if (overlay) overlay.addEventListener("click", fecharCarrinho);

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") fecharCarrinho();
    });

    document.addEventListener("click", (e) => {
      const btnComprar = e.target.closest("#btn-order-now, .btn-order-now");
      if (!btnComprar) return;

      const qtyInput = document.getElementById("quantity");
      if (e.target.closest("#btn-inc-qty") && qtyInput) {
        qtyInput.value = Math.max(1, (parseInt(qtyInput.value, 10) || 1) + 1);
        return;
      }
      if (e.target.closest("#btn-dec-qty") && qtyInput) {
        qtyInput.value = Math.max(1, (parseInt(qtyInput.value, 10) || 1) - 1);
        return;
      }

      e.preventDefault();
      window.adicionarAoCarrinho(extrairProdutoDaPagina());
    });

    if (drawerBody) {
      drawerBody.addEventListener("click", async (e) => {
        if (ocupacaoCarrinho) return;

        const btn = e.target.closest("button[data-acao]");
        if (!btn) return;

        const acao = btn.getAttribute("data-acao");
        const id = btn.getAttribute("data-id");
        const qtdAtual = Number(btn.getAttribute("data-qtd")) || 1;
        if (!id) return;

        ocupacaoCarrinho = true;
        try {
          if (acao === "aumentar") await alterarQuantidadeItem(id, qtdAtual + 1);
          if (acao === "diminuir") await alterarQuantidadeItem(id, qtdAtual - 1);
          if (acao === "remover") await removerItemCarrinho(id);
        } finally {
          ocupacaoCarrinho = false;
        }
      });
    }

    if (localStorage.getItem("token")) {
      carregarCarrinho();
    }
  }

  function montarHeader() {
    const alvo = document.getElementById("header-placeholder");

    if (alvo) {
      alvo.insertAdjacentHTML("beforebegin", headerHTML);
      alvo.remove();
    } else {
      document.body.insertAdjacentHTML("afterbegin", headerHTML);
    }

    marcarLinkAtivo();
    verificarPermissaoAdmin();
    atualizarLinkPerfil();
    exibirBoasVindas();
    configurarStickyMenu();
    configurarCarrinho();
  }

  function configurarStickyMenu() {
    const topBar = document.querySelector(".top-bar");
    const header = document.querySelector(".header-container");
    const toggleBtn = document.querySelector(".menu-toggle");

    if (!topBar || !header || !toggleBtn) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const ficouSticky = !entry.isIntersecting;
        header.classList.toggle("is-sticky", ficouSticky);

        if (!ficouSticky) {
          header.classList.remove("menu-open");
          toggleBtn.classList.remove("is-open");
          toggleBtn.setAttribute("aria-expanded", "false");
        }
      },
      { threshold: 0 }
    );

    observer.observe(topBar);

    toggleBtn.addEventListener("click", () => {
      const aberto = header.classList.toggle("menu-open");
      toggleBtn.classList.toggle("is-open", aberto);
      toggleBtn.setAttribute("aria-expanded", String(aberto));
    });
  }

  function marcarLinkAtivo() {
    const caminhoAtual = window.location.pathname;
    const links = document.querySelectorAll(".main-nav a");

    links.forEach((link) => {
      const href = link.getAttribute("href");
      if (!href) return;

      if (href.startsWith("http://") || href.startsWith("https://")) return;

      link.classList.remove("active");

      const eHome = href === "/" && (caminhoAtual === "/" || caminhoAtual === "/index.html");
      const eSubpagina = href !== "/" && caminhoAtual.startsWith(href);

      if (eHome || eSubpagina) {
        link.classList.add("active");
      }
    });
  }

  function atualizarLinkPerfil() {
    const botao = document.querySelector(".profile-btn");
    if (!botao) return;
    botao.setAttribute("href", localStorage.getItem("token") ? "/perfil" : "/login");
  }

  function verificarPermissaoAdmin() {
    var usuario = JSON.parse(localStorage.getItem("usuario"));
    var menuAdmin = document.getElementById("menu-admin");

    if (menuAdmin) {
      if (usuario && usuario.perfil === "admin") {
        menuAdmin.style.display = "inline-block";
      } else {
        menuAdmin.style.display = "none";
      }
    }
  }

  function exibirBoasVindas() {
    const nomeUsuario = sessionStorage.getItem("boasVindas");

    if (nomeUsuario) {
      const toast = document.createElement("div");
      toast.className = "toast-glass";
      toast.textContent = `Bem-vindo, ${nomeUsuario}!`;

      document.body.appendChild(toast);

      sessionStorage.removeItem("boasVindas");

      setTimeout(() => {
        toast.remove();
      }, 4000);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", montarHeader);
  } else {
    montarHeader();
  }
})();