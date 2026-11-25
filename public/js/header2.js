(function () {
  const headerHTML = `

    <!-- Header Principal -->
    <header class="header-container">
      <div class="header-left">
        <div class="logo">
          <a href="/"><img src="/images/logohdsv3.png" alt="Logo"></a>
        </div>
      </div>

        <a href="/" class="home-btn" aria-label="Início">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 9l9-7 9 7v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"></path>
            <polyline points="9,21 12,17 15,21"></polyline>
          </svg>
        </a>

  </header>

<style>
.header-container {
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 1000;
  background-color: #0b132b;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  box-sizing: border-box;
  height: 100px;
}

.header-left {
  display: flex;
  align-items: center;
}

.logo {
  margin-left: 100px;
  margin-bottom: 20px;
  margin-top: 70px;
}

.logo img {
  max-height: 60px;
  width: auto;
  display: block;
  transform: scale(2);
  transform-origin: left center;
}

.home-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.05);
  text-decoration: none;
  box-sizing: border-box;
  transition: background-color 0.2s ease, transform 0.2s ease;
  flex-shrink: 0;
  margin-right: 100px;
  margin-bottom: 20px;
  margin-top: 120px;
}

.home-btn:hover {
  background-color: rgba(255, 255, 255, 0.08);
}

.home-btn svg {
  width: 20px;
  height: 20px;
  stroke: #ffffff;
  display: block;
}


  `;

  function configurarAnimacoesHeader() {
    const elementos = document.querySelectorAll(".page-end-section .header-reveal");
    if (!elementos.length) return;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            setTimeout(() => {
              entry.target.style.transitionDelay = "0s";
            }, 900);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    elementos.forEach(el => observer.observe(el));
  }

  function montarHeader() {
    const alvo = document.getElementById("header-placeholder") || document.body;
    if (alvo === document.body) {
      alvo.insertAdjacentHTML("beforeend", headerHTML);
    } else {
      alvo.innerHTML = headerHTML;
    }

    configurarAnimacoesHeader();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", montarHeader);
  } else {
    montarHeader();
  }
})();