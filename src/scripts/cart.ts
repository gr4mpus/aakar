// Studio cart: kept in localStorage (a per-device convenience until bookings
// move to the backend), rendered into the <dialog> drawer.
import { site, waLink } from '../data/site';

export interface CartItem {
  slug: string;
  title: string;
  photo: string;
  date: string; // ISO yyyy-mm-dd
  time: string;
  qty: number;
  price: number;
}

const KEY = 'akaar-cart-v1';
const { code, percent, minSubtotal } = site.coupon;
const inr = (n: number) => `₹${Math.round(n).toLocaleString('en-IN')}`;
export const prettyDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });

type State = { items: CartItem[]; coupon: string };
let state: State = { items: [], coupon: '' };
try {
  state = { ...state, ...JSON.parse(localStorage.getItem(KEY) || '{}') };
} catch {}
const save = () => {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {}
};

const $ = <T extends Element>(sel: string) => document.querySelector<T>(sel);
const dialog = $<HTMLDialogElement>('[data-cart]')!;

export function totals() {
  const sub = state.items.reduce((s, i) => s + i.price * i.qty, 0);
  const eligible = sub > minSubtotal;
  // FLAT10 unlocks automatically once the subtotal crosses the threshold.
  const disc = eligible ? (sub * percent) / 100 : 0;
  return { sub, disc, total: sub - disc, eligible };
}

function render() {
  const list = $('[data-cart-items]')!;
  list.innerHTML = '';
  for (const [i, it] of state.items.entries()) {
    const li = document.createElement('li');
    li.className = 'cart-item';
    li.innerHTML = `<img alt="" width="64" height="64" loading="lazy"><div><h3></h3><p></p><b></b></div>
      <button type="button" aria-label="Remove"><svg class="icon" width="16" height="16"><use href="#i-x"/></svg></button>`;
    li.querySelector('img')!.src = it.photo;
    li.querySelector('h3')!.textContent = it.title;
    li.querySelector('p')!.textContent = `${prettyDate(it.date)} · ${it.time} · ${it.qty} ${it.qty > 1 ? 'guests' : 'guest'}`;
    li.querySelector('b')!.textContent = inr(it.price * it.qty);
    li.querySelector('button')!.onclick = () => {
      state.items.splice(i, 1);
      save();
      render();
    };
    list.append(li);
  }
  const empty = state.items.length === 0;
  $('[data-cart-empty]')!.toggleAttribute('hidden', !empty);
  $('[data-cart-foot]')!.toggleAttribute('hidden', empty);

  const t = totals();
  $('[data-sum-sub]')!.textContent = inr(t.sub);
  $('[data-sum-disc]')!.textContent = `−${inr(t.disc)}`;
  $('[data-sum-disc-row]')!.toggleAttribute('hidden', !t.disc);
  $('[data-sum-total]')!.textContent = inr(t.total);
  const hint = $('[data-coupon-hint]')!;
  hint.classList.toggle('ok', !!t.disc);
  hint.innerHTML = t.disc
    ? `<b>${code}</b> applied — you save ${inr(t.disc)} ✦`
    : `Add ${inr(Math.max(0, minSubtotal + 1 - t.sub))} more to unlock <b>${code}</b> (${percent}% off).`;

  const lines = state.items.map(
    (it) => `• ${it.title} — ${prettyDate(it.date)}, ${it.time} × ${it.qty} (${inr(it.price * it.qty)})`,
  );
  const msg = [
    'Hi Studio Akaar! I’d like to book:',
    ...lines,
    t.disc ? `Coupon ${code}: −${inr(t.disc)}` : '',
    `Total: ${inr(t.total)}`,
  ]
    .filter(Boolean)
    .join('\n');
  $<HTMLAnchorElement>('[data-cart-checkout]')!.href = waLink(msg);

  const count = state.items.reduce((s, i) => s + i.qty, 0);
  document.querySelectorAll<HTMLElement>('[data-cart-count]').forEach((el) => {
    el.textContent = String(count);
    el.hidden = count === 0;
  });
}

export function addToCart(item: CartItem) {
  const same = state.items.find((i) => i.slug === item.slug && i.date === item.date && i.time === item.time);
  if (same) same.qty += item.qty;
  else state.items.push(item);
  save();
  render();
  document.querySelectorAll('.cart-btn').forEach((b) => {
    b.classList.remove('bump');
    void (b as HTMLElement).offsetWidth;
    b.classList.add('bump');
  });
}

export function applyCoupon(raw: string) {
  state.coupon = raw.trim().toUpperCase();
  save();
  render();
  return state.coupon === code;
}

export const openCart = () => dialog.showModal();

document.addEventListener('click', (e) => {
  const t = e.target as Element;
  if (t.closest('[data-cart-open]')) openCart();
  else if (t.closest('[data-cart-close]')) dialog.close();
  else if (t === dialog) dialog.close(); // backdrop click
});
$<HTMLFormElement>('[data-coupon-form]')!.addEventListener('submit', (e) => {
  e.preventDefault();
  const input = (e.currentTarget as HTMLFormElement).elements.namedItem('code') as HTMLInputElement;
  if (!applyCoupon(input.value)) $('[data-coupon-hint]')!.textContent = `That code isn’t valid. Try ${code}.`;
});
addEventListener('storage', (e) => {
  if (e.key !== KEY) return;
  try {
    state = JSON.parse(e.newValue || '{}');
  } catch {}
  render();
});
render();
