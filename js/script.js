/**
 * Konigthegreat Mini CV - Interactive Scripts
 * Features: Particle system, scroll animations, mobile menu, smooth interactions
 */

// ========================================
// Particle System
// ========================================
class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.animationId = null;
        this.isActive = true;
        
        // Configuration
        this.config = {
            particleCount: window.innerWidth < 768 ? 30 : 60,
            connectionDistance: 150,
            mouseDistance: 200,
            speed: 0.5,
            colors: ['rgba(168, 85, 247, 0.6)', 'rgba(124, 58, 237, 0.4)', 'rgba(192, 132, 252, 0.3)']
        };
        
        this.mouse = { x: null, y: null };
        
        this.init();
    }
    
    init() {
        this.resize();
        this.createParticles();
        this.addEventListeners();
        this.animate();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.config.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * this.config.speed,
                vy: (Math.random() - 0.5) * this.config.speed,
                size: Math.random() * 2 + 1,
                color: this.config.colors[Math.floor(Math.random() * this.config.colors.length)]
            });
        }
    }
    
    addEventListeners() {
        window.addEventListener('resize', () => {
            this.resize();
            this.createParticles();
        });
        
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.x;
            this.mouse.y = e.y;
        });
        
        window.addEventListener('mouseleave', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });
        
        // Pause animation when tab is hidden
        document.addEventListener('visibilitychange', () => {
            this.isActive = document.visibilityState === 'visible';
            if (this.isActive) {
                this.animate();
            } else {
                cancelAnimationFrame(this.animationId);
            }
        });
    }
    
    animate() {
        if (!this.isActive) return;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw particles
        this.particles.forEach((particle, i) => {
            // Mouse interaction
            if (this.mouse.x !== null && this.mouse.y !== null) {
                const dx = this.mouse.x - particle.x;
                const dy = this.mouse.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.config.mouseDistance) {
                    const force = (this.config.mouseDistance - distance) / this.config.mouseDistance;
                    particle.vx -= (dx / distance) * force * 0.02;
                    particle.vy -= (dy / distance) * force * 0.02;
                }
            }
            
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Boundary check
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            
            // Keep particles in bounds
            particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
            particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.fill();
            
            // Draw connections
            for (let j = i + 1; j < this.particles.length; j++) {
                const other = this.particles[j];
                const dx = particle.x - other.x;
                const dy = particle.y - other.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.config.connectionDistance) {
                    const opacity = (1 - distance / this.config.connectionDistance) * 0.3;
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(other.x, other.y);
                    this.ctx.strokeStyle = `rgba(168, 85, 247, ${opacity})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                }
            }
        });
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    destroy() {
        cancelAnimationFrame(this.animationId);
        this.isActive = false;
    }
}

// ========================================
// Scroll Animations
// ========================================
class ScrollAnimations {
    constructor() {
        this.sections = document.querySelectorAll('.section');
        this.cards = document.querySelectorAll('.glass-card');
        this.navbar = document.querySelector('.navbar');
        
        this.init();
    }
    
    init() {
        this.addFadeInClasses();
        this.observeElements();
        this.handleNavbarScroll();
    }
    
    addFadeInClasses() {
        // Add fade-in class to elements
        this.sections.forEach(section => {
            const header = section.querySelector('.section-header');
            const content = section.querySelectorAll('.glass-card');
            
            if (header) header.classList.add('fade-in');
            content.forEach((card, index) => {
                card.classList.add('fade-in');
                card.style.transitionDelay = `${index * 0.1}s`;
            });
        });
    }
    
    observeElements() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
    }
    
    handleNavbarScroll() {
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            // Add/remove scrolled class
            if (currentScroll > 50) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
            
            lastScroll = currentScroll;
        });
    }
}

// ========================================
// Mobile Menu
// ========================================
class MobileMenu {
    constructor() {
        this.toggle = document.querySelector('.mobile-menu-toggle');
        this.navLinks = document.querySelector('.nav-links');
        this.links = document.querySelectorAll('.nav-link');
        
        this.init();
    }
    
    init() {
        if (!this.toggle) return;
        
        this.toggle.addEventListener('click', () => this.toggleMenu());
        
        // Close menu when clicking a link
        this.links.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.toggle.contains(e.target) && !this.navLinks.contains(e.target)) {
                this.closeMenu();
            }
        });
    }
    
    toggleMenu() {
        this.toggle.classList.toggle('active');
        this.navLinks.classList.toggle('active');
        document.body.style.overflow = this.navLinks.classList.contains('active') ? 'hidden' : '';
    }
    
    closeMenu() {
        this.toggle.classList.remove('active');
        this.navLinks.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ========================================
// Smooth Scroll
// ========================================
class SmoothScroll {
    constructor() {
        this.init();
    }
    
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const offset = 80; // Account for fixed navbar
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// ========================================
// Copy to Clipboard
// ========================================
function copyToClipboard(text, tooltipId) {
    navigator.clipboard.writeText(text).then(() => {
        const tooltip = document.getElementById(`${tooltipId}-tooltip`);
        if (tooltip) {
            tooltip.classList.add('show');
            setTimeout(() => {
                tooltip.classList.remove('show');
            }, 2000);
        }
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

// ========================================
// Parallax Effect
// ========================================
class ParallaxEffect {
    constructor() {
        this.hero = document.querySelector('.hero');
        this.heroContent = document.querySelector('.hero-content');
        
        this.init();
    }
    
    init() {
        if (!this.hero || window.matchMedia('(pointer: coarse)').matches) return;
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            
            if (this.heroContent) {
                this.heroContent.style.transform = `translateY(${rate}px)`;
                this.heroContent.style.opacity = 1 - (scrolled / 700);
            }
        });
    }
}

// ========================================
// Card Hover Effects
// ========================================
class CardEffects {
    constructor() {
        this.cards = document.querySelectorAll('.service-card, .work-card, .connect-card');
        
        this.init();
    }
    
    init() {
        this.cards.forEach(card => {
            card.addEventListener('mousemove', (e) => this.handleMouseMove(e, card));
            card.addEventListener('mouseleave', () => this.handleMouseLeave(card));
        });
    }
    
    handleMouseMove(e, card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    }
    
    handleMouseLeave(card) {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    }
}

// ========================================
// Initialize Everything
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize particle system
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        new ParticleSystem(canvas);
    }
    
    // Initialize scroll animations
    new ScrollAnimations();
    
    // Initialize mobile menu
    new MobileMenu();
    
    // Initialize smooth scroll
    new SmoothScroll();
    
    // Initialize parallax effect
    new ParallaxEffect();
    
    // Initialize card effects (only on non-touch devices)
    if (!window.matchMedia('(pointer: coarse)').matches) {
        new CardEffects();
    }
    
    // Add loaded class for initial animations
    document.body.classList.add('loaded');
});

// Handle reduced motion preference
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--transition-fast', '0.01ms');
    document.documentElement.style.setProperty('--transition-medium', '0.01ms');
    document.documentElement.style.setProperty('--transition-slow', '0.01ms');
}
