import { lifeTimeline } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";

export function Timeline() {
  return (
    <ol className="relative pl-8">
      {/* Round-5 (docs/design-enhancement-round5-2026-08-30.md P-7): the rail
          is drawn — a gradient that fades at both extremes — instead of a
          hard border that reads as cropped. */}
      <div
        data-testid="timeline-rail"
        aria-hidden="true"
        className="absolute bottom-0 left-0 top-0 w-px bg-gradient-to-b from-transparent via-shrine-gold-400/70 to-transparent"
      />
      {lifeTimeline.map((entry, index) => (
        <li key={entry.year} className="relative pb-12 last:pb-0">
          <span className="dot-pulse absolute -left-[41px] top-1.5 h-3.5 w-3.5 rounded-full bg-shrine-gold-400 ring-4 ring-shrine-cream" />
          <Reveal delay={index * 60}>
            <p className="font-display text-lg text-shrine-gold-600">{entry.year}</p>
            <h3 className="mt-1 font-display text-2xl text-shrine-maroon-700">{entry.title}</h3>
            <p className="mt-2 max-w-2xl leading-relaxed text-shrine-charcoal/85">{entry.description}</p>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
