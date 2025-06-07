// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    preloader.style.opacity = '0';
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 300);
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const bars = document.querySelectorAll('.bar');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    bars.forEach(bar => bar.classList.toggle('active'));
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-container')) {
        navLinks.classList.remove('active');
        bars.forEach(bar => bar.classList.remove('active'));
    }
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
            // Close mobile menu if open
            navLinks.classList.remove('active');
            bars.forEach(bar => bar.classList.remove('active'));
        }
    });
});

// Initialize Swiper
const swiper = new Swiper('.collection-slider', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    }
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            if (entry.target.classList.contains('achievement')) {
                animateNumber(entry.target.querySelector('.number'));
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.collection-info, .about-content, .lookbook-item, .achievement, .atelier-text, .contact-info').forEach(el => {
    observer.observe(el);
});

// Number Animation for Achievements
function animateNumber(element) {
    const target = parseInt(element.textContent);
    let current = 0;
    const increment = target / 30; // Animate over 30 steps
    const duration = 1500; // Animation duration in milliseconds
    const stepTime = duration / 30;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, stepTime);
}

// Form Handling
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });

    // Validate form
    let isValid = true;
    const inputs = this.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });

    if (!isValid) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    // Simulate form submission
    const button = this.querySelector('button');
    const originalText = button.textContent;
    button.textContent = 'Sending...';
    button.disabled = true;

    setTimeout(() => {
        showNotification('Thank you for your message! We will get back to you soon.', 'success');
        this.reset();
        button.textContent = originalText;
        button.disabled = false;
    }, 1500);
});

// Notification System
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const heroBackground = document.querySelector('.hero-background');
    
    heroContent.style.transform = `translate(-50%, ${-50 + (scrolled * 0.2)}%)`;
    heroBackground.style.transform = `translateY(${scrolled * 0.4}px)`;
});

// Image Loading Animation
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function() {
        this.classList.add('loaded');
    });
}); 