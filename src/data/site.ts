// Studio-wide settings. Fill the TODOs before launch.
export const site = {
  name: 'Studio Akaar',
  tagline: 'Create · Connect · Express',
  url: 'https://studioakaar.in',
  /** International format without "+" or spaces, e.g. "919876543210". Empty = WhatsApp lets the user pick a chat. */
  whatsapp: '', // TODO: studio WhatsApp number
  instagram: '', // TODO: e.g. "https://www.instagram.com/studioakaar"
  coupon: { code: 'FLAT10', percent: 10, minSubtotal: 1500 },
} as const;

export const schedule = {
  dates: [
    '2026-10-14', '2026-10-15', '2026-10-16', '2026-10-17', '2026-10-18',
    '2026-10-21', '2026-10-22', '2026-10-23', '2026-10-24', '2026-10-25',
  ],
  times: ['11:30 am', '1:00 pm', '3:00 pm', '4:30 pm', '6:15 pm'],
};

export const refundPolicy = {
  tiers: [
    { when: '48+ hours before session', what: 'Full refund' },
    { when: '24 hours before session', what: '50% refund' },
    { when: 'Same-day cancellation', what: 'No refund' },
  ],
  note: 'Rescheduling is allowed only in exceptional cases and can be shifted to any available weekday session, subject to prior approval.',
};

export const promises = [
  { icon: 'vase', text: 'Take home your personalized creation' },
  { icon: 'jar', text: 'All materials included' },
  { icon: 'leaf', text: 'Fun, relaxing & beginner-friendly' },
] as const;

export const waLink = (text: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
