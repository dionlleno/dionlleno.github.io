let currentIndex = 0;
const slides = document.querySelectorAll('.img-banner');
const totalSlides = slides.length;

// Mostra o slide inicial
showSlide(currentIndex);

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.display = (i === index) ? 'block' : 'none';
    });
}

function moveSlide(direction) {
    currentIndex = (currentIndex + direction + totalSlides) % totalSlides;
    showSlide(currentIndex);
}

// Opcional: Muda automaticamente a imagem a cada 5 segundos
setInterval(() => {
    moveSlide(1);
}, 15000);
