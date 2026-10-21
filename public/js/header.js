(function () {
  const headerHTML = `
    <!-- Top Bar -->
  <div class="top-bar">
    <span>Soluções para automação industrial de alta performance</span>
    <span class="region">Brasil (BRL R$)</span>
  </div>

<!-- Mais Menus -->
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
    </ul>
  </nav>
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
}

.main-nav {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 40px;
  padding: 35px 40px;
  box-sizing: border-box;
}

.logo {
  margin-left: 80px;
}

.logo img {
  max-height: 30px;
  width: auto;
  display: block;
  transform: scale(2);
  transform-origin: left center;
  margin-left: -40px;
}

.main-nav ul {
  display: flex;
  gap: 30px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.main-nav ul li a {
  color: #ffffff;
  text-decoration: none;
  font-weight: bold;
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.active {
  transform: scale(1.5);
  color: #00a8ff;
  font-weight: bold;
  text-shadow: 0 0 10px rgba(0, 168, 255, 0.8), 0 0 20px rgba(0, 168, 255, 0.4);
  border-color: #00a8ff;
  border-radius: 16px;
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

.main-nav a {
  display:flex;
  text-align: center;
  justify-content: center;
  margin: 0 auto;
  color: #ffffff;
  text-decoration: none;
  font-size: 15px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: color 0.2s ease;
  position: relative;
  display: inline-block;
  text-decoration: none;
  transition: all 0.3s ease; 
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
  transform: opacity (1);
}

.home-content1, 
.home-content2, 
.home-content3 {
  flex: 1;
  max-width: 500px;
  z-index: 2;
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
  }

  function marcarLinkAtivo() {
    const caminhoAtual = window.location.pathname;
    const links = document.querySelectorAll(".main-nav a");

    links.forEach(link => {
      const href = link.getAttribute("href");
      if (!href) return;

      // Ignora links externos (como o de Manuais)
      if (href.startsWith("http://") || href.startsWith("https://")) return;

      link.classList.remove("active");

      // Trata a home e subpáginas
      const eHome = href === "/" && (caminhoAtual === "/" || caminhoAtual === "/index.html");
      const eSubpagina = href !== "/" && caminhoAtual.startsWith(href);

      if (eHome || eSubpagina) {
        link.classList.add("active");
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", montarHeader);
  } else {
    montarHeader();
  }
})();
