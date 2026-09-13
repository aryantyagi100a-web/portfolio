import { useEffect, useState } from "react";
import { site } from "../site.config";
import { WhatsAppIcon } from "./ui";
import { ArrowUpRight } from "lucide-react";

/**
 * Sticky bottom CTA bar — mobile only (<md). Appears after the hero,
 * hides while the contact section / footer are on screen (the real
 * CTAs are right there), and respects the iOS safe area.
 */
export default function StickyMobileCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const contact = document.getElementById("contact");
      // Hide once the contact section is near/inside the viewport.
      const nearContact =
        contact && contact.getBoundingClientRect().top < window.innerHeight * 0.8;
      setShow(window.scrollY > 480 && !nearContact);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 md:hidden transition-transform duration-300 ease-out ${
        show ? "translate-y-0" : "pointer-events-none invisible translate-y-full"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-hidden={!show}
    >
      <div className="flex items-stretch gap-2.5 border-t border-white/10 bg-neutral-950/95 p-3 backdrop-blur-xl">
        <a
          href={site.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-full bg-emerald-500 px-5 text-sm font-bold text-neutral-950 active:scale-[0.98] transition-transform"
        >
          <WhatsAppIcon className="h-4 w-4" />
          <span>WhatsApp Us</span>
        </a>
        <a
          href="#contact"
          className="flex min-h-[48px] items-center justify-center gap-1.5 rounded-full border border-white/25 bg-white/5 px-5 text-sm font-semibold text-paper active:scale-[0.98] transition-transform"
        >
          <span>Quote</span>
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
