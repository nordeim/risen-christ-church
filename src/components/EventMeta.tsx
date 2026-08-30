import type { EventItem } from "@/data/content";
import { cn } from "@/utils/cn";

const categoryTone: Record<EventItem["category"], string> = {
  Parish: "border-shrine-gold-500/60 text-shrine-maroon-700",
  Devotion: "border-shrine-terracotta-500/70 text-shrine-terracotta-500",
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
