(function () {
  const footerHTML = `
<section class="page-end-section">
    <div class="company-rights footer-reveal" style="--stagger: 4;">
      <p>© 2026 HDS Automação. Todos os direitos reservados.</p>
    </div>
  </section>

<style>
.page-end-section {
  width: 100%;
  box-sizing: border-box;
  color: #ffffff;
  font-family: Arial, sans-serif;
  padding: 20px 40px 40px 40px;
  position: relative;
  overflow: hidden;
}

/* ================= DIREITOS AUTORAIS ================= */
.company-rights {
  max-width: 1200px;
  margin: 24px auto 0 auto;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: left;
}

.company-rights p {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.55);
  margin: 0;
}

/* ================= ANIMAÇÃO DE ENTRADA AO ROLAR ================= */
.footer-col.footer-reveal,
.company-rights.footer-reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
              transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: calc(var(--stagger, 0) * 0.1s);
}

.footer-col.footer-reveal.is-visible,
.company-rights.footer-reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* ================= RESPONSIVIDADE DO FOOTER ================= */
@media (max-width: 1024px) {
  .footer-container {
    gap: 36px;
  }
}

  .footer-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;
  }
}

@media (max-width: 520px) {
  .footer-container {
    grid-template-columns: 1fr;
    gap: 28px;
  }

  .footer-logo {
    max-width: 200px;
  }

  .company-rights {
    text-align: center;
  }
}
</style>
  `;

  function configurarAnimacoesRodape() {
    const elementos = document.querySelectorAll(".page-end-section .footer-reveal");
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

  function montarRodape() {
    const alvo = document.getElementById("footer-placeholder") || document.body;
    if (alvo === document.body) {
      alvo.insertAdjacentHTML("beforeend", footerHTML);
    } else {
      alvo.innerHTML = footerHTML;
    }

    configurarAnimacoesRodape();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", montarRodape);
  } else {
    montarRodape();
  }
})();