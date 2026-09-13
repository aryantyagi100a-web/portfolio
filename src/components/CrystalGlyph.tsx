import { useEffect, useRef, useState } from "react";

export interface CrystalGlyphProps {
  /** Rendered size in px; square. */
  size?: number;
  className?: string;
}

/**
 * Luminous green crystal with a glowing lightning-bolt core, slowly
 * rotating. Pure SVG — no assets, no 3D library.
 */
export default function CrystalGlyph({
  size = 112,
  className = "",
}: CrystalGlyphProps) {
  const glowRef = useRef<SVGPathElement>(null);
  const [mounted, setMounted] = useState(false);

  // Deterministic per-mount twinkle phases (avoids SSR hydration mismatch).
  useEffect(() => setMounted(true), []);

  return (
    <div
      className={`shrink-0 flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 120 120"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="crystal-rotate drop-shadow-[0_0_24px_rgba(74,222,128,0.35)]"
      >
        <defs>
          {/* Crystal body gradient */}
          <linearGradient id="cg-body" x1="30" y1="18" x2="92" y2="104" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#bbf7d0" />
            <stop offset="0.45" stopColor="#4ade80" />
            <stop offset="1" stopColor="#15803d" />
          </linearGradient>
          {/* Inner facet sheen */}
          <linearGradient id="cg-facet" x1="60" y1="14" x2="60" y2="106" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.75" />
            <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.08" />
            <stop offset="1" stopColor="#052e16" stopOpacity="0.4" />
          </linearGradient>
          {/* Bolt core glow */}
          <radialGradient id="cg-core" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#fef08a" stopOpacity="0.95" />
            <stop offset="0.55" stopColor="#bef264" stopOpacity="0.55" />
            <stop offset="1" stopColor="#bef264" stopOpacity="0" />
          </radialGradient>
          <filter id="cg-blur" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="2.2" />
          </filter>
        </defs>

        {/* Outer ambient glow */}
        <circle cx="60" cy="60" r="52" fill="url(#cg-core)" opacity="0.5" />

        {/* Crystal: elongated hex gem */}
        <g>
          {/* Back facets (darker) */}
          <path d="M60 10 L88 32 L80 96 L60 110 L40 96 L32 32 Z" fill="#14532d" />
          {/* Main body */}
          <path d="M60 10 L84 34 L76 94 L60 106 L44 94 L36 34 Z" fill="url(#cg-body)" />
          {/* Left facet shadow */}
          <path d="M60 10 L36 34 L44 94 L60 106 Z" fill="#166534" opacity="0.55" />
          {/* Right facet highlight */}
          <path d="M60 10 L84 34 L76 94 L60 106 Z" fill="url(#cg-facet)" opacity="0.65" />
          {/* Top table facet */}
          <path d="M60 10 L72 24 L60 34 L48 24 Z" fill="#dcfce7" opacity="0.9" />
          {/* Edge lines */}
          <path
            d="M60 10 L84 34 L76 94 L60 106 L44 94 L36 34 Z M36 34 L84 34 M60 10 L60 34 M44 94 L36 34 M76 94 L84 34"
            stroke="#ecfdf5"
            strokeOpacity="0.5"
            strokeWidth="1.2"
          />
          {/* Specular streaks */}
          <path d="M52 30 L46 78" stroke="#f0fdf4" strokeOpacity="0.65" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M66 34 L62 62" stroke="#f0fdf4" strokeOpacity="0.4" strokeWidth="1.6" strokeLinecap="round" />
        </g>

        {/* Glowing lightning bolt at the core */}
        <g>
          <circle cx="60" cy="58" r="26" fill="url(#cg-core)" />
          <path
            ref={mounted ? glowRef : undefined}
            d="M64 36 L46 62 L58 62 L54 82 L74 54 L61 54 Z"
            fill="#fef9c3"
            stroke="#facc15"
            strokeWidth="1.4"
            filter="url(#cg-blur)"
            opacity="0.9"
          />
          <path
            d="M64 36 L46 62 L58 62 L54 82 L74 54 L61 54 Z"
            fill="#fefce8"
            stroke="#fde047"
            strokeWidth="1.2"
          />
        </g>
      </svg>
    </div>
  );
}
