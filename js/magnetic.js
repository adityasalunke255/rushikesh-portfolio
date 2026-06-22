/* ============================================
   MAGNETIC HOVER — Rushikesh Phalke Portfolio
   ============================================ */

(function() {
  // Check for touch device
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

  const magneticElements = document.querySelectorAll('.pill-nav__btn, .whatsapp-float, .contact__item');
  
  magneticElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * 0.2;
      const deltaY = (e.clientY - centerY) * 0.2;
      
      el.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.05)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate(0, 0) scale(1)';
      el.style.transition = `transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)`;
      setTimeout(() => {
        el.style.transition = '';
      }, 400);
    });
  });
})();
