//  Desplazamiento suave entre secciones
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

//  Cambiar fondo del header al hacer scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    header?.classList.toggle('scrolled', window.scrollY > 100);
});

//  Animaciones al entrar en pantalla
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target); // Deja de observar para optimizar
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

//  Inicializar animaciones al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = [
        ...document.querySelectorAll('.feature-card'),
        ...document.querySelectorAll('.footer-brand, .footer-section, .footer-bottom')
    ];
    
    animatedElements.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`;
        observer.observe(el);
    });

    initMobileMenu();
    updateCartCount();
});

//  Menú móvil con hamburguesa
function initMobileMenu() {
    const navbar = document.querySelector('.navbar');
    const navMenu = document.querySelector('.nav-menu');
    if (!navbar || !navMenu) return;

    let hamburger = document.querySelector('.hamburger');
    if (!hamburger) {
        hamburger = document.createElement('button');
        hamburger.className = 'hamburger';
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        navbar.appendChild(hamburger);
    }

    const toggleMenu = () => {
        navMenu.classList.toggle('active');
        hamburger.querySelector('i').className = navMenu.classList.contains('active')
            ? 'fas fa-times'
            : 'fas fa-bars';
    };

    hamburger.addEventListener('click', toggleMenu);
    navMenu.querySelectorAll('a').forEach(link =>
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.querySelector('i').className = 'fas fa-bars';
        })
    );

    const handleResize = () => {
        const isMobile = window.innerWidth <= 768;
        hamburger.style.display = isMobile ? 'block' : 'none';
        if (!isMobile) {
            navMenu.classList.remove('active');
            hamburger.querySelector('i').className = 'fas fa-bars';
        }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
}

//  Carrito básico con localStorage
const CART_KEY = 'morazul-cart';
let cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];

function saveCart() {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(product) {
    const item = cart.find(i => i.name === product.name);
    if (item) {
        item.quantity++;
    } else {
        cart.push({ ...product, quantity: 1, id: Date.now() });
    }
    saveCart();
    updateCartCount();
}

function updateCartCount() {
    const cartIcon = document.querySelector('.cart-count');
    if (cartIcon) {
        const count = cart.reduce((sum, i) => sum + i.quantity, 0);
        cartIcon.textContent = count;
    }
}
