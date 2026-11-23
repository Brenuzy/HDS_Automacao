(function () {
  const footerHTML = `
  <section class="page-end-section">
    <div class="glow-line-end footer-reveal"></div>

    <div class="footer-container">
      <div class="footer-col footer-reveal" style="--stagger: 0;">
        <img src="/images/logohdsv3.png" alt="Logo" class="footer-logo">
        
        <div class="contact-item">
          <svg class="icon" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"/></svg>
          <span>R. Dona Bárbara Cid, 163 - Uberaba, Curitiba - PR</span>
        </div>
        
        <div class="contact-item">
          <svg class="icon" viewBox="0 0 24 24"><path fill="currentColor" d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
          <span>Telefone - (41) 3045-6704</span>
        </div>
        
        <div class="contact-item">
          <svg class="icon" viewBox="0 0 24 24"><path fill="currentColor" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
          <span>daxautomacaoindustrial@gmail.com</span>
        </div>
      </div>

      <div class="footer-col footer-reveal" style="--stagger: 1;">
        <h3>COLEÇÕES</h3>
        <a href="https://www.us.contrinex.com/collections/smart-sensors">Sensores Inteligentes</a>
        <a href="https://www.us.contrinex.com/collections/inductive-miniature">Sensores Resis. à Solda</a>
        <a href="https://www.us.contrinex.com/collections/photoelectric-miniature">Sensores Prox. Indutivos</a>
        <a href="https://www.us.contrinex.com/collections/inductive-weld-immune">Sensores Fotoelétrico</a>
        <a href="https://www.us.contrinex.com/collections/inductive-extreme">Sensores Fotoelétricos - Cúbicos Miniatura</a>
      </div>

      <div class="footer-col footer-reveal" style="--stagger: 2;">
        <h3>INFORMAÇÕES</h3>
        <a href="/sobre">Empresa</a>
        <a href="/contatos">Trabalhe Conosco</a>
        <a href="/contatos">Suporte</a>
      </div>

      <div class="footer-col footer-reveal" style="--stagger: 3;">
        <h3>SIGA-NOS</h3>
        <div class="social-icons">
          <!-- Instagram -->
          <a href="https://www.instagram.com/daxautomacao/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <svg viewBox="0 0 24 24" class="social-icon">
              <path fill="currentColor" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>

          <!-- WhatsApp -->
          <a href="https://api.whatsapp.com/send/?phone=5541998431333&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
            <svg viewBox="0 0 24 24" class="social-icon">
              <path fill="currentColor" d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>

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

/* ================= LINHA BRILHANTE FINAL (ESTILO CONTRINEX) ================= */
.glow-line-end {
  position: relative;
  display: block;
  width: 85%;
  max-width: 1200px;
  height: 2px;
  margin: 40px auto 60px auto;
  border: none;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(56, 189, 248, 0.35) 18%,
    #7dd3fc 32%,
    #ffffff 46%,
    #ffffff 54%,
    #7dd3fc 68%,
    rgba(56, 189, 248, 0.35) 82%,
    transparent 100%
  );
  transform: scaleX(0.55);
  opacity: 0;
  transition: transform 0.9s cubic-bezier(0.22, 1, 0.36, 1),
              opacity 0.7s ease;
}

.glow-line-end.is-visible {
  transform: scaleX(1);
  opacity: 1;
}

.glow-line-end::before {
  content: '';
  position: absolute;
  top: -3px;
  left: 0;
  right: 0;
  height: 8px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(56, 189, 248, 0.65) 28%,
    #bae6fd 50%,
    rgba(56, 189, 248, 0.65) 72%,
    transparent 100%
  );
  filter: blur(4px);
  pointer-events: none;
  animation: footerBeamPulse 3.5s ease-in-out infinite;
}

.glow-line-end::after {
  content: '';
  position: absolute;
  top: -20px;
  left: 0;
  right: 0;
  height: 42px;
  background: radial-gradient(
    ellipse 42% 48% at center,
    rgba(125, 211, 252, 0.65) 0%,
    rgba(0, 168, 255, 0.32) 40%,
    rgba(37, 99, 235, 0.08) 70%,
    transparent 85%
  );
  filter: blur(8px);
  pointer-events: none;
  animation: footerBeamPulse 3.5s ease-in-out infinite;
}

@keyframes footerBeamPulse {
  0%, 100% {
    opacity: 0.78;
    transform: scaleX(0.98);
  }
  50% {
    opacity: 1;
    transform: scaleX(1.02);
  }
}

/* ================= GRID E COLUNAS DO FOOTER ================= */
.footer-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 60px;
  max-width: 1200px;
  margin: 0 auto;
}

.footer-col {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  flex: 1;
  margin-bottom: 24px;
  gap: 6px;
}

.footer-col h3 {
  font-size: 15px;
  font-weight: 800;
  letter-spacing: 1.2px;
  color: #ffffff;
  margin: 0 0 14px 0;
  text-transform: uppercase;
}

.footer-logo {
  width: 100%;
  max-width: 240px;
  height: auto;
  display: block;
  margin-bottom: 18px;
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), filter 0.35s ease;
}

.footer-logo:hover {
  transform: scale(1.03);
  filter: drop-shadow(0 0 12px rgba(56, 189, 248, 0.35));
}

.footer-col a {
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  font-size: 14px;
  margin-bottom: 8px;
  line-height: 1.4;
  position: relative;
  display: inline-block;
  padding-bottom: 3px;
  transition: color 0.25s ease,
              transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}

.footer-col a:hover {
  color: #ffffff;
  transform: translateX(4px);
}

.footer-col a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, #38bdf8, #ffffff);
  box-shadow: 0 0 6px rgba(56, 189, 248, 0.8);
  transform: scaleX(0);
  transform-origin: bottom right;
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}

.footer-col a:hover::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}

/* ================= ITENS DE CONTATO ================= */
.contact-item {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}

.contact-item:hover {
  transform: translateX(3px);
}

.page-end-section .icon {
  width: 20px;
  height: 20px;
  color: #ffffff;
  flex-shrink: 0;
  transition: transform 0.3s ease, filter 0.3s ease;
}

.contact-item:hover .icon {
  transform: scale(1.12);
  filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.8));
}

.contact-item span {
  color: rgba(255, 255, 255, 0.88);
  font-size: 14px;
  line-height: 1.4;
  text-align: left;
}

/* ================= REDES SOCIAIS ================= */
.social-icons {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 4px;
}

.social-icons a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  margin: 0;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.05);
  color: #ffffff;
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1),
              background-color 0.3s ease,
              border-color 0.3s ease,
              color 0.3s ease,
              box-shadow 0.3s ease;
}

.social-icons a::after {
  display: none;
}

.social-icons a:hover {
  background-color: rgba(0, 168, 255, 0.1);
  border-color: transparent;
  transform: translateY(-4px);
}

.social-icon {
  width: 20px;
  height: 20px;
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

@media (max-width: 768px) {
  .page-end-section {
    padding: 20px 24px 36px 24px;
  }

  .glow-line-end {
    width: 92%;
    margin: 24px auto 40px auto;
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