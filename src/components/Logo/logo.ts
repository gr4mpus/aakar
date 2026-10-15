// Logo behaviour: off-screen pausing, desktop parallax, touch squish.
const reduce = matchMedia('(prefers-reduced-motion: reduce)');
const fine = matchMedia('(hover: hover) and (pointer: fine)');

function init(svg: SVGSVGElement) {
  const s = svg.style;
  const vbW = svg.viewBox.baseVal.width;

  new IntersectionObserver(([e]) => svg.classList.toggle('is-paused', !e.isIntersecting)).observe(svg);

  let raf = 0;
  let nx = 0;
  let ny = 0;
  let u = 1;
  const paint = () => {
    raf = 0;
    s.setProperty('--nx', nx.toFixed(3));
    s.setProperty('--ny', ny.toFixed(3));
    s.setProperty('--u', u.toFixed(3));
  };
  const queue = () => (raf ||= requestAnimationFrame(paint));

  svg.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse' || !fine.matches || reduce.matches) return;
    const r = svg.getBoundingClientRect();
    nx = ((e.clientX - r.left) / r.width) * 2 - 1;
    ny = ((e.clientY - r.top) / r.height) * 2 - 1;
    u = vbW / r.width;
    queue();
  });
  svg.addEventListener('pointerleave', () => {
    nx = ny = 0;
    queue();
  });

  svg.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse') return;
    svg.classList.remove('is-squish');
    void svg.getBoundingClientRect(); // restart the animation on rapid taps
    svg.classList.add('is-squish');
    if (reduce.matches) setTimeout(() => svg.classList.remove('is-squish'), 160);
  });
  // Touch only grants user activation on pointerup, so the haptic tick lives here.
  svg.addEventListener('pointerup', (e) => {
    if (e.pointerType !== 'mouse' && navigator.userActivation?.isActive) navigator.vibrate?.(8);
  });
  svg.addEventListener('animationend', (e) => {
    if (e.animationName === 'lg-squish') svg.classList.remove('is-squish');
  });
}

export function initLogos() {
  const logos = document.querySelectorAll<SVGSVGElement>('[data-akaar-logo]:not([data-ready])');
  logos.forEach((svg) => {
    svg.dataset.ready = '';
    init(svg);
  });
  document.addEventListener('visibilitychange', () =>
    logos.forEach((svg) => svg.classList.toggle('is-hidden', document.hidden)),
  );
}
