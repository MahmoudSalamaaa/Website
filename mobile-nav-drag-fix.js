(() => {
  const nav = document.querySelector('.desktop-links');
  if (!nav) return;

  let dragging = false;
  let startX = 0;
  let startScroll = 0;

  const begin = (x) => {
    dragging = true;
    startX = x;
    startScroll = nav.scrollLeft;
    nav.classList.add('is-dragging');
  };

  const move = (x, e) => {
    if (!dragging) return;
    const dx = x - startX;
    nav.scrollLeft = startScroll - dx;
    if (e && e.cancelable) e.preventDefault();
  };

  const end = () => {
    dragging = false;
    nav.classList.remove('is-dragging');
  };

  nav.addEventListener('touchstart', e => {
    if (e.touches.length === 1) begin(e.touches[0].clientX);
  }, {passive:true});

  nav.addEventListener('touchmove', e => {
    if (e.touches.length === 1) move(e.touches[0].clientX, e);
  }, {passive:false});

  nav.addEventListener('touchend', end, {passive:true});
  nav.addEventListener('touchcancel', end, {passive:true});

  nav.addEventListener('pointerdown', e => {
    if (e.pointerType === 'mouse') {
      begin(e.clientX);
      nav.setPointerCapture?.(e.pointerId);
    }
  });
  nav.addEventListener('pointermove', e => {
    if (e.pointerType === 'mouse') move(e.clientX, e);
  });
  nav.addEventListener('pointerup', end);
  nav.addEventListener('pointercancel', end);

  nav.addEventListener('wheel', e => {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      nav.scrollLeft += e.deltaY;
      e.preventDefault();
    }
  }, {passive:false});
})();