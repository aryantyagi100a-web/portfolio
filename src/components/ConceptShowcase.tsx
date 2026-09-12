import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { featuredProjects, site, type FeaturedProject } from "../site.config";
import { WhatsAppIcon } from "./ui";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Flame,
  Clock,
  ShieldCheck,
  ShoppingBag,
  ExternalLink,
} from "lucide-react";

export default function ConceptShowcase() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

  // Mouse drag tracking refs
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const dragDistanceRef = useRef(0);

  // Update scroll boundaries
  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  // Arrow button scrolling
  const scrollByAmount = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollOffset = direction === "left" ? -380 : 380;
    el.scrollBy({ left: scrollOffset, behavior: "smooth" });
  };

  // Mouse drag handlers for desktop smooth dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    isDownRef.current = true;
    startXRef.current = e.pageX - el.offsetLeft;
    scrollLeftRef.current = el.scrollLeft;
    dragDistanceRef.current = 0;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDownRef.current) return;
    const el = scrollRef.current;
    if (!el) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startXRef.current) * 1.4;
    dragDistanceRef.current = Math.abs(walk);
    if (dragDistanceRef.current > 6) {
      setIsDragging(true);
    }
    el.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDownRef.current = false;
    setTimeout(() => {
      setIsDragging(false);
    }, 50);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if (isDragging || dragDistanceRef.current > 6) {
      e.preventDefault();
    }
  };

  return (
    <section id="work" className="scroll-mt-10 px-4 sm:px-8 lg:px-16 py-16 sm:py-28 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header with Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 backdrop-blur-md px-3.5 py-1.5 text-xs font-mono text-faint shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-live" />
              <span>[ Featured Work & Live Demos ]</span>
            </motion.div>

            <h2 className="mt-3 text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-paper">
              Working websites built for businesses
            </h2>
            <p className="mt-2.5 max-w-2xl text-sm sm:text-base text-mute leading-relaxed font-normal">
              Every demo below is a fully functional, mobile-first website crafted for its specific industry — from warm editorial cafes to high-conversion emergency trades.
            </p>
          </div>

          {/* Desktop Carousel Controls & Badge */}
          <div className="flex items-center gap-3 shrink-0 self-start md:self-end">
            <div className="hidden sm:inline-flex items-center gap-2 rounded-full border border-line bg-surface/50 backdrop-blur-md px-3.5 py-1.5 text-xs font-mono text-mute">
              <span className="h-2 w-2 rounded-full bg-live animate-pulse" />
              <span>4 Distinct Industry Demos</span>
            </div>

            {/* Left & Right Arrow Buttons */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollByAmount("left")}
                disabled={!canScrollLeft}
                aria-label="Scroll left"
                className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-200 cursor-pointer ${
                  canScrollLeft
                    ? "border-white/20 bg-surface/80 text-paper hover:bg-raised hover:border-white/40 active:scale-95 shadow-sm"
                    : "border-line bg-surface/30 text-faint/40 cursor-not-allowed opacity-50"
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => scrollByAmount("right")}
                disabled={!canScrollRight}
                aria-label="Scroll right"
                className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-200 cursor-pointer ${
                  canScrollRight
                    ? "border-white/20 bg-surface/80 text-paper hover:bg-raised hover:border-white/40 active:scale-95 shadow-sm"
                    : "border-line bg-surface/30 text-faint/40 cursor-not-allowed opacity-50"
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Container Wrapper with Gradient Edge Masks */}
        <div className="relative mt-8 sm:mt-12">
          {/* Left Gradient Edge Fade (hidden when scrolled fully to start) */}
          <div
            className={`pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-ink/90 via-ink/40 to-transparent z-20 transition-opacity duration-300 ${
              canScrollLeft ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden
          />

          {/* Right Gradient Edge Fade (hidden when scrolled fully to end) */}
          <div
            className={`pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-ink/90 via-ink/40 to-transparent z-20 transition-opacity duration-300 ${
              canScrollRight ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden
          />

          {/* Horizontally Scrollable Row */}
          <div
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            className="no-scrollbar flex items-stretch gap-5 sm:gap-6 overflow-x-auto py-3 px-1 cursor-grab active:cursor-grabbing select-none"
            style={{
              scrollSnapType: "x mandatory",
              scrollBehavior: "smooth",
            }}
          >
            {featuredProjects.map((project, idx) => (
              <DemoCard
                key={project.id}
                project={project}
                index={idx}
                onCardClick={handleCardClick}
              />
            ))}
          </div>

          {/* Mobile Swipe Hint */}
          <div className="flex sm:hidden items-center justify-between mt-3 text-xs font-mono text-faint px-1">
            <span>← Swipe to explore styles →</span>
            <span>4 Demos</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
 * Individual Demo Card with Styled Simulated Preview Mockup
 * ------------------------------------------------------------------ */
function DemoCard({
  project,
  index,
  onCardClick,
}: {
  project: FeaturedProject;
  index: number;
  onCardClick: (e: React.MouseEvent) => void;
}) {
  const waBookingMessage = encodeURIComponent(
    `Hi ${project.title}, I saw your ${project.category} demo via Cabin and Code and would like to inquire!`
  );
  const waUrl = `https://wa.me/${site.whatsapp}?text=${waBookingMessage}`;

  return (
    <div
      style={{ scrollSnapAlign: "start" }}
      className="w-[310px] sm:w-[360px] md:w-[380px] shrink-0 group flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-line bg-surface/80 backdrop-blur-xl transition-all duration-300 hover:border-white/40 hover:-translate-y-2 hover:shadow-2xl overflow-hidden"
    >
      <div>
        {/* Card Header Visual / Styled Live Preview Mockup with Zoom-in on hover */}
        <Link
          to={`/demo/${project.id}`}
          onClick={onCardClick}
          className="block relative overflow-hidden bg-black/40 border-b border-line p-3 sm:p-4 aspect-[16/10] group/preview"
        >
          {/* Inner Mockup with subtle zoom on card hover */}
          <div className="w-full h-full rounded-xl overflow-hidden shadow-md transition-transform duration-500 ease-out group-hover:scale-105">
            <MiniIndustryMockup project={project} />
          </div>

          {/* Floating Live Badge & Domain Indicator */}
          <div className="absolute top-5 left-5 right-5 flex items-center justify-between pointer-events-none">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-black/75 backdrop-blur-md px-2.5 py-1 text-[10px] sm:text-[11px] font-mono text-white border border-white/15 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: project.accent }} />
              <span>{project.tag}</span>
            </span>

            <span className="inline-flex items-center gap-1 rounded-full bg-black/75 backdrop-blur-md px-2.5 py-1 text-[10px] sm:text-[11px] font-mono text-neutral-300 border border-white/15 shadow-sm">
              <span>{project.domain}</span>
              <ExternalLink className="w-2.5 h-2.5 opacity-70" />
            </span>
          </div>
        </Link>

        {/* Card Body */}
        <div className="p-5 sm:p-6 space-y-3.5">
          {/* Industry Category + Title */}
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-faint mb-1">
              <span>0{index + 1} // {project.category}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-paper group-hover:text-white transition-colors">
              {project.title}
            </h3>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-mute leading-relaxed line-clamp-2">
            {project.intro}
          </p>

          {/* Key Demonstrations List (2 top items) */}
          <div className="pt-2 border-t border-line/60 space-y-1.5">
            {project.demonstrates.slice(0, 2).map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-neutral-300 font-mono">
                <span className="text-live shrink-0 mt-0.5">›</span>
                <span className="truncate">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="p-5 sm:p-6 pt-0 flex items-center gap-2.5">
        <Link
          to={`/demo/${project.id}`}
          onClick={onCardClick}
          className="flex-1 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-paper px-4 py-2 text-xs sm:text-sm font-bold text-ink hover:opacity-90 active:scale-98 transition-all shadow-sm"
        >
          <span>View Demo</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>

        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="Test WhatsApp flow for this demo"
          className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl border border-line bg-surface px-3.5 py-2 text-xs font-medium text-mute hover:text-paper hover:border-white/30 transition-colors"
        >
          <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-400" />
          <span className="hidden sm:inline">Inquire</span>
        </a>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
 * Mini Styled Mockups (Distinct Visual Layouts for Each Industry)
 * ------------------------------------------------------------------ */
function MiniIndustryMockup({ project }: { project: FeaturedProject }) {
  const { styleVibe, palette, headline, menu, badge } = project;

  if (styleVibe === "coffee") {
    // 1. Cafe: Warm, minimal, editorial, espresso palette
    return (
      <div
        style={{ backgroundColor: palette.bg, color: palette.text }}
        className="w-full h-full p-3 sm:p-4 flex flex-col justify-between font-serif select-none"
      >
        <div className="flex items-center justify-between border-b border-[#4a3328]/60 pb-2">
          <span className="text-[11px] sm:text-xs font-bold tracking-wider uppercase font-sans">Roast & Bloom</span>
          <span className="text-[9px] sm:text-[10px] font-mono text-[#d1bba9] opacity-80">Specialty Coffee</span>
        </div>
        <div className="py-2">
          <p className="text-xs sm:text-sm italic font-normal line-clamp-2 leading-snug">
            "{headline}"
          </p>
          <div className="mt-2 flex gap-1.5 overflow-hidden">
            {menu.slice(0, 2).map((m, i) => (
              <div key={i} className="flex-1 bg-[#2d1f19] border border-[#4a3328] rounded p-1.5 text-[9px] font-sans">
                <span className="block font-medium truncate text-[#fdf8f0]">{m.item}</span>
                <span className="font-mono text-[#e07a38] text-[9px]">{m.price}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between text-[9px] font-mono text-[#d1bba9] border-t border-[#4a3328]/60 pt-1.5">
          <span>{badge.split("·")[0]}</span>
          <span className="text-[#e07a38] font-bold">1-Tap Order</span>
        </div>
      </div>
    );
  }

  if (styleVibe === "salon") {
    // 2. Salon: Soft, elegant, pastel rose/blush & champagne gold
    return (
      <div
        style={{ backgroundColor: palette.bg, color: palette.text }}
        className="w-full h-full p-3 sm:p-4 flex flex-col justify-between select-none"
      >
        <div className="flex items-center justify-between border-b border-[#423639]/60 pb-2">
          <span className="text-[11px] sm:text-xs font-light tracking-widest uppercase">Maison Aura</span>
          <span className="text-[9px] sm:text-[10px] font-mono text-[#d8c4be]">Aesthetics & Spa</span>
        </div>
        <div className="py-2 space-y-1.5">
          <div className="flex items-center gap-1 text-[9px] text-[#e5a798] font-mono">
            <span>★★★★★</span>
            <span className="text-neutral-300">Verified Sanctuary</span>
          </div>
          <p className="text-xs sm:text-sm font-medium tracking-tight line-clamp-1 text-[#fbf6f3]">
            {headline}
          </p>
          <div className="bg-[#272123] border border-[#423639] rounded-lg p-1.5 flex items-center justify-between text-[9px] font-mono">
            <span className="text-[#d8c4be] truncate max-w-[140px]">{menu[0].item}</span>
            <span className="text-[#e5a798] font-semibold">{menu[0].price}</span>
          </div>
        </div>
        <div className="flex items-center justify-between text-[9px] font-mono text-[#d8c4be] border-t border-[#423639]/60 pt-1.5">
          <span>{badge.split("·")[0]}</span>
          <span className="text-[#e5a798]">Reserve Online</span>
        </div>
      </div>
    );
  }

  if (styleVibe === "trades") {
    // 3. Trades: Bold, direct, safety orange/navy slate, high-conversion emergency
    return (
      <div
        style={{ backgroundColor: palette.bg, color: palette.text }}
        className="w-full h-full p-3 sm:p-4 flex flex-col justify-between font-sans select-none"
      >
        <div className="flex items-center justify-between border-b border-[#253754] pb-2">
          <div className="flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-[#fb923c]" />
            <span className="text-[11px] sm:text-xs font-black tracking-tight uppercase text-white">Apex Trades</span>
          </div>
          <span className="bg-[#fb923c] text-black font-mono font-bold text-[8px] sm:text-[9px] px-1.5 py-0.5 rounded">
            24/7 DISPATCH
          </span>
        </div>
        <div className="py-1.5 space-y-1.5">
          <div className="flex items-center gap-2 text-[9px] font-mono text-[#fb923c]">
            <Clock className="w-3 h-3" />
            <span>30-Min Arrival Guarantee</span>
          </div>
          <div className="bg-[#152033] border border-[#253754] rounded-lg p-2">
            <div className="flex justify-between items-center text-[10px]">
              <span className="font-bold text-white truncate max-w-[130px]">{menu[0].item}</span>
              <span className="font-mono text-[#fb923c] font-bold">{menu[0].price}</span>
            </div>
            <p className="text-[8px] sm:text-[9px] text-[#94a3b8] truncate mt-0.5">{menu[0].detail}</p>
          </div>
        </div>
        <div className="flex items-center justify-between text-[9px] font-mono text-[#94a3b8] border-t border-[#253754] pt-1.5">
          <span className="flex items-center gap-1 text-emerald-400">
            <ShieldCheck className="w-3 h-3" /> Licensed
          </span>
          <span className="text-white font-bold">Call / WhatsApp</span>
        </div>
      </div>
    );
  }

  // 4. Retail / Shop: Product-grid heavy, clean minimalist e-commerce
  return (
    <div
      style={{ backgroundColor: palette.bg, color: palette.text }}
      className="w-full h-full p-3 sm:p-4 flex flex-col justify-between select-none"
    >
      <div className="flex items-center justify-between border-b border-[#343d2f] pb-2">
        <div className="flex items-center gap-1.5">
          <ShoppingBag className="w-3 h-3 text-[#84cc16]" />
          <span className="text-[11px] sm:text-xs font-bold tracking-wider uppercase">Koto Living</span>
        </div>
        <span className="text-[9px] sm:text-[10px] font-mono text-[#a4b39b]">Artisan Goods</span>
      </div>
      <div className="grid grid-cols-2 gap-1.5 py-1.5">
        {menu.slice(0, 2).map((item, i) => (
          <div key={i} className="bg-[#22271f] border border-[#343d2f] rounded p-1.5">
            <div className="h-6 w-full rounded bg-white/5 flex items-center justify-center text-[8px] text-[#a4b39b] font-mono mb-1">
              LOOKBOOK
            </div>
            <p className="text-[9px] font-medium text-white truncate">{item.item.split("(")[0]}</p>
            <p className="font-mono text-[8px] text-[#84cc16] font-bold">{item.price}</p>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between text-[9px] font-mono text-[#a4b39b] border-t border-[#343d2f] pt-1.5">
        <span>Limited Batch</span>
        <span className="text-[#84cc16]">Instant Cart</span>
      </div>
    </div>
  );
}

