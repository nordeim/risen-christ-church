/* eslint-disable react-refresh/only-export-components */
import type { EventItem } from "@/data/content";
import { cn } from "@/utils/cn";

export const categoryTone: Record<EventItem["category"], string> = {
  Parish: "border-shrine-gold-500/60 text-shrine-maroon-700",
  // Round-12 (audit F-1): terracotta-500 computes 3.92:1 on parchment
  // #f2e9d6 — below WCAG 2.2 AA 1.4.3 at this 0.65rem label size;
  // terracotta-600 (new step) computes 5.36:1. Border tint stays decorative.
  // Contract: src/components/wcag-contrast.test.tsx.
  Devotion: "border-shrine-terracotta-500/70 text-shrine-terracotta-600",
  Formation: "border-shrine-pine-500/70 text-shrine-pine-600",
  Archdiocese: "border-shrine-maroon-500/50 text-shrine-maroon-600",
};

export function EventMeta({
  category,
  date,
}: {
  category: EventItem["category"];
  date: string;
}) {
  return (
    <div className="flex flex-wrap items-baseline gap-3">
      <span
        className={cn(
          "inline-flex rounded-full border px-3 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em]",
          categoryTone[category],
        )}
      >
        {category}
      </span>
      <time className="font-display text-sm text-shrine-maroon-700">{date}</time>
    </div>
  );
}
