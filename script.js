/**
 * Activa - Main JavaScript
 * Enhanced with modern practices and better organization
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Navigation
  initNavigation();
  
  // 2. Stats Counter Animation
  initStatsCounter();
  
  // 3. Footer enhancements
  initFooter();
  
  // 4. General enhancements
  initAccessibility();
});

/**
 * Initialize navigation functionality
 */
function initNavigation() {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  if (!hamburger || !navLinks) return;
  
  // Toggle mobile menu
  hamburger.addEventListener('click', () => {
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !isExpanded);
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
  });
  
  // Close mobile menu when clicking on links
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        hamburger.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
      }
    });
  });
  
  // Scroll effect
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
}

/**
 * Animate stats counters
 */
function initStatsCounter() {
  const statsSection = document.querySelector('.stats-section');
  if (!statsSection) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  observer.observe(statsSection);
  
  function animateCounters() {
    document.querySelectorAll('.stat-item h3').forEach(item => {
      const target = parseInt(item.getAttribute('data-count'));
      const duration = 2000;
      const startTime = performance.now();
      
      const animate = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const value = Math.floor(progress * target);
        
        item.textContent = value.toLocaleString();
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    });
  }
}

/**
 * Footer enhancements
 */
function initFooter() {
  // Update copyright year
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('.footer a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/**
 * Accessibility improvements
 */
function initAccessibility() {
  // Add focus styles for keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-nav');
    }
  });
  
  document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
  });
  
  // External link indicators
  document.querySelectorAll('a[target="_blank"]').forEach(link => {
    if (!link.querySelector('.sr-only')) {
      link.innerHTML += '<span class="sr-only">(opens in new tab)</span>';
    }
  });
}

// Helper for screen reader text
function createSRText(text) {
  const span = document.createElement('span');
  span.className = 'sr-only';
  span.textContent = text;
  return span;
}
