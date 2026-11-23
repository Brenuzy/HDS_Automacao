document.addEventListener('DOMContentLoaded', () => {
  // ================= 1. CARROSSEL HERO =================
  const dots = document.querySelectorAll('.carousel-indicators .dot');

  const contents = [
    document.querySelector('.home-content1'),
    document.querySelector('.home-content2'),
    document.querySelector('.home-content3')
  ];

  const images = [
    document.querySelector('.home1'),
    document.querySelector('.home2'),
    document.querySelector('.home3')
  ];

  let currentSlide = 0;
  let autoSlideTimer;

  function reiniciarAnimacoesSlide(slideIndex) {
    const num = slideIndex + 1;
    const elementosAnimados = document.querySelectorAll(
      `.category${num}, ` +
      `.home-content${num} h1, ` +
      `.home-content${num} h2, ` +
      `.home-content${num} p, ` +
      `.home-content${num} .buttons, ` +
      `.home-image${num}`
    );

    elementosAnimados.forEach(el => {
      el.style.animation = 'none';
      el.offsetHeight; // força reflow para reiniciar a entrada
      el.style.animation = '';
    });
  }

  function mostrarSlide(index) {
    // Garante a rotação contínua (volta ao primeiro após o último)
    if (index >= images.length) currentSlide = 0;
    else if (index < 0) currentSlide = images.length - 1;
    else currentSlide = index;

    // Atualiza os pontos indicadores
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });

    // Atualiza os conteúdos de texto
    contents.forEach((content, i) => {
      if (content) {
        content.style.display = (i === currentSlide) ? 'flex' : 'none';
      }
    });

    // Atualiza os elementos de imagem/fundo
    images.forEach((image, i) => {
      if (image) {
        image.style.display = (i === currentSlide) ? 'flex' : 'none';
      }
    });

    // Reinicia apenas textos e produto do slide ativo (sem piscar o fundo)
    reiniciarAnimacoesSlide(currentSlide);
  }

  // Evento de clique nos pontos indicadores
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      mostrarSlide(index);
      reiniciarTimer();
    });
  });

  // Temporizador para trocar de slide automaticamente a cada 15 segundos
  function iniciarTimer() {
    autoSlideTimer = setInterval(() => {
      mostrarSlide(currentSlide + 1);
    }, 15000);
  }

  function reiniciarTimer() {
    clearInterval(autoSlideTimer);
    iniciarTimer();
  }

  // Inicializa o carrossel no primeiro slide
  mostrarSlide(0);
  iniciarTimer();

  // ================= 2. SCROLL REVEAL (ENTRADA AO ROLAR) =================
  const gruposStagger = [
    '.action-item',
    '.product-card',
    '.event-card'
  ];

  // Aplica atraso em cascata (stagger) para os cards de cada grupo
  gruposStagger.forEach(seletor => {
    document.querySelectorAll(seletor).forEach((el, index) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${(index % 3) * 0.1}s`;
    });
  });

  // Títulos das seções
  document.querySelectorAll('.section-title, .section-title-event').forEach(el => {
    el.classList.add('reveal');
  });

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          setTimeout(() => {
            entry.target.style.transitionDelay = '0s';
          }, 800);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});