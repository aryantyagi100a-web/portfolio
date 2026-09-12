import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import {
  Layers,
  Code2,
  Rocket,
  Zap,
  CheckCircle2,
  Clock,
  Sparkles,
} from "lucide-react";

interface PoofParticle {
  id: number;
  x: number;
  y: number;
}

const stepsData = [
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

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 25, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 340,
      damping: 24,
    },
  },
};

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

export default function Process() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [poofs, setPoofs] = useState<PoofParticle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const triggerPoofAt = useCallback((x: number, y: number) => {
    const id = Date.now() + Math.random();
    setPoofs((prev) => [...prev, { id, x, y }]);
    setTimeout(() => {
      setPoofs((prev) => prev.filter((p) => p.id !== id));
    }, 450);
  }, []);

  const selectStep = useCallback(
    (nextIdx: number, clientCoords?: { x: number; y: number }) => {
      if (clientCoords) {
        triggerPoofAt(clientCoords.x, clientCoords.y);
      } else {
        const targetEl = cardRefs.current[nextIdx];
        if (targetEl) {
          const rect = targetEl.getBoundingClientRect();
          triggerPoofAt(rect.left + rect.width / 2, rect.top + rect.height / 3);
        }
      }
      setActiveStep(nextIdx);
    },
    [triggerPoofAt]
  );

  // Auto-Cycle every 4 seconds continuously across steps 0 -> 1 -> 2 -> 0
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => {
        const next = (prev + 1) % stepsData.length;
        const targetEl = cardRefs.current[next];
        if (targetEl) {
          const rect = targetEl.getBoundingClientRect();
          triggerPoofAt(rect.left + rect.width / 2, rect.top + rect.height / 3);
        }
        return next;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [triggerPoofAt]);

  function handleTabClick(idx: number, e: React.MouseEvent) {
    selectStep(idx, { x: e.clientX, y: e.clientY });
  }

  function handleCardClick(idx: number, e: React.MouseEvent) {
    selectStep(idx, { x: e.clientX, y: e.clientY });
  }

  return (
    <section
      id="process"
      ref={containerRef}
      className="scroll-mt-[5px] px-4 sm:px-8 lg:px-16 py-16 sm:py-28 relative overflow-hidden"
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
              <span>[ studio roadmap / 7-day sprint ]</span>
            </motion.div>

            {/* Spicy Animated Headline */}
            <h2 className="mt-3 text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight lowercase text-paper">
              <span className="block overflow-hidden py-0.5">
                <motion.span
                  className="inline-block will-change-transform"
                  initial={{ y: "100%", opacity: 0, filter: "blur(10px)" }}
                  whileInView={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  from raw concept to
                </motion.span>
              </span>
              <span className="block overflow-hidden py-1">
                <motion.span
                  className="inline-block bg-white text-[#156338] px-3 sm:px-5 py-0.5 rounded-xl sm:rounded-2xl shadow-lg will-change-transform font-extrabold"
                  initial={{ y: "100%", opacity: 0, filter: "blur(12px)" }}
                  whileInView={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                >
                  live, client-getting site.
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
              a rapid, transparent 7-day sprint from initial layout to custom domain launch. zero friction, zero hourly surprises.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-live">
              <Clock className="w-4 h-4 text-live shrink-0" />
              <span>⚡ standard turnaround: 5 to 7 days from kickoff</span>
            </div>
          </motion.div>
        </div>

        {/* Segmented Tab Bar at the top (with sliding active-pill ~400ms ease-out) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 flex items-center gap-2 bg-black/40 border border-white/10 p-2 rounded-2xl backdrop-blur-md font-mono text-xs text-faint"
        >
          {stepsData.map((s, idx) => {
            const isSelected = activeStep === idx;
            return (
              <button
                key={s.step}
                type="button"
                onClick={(e) => handleTabClick(idx, e)}
                className={`relative shrink-0 flex-1 min-h-[44px] py-2 px-3 rounded-xl transition-colors duration-300 font-semibold cursor-pointer flex items-center justify-center gap-2 select-none ${
                  isSelected
                    ? "text-neutral-950 font-bold"
                    : "text-neutral-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {/* White active-pill background with smooth slide transition (~400ms ease-out) */}
                {isSelected && (
                  <motion.div
                    layoutId="activeProcessPill"
                    className="absolute inset-0 rounded-xl bg-white shadow-lg -z-10"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}

                {/* Status Dot: turns bright/solid green when active on white pill, muted when inactive */}
                <span
                  className="h-2 w-2 rounded-full shrink-0 transition-all duration-300"
                  style={{
                    backgroundColor: isSelected ? "#156338" : s.accent,
                    boxShadow: isSelected ? "0 0 6px rgba(21, 99, 56, 0.4)" : "none",
                  }}
                />
                <span className="capitalize">{s.tabLabel}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Row of 3 Cards styled like terminal/dev panels */}
        <motion.ol
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-8 sm:mt-10 grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-3"
        >
          {stepsData.map((s, i) => {
            const Icon = s.icon;
            const isSelected = activeStep === i;

            return (
              <motion.li
                key={s.step}
                ref={(el) => {
                  cardRefs.current[i] = el as unknown as HTMLDivElement;
                }}
                variants={cardVariants}
                whileHover={{ y: -6, scale: 1.015 }}
                onClick={(e) => handleCardClick(i, e)}
                transition={{ type: "spring", stiffness: 350, damping: 22 }}
                className={`group relative rounded-2xl sm:rounded-3xl border transition-all duration-300 p-5 sm:p-7 flex flex-col justify-between cursor-pointer select-none ${
                  isSelected
                    ? "border-white/60 bg-surface/95 shadow-2xl ring-2 ring-white/20"
                    : "border-line bg-surface/60 backdrop-blur-xl hover:border-white/35 hover:bg-surface/80"
                }`}
              >
                {/* Resting Inactive Thin Neutral Top Border */}
                <div
                  className="absolute top-0 left-0 right-0 h-[3.5px] bg-white/10 rounded-t-2xl sm:rounded-t-3xl overflow-hidden"
                  aria-hidden
                />

                {/* --- POOF TRANSITION OVERLAYS (Incoming & Outgoing Animated Lifecycle) --- */}
                <AnimatePresence mode="sync">
                  {isSelected && (
                    <motion.div
                      key={`active-overlay-${s.step}`}
                      initial={{ opacity: 0, scale: 0.98, y: 0, filter: "blur(4px)" }}
                      animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                      exit={{
                        opacity: 0,
                        scale: 1.03,
                        y: -10,
                        filter: "blur(8px)",
                        transition: { duration: 0.38, ease: [0.25, 1, 0.5, 1] },
                      }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0 pointer-events-none rounded-2xl sm:rounded-3xl z-10"
                    >
                      {/* Top Accent Bar: scales/wipes from 0% to 100% width left to right */}
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        exit={{
                          opacity: 0,
                          scaleX: 1.02,
                          transition: { duration: 0.35, ease: "easeOut" },
                        }}
                        transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                        style={{ originX: 0, backgroundColor: s.accent }}
                        className="absolute top-0 left-0 right-0 h-[3.5px] rounded-t-2xl sm:rounded-t-3xl shadow-sm"
                        aria-hidden
                      />

                      {/* Bottom-right ambient glow: fades/scales in (opacity 0 -> 1, scale 0.9 -> 1) with slight bounce */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 0.45, scale: 1 }}
                        exit={{
                          opacity: 0,
                          scale: 1.15,
                          filter: "blur(16px)",
                          transition: { duration: 0.36, ease: "easeOut" },
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                        }}
                        style={{ backgroundColor: s.accent }}
                        className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full blur-2xl"
                        aria-hidden
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div>
                  {/* Top Bar: Icon Badge + Timeframe Pill + Step Number */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border bg-black/50 shadow-inner transition-all duration-300 ${
                        isSelected
                          ? "scale-110 border-white/40 shadow-[0_0_12px_rgba(255,255,255,0.15)]"
                          : "border-white/20 group-hover:scale-105"
                      }`}
                      style={{ color: s.accent }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`font-mono text-[10px] sm:text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-full transition-colors duration-300 ${
                          isSelected
                            ? "bg-white text-ink font-bold"
                            : "bg-white/10 text-faint group-hover:text-paper"
                        }`}
                      >
                        {s.timeframe}
                      </span>
                      <span
                        className={`font-mono text-2xl sm:text-3xl font-black transition-colors duration-300 select-none ${
                          isSelected
                            ? "text-white"
                            : "text-white/25 group-hover:text-white/50"
                        }`}
                      >
                        {s.step}
                      </span>
                    </div>
                  </div>

                  {/* Step Title & Description */}
                  <h3 className="text-lg sm:text-xl font-bold tracking-tight lowercase text-paper group-hover:text-white transition-colors">
                    {s.title}
                  </h3>
                  <p className="mt-2.5 text-xs sm:text-sm text-mute leading-relaxed">
                    {s.description}
                  </p>
                </div>

                {/* Milestone Deliverables Checklist */}
                <div className="mt-6 pt-4 border-t border-line/70 space-y-2 relative">
                  <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-faint min-h-[18px]">
                    <span>// deliverables</span>

                    {/* ACTIVE VIEW Label: fades and slides in from the left (~8px) */}
                    <AnimatePresence>
                      {isSelected && (
                        <motion.span
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{
                            opacity: 0,
                            x: -6,
                            scale: 0.95,
                            transition: { duration: 0.3, ease: "easeOut" },
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 350,
                            damping: 24,
                          }}
                          className="inline-flex items-center gap-1 text-live font-bold tracking-wider"
                        >
                          <Sparkles className="w-3 h-3 text-live" />
                          <span>ACTIVE VIEW</span>
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>

                  {s.deliverables.map((d, dIdx) => (
                    <div
                      key={dIdx}
                      className="flex items-start gap-2 text-xs text-neutral-200"
                    >
                      <CheckCircle2
                        className={`w-3.5 h-3.5 shrink-0 mt-0.5 transition-colors duration-300 ${
                          isSelected ? "text-live" : "text-faint"
                        }`}
                      />
                      <span className="leading-snug">{d}</span>
                    </div>
                  ))}
                </div>
              </motion.li>
            );
          })}
        </motion.ol>
      </div>
    </section>
  );
}

