import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site, faqs } from "../site.config";
import { RollingText } from "./ui";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function Footer() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  function toggleFaq(idx: number) {
    setOpenIdx((prev) => (prev === idx ? null : idx));
  }

  return (
    <footer className="border-t border-line bg-black text-paper relative overflow-hidden pt-12 sm:pt-16 pb-6 sm:pb-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-8 lg:px-16">
        {/* FAQs Section on Pure Black Background */}
        <div className="mb-14 sm:mb-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-neutral-900/90 backdrop-blur-md px-3.5 py-1 text-xs font-mono text-faint mb-2 shadow-sm">
                <HelpCircle className="w-3.5 h-3.5 text-live" />
                <span>[ FAQ / Common Questions ]</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-paper">
                Frequently Asked Questions
              </h2>
            </div>
            <p className="font-mono text-xs text-mute max-w-xs sm:text-right">
              Straight answers · Zero technical jargon
            </p>
          </div>

          {/* FAQ Accordion List */}
          <div className="divide-y divide-white/10">
            {faqs.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div key={idx} className="py-4 sm:py-5">
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 text-left group cursor-pointer select-none py-1 transition-colors"
                  >
                    <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                      <span className="font-mono text-xs text-faint shrink-0 group-hover:text-live transition-colors">
                        0{idx + 1}
                      </span>
                      <span className="text-sm sm:text-base font-semibold text-paper group-hover:text-white transition-colors">
                        {faq.question}
                      </span>
                    </div>
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-all duration-300 ${
                        isOpen
                          ? "border-live/50 bg-live/15 text-live rotate-180 shadow-[0_0_10px_rgba(21,99,56,0.3)]"
                          : "border-white/10 bg-white/5 text-faint group-hover:border-white/25 group-hover:text-paper"
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pt-3 pb-2 pl-7 sm:pl-9 text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal max-w-3xl">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Main Nav & Credits */}
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between pt-6 border-t border-white/10">
          <div>
            <a href="#top" className="inline-block text-base sm:text-sm font-semibold tracking-tight text-paper">
              <RollingText text={site.name} />
              <span className="text-faint"> — {site.role}</span>
            </a>
            <p className="mt-1 font-mono text-xs text-faint">
              {site.location}
            </p>
          </div>

          <nav aria-label="footer" className="flex flex-wrap gap-x-6 gap-y-2.5 sm:gap-x-7 sm:gap-y-3">
            <a href={site.whatsappLink} target="_blank" rel="noopener noreferrer" className="font-mono text-sm sm:text-[13px] text-mute transition-colors hover:text-paper py-1">
              WhatsApp
            </a>
            <a href={`mailto:${site.email}`} className="font-mono text-sm sm:text-[13px] text-mute transition-colors hover:text-paper py-1">
              Email
            </a>
            {site.githubUrl && (
              <a href={site.githubUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-sm sm:text-[13px] text-mute transition-colors hover:text-paper py-1">
                GitHub
              </a>
            )}
            {site.linkedinUrl && (
              <a href={site.linkedinUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-sm sm:text-[13px] text-mute transition-colors hover:text-paper py-1">
                LinkedIn
              </a>
            )}
            <a href="#contact" className="font-mono text-sm sm:text-[13px] text-mute transition-colors hover:text-paper py-1">
              Contact
            </a>
          </nav>
        </div>

        {/* Copyright & Tagline */}
        <div className="mt-8 sm:mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 font-mono text-[11px] text-faint sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} {site.name}</span>
          <span>Designed & built from scratch — no template</span>
        </div>
      </div>

      {/* Monumental Merus-Style Full-Width Wordmark: "CABIN" */}
      <div className="w-full mt-10 sm:mt-16 pt-4 overflow-hidden border-t border-white/5 select-none pointer-events-none">
        <div className="px-2 sm:px-6 max-w-[1440px] mx-auto">
          <svg
            viewBox="0 0 1360 210"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto text-white/[0.08] hover:text-white/[0.18] transition-colors duration-500 will-change-transform"
            aria-label="CABIN"
          >
            <text
              x="50%"
              y="74%"
              textAnchor="middle"
              fill="currentColor"
              className="font-mono font-black uppercase"
              style={{
                fontSize: "210px",
                letterSpacing: "-0.04em",
                fontWeight: 900,
              }}
            >
              CABIN
            </text>
          </svg>
        </div>
      </div>
    </footer>
  );
}

