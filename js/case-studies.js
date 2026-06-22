/* ============================================
   CASE STUDIES — Expand/Collapse
   Rushikesh Phalke Portfolio
   ============================================ */

// Global function so onclick works from HTML
function toggleCaseCard(card) {
  if (!card) return;

  const isExpanded = card.classList.contains('is-expanded');
  
  // Close all other cards first
  document.querySelectorAll('.case-card.is-expanded').forEach(c => {
    if (c !== card) {
      c.classList.remove('is-expanded');
    }
  });

  // Toggle this card
  if (isExpanded) {
    card.classList.remove('is-expanded');
  } else {
    card.classList.add('is-expanded');
    // Scroll into view if needed (with offset for nav)
    setTimeout(() => {
      const rect = card.getBoundingClientRect();
      if (rect.top < 80) {
        const absoluteTop = rect.top + window.scrollY;
        const offset = absoluteTop - 80;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    }, 100);
  }
}

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.case-card.is-expanded').forEach(card => {
      card.classList.remove('is-expanded');
    });
  }
});
