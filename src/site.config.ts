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
  headline: string;
  subhead: string;
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
    id: "studio-aura",
    category: "Salon & Aesthetics",
    tag: "Live Demo · Salon",
    title: "Studio Aura — Luxury Salon & Aesthetics",
    intro:
      "Built for appointment-based local salons: interactive price menu, instant WhatsApp booking, real customer reviews, and open hours.",
    domain: "studioaura.in",
    badge: "Open Today · 9:00 AM – 8:00 PM",
    accent: "#0f766e",
    headline: "Look good. Get found. Stay booked.",
    subhead: "Walk-ins welcome & appointments prioritized. Open all 7 days.",
    menu: [
      { item: "Haircut & Styling", detail: "Signature wash, custom cut & blow dry", price: "₹299" },
      { item: "Beard Trim & Shape", detail: "Precision edging, oil treatment & massage", price: "₹199" },
      { item: "Hair Spa & Deep Repair", detail: "Keratin treatment & relaxing steam massage", price: "₹699" },
      { item: "Hydrating Facial & Cleanup", detail: "Exfoliation, detox mask & glow serum", price: "₹599" },
    ],
    reviews: [
      { stars: 5, author: "Vikram R.", text: "Best haircut in the area, been coming for two years. Booked on WhatsApp with zero waiting." },
      { stars: 5, author: "Sneha M.", text: "Flawless bridal glow facial and styling. Super professional team." },
    ],
    demonstrates: [
      "1-Tap WhatsApp booking button that lands right in your chat",
      "Transparent services & price list readable on any screen",
      "Google reviews & 5-star customer trust blocks",
      "Operating hours with live 'Open Today' status",
      "Ultra-fast mobile loading for local customers on 4G/5G",
    ],
  },
  {
    id: "roast-and-bloom",
    category: "Artisan Cafe & Bakery",
    tag: "Live Demo · Cafe",
    title: "Roast & Bloom — Specialty Coffee & Bakes",
    intro:
      "Crafted for high-footfall cafes and roasteries: digital food & beverage menu, table reservation, and one-tap WhatsApp take-away orders.",
    domain: "roastandbloom.coffee",
    badge: "Roasting Daily · 7:30 AM – 10:00 PM",
    accent: "#b45309",
    headline: "Slow roasted beans. Warm sourdough from the oven.",
    subhead: "Single-origin pour overs, espresso bar & house-made pastries.",
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
      "Cafe photo strip and location map embed",
      "Fresh batch announcements & daily specials spotlight",
      "Instant click-to-call and table reservation flow",
    ],
  },
  {
    id: "pulse-athletics",
    category: "Fitness Club & CrossFit",
    tag: "Live Demo · Fitness",
    title: "Pulse Athletics — Strength & Conditioning Lab",
    intro:
      "Tailored for gyms and coaches: membership tier comparisons, daily class timetable, and a free 1-day pass lead generator.",
    domain: "pulseathletics.fit",
    badge: "Open 24/7 for Members · Staffed 6AM – 10PM",
    accent: "#16a34a",
    headline: "Built for performance. Designed for results.",
    subhead: "Elite strength training, group conditioning, and personalized nutrition plans.",
    menu: [
      { item: "Starter Membership (Monthly)", detail: "Full gym floor access, locker & sauna steam", price: "₹2,499/mo" },
      { item: "Unlimited CrossFit & HIIT", detail: "All group classes, coach support & community events", price: "₹3,999/mo" },
      { item: "1-on-1 Personal Coaching", detail: "Custom macro plan, bi-weekly body scans & 12 PT sessions", price: "₹7,499/mo" },
      { item: "1-Day Free Trial Pass", detail: "Full facility pass + introductory trainer consultation", price: "Free (Instant)" },
    ],
    reviews: [
      { stars: 5, author: "Rahul V.", text: "Down 8kg in 3 months! The trainers and community keep you motivated every day." },
      { stars: 5, author: "Pooja K.", text: "Clean equipment, great energy, and super easy membership sign-up." },
    ],
    demonstrates: [
      "High-converting 'Free Trial Pass' lead capture on WhatsApp",
      "Transparent tier comparison table with pricing",
      "Trainer spotlights and member transformation reviews",
      "Live weekly workout timetable with easy booking",
      "Map directions to facility with parking info",
    ],
  },
  {
    id: "haven-design",
    category: "Architecture & Interiors",
    tag: "Live Demo · Architecture",
    title: "Haven Studios — Modern Architecture & Interiors",
    intro:
      "Crafted for high-ticket design studios: minimalist portfolio gallery, case study project breakdowns, and direct consultation inquiries.",
    domain: "havenstudios.design",
    badge: "Accepting select projects for Q3/Q4",
    accent: "#0284c7",
    headline: "Spaces crafted with quiet luxury and timeless intent.",
    subhead: "Bespoke residential villas, sustainable commercial workspaces, and interior transformations.",
    menu: [
      { item: "The Glasshouse Villa · Goa", detail: "4,200 sq.ft private estate with natural passive cooling", price: "Completed 2025" },
      { item: "Luminary Tech HQ · Bangalore", detail: "Open-plan collaborative workspace for 180 devs", price: "Completed 2024" },
      { item: "Minimalist Penthouse · Mumbai", detail: "Micro-cement textures, custom walnut & sea views", price: "Completed 2024" },
      { item: "Initial Design Discovery", detail: "60-Min architectural audit & 3D spatial layout consult", price: "Complimentary" },
    ],
    reviews: [
      { stars: 5, author: "Devashish M.", text: "Haven transformed our villa into an architectural masterpiece. On time and within budget." },
      { stars: 5, author: "Ritu T.", text: "Flawless aesthetic execution and exceptional attention to natural lighting." },
    ],
    demonstrates: [
      "Editorial case study portfolio with high-res gallery layout",
      "Project specifications, square footage & materials breakdown",
      "High-ticket consultation discovery booking on WhatsApp",
      "Press recognition & architectural award credentials",
      "Client testimonial quotes with verified project references",
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
