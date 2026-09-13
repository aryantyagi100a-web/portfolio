import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="font-mono text-sm text-faint"
      >
        [ 404 ]
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        className="mt-3 text-4xl font-bold tracking-tight text-paper sm:text-5xl"
      >
        This page wandered off
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
        className="mt-4 max-w-md text-base leading-relaxed text-mute"
      >
        The link is old or the address is wrong. The site itself is right where
        you left it.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
        className="mt-8 flex flex-col items-center gap-3 sm:flex-row"
      >
        <Link
          to="/"
          className="flex min-h-[48px] items-center gap-2 rounded-full bg-paper px-7 text-base font-bold text-ink shadow-lg transition-all hover:opacity-95 active:scale-[0.98]"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back home</span>
        </Link>
        <a
          href="https://wa.me/919220472008"
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-[48px] items-center rounded-full border border-white/25 bg-surface/50 px-7 text-base font-medium text-paper transition-colors hover:bg-white/15"
        >
          WhatsApp me instead
        </a>
      </motion.div>
    </section>
  );
}
