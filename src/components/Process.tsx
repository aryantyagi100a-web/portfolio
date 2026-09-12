import { motion, type Variants } from "framer-motion";
import { site } from "../site.config";
import {
  MessageSquare,
  Layers,
  Code2,
  Rocket,
  Zap,
  CheckCircle2,
  ArrowUpRight,
  Clock,
  Sparkles,
} from "lucide-react";
import { Magnetic, WhatsAppIcon } from "./ui";

const stepsData = [
  {
    step: "01",
    timeframe: "day 01",
    title: "discovery & direct chat",
    description:
      "we talk about your business, target customers, and goals — over whatsapp or a quick call. no jargon, just a straight assessment and a flat quote.",
    icon: MessageSquare,
    accent: "#fde047", // yellow/live
    deliverables: ["fixed flat quote (0 hourly surprises)", "clear scope & timeline locked"],
  },
  {
    step: "02",
    timeframe: "days 02–03",
    title: "design preview & layout",
    description:
      "you see exactly how your site will look, feel, and flow before a single line of production code is written. we iterate fast until you love it.",
    icon: Layers,
    accent: "#38bdf8", // sky
    deliverables: ["interactive desktop & mobile mockup", "copy, typography & color tuning"],
  },
  {
    step: "03",
    timeframe: "days 04–06",
    title: "high-performance build",
    description:
      "we engineer the site with lightning-fast code, responsive layouts, whatsapp lead capture, and seo indexing. you get a private staging link to test.",
    icon: Code2,
    accent: "#34d399", // emerald
    deliverables: ["private staging link to test live", "cross-browser & speed optimization"],
  },
  {
    step: "04",
    timeframe: "day 07 · live",
    title: "launch & zero-friction support",
    description:
      "we point your domain, configure google indexing, and flip the switch to go live. after launch, minor updates stay quick, painless, and flat-rate.",
    icon: Rocket,
    accent: "#f43f5e", // rose/rocket
    deliverables: ["100% full domain & code ownership", "google search indexing & fast support"],
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 320,
      damping: 24,
    },
  },
};

export default function Process() {
  return (
    <section id="process" className="scroll-mt-[5px] px-4 sm:px-8 lg:px-16 py-16 sm:py-28 relative overflow-hidden">
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
              no endless status meetings, no technical headaches. you always know what we're working on and what happens next.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-live">
              <Clock className="w-4 h-4 text-live shrink-0" />
              <span>⚡ standard turnaround: 5 to 7 days from kickoff</span>
            </div>
          </motion.div>
        </div>

        {/* Rapid Timeline Progress Pill Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 hidden sm:grid grid-cols-4 gap-2 bg-black/40 border border-white/10 p-2 rounded-2xl backdrop-blur-md font-mono text-xs text-faint text-center"
        >
          <div className="py-1.5 px-2 rounded-xl bg-white/10 text-paper font-semibold flex items-center justify-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-live" />
            <span>01. discovery</span>
          </div>
          <div className="py-1.5 px-2 rounded-xl text-neutral-300 flex items-center justify-center gap-1.5">
            <span>02. preview</span>
          </div>
          <div className="py-1.5 px-2 rounded-xl text-neutral-300 flex items-center justify-center gap-1.5">
            <span>03. build</span>
          </div>
          <div className="py-1.5 px-2 rounded-xl text-live font-semibold flex items-center justify-center gap-1.5">
            <span>04. live launch 🚀</span>
          </div>
        </motion.div>

        {/* 4 Interactive Spicy Step Cards */}
        <motion.ol
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-8 sm:mt-10 grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
        >
          {stepsData.map((s) => {
            const Icon = s.icon;
            return (
              <motion.li
                key={s.step}
                variants={cardVariants}
                whileHover={{ y: -6, scale: 1.015 }}
                transition={{ type: "spring", stiffness: 350, damping: 22 }}
                className="group relative rounded-2xl sm:rounded-3xl border border-line bg-surface/70 backdrop-blur-xl p-5 sm:p-7 flex flex-col justify-between hover:border-white/40 hover:bg-surface/90 hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                {/* Subtle top glow highlight on hover */}
                <div
                  className="absolute top-0 left-0 right-0 h-[3px] opacity-40 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: s.accent }}
                  aria-hidden
                />

                {/* Subtle ambient gradient overlay */}
                <div
                  className="absolute -right-12 -bottom-12 w-32 h-32 rounded-full opacity-10 group-hover:opacity-25 transition-opacity blur-2xl pointer-events-none"
                  style={{ backgroundColor: s.accent }}
                  aria-hidden
                />

                <div>
                  {/* Top Bar: Icon Badge + Timeframe Pill + Step Number */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-black/50 shadow-inner group-hover:scale-110 transition-transform duration-300"
                      style={{ color: s.accent }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider bg-white/10 px-2.5 py-1 rounded-full text-faint group-hover:text-paper group-hover:bg-white/15 transition-colors">
                        {s.timeframe}
                      </span>
                      <span className="font-mono text-2xl sm:text-3xl font-black text-white/25 group-hover:text-white/60 transition-colors select-none">
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
                  <p className="font-mono text-[10px] uppercase tracking-widest text-faint">
                    // deliverables
                  </p>
                  {s.deliverables.map((d, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2 text-xs text-neutral-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-live shrink-0 mt-0.5" />
                      <span className="leading-snug">{d}</span>
                    </div>
                  ))}
                </div>
              </motion.li>
            );
          })}
        </motion.ol>

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
              Let's knock out step 01 in 5 minutes over WhatsApp.
            </p>
            <p className="font-mono text-xs text-faint">
              Share a quick idea of what you need — get an immediate scope & transparent price.
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
                <span>Start Step 01 on WhatsApp</span>
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
