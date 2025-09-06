// DOM Elements
const stepInsideBtn = document.getElementById('stepInsideBtn');
const notifyBtn = document.getElementById('notifyBtn');
const emailForm = document.getElementById('emailForm');
const emailInput = document.getElementById('emailInput');
const successMessage = document.getElementById('successMessage');
const maintenanceModal = document.getElementById('maintenanceModal');
const closeModal = document.querySelector('.close');

// Animation Observer for scroll-triggered animations
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
};

const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const children = target.querySelectorAll('.section-title, .section-text, .section-description, .features-list, .features-grid, .highlight-badge');
            
            children.forEach((child, index) => {
                setTimeout(() => {
                    child.classList.add('animate');
                    
                    // Animate individual feature cards with stagger effect
                    if (child.classList.contains('features-grid')) {
                        const featureCards = child.querySelectorAll('.feature-card');
                        featureCards.forEach((card, cardIndex) => {
                            setTimeout(() => {
                                card.style.opacity = '0';
                                card.style.transform = 'translateY(30px)';
                                card.style.transition = 'all 0.6s ease';
                                
                                setTimeout(() => {
                                    card.style.opacity = '1';
                                    card.style.transform = 'translateY(0)';
                                }, cardIndex * 150);
                            }, 200);
                        });
                    }
                }, index * 200);
            });
            
            // Stop observing once animated
            animateOnScroll.unobserve(target);
        }
    });
}, observerOptions);

// Observe all sections for animation
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        animateOnScroll.observe(section);
    });
});

// Step Inside Button - Show Maintenance Modal
stepInsideBtn.addEventListener('click', () => {
    maintenanceModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
});

// Notify Me Button - Scroll to CTA
notifyBtn.addEventListener('click', () => {
    document.getElementById('cta').scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
});

// Close Modal
closeModal.addEventListener('click', () => {
    maintenanceModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === maintenanceModal) {
        maintenanceModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Email Form Submission
emailForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    
    if (email && isValidEmail(email)) {
        // Hide form and show success message
        emailForm.style.display = 'none';
        successMessage.classList.add('show');
        
        // Store email (in a real app, this would go to a server)
        console.log('Email captured:', email);
        
        // Optional: Reset after 5 seconds
        setTimeout(() => {
            emailForm.style.display = 'flex';
            successMessage.classList.remove('show');
            emailInput.value = '';
        }, 5000);
    }
});

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Smooth scrolling for navigation (if added later)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(26, 26, 46, 0.98)';
    } else {
        navbar.style.background = 'rgba(26, 26, 46, 0.95)';
    }
});

// Parallax effect for floating icons
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const icons = document.querySelectorAll('.icon');
    
    icons.forEach((icon, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = scrolled * speed;
        icon.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
    });
});

// Add dynamic typing effect to hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Enhanced button hover effects
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add ripple effect to buttons
function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    circle.style.width = circle.style.height = diameter + 'px';
    circle.style.left = event.clientX - button.offsetLeft - radius + 'px';
    circle.style.top = event.clientY - button.offsetTop - radius + 'px';
    circle.classList.add('ripple');
    
    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
        ripple.remove();
    }
    
    button.appendChild(circle);
}

// Add ripple effect styles dynamically
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.4);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Apply ripple effect to all buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', createRipple);
});

// Enhanced loading animations
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Stagger animation for hero elements
    const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-buttons');
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.animationDelay = `${0.5 + index * 0.2}s`;
        }, 100);
    });
});

// Add smooth transitions for better UX
document.documentElement.style.scrollBehavior = 'smooth';

// Performance optimization - throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
const throttledScroll = throttle(() => {
    // Navbar background change
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(26, 26, 46, 0.98)';
    } else {
        navbar.style.background = 'rgba(26, 26, 46, 0.95)';
    }
}, 16); // ~60fps

window.addEventListener('scroll', throttledScroll);