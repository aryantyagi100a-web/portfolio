import { useState, useRef } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { site } from "../site.config";
import {
  Layers,
  Code2,
  Rocket,
  Zap,
  CheckCircle2,
  ArrowUpRight,
  Clock,
  Sparkles,
  Check,
  Globe,
  Terminal,
  Smartphone,
} from "lucide-react";
import { Magnetic, WhatsAppIcon } from "./ui";

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
    description:
      "you see exactly how your site will look, feel, and flow before a single line of production code is written. we iterate fast until you love it.",
    icon: Layers,
    accent: "#38bdf8", // sky
    deliverables: ["interactive desktop & mobile mockup", "copy, typography & color tuning"],
    badge: "visual mockup",
    previewType: "design",
  },
  {
    step: "02",
    timeframe: "days 03–05",
    title: "high-performance build",
    description:
      "we engineer the site with lightning-fast code, responsive layouts, whatsapp lead capture, and seo indexing. you get a private staging link to test.",
    icon: Code2,
    accent: "#34d399", // emerald
    deliverables: ["private staging link to test live", "cross-browser & speed optimization"],
    badge: "production code",
    previewType: "code",
  },
  {
    step: "03",
    timeframe: "days 06–07 · live",
    title: "launch & zero-friction support",
    description:
      "we point your domain, configure google indexing, and flip the switch to go live. after launch, minor updates stay quick, painless, and flat-rate.",
    icon: Rocket,
    accent: "#f43f5e", // rose/rocket
    deliverables: ["100% full domain & code ownership", "google search indexing & fast support"],
    badge: "custom domain & live",
    previewType: "launch",
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
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const [poofs, setPoofs] = useState<PoofParticle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeStep = stepsData[activeStepIdx];

  function triggerPoof(e: React.MouseEvent) {
    const id = Date.now() + Math.random();
    const x = e.clientX;
    const y = e.clientY;

    setPoofs((prev) => [...prev, { id, x, y }]);
    setTimeout(() => {
      setPoofs((prev) => prev.filter((p) => p.id !== id));
    }, 450);
  }

  function handleSelectStep(idx: number, e: React.MouseEvent) {
    triggerPoof(e);
    setActiveStepIdx(idx);
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
              tap any milestone below to see the deliverables, workflow, and live simulation. zero friction from day one.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-live">
              <Clock className="w-4 h-4 text-live shrink-0" />
              <span>⚡ standard turnaround: 5 to 7 days from kickoff</span>
            </div>
          </motion.div>
        </div>

        {/* Rapid Timeline Interactive Tab Strip (Click to Poof 💨 & Switch) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 flex items-center gap-2 bg-black/40 border border-white/10 p-2 rounded-2xl backdrop-blur-md font-mono text-xs text-faint"
        >
          {stepsData.map((s, idx) => {
            const isSelected = activeStepIdx === idx;
            return (
              <button
                key={s.step}
                onClick={(e) => handleSelectStep(idx, e)}
                className={`relative shrink-0 flex-1 min-h-[44px] py-2 px-3 rounded-xl transition-all duration-300 font-semibold cursor-pointer flex items-center justify-center gap-2 ${
                  isSelected
                    ? "bg-white text-ink shadow-lg scale-[1.02]"
                    : "text-neutral-300 hover:text-white hover:bg-white/10"
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeProcessPill"
                    className="absolute inset-0 rounded-xl bg-white -z-10"
                    transition={{ type: "spring", stiffness: 420, damping: 28 }}
                  />
                )}
                <span
                  className="h-2 w-2 rounded-full shrink-0"
                  style={{ backgroundColor: isSelected ? "#156338" : s.accent }}
                />
                <span className="capitalize">{s.step}. {s.title.split("&")[0].trim()}</span>
                {idx === stepsData.length - 1 && <span>🚀</span>}
              </button>
            );
          })}
        </motion.div>

        {/* 3 Interactive Step Cards (Clicking any card triggers Poof 💨) */}
        <motion.ol
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-8 sm:mt-10 grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-3"
        >
          {stepsData.map((s, i) => {
            const Icon = s.icon;
            const isSelected = activeStepIdx === i;

            return (
              <motion.li
                key={s.step}
                variants={cardVariants}
                whileHover={{ y: -6, scale: 1.015 }}
                onClick={(e) => handleSelectStep(i, e)}
                transition={{ type: "spring", stiffness: 350, damping: 22 }}
                className={`group relative rounded-2xl sm:rounded-3xl border transition-all duration-300 p-5 sm:p-7 flex flex-col justify-between overflow-hidden cursor-pointer ${
                  isSelected
                    ? "border-white/60 bg-surface/95 shadow-2xl ring-2 ring-white/25"
                    : "border-line bg-surface/60 backdrop-blur-xl hover:border-white/35 hover:bg-surface/80"
                }`}
              >
                {/* Active Accent Top Line */}
                <div
                  className={`absolute top-0 left-0 right-0 h-[3.5px] transition-all duration-300 ${
                    isSelected ? "opacity-100" : "opacity-30 group-hover:opacity-80"
                  }`}
                  style={{ backgroundColor: s.accent }}
                  aria-hidden
                />

                {/* Subtle Ambient Radial Light */}
                <div
                  className={`absolute -right-12 -bottom-12 w-36 h-36 rounded-full blur-2xl pointer-events-none transition-opacity duration-300 ${
                    isSelected ? "opacity-35" : "opacity-10 group-hover:opacity-25"
                  }`}
                  style={{ backgroundColor: s.accent }}
                  aria-hidden
                />

                <div>
                  {/* Top Bar: Icon Badge + Timeframe Pill + Step Number */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border bg-black/50 shadow-inner transition-transform duration-300 ${
                        isSelected ? "scale-110 border-white/40" : "border-white/20 group-hover:scale-105"
                      }`}
                      style={{ color: s.accent }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`font-mono text-[10px] sm:text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-full transition-colors ${
                          isSelected ? "bg-white text-ink font-bold" : "bg-white/10 text-faint group-hover:text-paper"
                        }`}
                      >
                        {s.timeframe}
                      </span>
                      <span
                        className={`font-mono text-2xl sm:text-3xl font-black transition-colors select-none ${
                          isSelected ? "text-white" : "text-white/25 group-hover:text-white/50"
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
                <div className="mt-6 pt-4 border-t border-line/70 space-y-2">
                  <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-faint">
                    <span>// deliverables</span>
                    {isSelected && <span className="text-live font-bold">active view 💨</span>}
                  </div>
                  {s.deliverables.map((d, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2 text-xs text-neutral-200">
                      <CheckCircle2
                        className={`w-3.5 h-3.5 shrink-0 mt-0.5 transition-colors ${
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

        {/* --- Interactive Live Milestone Simulator (Smooth Animated Switch on Poof) --- */}
        <div className="mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep.step}
              initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -18, filter: "blur(8px)" }}
              transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl sm:rounded-3xl border border-line bg-surface/90 backdrop-blur-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden"
            >
              {/* Dynamic Header of Active Stage */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line/70 pb-5">
                <div className="flex items-center gap-3.5">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black/50 border border-white/20"
                    style={{ color: activeStep.accent }}
                  >
                    <activeStep.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-live uppercase font-bold tracking-wider">
                        step {activeStep.step} live simulation
                      </span>
                      <span className="h-1.5 w-1.5 rounded-full bg-live animate-ping" />
                    </div>
                    <p className="text-lg sm:text-xl font-bold text-paper capitalize">
                      {activeStep.title} ({activeStep.timeframe})
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs bg-white/10 border border-white/15 px-3 py-1.5 rounded-full text-faint">
                    {activeStep.badge}
                  </span>
                </div>
              </div>

              {/* Stage Simulation Body */}
              <div className="mt-6">
                {activeStep.previewType === "design" && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="rounded-xl border border-line bg-black/40 p-4 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-mono text-sky-400">
                        <Smartphone className="w-4 h-4" />
                        <span>Mobile Viewport (390px)</span>
                      </div>
                      <div className="h-20 rounded-lg bg-neutral-800/80 border border-neutral-700 p-2 flex flex-col justify-center gap-1.5">
                        <div className="h-2 w-3/4 bg-white/40 rounded-full" />
                        <div className="h-2 w-1/2 bg-sky-400/60 rounded-full" />
                        <div className="h-4 w-full bg-emerald-500/30 rounded-md border border-emerald-500/40" />
                      </div>
                    </div>

                    <div className="rounded-xl border border-line bg-black/40 p-4 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-mono text-paper">
                        <Layers className="w-4 h-4 text-live" />
                        <span>Visual Typography & Colors</span>
                      </div>
                      <div className="h-20 rounded-lg bg-neutral-800/80 border border-neutral-700 p-2 flex items-center justify-around">
                        <div className="h-8 w-8 rounded-full bg-[#156338] border border-white/40" title="Studio Ink" />
                        <div className="h-8 w-8 rounded-full bg-[#fde047] border border-white/40" title="Live Accent" />
                        <div className="h-8 w-8 rounded-full bg-[#ffffff] border border-white/40" title="Paper White" />
                      </div>
                    </div>

                    <div className="rounded-xl border border-line bg-black/40 p-4 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                        <Check className="w-4 h-4" />
                        <span>100% Client Sign-off</span>
                      </div>
                      <p className="text-xs text-mute leading-relaxed">
                        You review and tweak the layout until every section looks exactly the way you envision your brand.
                      </p>
                    </div>
                  </div>
                )}

                {activeStep.previewType === "code" && (
                  <div className="rounded-xl border border-line bg-black/60 p-4 font-mono text-xs text-mute space-y-1.5">
                    <div className="flex items-center justify-between text-faint pb-2 border-b border-white/10">
                      <span className="flex items-center gap-2"><Terminal className="w-3.5 h-3.5 text-emerald-400" /> build_pipeline.sh</span>
                      <span className="text-live">✓ Lighthouse 100/100</span>
                    </div>
                    <p className="text-emerald-400">✓ React 19 + Tailwind v4 + Vite bundle created (gzip: 9.8 kB)</p>
                    <p className="text-sky-300">✓ Touch targets verified (min 48px tap areas applied)</p>
                    <p className="text-faint">✓ Private Staging Link: https://preview-cabinandcode.staging.dev</p>
                  </div>
                )}

                {activeStep.previewType === "launch" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="rounded-xl border border-line bg-black/40 p-4 flex items-center gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-rose-500/20 border border-rose-400/40 flex items-center justify-center text-rose-400 shrink-0">
                        <Globe className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-paper">Custom Domain Live</p>
                        <p className="font-mono text-xs text-emerald-400">https://yourbusiness.com (SSL Active)</p>
                      </div>
                    </div>

                    <div className="rounded-xl border border-line bg-black/40 p-4 flex items-center gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-live/20 border border-live/40 flex items-center justify-center text-live shrink-0">
                        <Sparkles className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-paper">Google Search Indexing</p>
                        <p className="text-xs text-mute">Sitemap submitted & indexed for local search keywords</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Spicy Kickoff Banner */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-10 sm:mt-12 rounded-2xl sm:rounded-3xl border border-line bg-surface/85 backdrop-blur-xl p-5 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl"
        >
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 font-mono text-xs text-live">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ready to launch in 7 days?</span>
            </div>
            <p className="text-base sm:text-lg font-bold text-paper">
              Let's kick off your design preview today.
            </p>
            <p className="font-mono text-xs text-faint">
              Share a quick idea of what you need — get your interactive mockup rolling.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto shrink-0">
            <Magnetic className="w-full sm:w-auto">
              <a
                href={site.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[48px] items-center justify-center gap-2.5 rounded-full bg-white px-6 py-3 text-sm font-bold text-neutral-900 shadow-lg hover:bg-neutral-100 active:scale-[0.98] transition-all text-center"
              >
                <WhatsAppIcon className="h-4 w-4 text-[#15803d]" />
                <span>Kick Off on WhatsApp</span>
              </a>
            </Magnetic>
            <a
              href="#contact"
              className="flex min-h-[48px] items-center justify-center gap-1.5 rounded-full border border-line px-5 py-3 text-sm font-medium text-mute hover:text-paper hover:border-white/30 active:scale-[0.98] transition-colors font-mono text-center"
            >
              <span>or send inquiry</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
