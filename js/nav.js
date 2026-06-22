/* ============================================
   NAV — Scroll-spy + Smooth Scroll
   Rushikesh Phalke Portfolio
   ============================================ */

(function() {
  const nav = document.getElementById('pillNav');
  const hero = document.getElementById('hero');
  const pills = document.querySelectorAll('.pill-nav__btn');
  
  if (!nav || !hero) return;

  // ── Show/hide nav based on hero visibility ──
  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        nav.classList.remove('is-visible');
      } else {
        nav.classList.add('is-visible');
      }
    });
  }, { threshold: 0.1 });

  heroObserver.observe(hero);

  // ── Smooth scroll on pill click ──
  pills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = pill.getAttribute('data-target');
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        const offset = nav.offsetHeight + 24;
        const top = targetSection.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ── Scroll-spy: highlight active pill ──
  const sections = [];
  pills.forEach(pill => {
    const id = pill.getAttribute('data-target');
    const section = document.getElementById(id);
    if (section) {
      sections.push({ id, element: section, pill });
    }
  });

  function updateActiveNav() {
    // Use middle of the screen as the trigger line
    const scrollPos = window.scrollY + (window.innerHeight * 0.5);

    // Filter and sort sections dynamically in case layout shifts or pill order differs
    const activeSections = sections.filter(s => s.element.offsetHeight > 0).sort((a, b) => {
      const aTop = a.element.getBoundingClientRect().top + window.scrollY;
      const bTop = b.element.getBoundingClientRect().top + window.scrollY;
      return aTop - bTop;
    });

    let currentSection = activeSections.length > 0 ? activeSections[0] : null;
    for (const section of activeSections) {
      const rect = section.element.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      
      if (top <= scrollPos) {
        currentSection = section;
      }
    }

    pills.forEach(p => p.classList.remove('is-active'));
    if (currentSection) {
      currentSection.pill.classList.add('is-active');
      
      // Auto-scroll the nav container on mobile to keep the active pill visible
      if (window.innerWidth < 768) {
        const navRect = nav.getBoundingClientRect();
        const pillRect = currentSection.pill.getBoundingClientRect();
        
        // Only scroll if it's out of bounds or close to the edge
        if (pillRect.left < navRect.left || pillRect.right > navRect.right) {
          nav.scrollTo({
            left: currentSection.pill.offsetLeft - 16,
            behavior: 'smooth'
          });
        }
      }
    }
  }

  // Throttle scroll handler
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateActiveNav();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Initial check
  updateActiveNav();
})();
