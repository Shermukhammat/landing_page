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
const galleryImages = Array.from(document.querySelectorAll('.gallery-item img'))
    .map((img) => img.getAttribute('src'))
    .filter(Boolean);
let currentImageIndex = 0;

// ===== LIGHTBOX =====
const lightboxEl = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
let touchStartX = 0;
let touchStartY = 0;
let touchActive = false;

function openLightbox(index) {
    currentImageIndex = index;
    lightboxImg.src = galleryImages[index];
    lightboxEl.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightboxEl.classList.remove('active');
    document.body.style.overflow = '';
}

function navigateLightbox(direction) {
    currentImageIndex = (currentImageIndex + direction + galleryImages.length) % galleryImages.length;
    lightboxImg.src = galleryImages[currentImageIndex];
}

// Close lightbox on background click
lightboxEl.addEventListener('click', function (e) {
    if (e.target === this) closeLightbox();
});

// Swipe navigation on touch devices
lightboxImg.addEventListener('touchstart', (e) => {
    if (!lightboxEl.classList.contains('active')) return;
    const touch = e.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
    touchActive = true;
}, { passive: true });

lightboxImg.addEventListener('touchend', (e) => {
    if (!touchActive) return;
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartX;
    const deltaY = touch.clientY - touchStartY;
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);
    const swipeThreshold = 40;

    if (absX > swipeThreshold && absX > absY * 1.2) {
        navigateLightbox(deltaX < 0 ? 1 : -1);
    }
    touchActive = false;
});

lightboxImg.addEventListener('touchcancel', () => {
    touchActive = false;
});

// Keyboard navigation
document.addEventListener('keydown', function (e) {
    const lightbox = lightboxEl;
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
