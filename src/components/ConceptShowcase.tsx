import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { featuredProjects, type FeaturedProject } from "../site.config";
import { ArrowUpRight } from "lucide-react";

export default function ConceptShowcase() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

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
    el.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDownRef.current = false;
  };

  return (
    <section
      id="work"
      className="scroll-mt-10 px-4 sm:px-8 lg:px-16 py-20 sm:py-28 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight text-paper">
              What we can build
            </h2>
            <p className="mt-2.5 max-w-xl text-sm sm:text-base text-mute/80 leading-relaxed">
              Concept sites we designed for four kinds of local businesses — not client work, but fully working demos. Click through and try them.
            </p>
          </div>

          {/* Scroll arrows */}
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => scrollByAmount("left")}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
              className={`flex h-9 w-9 items-center justify-center rounded-full border transition-colors ${
                canScrollLeft
                  ? "border-white/20 text-paper hover:border-white/40"
                  : "border-white/10 text-white/25 cursor-not-allowed"
              }`}
            >
              <span aria-hidden>←</span>
            </button>
            <button
              type="button"
              onClick={() => scrollByAmount("right")}
              disabled={!canScrollRight}
              aria-label="Scroll right"
              className={`flex h-9 w-9 items-center justify-center rounded-full border transition-colors ${
                canScrollRight
                  ? "border-white/20 text-paper hover:border-white/40"
                  : "border-white/10 text-white/25 cursor-not-allowed"
              }`}
            >
              <span aria-hidden>→</span>
            </button>
          </div>
        </div>

        {/* Cards */}
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          className="mt-10 sm:mt-12 flex gap-5 overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {featuredProjects.map((project) => (
            <DemoCard key={project.id} project={project} />
          ))}
        </div>

        {/* Mobile hint */}
        <p className="sm:hidden mt-3 text-xs text-white/40">Swipe for more →</p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
 * Demo card — minimal: browser-chrome preview, title, one-line intro.
 * ------------------------------------------------------------------ */
function DemoCard({ project }: { project: FeaturedProject }) {
  return (
    <Link
      to={`/demo/${project.id}`}
      style={{ scrollSnapAlign: "start" }}
      className="w-[300px] sm:w-[340px] shrink-0 group rounded-xl border border-white/10 bg-white/[0.04] transition-colors hover:border-white/25 overflow-hidden"
    >
      {/* Preview: quiet browser frame, site wordmark inside */}
      <div className="border-b border-white/10">
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5">
          <span className="flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-white/15" />
            <span className="h-2 w-2 rounded-full bg-white/15" />
            <span className="h-2 w-2 rounded-full bg-white/15" />
          </span>
          <span className="text-[11px] text-white/35 truncate">{project.domain}</span>
        </div>
        <div
          className="aspect-[16/9] flex flex-col items-center justify-center gap-2 select-none"
          style={{ backgroundColor: project.palette.bg }}
        >
          <span
            className="text-base sm:text-lg font-semibold tracking-tight"
            style={{ color: project.palette.text }}
          >
            {project.title}
          </span>
          <span className="text-[11px]" style={{ color: project.palette.accent }}>
            {project.tag.split("·")[1]?.trim() ?? project.category}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        <h3 className="text-lg font-semibold tracking-tight text-paper">
          {project.title}
        </h3>
        <p className="mt-1 text-sm text-white/50 leading-relaxed">
          {project.category}
        </p>

        <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-paper/90 group-hover:text-white transition-colors">
          View demo
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}
