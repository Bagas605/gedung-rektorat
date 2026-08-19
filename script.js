// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            updateActiveLink(this);
            closeMenu();
        }
    });
});

// Update active navigation link on scroll with smooth transition
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}, { passive: true });

function updateActiveLink(element) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    element.classList.add('active');
}

// Hamburger menu toggle with smooth animation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

function toggleMenu() {
    if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
    } else {
        navMenu.classList.add('active');
    }
}

function closeMenu() {
    navMenu.classList.remove('active');
}

if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar')) {
            closeMenu();
        }
    });
}

// Contact form submission with validation
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const inputs = contactForm.querySelectorAll('input, textarea');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#ef4444';
            } else {
                input.style.borderColor = 'rgba(6, 182, 212, 0.2)';
            }
        });
        
        if (isValid) {
            showNotification('✓ Terima kasih! Pesan Anda telah diterima. Kami akan segera menghubungi Anda.');
            contactForm.reset();
        } else {
            showNotification('⚠ Mohon isi semua field yang diperlukan.', 'warning');
        }
    });
}

// Property card click handlers
const propertyButtons = document.querySelectorAll('.property-btn');
propertyButtons.forEach((btn, index) => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        showNotification(`Properti ${index + 1} - Hubungi kami untuk informasi lebih lanjut!`);
    });
});

// CTA button handler with smooth scroll
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', () => {
        document.querySelector('#properties').scrollIntoView({
            behavior: 'smooth'
        });
    });
}

// Enhanced scroll animation for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 50);
        }
    });
}, observerOptions);

// Observe property cards and sections
document.querySelectorAll('.property-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
    observer.observe(card);
});

// Observe stat cards
document.querySelectorAll('.stat').forEach(stat => {
    stat.style.opacity = '0';
    stat.style.transform = 'translateY(20px)';
    stat.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(stat);
});

// Observe feature list items
document.querySelectorAll('.features-list li').forEach(li => {
    li.style.opacity = '0';
    li.style.transform = 'translateX(-20px)';
    li.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(li);
});

// Smooth navbar background on scroll
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.style.boxShadow = '0 12px 48px rgba(6, 182, 212, 0.15)';
    } else {
        navbar.style.boxShadow = '0 8px 32px rgba(6, 182, 212, 0.1)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}, { passive: true });

// Notification system
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #06b6d4, #0891b2)' : 'linear-gradient(135deg, #f97316, #ea580c)'};
        color: white;
        padding: 16px 24px;
        border-radius: 10px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        font-weight: 600;
        font-size: 14px;
        animation: slideInRight 0.4s ease;
        letter-spacing: 0.3px;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.4s ease';
        setTimeout(() => notification.remove(), 400);
    }, 3000);
}

// Add keyframe animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(50px);
        }
    }
`;
document.head.appendChild(style);

// Throttle function for better performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Performance monitoring
console.log('%c🎉 Witana Website Loaded Successfully!', 'color: #06b6d4; font-size: 16px; font-weight: bold;');
console.log('%cModern & Smooth Design Ready ✨', 'color: #8b5cf6; font-size: 14px;');
