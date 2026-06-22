/* ============================================
   CUSTOM CURSOR — Rushikesh Phalke Portfolio
   ============================================ */

(function() {
  const cursor = document.getElementById('customCursor');
  const cursorText = document.getElementById('cursorText');
  
  if (!cursor || !cursorText) return;
  
  // Check for touch device
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    cursor.style.display = 'none';
    document.body.style.cursor = 'auto';
    return;
  }

  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;

  // Smooth follow with lerp
  function lerp(start, end, factor) {
    return start + (end - start) * factor;
  }

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animate() {
    cursorX = lerp(cursorX, mouseX, 0.15);
    cursorY = lerp(cursorY, mouseY, 0.15);
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    requestAnimationFrame(animate);
  }
  animate();


  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
  });
})();
