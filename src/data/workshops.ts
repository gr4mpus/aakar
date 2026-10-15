// Workshop catalogue. Rendered at build time so every workshop is a real,
// indexable page. Later this module will read from the bookings backend
// (Supabase) instead of a static list — the page templates won't change.

export type Category = 'clay' | 'painting' | 'craft';
export type Accent = 'terracotta' | 'olive' | 'ochre';

export interface Photo {
  /** Unsplash photo id (placeholder until the studio's own photos arrive). */
  id?: string;
  /** Wikimedia Commons file path, e.g. "e/ea/Name.jpg" (public-domain artworks). */
  wiki?: string;
  caption: string;
  /** CSS object-position, to frame a detail of the image. */
  pos?: string;
}

export interface Workshop {
  slug: string;
  title: string;
  summary: string;
  lead: string;
  category: Category;
  accent: Accent;
  mrp: number;
  price: number;
  stock: number;
  duration: string;
  audience: string;
  stamp: string;
  tags: string[];
  photos: Photo[];
  whatYoullDo?: string[];
  included?: string[];
  takeHome?: string[];
  optional?: string;
  perfectFor?: string[];
}

export const categories: Record<Category, string> = {
  clay: 'Clay',
  painting: 'Painting',
  craft: 'Craft',
};

/** Studio-wide defaults used where a workshop has no specific list yet. */
export const defaults = {
  included: ['All materials and tools', 'Apron and workspace', 'Step-by-step guidance from our artists', 'Beginner-friendly setup'],
  perfectFor: ['Beginners', 'Date outings and friends', 'Mindful creative experiences', 'Birthday & team celebrations'],
};

// Public domain (Wikimedia Commons).
const STARRY = 'e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg';

export const workshops: Workshop[] = [
  {
    slug: 'wheel-pottery',
    title: 'Wheel Pottery',
    summary: 'Learn the art of wheel throwing and create your own ceramic masterpiece.',
    lead: 'Experience the calm of working on the pottery wheel—shape clay, center it, and create your own ceramic pieces with expert guidance.',
    category: 'clay',
    accent: 'terracotta',
    mrp: 1000,
    price: 800,
    stock: 2,
    duration: '75 Minutes session',
    audience: 'Age 12+ Beginner Friendly',
    stamp: 'WHEEL • THROWING • CERAMIC • ',
    tags: ['Potter’s wheel', 'Centering & pulling', '2 ceramic pieces'],
    photos: [
      { id: '1565193566173-7a0ee3dbe261', caption: 'Centering & shaping on the wheel' },
      { id: '1578749556568-bc2c40e68b61', caption: 'Pulling walls & forming bowls' },
      { id: '1610701596007-11502861dcfa', caption: 'Surface detailing & finishing' },
      { id: '1514228742587-6b1558fcca3d', caption: 'Your handcrafted take-home vessels' },
    ],
    whatYoullDo: ['Learn wheel throwing basics', 'Create 2 unique pottery pieces', 'Explore simple bowls and free-form designs'],
    included: ['Pottery wheel access', 'Premium white stoneware clay', 'Tools and apron', 'Step-by-step guidance', 'Beginner-friendly setup'],
    takeHome: ['Take your unfired pieces home once dried', 'Safe packaging provided', 'Maximum size: 8 inches per piece'],
    optional: 'Glazing and firing available at additional charges',
    perfectFor: ['Beginners', 'Date outings and friends', 'Mindful creative experiences', 'Artists needing studio practice'],
  },
  {
    slug: 'canvas-painting',
    title: 'Canvas Painting',
    summary: 'Learn painting techniques and create your own beautiful acrylic painting.',
    lead: 'Unwind with brush in hand—learn color mixing, layering, and expressive brushwork to paint your own textured acrylic canvas with step-by-step guidance.',
    category: 'painting',
    accent: 'olive',
    mrp: 1200,
    price: 950,
    stock: 4,
    duration: '90 Minutes session',
    audience: 'Age 8+ & Adults Beginner Friendly',
    stamp: 'ACRYLIC • CANVAS • BRUSHWORK • ',
    tags: ['Stretched canvas', 'Acrylic techniques', 'Ready to hang'],
    photos: [
      { id: '1513364776144-60967b0f800f', caption: 'Palette mixing & acrylic layering' },
      { id: '1579783902614-a3fb3927b675', caption: 'Expressive brushwork & texture' },
      { id: '1460661419201-fd4cecdf8a8b', caption: 'Guided studio easel setup' },
    ],
  },
  {
    slug: 'clay-fridge-magnets',
    title: 'Clay Fridge Magnets',
    summary: 'Create your own adorable handmade clay fridge magnets.',
    lead: 'Sculpt, texture, and paint a set of charming miniature clay fridge magnets—from botanicals and food miniatures to quirky characters.',
    category: 'clay',
    accent: 'ochre',
    mrp: 950,
    price: 750,
    stock: 5,
    duration: '75 Minutes session',
    audience: 'Kids & Adults Beginner Friendly',
    stamp: 'HANDMADE • MINIATURE • CLAY • ',
    tags: ['Miniature sculpting', 'Vibrant painting', 'Set of custom magnets'],
    photos: [
      { id: '1544717305-2782549b5136', caption: 'Hand-sculpting miniature forms' },
      { id: '1565193566173-7a0ee3dbe261', caption: 'Detailing & surface texturing' },
      { id: '1513364776144-60967b0f800f', caption: 'Painting & protective varnish' },
    ],
  },
  {
    slug: 'led-moon-lamp',
    title: 'LED Moon Lamp',
    summary: 'Design and paint your own glowing artistic decorative moon lamp.',
    lead: 'Craft a tactile cratered moon surface using sculptural texture paste and warm pigments on an illuminated LED globe that glows in your room.',
    category: 'craft',
    accent: 'ochre',
    mrp: 1400,
    price: 1150,
    stock: 3,
    duration: '90 Minutes session',
    audience: 'Age 10+ & Adults Beginner Friendly',
    stamp: 'GLOWING • CRATER • MOON LAMP • ',
    tags: ['Crater texture paste', 'Warm LED globe', 'Magical room decor'],
    photos: [
      { id: '1532693322450-2cb5c511067d', caption: 'Sculpting lunar craters & ridges' },
      { id: '1579783902614-a3fb3927b675', caption: 'Sponge shading & metallic wash' },
      { id: '1513364776144-60967b0f800f', caption: 'Testing warm & cool glow modes' },
    ],
  },
  {
    slug: 'clay-art-on-ceramic-mug',
    title: 'Clay art on Ceramic Mug',
    summary: 'Design and decorate a simple mug into a unique clay art piece to take home.',
    lead: 'Personalize a classic ceramic mug with 3D sculpted clay relief motifs—flowers, cozy characters, or custom initials—and paint it in your signature palette.',
    category: 'clay',
    accent: 'terracotta',
    mrp: 1100,
    price: 899,
    stock: 4,
    duration: '75 Minutes session',
    audience: 'All Ages Beginner Friendly',
    stamp: 'CERAMIC MUG • 3D CLAY RELIEF • ',
    tags: ['3D mug appliqué', 'Custom handle & motif', 'Personalized keepsake'],
    photos: [
      { id: '1514228742587-6b1558fcca3d', caption: 'Designing 3D clay mug motifs' },
      { id: '1565193566173-7a0ee3dbe261', caption: 'Bonding & sculpting relief details' },
      { id: '1578749556568-bc2c40e68b61', caption: 'Hand-painting & sealing' },
    ],
  },
  {
    slug: 'starry-night-on-canvas',
    title: 'Starry Night on Canvas',
    summary: 'Paint your own swirling, Van Gogh–inspired starry night on canvas.',
    lead: 'Recreate the swirling night sky with layered impasto brushwork, luminous highlights, and rich blues and golds—guided stroke by stroke.',
    category: 'painting',
    accent: 'olive',
    mrp: 1350,
    price: 1099,
    stock: 3,
    duration: '90 Minutes session',
    audience: 'Age 12+ Beginner Friendly',
    stamp: 'STARRY NIGHT • IMPASTO SKY • ',
    tags: ['Swirling impasto sky', 'Luminous highlights', 'Guided masterclass'],
    photos: [
      { wiki: STARRY, caption: 'The Starry Night — Vincent van Gogh, 1889', pos: '50% 50%' },
      { wiki: STARRY, caption: 'Up close: the swirling sky & crescent moon', pos: '88% 18%' },
      { wiki: STARRY, caption: 'The cypress & sleeping village', pos: '12% 70%' },
      { id: '1460661419201-fd4cecdf8a8b', caption: 'Your guided easel setup' },
    ],
  },
  {
    slug: 'terracotta-clay-modelling',
    title: 'Terracotta Clay Modelling',
    summary: 'Create rustic clay art using natural terracotta hand-building techniques.',
    lead: 'Connect with raw, breathable earth—learn traditional pinch, coil, and slab hand-building techniques using natural terracotta clay.',
    category: 'clay',
    accent: 'terracotta',
    mrp: 1100,
    price: 850,
    stock: 3,
    duration: '75 Minutes session',
    audience: 'Age 8+ & Adults Beginner Friendly',
    stamp: 'RAW EARTH • TERRACOTTA • FORM • ',
    tags: ['Natural terracotta', 'Coil, slab & pinch', 'Earthy relief art'],
    photos: [
      { id: '1578749556568-bc2c40e68b61', caption: 'Coiling & slab hand-building' },
      { id: '1565193566173-7a0ee3dbe261', caption: 'Botanical & geometric carving' },
      { id: '1610701596007-11502861dcfa', caption: 'White slip brushwork accents' },
    ],
  },
  {
    slug: 'paint-tote-bags-coasters-platter-tray',
    title: 'Paint: Tote Bags, Coasters, Platter & Tray',
    summary: 'Paint tote bags, coasters, platters, and trays your way!',
    lead: 'Turn everyday functional pieces into wearable and table-ready art! Choose from heavy cotton tote bags, wooden coasters, or serving platters.',
    category: 'painting',
    accent: 'olive',
    mrp: 1000,
    price: 799,
    stock: 6,
    duration: '75 Minutes session',
    audience: 'All Ages Beginner Friendly',
    stamp: 'TOTE • COASTERS • PLATTER • TRAY • ',
    tags: ['Cotton tote bags', 'Wooden coasters & trays', 'Everyday art'],
    photos: [
      { id: '1460661419201-fd4cecdf8a8b', caption: 'Custom botanical & abstract motifs' },
      { id: '1513364776144-60967b0f800f', caption: 'Fabric & wood pigment techniques' },
      { id: '1544717305-2782549b5136', caption: 'Sealing coasters & platter trays' },
    ],
  },
  {
    slug: 'kintsugi-workshop',
    title: 'Kintsugi Workshop',
    summary: 'Discover the Japanese art of repairing broken pottery with golden seams.',
    lead: 'Embrace the philosophy of wabi-sabi—mend fractured ceramic vessels using golden lacquer seams to celebrate resilience and imperfection.',
    category: 'craft',
    accent: 'ochre',
    mrp: 1600,
    price: 1299,
    stock: 2,
    duration: '90 Minutes session',
    audience: 'Age 12+ Beginner Friendly',
    stamp: 'KINTSUGI • GOLDEN JOINERY • ',
    tags: ['Japanese philosophy', 'Gold joinery', 'Ceramic bowl included'],
    photos: [
      { id: '1610701596007-11502861dcfa', caption: 'Mindful ceramic joinery prep' },
      { id: '1565193566173-7a0ee3dbe261', caption: 'Tracing golden veins & seams' },
      { id: '1578749556568-bc2c40e68b61', caption: 'Dusting mica gold & polishing' },
    ],
  },
  {
    slug: 'resin-jewellery',
    title: 'Resin Jewellery',
    summary: 'Craft stunning resin jewellery with flowers and textures that tell your story.',
    lead: 'Preserve delicate pressed botanicals, gold leaf, and pearlescent pigments inside crystal-clear resin bezels to craft wearable pendants and earrings.',
    category: 'craft',
    accent: 'terracotta',
    mrp: 1400,
    price: 1099,
    stock: 4,
    duration: '90 Minutes session',
    audience: 'Age 12+ Beginner Friendly',
    stamp: 'BOTANICAL • RESIN • JEWELLERY • ',
    tags: ['Pressed dried flowers', 'Pendants & earrings', 'Gold foil & pigments'],
    photos: [
      { id: '1535632066927-ab7c9ab60908', caption: 'Curating pressed botanicals & foils' },
      { id: '1515562141207-7a88fb7ce338', caption: 'Pouring & curing botanical resin' },
      { id: '1544717305-2782549b5136', caption: 'Attaching chains & earring hooks' },
    ],
  },
  {
    slug: 'bedazzling-workshop',
    title: 'Bedazzling Workshop',
    summary: 'Transform an everyday hairbrush or mini canvas into a sparkling keepsake with beads, pearls and rhinestones.',
    lead: 'Add high-craft sparkle to everyday keepsakes—arrange pearls, faceted rhinestones, charms, and beads onto a hairbrush or mini canvas.',
    category: 'craft',
    accent: 'ochre',
    mrp: 1100,
    price: 899,
    stock: 5,
    duration: '75 Minutes session',
    audience: 'Kids, Teens & Adults Friendly',
    stamp: 'PEARLS • RHINESTONES • SPARKLE • ',
    tags: ['Hairbrush or mini canvas', 'Pearls & rhinestones', 'Sparkling keepsake'],
    photos: [
      { id: '1515562141207-7a88fb7ce338', caption: 'Selecting pearls, gems & charms' },
      { id: '1535632066927-ab7c9ab60908', caption: 'Precision gem placement' },
      { id: '1544717305-2782549b5136', caption: 'Your sparkling studio keepsake' },
    ],
  },
];

// Wikimedia only serves standard thumbnail widths.
const WIKI_WIDTHS = [500, 960, 1280];
const wikiWidth = (w: number) => WIKI_WIDTHS.find((x) => x >= w) ?? 1280;

/** Responsive image URL: Unsplash (cropped, WebP/AVIF) or a Wikimedia thumbnail. */
export const img = (p: Photo, w: number, h?: number) =>
  p.wiki
    ? `https://upload.wikimedia.org/wikipedia/commons/thumb/${p.wiki}/${wikiWidth(w)}px-${p.wiki.split('/').pop()}`
    : `https://images.unsplash.com/photo-${p.id}?auto=format&fit=crop&q=60&w=${w}${h ? `&h=${h}` : ''}`;

export const srcset = (p: Photo, ratio: number, widths = [360, 540, 720, 960]) =>
  (p.wiki ? WIKI_WIDTHS : widths).map((w) => `${img(p, w, Math.round(w * ratio))} ${w}w`).join(', ');

export const inr = (n: number) => `₹${n.toLocaleString('en-IN')}`;
