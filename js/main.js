/* ============================================
   MAIN — Init, Scroll Reveals, Hero Animation
   Rushikesh Phalke Portfolio
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  
  // ═══════════════════════════════════════════
  // HERO STAGGER REVEAL (SPLIT LAYOUT)
  // ═══════════════════════════════════════════
  function initHeroAnimation() {
    const photo = document.getElementById('heroPhoto');
    const staggerItems = document.querySelectorAll('.stagger-item');

    // Animate hero photo
    if (photo) {
      photo.style.opacity = '0';
      photo.style.animation = 'desaturateIn 1.2s var(--ease-out-expo) 0.1s forwards';
    }

    // Stagger text items sequentially
    staggerItems.forEach((item, i) => {
      setTimeout(() => {
        item.classList.add('is-visible');
      }, 300 + (i * 150)); // Start at 300ms, stagger by 150ms
    });
  }

  // Run hero animation
  initHeroAnimation();


  // ═══════════════════════════════════════════
  // SCROLL REVEAL — Fade-rise on scroll
  // ═══════════════════════════════════════════
  function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { 
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(el => observer.observe(el));
  }

  initScrollReveal();


  // ═══════════════════════════════════════════
  // DUOTONE → COLOR on scroll (mobile)
  // ═══════════════════════════════════════════
  function initDuotoneReveal() {
    // Only on touch/mobile where hover doesn't work
    if (window.matchMedia('(hover: hover)').matches) return;

    const duotoneElements = document.querySelectorAll('.duotone');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
        } else {
          entry.target.classList.remove('is-revealed');
        }
      });
    }, { threshold: 0.5 });

    duotoneElements.forEach(el => observer.observe(el));
  }

  initDuotoneReveal();


  // ═══════════════════════════════════════════
  // PHONE MOCKUP — Pause on touch devices
  // ═══════════════════════════════════════════
  function initPhoneMockups() {
    if (!('ontouchstart' in window)) return;

    const scrollContents = document.querySelectorAll('.phone-mockup__scroll-content');
    scrollContents.forEach(content => {
      content.style.animation = 'none';
      
      // Make it manually scrollable on touch
      const screen = content.parentElement;
      if (screen) {
        screen.style.overflowY = 'auto';
        screen.style.scrollSnapType = 'y mandatory';
        // Set each child as a snap point
        Array.from(content.children).forEach(child => {
          child.style.scrollSnapAlign = 'start';
        });
      }
    });
  }

  initPhoneMockups();


  // ═══════════════════════════════════════════
  // RESPONSIVE PHILOSOPHY COLUMNS
  // ═══════════════════════════════════════════
  function handlePhilosophyColumns() {
    const cols = document.querySelector('.philosophy-columns');
    if (!cols) return;

    function update() {
      if (window.innerWidth < 768) {
        cols.style.gridTemplateColumns = '1fr';
      } else {
        cols.style.gridTemplateColumns = '1fr 1fr';
      }
    }

    update();
    window.addEventListener('resize', update);
  }

  handlePhilosophyColumns();


  // ═══════════════════════════════════════════
  // SMOOTH SCROLL for the scroll cue
  // ═══════════════════════════════════════════
  const scrollCue = document.querySelector('.hero-split__scroll-cue');
  if (scrollCue) {
    scrollCue.addEventListener('click', () => {
      const intro = document.getElementById('intro');
      if (intro) {
        intro.scrollIntoView({ behavior: 'smooth' });
      }
    });
    scrollCue.style.cursor = 'pointer';
  }

});
