document.addEventListener('DOMContentLoaded', () => {
  const dots = document.querySelectorAll('.carousel-indicators .dot');

  const contents = [
    document.querySelector('.home-content1'),
    document.querySelector('.home-content2'),
    document.querySelector('.home-content3')
  ];

  const images = [
    document.querySelector('.home-image1'),
    document.querySelector('.home-image2'),
    document.querySelector('.home-image3')
  ];

  function mostrarSlide(index) {
    // 1. Atualiza os botões
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });

    // 2. Controla a exibição dos textos
    contents.forEach((content, i) => {
      if (content) {
        content.style.display = (i === index) ? 'block' : 'none';
      }
    });

    // 3. Controla a exibição das imagens
    images.forEach((image, i) => {
      if (image) {
        image.style.display = (i === index) ? 'flex' : 'none';
      }
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => mostrarSlide(index));
  });

  // Força a exibição inicial apenas do slide 1 (índice 0)
  mostrarSlide(0);
});