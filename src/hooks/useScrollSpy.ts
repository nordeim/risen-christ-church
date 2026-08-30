import { useEffect, useState } from "react";

/**
 * Track which of the given section ids is currently crossing the viewport's
 * middle band (round 7 — Ministries scrollspy). A single IntersectionObserver
 * with symmetric top/bottom insets isolates the horizontal band at the
 * viewport's center; the last section reported intersecting that band wins.
 * Falls back to the first id, tolerates ids with no matching element, and
 * disconnects on unmount.
 */
export function useScrollSpy(ids: string[]): string {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    setActive(ids[0] ?? "");
    const targets = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;

    let observer: IntersectionObserver | null = null;
    try {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              setActive((entry.target as HTMLElement).id);
            }
          }
        },
        { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
      );
      targets.forEach((target) => observer?.observe(target));
    } catch {
      return;
    }
    return () => observer?.disconnect();
    // ids identity changes are owned by the caller (module-constant arrays).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join("|")]);

  return active;
}
