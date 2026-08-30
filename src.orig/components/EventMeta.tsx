/* eslint-disable react-refresh/only-export-components */
import type { EventItem } from "@/data/content";

export type EventCategory = EventItem["category"];

export const categoryTone: Record<EventCategory, string> = {
  Archdiocese: "text-shrine-terracotta-500",
  Devotion: "text-shrine-gold-600",
  Formation: "text-shrine-pine-600",
  Parish: "text-shrine-maroon-500",
};

interface EventMetaProps {
  category: EventCategory;
  date: string;
}

/** Round-5 chip system (docs/design-enhancement-round5-2026-08-30.md P-6):
 * bordered gold chip for the category + display-serif date beside it.
 * Single source for Home + NewsEvents — see audit R5-M1. */
export function EventMeta({ category, date }: EventMetaProps) {
  return (
    <p className="flex flex-wrap items-center gap-3">
      <span
        className={`inline-flex items-center rounded-full border border-shrine-gold-400/40 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] ${categoryTone[category]}`}
      >
        {category}
      </span>
      <span className="font-display text-sm text-shrine-charcoal/70">{date}</span>
    </p>
  );
}
