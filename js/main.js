// ── Navbar Scroll Effect ──
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
});

// ── Mobile Hamburger Menu ──
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
});

// Close menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
    });
});

// ── Scroll Reveal (Intersection Observer) ──
const revealElements = document.querySelectorAll('[data-reveal]');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = entry.target.getAttribute('data-delay') || 0;
            setTimeout(() => {
                entry.target.classList.add('revealed');
            }, parseInt(delay));
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ── FAQ Accordion ──
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const item = button.parentElement;
        const isActive = item.classList.contains('active');
        
        // Close all other items
        document.querySelectorAll('.faq-item').forEach(other => {
            other.classList.remove('active');
        });
        
        // Toggle current
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// ── Smooth Anchor Scroll ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ── Parallax Hero Effect ──
const hero = document.getElementById('hero');
const heroBg = document.querySelector('.hero-bg');

window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;
    if (hero && scrollPos < window.innerHeight) {
        heroBg.style.transform = `translateY(${scrollPos * 0.4}px)`;
    }
});

// ── Counter Animation ──
function animateCounters() {
    document.querySelectorAll('.stat-number').forEach(el => {
        const text = el.textContent;
        // Only animate pure numbers
        if (/^\d+$/.test(text)) {
            const target = parseInt(text);
            let current = 0;
            const increment = Math.ceil(target / 60);
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    el.textContent = text;
                    clearInterval(timer);
                } else {
                    el.textContent = current;
                }
            }, 30);
        }
    });
}

// Re-trigger counter on stat section reveal
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

// ── Mouse Follower Glow ──
const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
        const rect = heroSection.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        heroSection.style.setProperty('--mouse-x', x + '%');
        heroSection.style.setProperty('--mouse-y', y + '%');
    });
}

console.log('Nyth Client — Premium Minecraft PvP Client');
