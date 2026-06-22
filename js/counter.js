/* ============================================
   COUNTER — Stat count-up animation
   Rushikesh Phalke Portfolio
   ============================================ */

(function() {
  const counters = document.querySelectorAll('.counter');
  if (!counters.length) return;

  function formatNumber(num) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(0) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'K';
    }
    return num.toString();
  }

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const prefix = el.getAttribute('data-prefix') || '';
    const noAnimate = el.getAttribute('data-no-animate') === 'true';

    if (noAnimate) {
      el.textContent = prefix + target + suffix;
      return;
    }

    const duration = 2000; // 2 seconds
    const startTime = performance.now();

    function easeOutExpo(t) {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutExpo(progress);
      const currentValue = Math.round(easedProgress * target);

      el.textContent = prefix + formatNumber(currentValue) + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = prefix + formatNumber(target) + suffix;
      }
    }

    requestAnimationFrame(update);
  }

  // Trigger animation when scrolled into view (once)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  counters.forEach(counter => observer.observe(counter));
})();
