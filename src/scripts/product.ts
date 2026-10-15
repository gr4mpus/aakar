// Workshop page: photo carousel, slot booking, coupon copy, sticky dock.
import { addToCart, openCart, applyCoupon, prettyDate } from './cart';
import { waLink } from '../data/site';

const inr = (n: number) => `₹${Math.round(n).toLocaleString('en-IN')}`;

// ---------- Carousel (native scroll-snap; buttons/thumbs just scroll) ----------
const gallery = document.querySelector<HTMLElement>('[data-gallery]');
if (gallery) {
  const track = gallery.querySelector<HTMLElement>('[data-track]')!;
  const slides = [...track.children] as HTMLElement[];
  const thumbs = [...gallery.querySelectorAll<HTMLButtonElement>('[data-thumb]')];
  const caption = gallery.querySelector<HTMLElement>('[data-caption]:not(li)')!;
  const count = gallery.querySelector<HTMLElement>('[data-count]')!;
  let current = 0;

  const go = (i: number) => {
    const n = (i + slides.length) % slides.length;
    track.scrollTo({ left: n * track.clientWidth, behavior: 'smooth' });
  };
  const setActive = (i: number) => {
    if (i === current) return;
    current = i;
    count.textContent = String(i + 1);
    caption.textContent = slides[i].dataset.caption || '';
    caption.classList.remove('swap');
    void caption.offsetWidth;
    caption.classList.add('swap');
    thumbs.forEach((t, k) => t.setAttribute('aria-selected', String(k === i)));
  };
  // The active slide is derived from scroll position, so swipes, buttons and
  // keyboard all stay in sync.
  let raf = 0;
  track.addEventListener(
    'scroll',
    () =>
      (raf ||= requestAnimationFrame(() => {
        raf = 0;
        setActive(Math.min(slides.length - 1, Math.round(track.scrollLeft / track.clientWidth)));
      })),
    { passive: true },
  );

  gallery.querySelector('[data-prev]')!.addEventListener('click', () => go(current - 1));
  gallery.querySelector('[data-next]')!.addEventListener('click', () => go(current + 1));
  thumbs.forEach((t, i) => t.addEventListener('click', () => go(i)));
  track.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') go(current + 1);
    if (e.key === 'ArrowLeft') go(current - 1);
  });
}

// ---------- Coupon copy ----------
document.querySelectorAll<HTMLButtonElement>('[data-copy]').forEach((btn) =>
  btn.addEventListener('click', async () => {
    const code = btn.dataset.copy!;
    try {
      await navigator.clipboard.writeText(code);
    } catch {}
    applyCoupon(code);
    btn.classList.add('done');
    btn.querySelector('[data-copy-label]')!.textContent = 'Copied ✓';
    setTimeout(() => {
      btn.classList.remove('done');
      btn.querySelector('[data-copy-label]')!.textContent = `Copy ${code}`;
    }, 2200);
  }),
);

// ---------- Booking ----------
const form = document.querySelector<HTMLFormElement>('[data-book]');
if (form) {
  const { slug, title, photo } = form.dataset as Record<string, string>;
  const price = Number(form.dataset.price);
  const stock = Number(form.dataset.stock);
  const qtyOut = form.querySelector<HTMLOutputElement>('[data-qty-out]')!;
  const [minus, plus] = form.querySelectorAll<HTMLButtonElement>('[data-qty]');
  const wa = form.querySelector<HTMLAnchorElement>('[data-wa]')!;
  const note = form.querySelector<HTMLElement>('[data-book-note]')!;
  let qty = 1;

  // Past dates can't be booked; select the first open one.
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  const dateInputs = [...form.querySelectorAll<HTMLInputElement>('input[name="date"]')];
  dateInputs.forEach((i) => (i.disabled = i.value < today));
  const firstOpen = dateInputs.find((i) => !i.disabled);
  if (firstOpen && dateInputs.find((i) => i.checked)?.disabled) firstOpen.checked = true;

  const sel = () => {
    const fd = new FormData(form);
    return { date: String(fd.get('date') || ''), time: String(fd.get('time') || '') };
  };
  const sync = () => {
    const { date, time } = sel();
    form.querySelector('[data-date-out]')!.textContent = date ? prettyDate(date) : 'No dates open';
    form.querySelector('[data-time-out]')!.textContent = time;
    qtyOut.textContent = String(qty);
    minus.disabled = qty <= 1;
    plus.disabled = qty >= stock;
    form.querySelector('[data-subtotal]')!.textContent = inr(price * qty);
    wa.href = waLink(
      `Hi Studio Akaar! I’d like to book ${title} on ${date ? prettyDate(date) : '—'} at ${time} for ${qty} ${qty > 1 ? 'people' : 'person'}.`,
    );
  };
  form.addEventListener('change', sync);
  form.querySelectorAll<HTMLButtonElement>('[data-qty]').forEach((b) =>
    b.addEventListener('click', () => {
      qty = Math.min(stock, Math.max(1, qty + Number(b.dataset.qty)));
      qtyOut.classList.remove('tick');
      void qtyOut.offsetWidth;
      qtyOut.classList.add('tick');
      sync();
    }),
  );
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const { date, time } = sel();
    if (!date) {
      note.hidden = false;
      note.textContent = 'No open dates right now — chat with us on WhatsApp for the next batch.';
      return;
    }
    addToCart({ slug, title, photo, date, time, qty, price });
    note.hidden = false;
    note.textContent = `Added ${qty} × ${title} — ${prettyDate(date)}, ${time} ✦`;
    setTimeout(openCart, 450);
  });
  sync();

  // Sticky dock on mobile: visible while the booking panel is off-screen.
  const dock = document.querySelector<HTMLElement>('[data-dock]');
  if (dock) {
    let pastTop = false;
    let bookVisible = false;
    const update = () => dock.classList.toggle('show', pastTop && !bookVisible);
    new IntersectionObserver(([e]) => {
      bookVisible = e.isIntersecting;
      update();
    }).observe(form);
    new IntersectionObserver(([e]) => {
      pastTop = !e.isIntersecting && e.boundingClientRect.top < 0;
      update();
    }).observe(document.querySelector('.info__title')!);
  }
}
