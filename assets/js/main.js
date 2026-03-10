// MAISON DE KARABS - Main JavaScript
// Smooth interactions and animations

document.addEventListener('DOMContentLoaded', function () {

    // ===== MOBILE MENU TOGGLE =====
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
    });

    // ===== STICKY HEADER ON SCROLL =====
    const header = document.querySelector('.site-header');
    let lastScroll = 0;

    window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;

        // ===== SCROLL PROGRESS BAR =====
        const progressBar = document.getElementById('scrollProgress');
        if (progressBar) {
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (currentScroll / docHeight) * 100 : 0;
            progressBar.style.width = progress + '%';
        }
    });

    // ===== SCROLL REVEAL =====
    const revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all elements with fade-in classes
    const fadeElements = document.querySelectorAll('.fade-in, .fade-in-delay, .fade-in-delay-2, .fade-in-delay-3, .fade-in-left, .fade-in-right');
    fadeElements.forEach(el => {
        // Set initial state for elements that haven't animated yet
        if (!el.style.opacity) {
            el.style.opacity = '0';
        }
        observer.observe(el);
    });

    // ===== COLLECTION FILTERS =====
    const filterBtns = document.querySelectorAll('.filter-btn');
    const collectionItems = document.querySelectorAll('.collection-item[data-category]');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const filter = this.dataset.filter;
            collectionItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    // ===== COLLECTION ITEM HOVER EFFECT =====
    document.querySelectorAll('.collection-item').forEach(item => {
        const image = item.querySelector('.collection-image img');
        item.addEventListener('mouseenter', () => { if (image) image.style.transform = 'scale(1.1)'; });
        item.addEventListener('mouseleave', () => { if (image) image.style.transform = 'scale(1)'; });
    });

    // ===== PARALLAX EFFECT FOR HERO SECTION =====
    const heroSection = document.querySelector('.hero-section');
    const heroBg = document.querySelector('.hero-bg');

    if (heroSection && heroBg) {
        window.addEventListener('scroll', function () {
            const scrollPosition = window.pageYOffset;
            const heroHeight = heroSection.offsetHeight;

            if (scrollPosition < heroHeight) {
                const parallaxValue = scrollPosition * 0.5;
                heroBg.style.transform = `translateY(${parallaxValue}px)`;
            }
        });
    }

    // ===== FORM VALIDATION (for consultation page) =====
    const forms = document.querySelectorAll('.contact-form, .consultation-form');
    forms.forEach(form => {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Basic validation
            const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
            let isValid = true;

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');

                    // Remove error class on input
                    input.addEventListener('input', function () {
                        this.classList.remove('error');
                    });
                } else {
                    input.classList.remove('error');
                }
            });

            if (isValid) {
                // Show success message
                showNotification('Thank you! We will contact you soon.', 'success');
                form.reset();
            } else {
                showNotification('Please fill in all required fields.', 'error');
            }
        });
    });

    // ===== NOTIFICATION SYSTEM =====
    function showNotification(message, type = 'success') {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background-color: ${type === 'success' ? '#C6A75E' : '#D32F2F'};
            color: white;
            padding: 1rem 2rem;
            border-radius: 4px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
        `;

        document.body.appendChild(notification);

        // Remove after 4 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }

    // ===== LAZY LOADING FOR IMAGES =====
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // ===== ACTIVE NAV LINK HIGHLIGHTING (scroll-spy) =====
    const sections = document.querySelectorAll('section[id]');
    function updateActiveNav() {
        const scrollY = window.pageYOffset;
        const headerHeight = header ? header.offsetHeight : 80;
        sections.forEach(section => {
            const top = section.offsetTop - headerHeight - 60;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');
            const link = document.querySelector(`.nav-link[href="#${id}"]`);
            if (link) {
                if (scrollY >= top && scrollY < bottom) {
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        });
    }
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();

    // ===== SCROLL TO TOP BUTTON =====
    const scrollTopBtn = document.getElementById('scrollTop');

    // Show/hide scroll to top button
    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 500) {
            if (scrollTopBtn) scrollTopBtn.classList.add('visible');
        } else {
            if (scrollTopBtn) scrollTopBtn.classList.remove('visible');
        }
    });

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ===== PRELOAD HERO IMAGE =====
    const heroImage = document.querySelector('.hero-bg');
    if (heroImage && heroImage.dataset.src) {
        const img = new Image();
        img.onload = function () {
            heroImage.src = img.src;
            heroImage.style.opacity = '1';
        };
        img.src = heroImage.dataset.src;
    }

});

// ===== CSS ANIMATIONS (added via JavaScript) =====
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .scroll-to-top:hover {
        background-color: #B8944E !important;
        transform: translateY(-3px);
    }
    
    input.error,
    textarea.error,
    select.error {
        border-color: #D32F2F !important;
        box-shadow: 0 0 0 2px rgba(211, 47, 47, 0.1) !important;
    }
`;
document.head.appendChild(style);
