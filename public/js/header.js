(function () {
  const headerHTML = `
  <!-- Top Bar -->
    <div class="top-bar">
      <span>Soluções para automação industrial de alta performance</span>
      <span class="region">Brasil (BRL R$)</span>
    </div>

    <!-- Header Principal -->
    <header class="header-container">
      <div class="logo">
        <a href="/"><img src="/images/logohdsv3.png" alt="Logo"></a>
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

        <a href="/cart" class="cart-link" aria-label="Carrinho de Compras">
          <div class="cart-button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              <circle cx="9" cy="20" r="1" fill="currentColor"></circle>
              <circle cx="18" cy="20" r="1" fill="currentColor"></circle>
            </svg>
          </div>
        </a>
      </div>
  </header>

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

.main-nav {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 40px;
  padding: 35px 0;
  box-sizing: border-box;
}

.logo {
  margin-left: 40px;
}

.logo img {
  max-height: 30px;
  width: auto;
  display: block;
  transform: scale(2);
  transform-origin: left center;
}

.main-nav ul {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 50px;
  list-style: none;
  margin: 0;
  padding: 0;
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

/* ================= BARRA DE PESQUISA, PERFIL E LOGIN ================= */
.header-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.searchbar-box {
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.08);
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
  background-color: rgba(255, 255, 255, 0.08);
  text-decoration: none;
  box-sizing: border-box;
  transition: background-color 0.2s ease, transform 0.2s ease;
  flex-shrink: 0;
}

.profile-btn:hover {
  background-color: rgba(255, 255, 255, 0.18);
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
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-sizing: border-box;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.cart-button:hover {
  background-color: rgba(255, 255, 255, 0.18);
}

.cart-button svg {
  width: 20px;
  height: 20px;
  stroke: #ffffff;
  color: #ffffff;
  display: block;
}

.login a {
  color: #ffffff;
  text-decoration: none;
  font-weight: bold;
  font-size: 14px;
}

.home-content1, 
.home-content2, 
.home-content3 {
  flex: 1;
  max-width: 500px;
  z-index: 2;
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
  border-radius: 8px;
  font-weight: bold;
  font-size: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  z-index: 9999;
  animation: slideInLeft 0.5s ease-out forwards, slideOutLeft 0.5s ease-in 3.5s forwards;
}

@keyframes slideInLeft {
  from {
    transform: translateX(-120%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideOutLeft {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(-120%);
    opacity: 0;
  }
}
</style>
  `;

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
    exibirBoasVindas(); 
  }

  function marcarLinkAtivo() {
    const caminhoAtual = window.location.pathname;
    const links = document.querySelectorAll(".main-nav a");

    links.forEach(link => {
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