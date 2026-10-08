document.addEventListener('DOMContentLoaded', () => {
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
        content.style.display = (i === currentSlide) ? 'block' : 'none';
      }
    });

    // Atualiza os elementos de imagem/fundo
    images.forEach((image, i) => {
      if (image) {
        image.style.display = (i === currentSlide) ? 'flex' : 'none';
      }
    });
  }

  // Evento de clique nos pontos indicadores
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      mostrarSlide(index);
      reiniciarTimer();
    });
  });

  // Temporizador para trocar de slide automaticamente a cada 5 segundos
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
});