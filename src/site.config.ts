// ============================================================
// SITE CONFIG — edit this one file to make the site yours.
// Values marked PLACEHOLDER should be replaced with real ones.
// ============================================================

export const site = {
  // --- You (Agency Name) ---
  name: "Cabin and Code",
  role: "Web Studio",
  location: "India",

  // --- Contact (PLACEHOLDER values — swap in your real ones) ---
  email: "hello@cabinandcode.com",
  whatsapp: "919220472008", // country code + number, digits only (no +, spaces or dashes)
  whatsappDisplay: "+91 9220472008", // how the number appears on screen

  // Derived from `whatsapp` — don't edit, it stays in sync automatically
  get whatsappLink() {
    return `https://wa.me/${this.whatsapp}`;
  },

  // --- Fiverr (PLACEHOLDER — replace YOUR_FIVERR_USERNAME) ---
  fiverrUrl: "https://www.fiverr.com/your_fiverr_username",
  fiverrHandle: "cabinandcode",

  // --- Availability status shown next to the green dot ---
  availability: "Available for new projects",

  // --- Hero copy ---
  heroTitle: "Websites that bring in customers.",
  heroIntro:
    "We design and ship clean, fast, affordable sites for businesses — and we handle everything end-to-end, so you don't have to.",
  heroNote: "Usually replies within a few hours",

  // --- Statement band ---
  statement: "A good website does not need to shout. It needs to bring customers.",

  // --- Socials (empty strings are hidden automatically) ---
  githubUrl: "",
  linkedinUrl: "",
} as const;

// ============================================================
// Services — shown as a numbered ledger. Written as outcomes,
// not jargon, so a business owner instantly gets it.
// ============================================================
export const services = [
  {
    title: "Business Websites",
    tag: "Turnkey 5-page site",
    description:
      "Up to 5 pages — Home, Services, About, Gallery, Contact. Looks sharp on phones, tablets, and computers.",
  },
  {
    title: "Google Search Basics",
    tag: "SEO & indexing",
    description:
      "Your site set up so Google can find it: page titles, meta descriptions, sitemap, and search console indexing.",
  },
  {
    title: "WhatsApp & Maps Integration",
    tag: "1-Tap leads",
    description:
      "A WhatsApp button that opens a chat with you in one tap, plus your physical location embedded so customers can find your door.",
  },
  {
    title: "Domain & Hosting Setup",
    tag: "100% ownership",
    description:
      "Your custom domain bought, connected, and securely hosted. You own everything with zero proprietary lock-in.",
  },
  {
    title: "Updates After Launch",
    tag: "Flat & transparent",
    description:
      "Small changes — prices, photos, hours — done quickly at flat, predictable rates. No retainers, no hourly surprises.",
  },
] as const;

// ============================================================
// Process — 3 steps
// ============================================================
export const processSteps = [
  {
    step: "01",
    title: "Design Preview & Layout",
    description:
      "You see how your website will look before a single line of production code is written. Changes are easy here — this is where we get it right.",
  },
  {
    step: "02",
    title: "High-Performance Build",
    description:
      "We build the real site with lightning-fast code, responsive layout, and share a private staging preview link.",
  },
  {
    step: "03",
    title: "Launch & Zero-Friction Support",
    description:
      "Your site goes live on your custom domain with Google indexing. After launch, minor updates stay quick and flat-rate.",
  },
] as const;

// ============================================================
// Featured Projects (Working Concept Demos for prospective clients)
// Visibly distinct styles: Cafe (Warm Editorial), Salon (Soft Pastel),
// Trades (Bold High-Contrast), Retail (Minimalist Product Grid)
// ============================================================
export interface FeaturedProject {
  id: string;
  category: string;
  tag: string;
  title: string;
  intro: string;
  domain: string;
  badge: string;
  accent: string;
  styleVibe: "coffee" | "salon" | "trades" | "retail";
  headline: string;
  subhead: string;
  palette: {
    bg: string;
    cardBg: string;
    text: string;
    subtext: string;
    border: string;
    accent: string;
  };
  menu: readonly {
    item: string;
    detail?: string;
    price: string;
  }[];
  reviews: readonly {
    stars: number;
    author: string;
    text: string;
  }[];
  demonstrates: readonly string[];
}

export const featuredProjects: readonly FeaturedProject[] = [
  {
    id: "roast-and-bloom",
    category: "Specialty Coffee & Bakes",
    tag: "Warm · Editorial",
    title: "Roast & Bloom",
    intro:
      "Crafted for high-footfall cafes and roasteries: digital food & beverage menu, table reservation, and one-tap WhatsApp take-away orders.",
    domain: "roastandbloom.coffee",
    badge: "Roasting Daily · 7:30 AM – 10:00 PM",
    accent: "#c26d38",
    styleVibe: "coffee",
    headline: "Slow roasted beans. Warm sourdough from the oven.",
    subhead: "Single-origin pour overs, espresso bar & house-made pastries.",
    palette: {
      bg: "#201612",
      cardBg: "#2d1f19",
      text: "#fdf8f0",
      subtext: "#d1bba9",
      border: "#4a3328",
      accent: "#e07a38",
    },
    menu: [
      { item: "Single-Origin Pour Over", detail: "Ethiopian Yirgacheffe notes of bergamot & jasmine", price: "₹240" },
      { item: "Classic Cortado / Flat White", detail: "Double ristretto pulled over silky textured milk", price: "₹190" },
      { item: "Almond Butter Croissant", detail: "Twice baked with house frangipane & toasted flakes", price: "₹180" },
      { item: "Nitro Cold Brew on Tap", detail: "18-Hour cold steeped for a naturally sweet finish", price: "₹220" },
    ],
    reviews: [
      { stars: 5, author: "Karan D.", text: "The flat white is incredible. Love the pre-order on WhatsApp for morning rush." },
      { stars: 5, author: "Ananya S.", text: "Best sourdough pastries in the city. Lovely ambience!" },
    ],
    demonstrates: [
      "Visual drinks & food menu with tasting notes and allergen tags",
      "Order ahead on WhatsApp to skip the morning counter queue",
      "Fresh daily bake drops & bean subscription spotlight",
      "Location embed with instant Google Maps directions",
    ],
  },
  {
    id: "maison-aura",
    category: "Salon & Medical Aesthetics",
    tag: "Soft · Elegant",
    title: "Maison Aura",
    intro:
      "Tailored for high-end salons and skin clinics: treatment catalogs, practitioner profiles, and a frictionless WhatsApp booking concierge.",
    domain: "maisonaura.beauty",
    badge: "Open Today · 9:00 AM – 8:00 PM",
    accent: "#be8a7b",
    styleVibe: "salon",
    headline: "Quiet luxury skincare, bespoke styling & clinical glow rituals.",
    subhead: "Private consultations, signature treatments, and personalized beauty care.",
    palette: {
      bg: "#1c1819",
      cardBg: "#272123",
      text: "#fbf6f3",
      subtext: "#d8c4be",
      border: "#423639",
      accent: "#e5a798",
    },
    menu: [
      { item: "Hydra-Infusion Glow Facial", detail: "60 min · Deep ultrasonic cleanse, lactic peel & peptide infusion", price: "₹2,499" },
      { item: "Couture Haircut & Scalp Ritual", detail: "45 min · Botanical wash, precision shape & blowout", price: "₹999" },
      { item: "Botanical Keratin Therapy", detail: "90 min · Frizz-elimination, gloss glaze & heat seal", price: "₹3,499" },
      { item: "Pre-Bridal Skin Consultation", detail: "30 min · Skin analysis & 6-week radiance timeline", price: "Complimentary" },
    ],
    reviews: [
      { stars: 5, author: "Sneha M.", text: "Flawless bridal glow treatment. The WhatsApp consultation was so seamless." },
      { stars: 5, author: "Rhea P.", text: "Most relaxing salon experience in town. Truly premium service." },
    ],
    demonstrates: [
      "1-Tap WhatsApp booking concierge with calendar preference",
      "Transparent service duration & pricing ledger",
      "Verified client testimonials & before/after transformations",
      "Mobile-optimized treatment discovery with zero load lag",
    ],
  },
  {
    id: "apex-trades",
    category: "24/7 Emergency Trades & Repair",
    tag: "Bold · Conversion",
    title: "Apex Rapid Trades",
    intro:
      "Engineered for local plumbing, electrical, and HVAC services: high-contrast emergency dispatch, upfront flat pricing, and click-to-call buttons.",
    domain: "apextrades.pro",
    badge: "⚡ 24/7 Live Emergency Dispatch",
    accent: "#f97316",
    styleVibe: "trades",
    headline: "Rapid 30-min emergency dispatch. Upfront flat rates.",
    subhead: "Licensed master technicians, zero diagnostic guesswork, 100% guaranteed repair.",
    palette: {
      bg: "#0c131f",
      cardBg: "#152033",
      text: "#f8fafc",
      subtext: "#94a3b8",
      border: "#253754",
      accent: "#fb923c",
    },
    menu: [
      { item: "Emergency Leak / Pipe Burst", detail: "30-Min arrival · Immediate isolation & heavy-duty repair", price: "From ₹899" },
      { item: "Full AC Diagnostic & Gas Refill", detail: "Compressor test, coil clean & R32 refrigerant top-up", price: "₹1,299" },
      { item: "Main Circuit Breaker Tripping", detail: "Fault locator, insulation test & safety switch replacement", price: "₹799" },
      { item: "Comprehensive Safety Inspection", detail: "Whole-home electrical & plumbing health checklist", price: "Free with Service" },
    ],
    reviews: [
      { stars: 5, author: "Amit S.", text: "Arrived in 25 minutes on Sunday night when our pipe burst. Saved our floor!" },
      { stars: 5, author: "Vikram R.", text: "Clear flat pricing given before they started work. No hidden fees." },
    ],
    demonstrates: [
      "Immediate 1-tap emergency dispatch button on mobile header",
      "Transparent fixed-rate pricing guide — zero hourly surprises",
      "30-Minute arrival countdown & live technician status",
      "Verified local license credentials & 100% satisfaction guarantee",
    ],
  },
  {
    id: "koto-living",
    category: "Curated Goods & Homeware",
    tag: "Minimalist · E-Commerce",
    title: "Koto Living",
    intro:
      "Built for modern boutique brands: product-grid lookbook, real-time inventory indicators, and direct WhatsApp shopping flows.",
    domain: "kotoliving.shop",
    badge: "Worldwide Shipping · Limited Batch",
    accent: "#65a30d",
    styleVibe: "retail",
    headline: "Handcrafted ceramics, linen & timeless home essentials.",
    subhead: "Small-batch artisan imports with worldwide tracked dispatch.",
    palette: {
      bg: "#181b16",
      cardBg: "#22271f",
      text: "#f5f7f2",
      subtext: "#a4b39b",
      border: "#343d2f",
      accent: "#84cc16",
    },
    menu: [
      { item: "Hasami Porcelain Mug (350ml)", detail: "Matte finish natural clay, stackable modular design", price: "₹1,450" },
      { item: "Wabi-Sabi Stoneware Vase", detail: "Hand-thrown volcanic glaze by Kyoto master potters", price: "₹2,800" },
      { item: "Washed French Linen Throw", detail: "100% organic European flax in olive moss tone", price: "₹3,600" },
      { item: "Hinoki Wood Bath Tray", detail: "Aromatic Japanese cedar with natural water-resistant grain", price: "₹2,200" },
    ],
    reviews: [
      { stars: 5, author: "Tara B.", text: "The Hasami mugs are gorgeous and arrived in pristine eco-friendly packaging." },
      { stars: 5, author: "Nikhil M.", text: "Ordered through WhatsApp in under a minute. Top quality ceramics!" },
    ],
    demonstrates: [
      "High-converting product lookbook grid with live stock status",
      "Frictionless 1-click 'Buy via WhatsApp' with prefilled product SKU",
      "Material provenance storytelling and care instructions",
      "Fast checkout flow without requiring customer account registration",
    ],
  },
] as const;

// Backward compatibility alias for single-demo references
export const conceptProject = featuredProjects[0];

// ============================================================
// About & Team section config
// ============================================================
export const aboutSection = {
  tag: "About Cabin and Code",
  title: "Built by people who care about the craft.",
  intro:
    "We are a tight-knit web studio designing thoughtful, lightning-fast digital experiences for ambitious businesses. No bloated agency overhead, no endless middlemen — just dedicated builders crafting websites with taste.",
  values: [
    {
      label: "01. Speed Over Bloat",
      desc: "Every millisecond counts. We build lightweight, high-performance sites that load instantly for your customers.",
    },
    {
      label: "02. Design That Converts",
      desc: "Clean aesthetics backed by clear customer actions, one-tap WhatsApp chats, and straightforward booking flows.",
    },
    {
      label: "03. Honest & Direct",
      desc: "Flat pricing, clear timelines, and direct communication with the person writing the code.",
    },
  ],
  team: [
    {
      name: "Aryan",
      role: "Founder & Lead Engineer",
      bio: "Obsessed with clean code, micro-interactions, and building high-impact web presence for businesses that want to stand out.",
      avatar: "/avatar.png",
    },
    {
      name: "Studio Team",
      role: "Design & Development",
      bio: "Crafting typography, layout hierarchies, and custom features that turn visitors into paying customers.",
      avatar: "C&C",
    },
  ],
} as const;

// ============================================================
// Frequently Asked Questions (FAQs)
// ============================================================
export const faqs = [
  {
    question: "How fast can my website be designed, built, and launched?",
    answer:
      "Standard turnaround is 5 to 7 days from kickoff. You receive an interactive visual layout mockup within the first 48 hours, and we move straight into high-performance build and custom domain launch.",
  },
  {
    question: "Do I own the domain, code, and website after launch?",
    answer:
      "100% full ownership. You receive all source code, hosting access, and full administrative rights to your domain and assets. Zero proprietary lock-ins, zero hidden retainers.",
  },
  {
    question: "How does flat pricing work? Will there be hourly surprises?",
    answer:
      "Every project is quoted with a transparent flat rate before kickoff. What you see is what you pay — 0 hourly surprises. Minor updates and tweaks after launch stay quick and flat-rate.",
  },
  {
    question: "Will my website be mobile-friendly and fast on phones?",
    answer:
      "Yes, mobile-first by default. Every section is optimized with minimum 48px touch targets, responsive single-column mobile layouts, and lightweight code built for 100/100 Lighthouse performance on 4G/5G.",
  },
  {
    question: "How do customers reach me from the website?",
    answer:
      "We configure instant 1-tap WhatsApp chat buttons, direct click-to-call links, embedded location maps, and inquiry forms that deliver customer inquiries directly to your phone without friction.",
  },
] as const;
