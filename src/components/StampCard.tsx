import { useEffect, useRef, useState } from "react";

export interface StampCardProps {
  image: string;
  imageAlt?: string;
  title: string;
  stats: string[];
  /** Card width in px at the 1024–1279px breakpoint; scales up beyond that. */
  width?: number;
}

const MAX_TILT_DEG = 15;
const RESTING = { rx: 0, ry: 0 };

/** Pointer-precision + desktop-width check; tilt only makes sense with a mouse. */
function useCanTilt() {
  const [canTilt, setCanTilt] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (hover: hover) and (pointer: fine)");
    const update = () => setCanTilt(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return canTilt;
}

/**
 * Interactive postage stamp with a 3D tilt. Pure CSS transforms + one
 * mousemove listener; rotation values are lerped each frame so the card
 * feels fluid, and ease back to flat on mouse leave.
 */
export default function StampCard({
  image,
  imageAlt = "",
  title,
  stats,
  width = 300,
}: StampCardProps) {
  const canTilt = useCanTilt();
  const cardRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef(RESTING);
  const currentRef = useRef(RESTING);
  const rafRef = useRef<number | null>(null);

  // Write lerped rotation into the card transform; the floor shadow reads
  // --shx/--shy, so vars go on the outer wrapper (shadow's parent).
  const paint = (rx: number, ry: number) => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    const wrap = el.parentElement;
    if (wrap) {
      wrap.style.setProperty("--shx", `${(-ry / MAX_TILT_DEG) * 14}px`);
      wrap.style.setProperty("--shy", `${(rx / MAX_TILT_DEG) * 5 + 2}px`);
    }
  };

  const tick = () => {
    const t = targetRef.current;
    const c = currentRef.current;
    // Eased lerp: closes ~14% of the gap per frame at 60fps.
    const next = {
      rx: c.rx + (t.rx - c.rx) * 0.14,
      ry: c.ry + (t.ry - c.ry) * 0.14,
    };
    currentRef.current = next;
    paint(next.rx, next.ry);

    const settled =
      Math.abs(next.rx - t.rx) < 0.02 && Math.abs(next.ry - t.ry) < 0.02;
    if (settled) {
      currentRef.current = t;
      paint(t.rx, t.ry);
      rafRef.current = null; // fully at rest — stop the loop
    } else {
      rafRef.current = requestAnimationFrame(tick);
    }
  };

  const kick = () => {
    if (rafRef.current == null) rafRef.current = requestAnimationFrame(tick);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;  // 0..1 across the card
    const py = (e.clientY - rect.top) / rect.height;  // 0..1 down the card
    targetRef.current = {
      rx: (0.5 - py) * 2 * MAX_TILT_DEG, // inverted: top tilts away
      ry: (px - 0.5) * 2 * MAX_TILT_DEG,
    };
    kick();
  };

  const onMouseLeave = () => {
    targetRef.current = RESTING;
    kick(); // ~400ms ease back to flat via the same lerp
  };

  return (
    <div
      className="relative block select-none"
      style={{ width: "100%", maxWidth: width, perspective: "800px" }}
      onMouseMove={canTilt ? onMouseMove : undefined}
      onMouseLeave={canTilt ? onMouseLeave : undefined}
    >
      {/* Floor shadow beneath the card, shifts opposite the tilt */}
      <div className="stamp-shadow" />

      <div
        ref={cardRef}
        className="stamp-edge relative will-change-transform"
        style={{
          width: "100%",
          aspectRatio: "3 / 4",
          background: "#F3EAD3", // aged-paper cream
          transformStyle: "preserve-3d",
          containerType: "inline-size", // cqw units below size off the card
          transition: "none",
        }}
      >
        {/* Photo plate — upper ~65%, inset maroon margin + thin black frame */}
        <div
          className="absolute overflow-hidden"
          style={{
            top: "5.5%",
            left: "7%",
            right: "7%",
            height: "64%",
            border: "2px solid #0a0a0a",
            background: "#0a0a0a",
          }}
        >
          <img
            src={image}
            alt={imageAlt}
            loading="lazy"
            decoding="async"
            draggable={false}
            className="h-full w-full object-cover object-[50%_62%]"
          />
        </div>

        {/* Text block, left-aligned on the maroon ground */}
        <div
          className="absolute left-[7%] right-[7%]"
          style={{ top: "73%" }}
        >
          <div
            className="font-display text-[#241a12] leading-none"
            style={{ fontSize: "clamp(20px, 8.5cqw, 30px)" }}
          >
            {title}
          </div>
          <div className="mt-2.5 space-y-1 font-mono text-[11px] leading-snug text-[#5b4a3a]">
            {stats.map((line) => (
              <div key={line}>{line}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
