import { useState, useEffect, useRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import CrystalGlyph from "./CrystalGlyph";

// ------------------------------------------------------------------
// Small shared UI primitives for the monochrome design system.
// ------------------------------------------------------------------

/** Live green dot with a soft pulse — for availability statuses. */
export function LiveDot({ className = "" }: { className?: string }) {
  return (
    <span className={`relative inline-flex h-2 w-2 ${className}`} aria-hidden>
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-live opacity-60" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-live" />
    </span>
  );
}

/**
 * Oly-style mono label wrapped in square brackets.
 * Renders as <a> when `as="a"` (href required), otherwise <span>.
 */
type BracketProps =
  | ({ as?: "span"; children: ReactNode } & Record<string, unknown>)
  | ({ as: "a"; href: string; children: ReactNode } & AnchorHTMLAttributes<HTMLAnchorElement>);

export function BracketLabel(props: BracketProps) {
  const { as = "span", children, ...rest } = props as Record<string, unknown> & { children: ReactNode };
  const Tag = (as === "a" ? "a" : "span") as "a";
  return (
    <Tag
      {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      className={`font-mono text-[13px] tracking-tight ${String((rest as Record<string, unknown>).className ?? "")}`}
    >
      [ {children} ]
    </Tag>
  );
}

/**
 * Solid pill button — white with black text. No arrows, ever.
 * Carries Rive-style press physics: springs up on hover, squishes on press.
 */
export function PillButton({ className = "", disabled, ...rest }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <motion.button
      whileHover={disabled ? undefined : { scale: 1.03 }}
      whileTap={disabled ? undefined : { scale: 0.94 }}
      transition={{ type: "spring", stiffness: 420, damping: 22 }}
      disabled={disabled}
      {...(rest as Record<string, unknown>)}
      className={`inline-flex min-h-[44px] sm:min-h-[42px] items-center justify-center rounded-full bg-paper px-6 py-2.5 text-sm sm:text-[15px] font-semibold text-ink transition-colors hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 shadow-sm cursor-pointer ${className}`}
    />
  );
}

// Computed once: touch-only devices get no magnetism (no cursor to attract).
const HOVER_CAPABLE = typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;

/**
 * Magnetic wrapper — the child gently follows the cursor while hovered
 * (clamped to a few px) and springs back on exit. A no-op for touch
 * devices and for users with prefers-reduced-motion.
 */
export function Magnetic({
  children,
  strength = 0.22,
  maxShift = 7,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  maxShift?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spring = { stiffness: 260, damping: 22, mass: 0.6 };
  const x = useSpring(mx, spring);
  const y = useSpring(my, spring);

  const clamp = (v: number) => Math.max(-maxShift, Math.min(maxShift, v));

  function handleMove(e: React.MouseEvent) {
    if (reduceMotion || !ref.current || !HOVER_CAPABLE) return;
    const r = ref.current.getBoundingClientRect();
    mx.set(clamp((e.clientX - (r.left + r.width / 2)) * strength));
    my.set(clamp((e.clientY - (r.top + r.height / 2)) * strength));
  }

  function handleLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={reduceMotion ? undefined : { x, y }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}

/**
 * Rolling text — on hover, the label slides up while an identical copy
 * rolls in from below. Self-contained hover trigger; screen readers get
 * a single plain copy via sr-only.
 */
export function RollingText({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span className={`group/roll relative inline-block overflow-hidden leading-[1.35] align-bottom ${className}`}>
      <span className="sr-only">{text}</span>
      <span
        aria-hidden
        className="relative block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover/roll:-translate-y-full motion-reduce:transition-none motion-reduce:group-hover/roll:translate-y-0"
      >
        {text}
        <span className="absolute left-0 top-full block">{text}</span>
      </span>
    </span>
  );
}

/** Inline WhatsApp glyph (lucide has none). Uses currentColor. */
export function WhatsAppIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2 22l5.3-1.39c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.9-4.44 9.9-9.9S17.5 2 12.04 2Zm0 18.02c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.26 8.26 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 4.54 0 8.24 3.7 8.24 8.24s-3.7 8.24-8.24 8.24Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.14.16-.29.18-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.24-.01-.38.11-.5.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.24-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.28Z" />
    </svg>
  );
}

/**
 * Monumental Scrambling Wordmark (e.g. CABIN <-> CODE)
 * On hover, scrambles through code glyphs and alternates between words with left-to-right lock-in.
 */
export interface ScrambleWordmarkProps {
  words?: readonly string[];
  characters?: string;
  scrambleDuration?: number;
  pauseDuration?: number;
  className?: string;
  defaultWord?: string;
}

export function ScrambleWordmark({
  words = ["CABIN", "CODE"],
  characters = "{ } ( ) ; < / > = + # * 0 1 A B C X Y Z 2 3 4 5 8 9 & % $ ! ? ~ ^ _ -",
  scrambleDuration = 450,
  pauseDuration = 1300,
  className = "",
  defaultWord = "CABIN",
}: ScrambleWordmarkProps) {
  const [displayText, setDisplayText] = useState(defaultWord);
  const currentWordRef = useRef(defaultWord);
  const isHoveredRef = useRef(false);
  const intervalRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const charPool = useRef(characters.split(" ").filter(Boolean));

  const clearTimers = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const scrambleTo = (targetWord: string, onComplete?: () => void) => {
    clearTimers();
    const startWord = currentWordRef.current;
    const startLen = startWord.length;
    const targetLen = targetWord.length;
    const frameInterval = 40;
    const totalFrames = Math.max(8, Math.round(scrambleDuration / frameInterval));
    let frame = 0;

    intervalRef.current = window.setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const lockedCount = Math.floor(progress * targetLen);
      const currentLen = Math.round(startLen + (targetLen - startLen) * progress);

      let scrambled = "";
      for (let i = 0; i < currentLen; i++) {
        if (i < lockedCount) {
          scrambled += targetWord[i];
        } else {
          const randomIndex = Math.floor(Math.random() * charPool.current.length);
          scrambled += charPool.current[randomIndex];
        }
      }

      setDisplayText(scrambled);

      if (frame >= totalFrames) {
        if (intervalRef.current !== null) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        setDisplayText(targetWord);
        currentWordRef.current = targetWord;
        if (onComplete) {
          onComplete();
        }
      }
    }, frameInterval);
  };

  const scheduleNextCycle = () => {
    if (!isHoveredRef.current) return;
    const currentWord = currentWordRef.current;
    const currentIdx = words.indexOf(currentWord);
    const nextIdx = (currentIdx + 1) % words.length;
    const nextWord = words[nextIdx];

    timeoutRef.current = window.setTimeout(() => {
      if (!isHoveredRef.current) return;
      scrambleTo(nextWord, () => {
        scheduleNextCycle();
      });
    }, pauseDuration);
  };

  // Touch devices synthesize mouseenter/mouseleave on tap — ignore those so
  // the tap-driven cycle below isn't cancelled mid-animation.
  const lastTouchRef = useRef(0);

  const handleMouseEnter = () => {
    if (Date.now() - lastTouchRef.current < 600) return;
    isHoveredRef.current = true;
    const currentWord = currentWordRef.current;
    const nextWord = currentWord === words[0] ? words[1] : words[0];

    scrambleTo(nextWord, () => {
      scheduleNextCycle();
    });
  };

  /**
   * Touch fallback — no hover on phones, so tapping the wordmark plays one
   * full cycle (scramble to the next word, hold, scramble back). No-op while
   * a desktop hover cycle is already running.
   */
  const handleTap = () => {
    lastTouchRef.current = Date.now();
    if (isHoveredRef.current) return;
    const currentWord = currentWordRef.current;
    const nextWord = currentWord === words[0] ? words[1] : words[0];
    scrambleTo(nextWord, () => {
      timeoutRef.current = window.setTimeout(() => {
        if (!isHoveredRef.current) scrambleTo(defaultWord);
      }, pauseDuration);
    });
  };

  // Touch devices: auto-play a single cycle when the wordmark scrolls into
  // view, so the effect isn't invisible to mobile visitors.
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (HOVER_CAPABLE) return;
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    let played = false;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !played) {
          played = true;
          handleTap();
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMouseLeave = () => {
    if (Date.now() - lastTouchRef.current < 600) return;
    isHoveredRef.current = false;
    clearTimers();
    if (currentWordRef.current !== defaultWord || displayText !== defaultWord) {
      scrambleTo(defaultWord);
    }
  };

  useEffect(() => {
    return () => {
      clearTimers();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleTap}
      className={`w-full overflow-hidden select-none cursor-pointer group ${className}`}
      aria-label="Cabin and Code"
    >
      <span className="sr-only">CABIN</span>
      <div
        aria-hidden="true"
        className="w-full px-3 sm:px-8 max-w-[1500px] mx-auto flex items-center justify-center gap-3 sm:gap-6 lg:gap-8"
      >
        <CrystalGlyph size={112} className="h-16 w-16 sm:h-24 sm:w-24 md:h-28 md:w-28 lg:h-32 lg:w-32" />

        <div className="flex-1 min-w-0 flex items-center justify-center">
          <svg
            viewBox="0 0 1400 230"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto text-white transition-opacity duration-300 will-change-transform drop-shadow-[0_0_20px_rgba(255,255,255,0.05)] group-hover:drop-shadow-[0_0_35px_rgba(255,255,255,0.2)]"
          >
            <text
              x="50%"
              y="72%"
              textAnchor="middle"
              fill="#ffffff"
              className="uppercase"
              style={{
                fontSize: "172px",
                letterSpacing: "0.1em",
                fontWeight: 400,
                fontFamily: "'Shrikhand', 'Georgia', serif",
              }}
            >
              {displayText}
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
}
