import './style.css'
import { createIcons, icons } from 'lucide';

// Initialize Lucide icons
createIcons({ icons });

console.log('YScroll Landing Page initialized');

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Simple intersection observer to trigger animations on scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Optional: stop observing once visible
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card, .section-header, .faq-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// Add class for handling the transition styles
const style = document.createElement('style');
style.textContent = `
    .visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// Marquee pause on hover
const marquees = document.querySelectorAll('.marquee-column');
marquees.forEach(marquee => {
    marquee.addEventListener('mouseenter', () => {
        marquee.style.animationPlayState = 'paused';
    });
    marquee.addEventListener('mouseleave', () => {
        marquee.style.animationPlayState = 'running';
    });
});

// Counter Animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                const target = counter.innerText.includes('k') ? 1200 : parseInt(counter.innerText);
                const isK = counter.innerText.includes('k');
                let count = 0;
                const updateCount = () => {
                    const increment = target / 50;
                    if (count < target) {
                        count += increment;
                        counter.innerText = isK ? (Math.ceil(count) / 1000).toFixed(1) + 'k' : Math.ceil(count) + '+';
                        requestAnimationFrame(updateCount);
                    } else {
                        counter.innerText = isK ? '1.2k' : target + '+';
                    }
                };
                updateCount();
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.os-stats').forEach(el => {
    statsObserver.observe(el);
});
