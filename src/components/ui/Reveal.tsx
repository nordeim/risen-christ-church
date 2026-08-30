import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { cn } from "@/utils/cn";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  as?: ElementType;
  className?: string;
}

export function Reveal({ children, delay = 0, as: Tag = "div", className }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      el.classList.add("reveal-visible");
      return;
    }
    let io: IntersectionObserver | null = null;
    try {
      io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.add("reveal-visible");
            io?.disconnect();
          }
        },
        // Start revealing just before the entry crosses the bottom edge so
        // fast scrolls never glimpse an un-revealed card (round 7).
        { threshold: 0.15, rootMargin: "0px 0px 8% 0px" },
      );
      io.observe(el);
    } catch {
      // Environments without IntersectionObserver still get the content.
      el.classList.add("reveal-visible");
    }
    return () => io?.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={cn("reveal", className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
