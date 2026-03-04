// ===== HERO SLIDESHOW =====
(function () {
    const slides = document.querySelectorAll('.hero-slide');
    const dotsContainer = document.getElementById('heroDots');
    let current = 0;

    // Create dots
    slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'hero-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Slide ' + (i + 1));
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    });

    function goToSlide(index) {
        slides[current].classList.remove('active');
        dotsContainer.children[current].classList.remove('active');
        current = index;
        slides[current].classList.add('active');
        dotsContainer.children[current].classList.add('active');
    }

    setInterval(() => {
        goToSlide((current + 1) % slides.length);
    }, 5000);
})();

// ===== GALLERY IMAGES =====
const galleryImages = [
    'src/Хишрав-Т.Ж (8).jpg',
    'src/Хишрав-Т.Ж (1).jpg',
    'src/Хишрав-Т.Ж (2).jpg',
    'src/Хишрав-Т.Ж (3).jpg',
    'src/Хишрав-Т.Ж (4).jpg'
];
let currentImageIndex = 0;

// ===== LIGHTBOX =====
function openLightbox(index) {
    currentImageIndex = index;
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightboxImg');
    img.src = galleryImages[index];
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
    document.body.style.overflow = '';
}

function navigateLightbox(direction) {
    currentImageIndex = (currentImageIndex + direction + galleryImages.length) % galleryImages.length;
    document.getElementById('lightboxImg').src = galleryImages[currentImageIndex];
}

// Close lightbox on background click
document.getElementById('lightbox').addEventListener('click', function (e) {
    if (e.target === this) closeLightbox();
});

// Keyboard navigation
document.addEventListener('keydown', function (e) {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
});

// ===== SCROLL ANIMATIONS =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// ===== SCROLL PROGRESS =====
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? scrollTop / docHeight : 0;
    document.getElementById('scrollIndicator').style.transform = `scaleX(${progress})`;
});
