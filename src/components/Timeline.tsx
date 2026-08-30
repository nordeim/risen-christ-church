import { Reveal } from "@/components/ui/Reveal";
import { lifeTimeline } from "@/data/content";

export function Timeline() {
  return (
    <ol className="relative space-y-10 pl-8 sm:pl-10">
      <div
        data-testid="timeline-rail"
        aria-hidden="true"
        className="absolute top-2 bottom-2 left-[11px] w-px bg-gradient-to-b from-transparent via-shrine-gold-400/70 to-transparent sm:left-[15px]"
      />
      {lifeTimeline.map((entry, index) => (
        <Reveal key={entry.year} delay={index * 60} as="li" className="relative">
          <span
            className="dot-pulse absolute top-1.5 -left-8 h-3 w-3 rounded-full bg-shrine-gold-500 sm:-left-10"
            aria-hidden="true"
          />
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-shrine-maroon-500">
            {entry.year}
          </p>
          <h3 className="mt-1 font-display text-2xl text-shrine-maroon-700">{entry.title}</h3>
          <p className="mt-2 max-w-xl leading-relaxed text-shrine-charcoal/85">{entry.description}</p>
        </Reveal>
      ))}
    </ol>
  );
}
