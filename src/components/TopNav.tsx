import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "../site.config";
import { RollingText, WhatsAppIcon } from "./ui";
import CrystalGlyph from "./CrystalGlyph";
import { ArrowUpRight, X } from "lucide-react";

const LINKS = [
  { href: "#work", label: "Work", num: "01" },
  { href: "#services", label: "Services", num: "02" },
  { href: "#about", label: "About", num: "03" },
  { href: "#process", label: "Process", num: "04" },
  { href: "#contact", label: "Contact", num: "05" },
];

export default function TopNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 border-b border-white/15 backdrop-blur-xl ${
        scrolled ? "shadow-lg bg-black/90" : "bg-black/75"
      }`}
    >
      <nav
        aria-label="main"
        className="w-full flex items-center justify-between px-4 sm:px-8 lg:px-16 py-3.5 sm:py-5"
      >
        <a
          href="#top"
          className="flex items-center gap-2.5 sm:gap-3 py-2.5 -my-2.5 text-base sm:text-lg lg:text-xl font-bold tracking-tight text-white group"
        >
          <CrystalGlyph
            size={32}
            className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-white/10 p-0.5 border border-white/25 shadow-sm group-hover:scale-110 transition-transform duration-200 [&_svg]:h-full [&_svg]:w-full"
          />
          <span className="truncate max-w-[200px] sm:max-w-none">
            <RollingText text={site.name} />
            <span className="text-xs sm:text-sm text-neutral-400 font-normal"> — {site.role}</span>
          </span>
        </a>

        {/* desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono text-[14px] lg:text-[15px] font-medium text-neutral-300 transition-colors hover:text-white"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 rounded-full bg-paper px-4 py-1.5 text-xs font-semibold text-ink transition-all hover:opacity-95 hover:scale-105 shadow-sm"
          >
            <span>Get a Quote</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* mobile menu button (44px touch target) */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "close menu" : "open menu"}
          className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-surface/60 text-white cursor-pointer hover:bg-white/10 transition-colors"
        >
          {open ? (
            <X className="w-5 h-5 text-white" />
          ) : (
            <span className="relative flex flex-col justify-center items-center gap-1.5 w-5 h-5" aria-hidden>
              <span className="block h-[2px] w-4 bg-white rounded-full transition-transform" />
              <span className="block h-[2px] w-4 bg-white rounded-full transition-transform" />
            </span>
          )}
        </button>
      </nav>

      {/* mobile drawer overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden border-t border-white/20 bg-neutral-950/98 backdrop-blur-2xl overflow-hidden shadow-2xl"
          >
            <div className="px-5 py-6 flex flex-col gap-6 max-h-[calc(100vh-65px)] overflow-y-auto">
              {/* Status in mobile drawer */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="font-mono text-xs text-mute">{site.name}</span>
                <span className="font-mono text-xs text-faint">{site.location}</span>
              </div>

              {/* Navigation Links with generous tap padding */}
              <div className="flex flex-col space-y-1">
                {LINKS.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between py-3.5 px-3 rounded-xl font-mono text-base text-neutral-200 hover:text-white hover:bg-white/10 active:bg-white/15 transition-all"
                  >
                    <span className="text-lg font-medium">{l.label}</span>
                    <span className="font-mono text-xs text-faint">/{l.num}</span>
                  </a>
                ))}
              </div>

              {/* Action Buttons inside Drawer */}
              <div className="pt-2 border-t border-white/10 flex flex-col gap-3">
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-paper px-6 py-3 text-sm font-bold text-ink shadow-lg active:scale-[0.98] transition-transform"
                >
                  <span>Get a Free Quote</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <a
                  href={site.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 py-3 text-sm font-medium text-paper active:scale-[0.98] transition-transform"
                >
                  <WhatsAppIcon className="h-4 w-4 text-emerald-400" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

              {/* Footer notes */}
              <div className="pt-2 flex items-center justify-between font-mono text-[11px] text-faint">
                <span>{site.whatsappDisplay}</span>
                <span>{site.heroNote}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
