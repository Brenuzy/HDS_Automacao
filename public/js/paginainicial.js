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

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });

    contents.forEach((content, i) => {
      if (content) {
        content.style.display = (i === index) ? 'block' : 'none';
      }
    });

    images.forEach((image, i) => {
      if (image) {
        image.style.display = (i === index) ? 'flex' : 'none';
      }
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => mostrarSlide(index));
  });

  mostrarSlide(0);
});