import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { site } from "../site.config";
import { LiveDot } from "./ui";

export default function FixedBitmoji() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.aside
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-5 left-5 sm:bottom-6 sm:left-6 z-40 select-none"
      aria-label="Contact Aryan"
    >
      <a
        href={site.whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative flex items-center gap-2.5 rounded-full border border-white/20 bg-surface/90 backdrop-blur-xl p-1.5 sm:p-2 shadow-2xl transition-all duration-300 hover:border-white/50 hover:bg-raised hover:shadow-[0_0_25px_rgba(21,99,56,0.35)]"
      >
        {/* Bitmoji Avatar Disc */}
        <div className="relative flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-black/70 shadow-inner group-hover:scale-105 transition-transform duration-300">
          <img
            src="/avatar.png"
            alt="Aryan Bitmoji"
            className="h-full w-full object-contain p-0.5"
            loading="eager"
          />
          {/* Live pulse dot badge */}
          <span className="absolute bottom-0.5 right-0.5 block">
            <LiveDot className="scale-75" />
          </span>
        </div>

        {/* Floating Expandable Tag on Hover / Desktop Pill */}
        <div className="hidden sm:flex flex-col pr-3">
          <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase text-live tracking-wider font-bold">
            <span className="h-1.5 w-1.5 rounded-full bg-live animate-pulse" />
            <span>Aryan · Studio Lead</span>
          </div>
          <span className="font-mono text-xs text-paper font-semibold group-hover:text-white transition-colors">
            Chat on WhatsApp
          </span>
        </div>

        {/* Mobile Flyout Tooltip on Hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, x: -8, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -8, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="sm:hidden absolute left-full ml-3 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-xl border border-white/20 bg-black/90 px-3 py-1.5 font-mono text-xs text-white shadow-xl pointer-events-none"
            >
              <span>👋 Online · Tap to chat</span>
            </motion.div>
          )}
        </AnimatePresence>
      </a>
    </motion.aside>
  );
}
