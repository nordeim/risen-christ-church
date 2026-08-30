import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { cn } from "@/utils/cn";

const SCROLL_THRESHOLD = 480;
const RING_RADIUS = 20;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

/**
 * Floating back-to-top affordance for long pages. Appears after the reader
 * has scrolled past the hero region; never touches the URL hash (HashRouter
 * contract) — it only calls window.scrollTo. A gold SVG ring fills with
 * reading depth (shared useScrollProgress source).
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const progress = useScrollProgress();
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > SCROLL_THRESHOLD;
      setVisible(next);
      // A focused element must never sit inside an aria-hidden subtree: when
      // the button hides while focused (e.g. right after its own click-scroll
      // lands at the top), release focus first. Round-3 audit L-4.
      const el = buttonRef.current;
      if (!next && el && document.activeElement === el) {
        el.blur();
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  const offset = RING_CIRCUMFERENCE * (1 - progress);

  return (
    <button
      ref={buttonRef}
      type="button"
      data-testid="back-to-top"
      aria-label="Back to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-shrine-maroon-900 text-shrine-gold-300 shadow-shrine transition-opacity duration-300",
        visible ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <span data-testid="back-to-top-progress" aria-hidden="true" className="absolute inset-0">
        <svg className="absolute inset-0 h-12 w-12" viewBox="0 0 48 48" aria-hidden="true">
          <circle
            cx="24"
            cy="24"
            r={RING_RADIUS}
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.2"
            strokeWidth="2"
          />
          <circle
            cx="24"
            cy="24"
            r={RING_RADIUS}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray={RING_CIRCUMFERENCE}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform="rotate(-90 24 24)"
            data-progress=""
          />
        </svg>
      </span>
      <ArrowUp className="relative h-5 w-5" />
    </button>
  );
}
