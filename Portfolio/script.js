/* =============================================
   AAYUSH SONER PORTFOLIO — SCRIPT.JS
   Handles: cursor, scroll animations,
            parallax, skill bars, nav state
   ============================================= */

'use strict';

// ── NAV SCROLL STATE ───────────────────────────
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ── ACTIVE NAV LINK ────────────────────────────
const sections = document.querySelectorAll('section[id], footer[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => navObserver.observe(s));

// ── SCROLL FADE-UP ANIMATIONS ──────────────────
const fadeEls = document.querySelectorAll('.fade-up');

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = parseInt(entry.target.dataset.delay || 0, 10);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      fadeObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -60px 0px'
});

fadeEls.forEach(el => fadeObserver.observe(el));

// ── PARALLAX BACKGROUNDS ───────────────────────
const parallaxSections = [
  { bg: document.querySelector('.hero-bg'),     speed: 0.35 },
  { bg: document.querySelector('.about-bg'),    speed: 0.25 },
  { bg: document.querySelector('.projects-bg'), speed: 0.30 },
  { bg: document.querySelector('.skills-bg'),   speed: 0.28 },
];

let ticking = false;

function updateParallax() {
  const scrollY = window.scrollY;

  parallaxSections.forEach(({ bg, speed }) => {
    if (!bg) return;
    const rect   = bg.parentElement.getBoundingClientRect();
    const offset = (rect.top + scrollY) * speed;
    bg.style.transform = `scale(1.08) translateY(${offset * 0.15}px)`;
  });

  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(updateParallax);
    ticking = true;
  }
}, { passive: true });



// ── PROJECT CARD HOVER GLOW ────────────────────
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width)  * 100;
    const y = ((e.clientY - rect.top)  / rect.height) * 100;
    card.style.setProperty('--mx', `${x}%`);
    card.style.setProperty('--my', `${y}%`);
  });
});

// ── SMOOTH NAV CLICK ───────────────────────────
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});

// ── STREAK ANIMATION FIX ───────────────────────
// Give each streak a random initial offset
document.querySelectorAll('.streak').forEach((streak, i) => {
  const rotations = [-8, -6, -10, -7, -9];
  streak.style.setProperty('--r', `${rotations[i % rotations.length]}deg`);
  streak.style.animationDelay = `${Math.random() * 4}s`;
});

// ── ENTRANCE ANIMATION ON LOAD ─────────────────
window.addEventListener('DOMContentLoaded', () => {
  // Immediately visible hero elements
  setTimeout(() => {
    document.querySelectorAll('.hero .fade-up').forEach(el => {
      const delay = parseInt(el.dataset.delay || 0, 10) + 300;
      setTimeout(() => el.classList.add('visible'), delay);
    });
  }, 100);
});
