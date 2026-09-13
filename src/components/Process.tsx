import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  Clock,
  Code2,
  Layers,
  Rocket,
  X,
  Zap,
  ArrowRight,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

interface ProcessStep {
  step: string;
  timeframe: string;
  title: string;
  tabLabel: string;
  description: string;
  icon: typeof Layers;
  accent: string;
  deliverables: string[];
}

const stepsData: ProcessStep[] = [
  {
    step: "01",
    timeframe: "days 01–02",
    title: "design preview & layout",
    tabLabel: "01. Design Preview",
    description:
      "you see exactly how your site will look, feel, and flow before a single line of production code is written. we iterate fast until you love it.",
    icon: Layers,
    accent: "#38bdf8", // sky
    deliverables: [
      "interactive desktop & mobile mockup",
      "copy, typography & color tuning",
    ],
  },
  {
    step: "02",
    timeframe: "days 03–05",
    title: "high-performance build",
    tabLabel: "02. High-Performance Build",
    description:
      "we engineer the site with lightning-fast code, responsive layouts, whatsapp lead capture, and seo indexing. you get a private staging link to test.",
    icon: Code2,
    accent: "#34d399", // emerald
    deliverables: [
      "private staging link to test live",
      "cross-browser & speed optimization",
    ],
  },
  {
    step: "03",
    timeframe: "days 06–07 · live",
    title: "launch & zero-friction support",
    tabLabel: "03. Launch 🚀",
    description:
      "we point your domain, configure google indexing, and flip the switch to go live. after launch, minor updates stay quick, painless, and flat-rate.",
    icon: Rocket,
    accent: "#f43f5e", // rose/rocket
    deliverables: [
      "100% full domain & code ownership",
      "google search indexing & fast support",
    ],
  },
];

// --- Classic 6-Cell "Poof 💨" Particle Component (340ms) ---
function PoofEffectInstance({ x, y }: { x: number; y: number }) {
  const puffBubbles = [
    { angle: 0, dist: 22, size: 28, delay: 0 },
    { angle: 60, dist: 24, size: 32, delay: 0.03 },
    { angle: 120, dist: 20, size: 26, delay: 0.02 },
    { angle: 180, dist: 24, size: 30, delay: 0.04 },
    { angle: 240, dist: 22, size: 28, delay: 0.01 },
    { angle: 300, dist: 26, size: 34, delay: 0.05 },
  ];

  return (
    <div
      className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-1/2"
      style={{ left: x, top: y }}
      aria-hidden
    >
      {/* Central Dissipating Flash */}
      <motion.div
        initial={{ scale: 0.2, opacity: 0.9 }}
        animate={{ scale: 2.2, opacity: 0, filter: "blur(10px)" }}
        transition={{ duration: 0.34, ease: "easeOut" }}
        className="absolute -inset-6 rounded-full bg-white/40 mix-blend-screen"
      />

      {/* 6 Cloud Puff Bubbles Dissolving in a Radial Burst (340ms) */}
      {puffBubbles.map((p, idx) => {
        const rad = (p.angle * Math.PI) / 180;
        const targetX = Math.cos(rad) * p.dist;
        const targetY = Math.sin(rad) * p.dist;

        return (
          <motion.div
            key={idx}
            initial={{ x: 0, y: 0, scale: 0.2, opacity: 1 }}
            animate={{
              x: targetX,
              y: targetY,
              scale: [0.2, 1.4, 1.8],
              opacity: [1, 0.85, 0],
              filter: ["blur(0px)", "blur(2px)", "blur(8px)"],
            }}
            transition={{
              duration: 0.34,
              delay: p.delay,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{ width: p.size, height: p.size }}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40 bg-gradient-to-br from-white/90 via-emerald-100/70 to-white/20 shadow-md backdrop-blur-sm"
          />
        );
      })}

      {/* Micro Sparkle Dust Flecks */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((ang, sIdx) => {
        const sRad = (ang * Math.PI) / 180;
        const sx = Math.cos(sRad) * 38;
        const sy = Math.sin(sRad) * 38;
        return (
          <motion.div
            key={`sparkle-${sIdx}`}
            initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
            animate={{
              x: sx,
              y: sy,
              scale: [0, 1.2, 0],
              opacity: [1, 1, 0],
            }}
            transition={{ duration: 0.32, delay: 0.04, ease: "easeOut" }}
            className="absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-live shadow-[0_0_8px_#fde047]"
          />
        );
      })}
    </div>
  );
}

interface PoofParticle {
  id: number;
  x: number;
  y: number;
}

// Stack slot styling — slot 0 is the expanded front card, deeper slots peek
// out behind at playful angles (like the reference deck).
const DECK_SLOTS = [
  { rotate: 0, y: 0, scale: 1, opacity: 1, zIndex: 30 },
  { rotate: -2.6, y: 22, scale: 0.97, opacity: 0.9, zIndex: 20 },
  { rotate: 2.2, y: 42, scale: 0.94, opacity: 0.72, zIndex: 10 },
];

export default function Process() {
  // order[0] is the front card; dismissing rotates the deck.
  const [order, setOrder] = useState<number[]>([0, 1, 2]);
  const [exiting, setExiting] = useState<string | null>(null); // step id flying out
  const [poofs, setPoofs] = useState<PoofParticle[]>([]);
  const topCardRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const cyclingRef = useRef(false);

  const triggerPoofAt = useCallback((x: number, y: number) => {
    const id = Date.now() + Math.random();
    setPoofs((prev) => [...prev, { id, x, y }]);
    setTimeout(() => {
      setPoofs((prev) => prev.filter((p) => p.id !== id));
    }, 450);
  }, []);

  // Poof the front card away and send it to the back of the deck.
  const dismissTop = useCallback(() => {
    if (cyclingRef.current) return;
    cyclingRef.current = true;

    const topIdx = order[0];
    const rect = topCardRef.current?.getBoundingClientRect();
    if (rect) {
      triggerPoofAt(rect.left + rect.width / 2, rect.top + rect.height / 2);
    }
    setExiting(stepsData[topIdx].step);

    setTimeout(() => {
      setOrder((prev) => [...prev.slice(1), prev[0]]);
      setExiting(null);
      cyclingRef.current = false;
    }, 380);
  }, [order, triggerPoofAt]);

  // Auto-cycle every 4s; paused while the cursor is over the deck.
  useEffect(() => {
    const interval = setInterval(() => {
      if (!pausedRef.current) dismissTop();
    }, 4000);
    return () => clearInterval(interval);
  }, [dismissTop]);

  return (
    <section
      id="process"
      className="scroll-mt-[5px] px-4 sm:px-8 lg:px-16 py-20 sm:py-28 relative overflow-hidden"
    >
      {/* Dynamic Poof 💨 particle instances */}
      {poofs.map((p) => (
        <PoofEffectInstance key={p.id} x={p.x} y={p.y} />
      ))}

      <div className="max-w-6xl mx-auto">
        {/* Section Header with Spicy Tag & Animated Headline */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-4">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 backdrop-blur-md px-3.5 py-1.5 text-xs font-mono text-faint shadow-sm"
            >
              <Zap className="w-3.5 h-3.5 text-live animate-bounce" />
              <span>[ Studio Roadmap / 7-Day Sprint ]</span>
            </motion.div>

            {/* Spicy Animated Headline */}
            <h2 className="mt-3 text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-paper">
              <span className="block overflow-hidden py-0.5">
                <motion.span
                  className="inline-block will-change-transform"
                  initial={{ y: "100%", opacity: 0, filter: "blur(10px)" }}
                  whileInView={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  From Raw Concept To
                </motion.span>
              </span>
              <span className="block overflow-hidden py-1">
                <motion.span
                  className="inline-block bg-white text-[#156338] px-3 sm:px-5 py-0.5 rounded-lg sm:rounded-xl shadow-lg will-change-transform font-extrabold"
                  initial={{ y: "100%", opacity: 0, filter: "blur(12px)" }}
                  whileInView={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                >
                  Live, Client-Getting Site.
                </motion.span>
              </span>
            </h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="max-w-md space-y-2.5"
          >
            <p className="text-sm sm:text-base text-mute leading-relaxed">
              A rapid, transparent 7-day sprint from initial layout to custom domain launch. Zero friction, zero hourly surprises.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-live">
              <Clock className="w-4 h-4 text-live shrink-0" />
              <span>⚡ Standard turnaround: 5 to 7 days from kickoff</span>
            </div>
          </motion.div>
        </div>

        {/* --- The Deck --- */}
        {/* Front card in normal flow (sizes the container); back cards overlay */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-10 sm:mt-14 max-w-5xl mx-auto"
          onMouseEnter={() => (pausedRef.current = true)}
          onMouseLeave={() => (pausedRef.current = false)}
          onTouchStart={() => (pausedRef.current = true)}
          onTouchEnd={() => {
            // Resume auto-cycling a few seconds after the last touch, so
            // mobile readers aren't yanked to the next step mid-read.
            window.setTimeout(() => (pausedRef.current = false), 4000);
          }}
        >
          <div className="relative pb-14 sm:pb-16">
            {order.map((stepIdx, slot) => {
              const s = stepsData[stepIdx];
              const Icon = s.icon;
              const isTop = slot === 0;
              const isFlying = exiting === s.step;
              const slotStyle = isTop ? DECK_SLOTS[0] : DECK_SLOTS[Math.min(slot, 2)];

              return (
                <motion.div
                  key={s.step}
                  ref={isTop ? topCardRef : undefined}
                  animate={
                    isFlying
                      ? { x: 160, y: -34, rotate: 7, opacity: 0, scale: 0.94 } // poof exit
                      : {
                          x: 0,
                          rotate: slotStyle.rotate,
                          y: slotStyle.y,
                          scale: slotStyle.scale,
                          opacity: slotStyle.opacity,
                        }
                  }
                  transition={
                    isFlying
                      ? { duration: 0.36, ease: [0.25, 1, 0.5, 1] }
                      : { type: "spring", stiffness: 320, damping: 26 }
                  }
                  style={{ zIndex: slotStyle.zIndex, transformOrigin: "60% 100%" }}
                  className={
                    isTop
                      ? "relative"
                      : "absolute inset-x-0 top-0 pointer-events-none"
                  }
                  aria-hidden={!isTop}
                >
                  <div
                    className={`relative rounded-2xl sm:rounded-3xl bg-[#fafaf6] p-7 sm:p-10 shadow-xl ${
                      isTop ? "shadow-2xl ring-1 ring-black/5" : ""
                    }`}
                  >
                    {/* Dismiss X — front card only */}
                    {isTop && (
                      <button
                        type="button"
                        onClick={dismissTop}
                        aria-label="Next step"
                        className="absolute top-2.5 right-2.5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-black/5 text-neutral-400 transition-colors hover:bg-black/10 hover:text-neutral-700 active:scale-90 sm:top-3.5 sm:right-3.5 sm:h-9 sm:w-9"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}

                    <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6 pr-10 sm:pr-12">
                      {/* Icon tile */}
                      <div
                        className="flex h-16 w-16 sm:h-24 sm:w-24 shrink-0 items-center justify-center rounded-2xl shadow-inner"
                        style={{ backgroundColor: `${s.accent}1f`, color: s.accent }}
                      >
                        <Icon className="h-7 w-7 sm:h-10 sm:w-10" />
                      </div>

                      {/* Text column */}
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                          <h3 className="text-2xl sm:text-4xl font-bold tracking-tight text-neutral-900">
                            {s.title}
                            <ArrowRight className="ml-2 inline h-5 w-5 sm:h-7 sm:w-7 text-neutral-400" />
                          </h3>
                          <span
                            className="font-mono text-[10px] sm:text-xs uppercase tracking-wider px-2.5 py-1 rounded-full"
                            style={{ backgroundColor: `${s.accent}1a`, color: "#3f3f46" }}
                          >
                            {s.timeframe}
                          </span>
                          <span className="font-mono text-2xl sm:text-3xl font-black text-neutral-200 select-none">
                            {s.step}
                          </span>
                        </div>

                        <p className="mt-3 text-sm sm:text-lg text-neutral-500 leading-relaxed max-w-2xl">
                          {s.description}
                        </p>

                        {/* Deliverables */}
                        <div className="mt-4 sm:mt-5 flex flex-col sm:flex-row sm:flex-wrap gap-x-6 gap-y-2">
                          {s.deliverables.map((d, dIdx) => (
                            <div
                              key={dIdx}
                              className="flex items-start gap-2 text-sm sm:text-[15px] text-neutral-600"
                            >
                              <CheckCircle2
                                className="w-[18px] h-[18px] shrink-0 mt-0.5"
                                style={{ color: s.accent }}
                              />
                              <span className="leading-snug">{d}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Deck progress dots + hint */}
          <div className="mt-2 flex items-center justify-center gap-3 font-mono text-[10px] uppercase tracking-widest text-faint select-none">
            <AnimatePresence mode="popLayout" initial={false}>
              {order.map((stepIdx, slot) =>
                slot === 0 ? (
                  <motion.span
                    key={stepsData[stepIdx].step}
                    layout
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    className="inline-flex items-center gap-1.5 text-live"
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: stepsData[stepIdx].accent }}
                    />
                    {stepsData[stepIdx].tabLabel}
                  </motion.span>
                ) : null
              )}
            </AnimatePresence>
            <span className="text-white/30">· hover to pause · × to dismiss</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
