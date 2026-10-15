// Shared motion engine. One passive, rAF-throttled scroll loop writes a few
// CSS variables; all motion itself is CSS (transform/opacity only).
//   --p    page progress 0…1           → [data-progress], .thread
//   --lift hero scroll-away 0…1         → [data-hero]
//   --py   element offset from centre  → visible [data-parallax] (-1…1)
const root = document.documentElement;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---- Reveal-once on enter ----
const revealer = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      e.target.classList.add('in');
      revealer.unobserve(e.target);
    }
  },
  { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
);
export const observeReveals = (scope: ParentNode = document) =>
  scope.querySelectorAll('[data-reveal]:not(.in)').forEach((el) => revealer.observe(el));
observeReveals();

// ---- Scroll-linked variables ----
const progressEls = [...document.querySelectorAll<HTMLElement | SVGElement>('[data-progress], .thread')];
const hero = document.querySelector<HTMLElement>('[data-hero]');
const visible = new Set<HTMLElement>();
const tracker = new IntersectionObserver((entries) => {
  for (const e of entries) e.isIntersecting ? visible.add(e.target as HTMLElement) : visible.delete(e.target as HTMLElement);
  queue();
});
if (!reduce) document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => tracker.observe(el));

let raf = 0;
function frame() {
  raf = 0;
  // Read everything first, then write — no layout thrash.
  const y = scrollY;
  const vh = innerHeight;
  const max = root.scrollHeight - vh;
  const heroH = hero?.offsetHeight || vh;
  const rects = [...visible].map((el) => [el, el.getBoundingClientRect()] as const);

  const p = max > 0 ? Math.min(1, Math.max(0, y / max)).toFixed(4) : '0';
  for (const el of progressEls) el.style.setProperty('--p', p);
  if (hero && !reduce) hero.style.setProperty('--lift', Math.min(1, y / heroH).toFixed(3));
  for (const [el, r] of rects) el.style.setProperty('--py', ((r.top + r.height / 2 - vh / 2) / vh).toFixed(3));
}
const queue = () => {
  raf ||= requestAnimationFrame(frame);
};
addEventListener('scroll', queue, { passive: true });
addEventListener('resize', queue, { passive: true });
queue();
