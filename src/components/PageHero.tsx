import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { SafeImage } from "@/components/SafeImage";
import { cn } from "@/utils/cn";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
  image: string;
  fallback?: string;
  children?: ReactNode;
  compact?: boolean;
}

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  fallback,
  children,
  compact = false,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-shrine-maroon-950",
        compact ? "pb-16 pt-28 sm:pb-20 sm:pt-32" : "pb-24 pt-32 sm:pb-32 sm:pt-40",
      )}
    >
      <div className="absolute inset-0">
        <SafeImage
          src={image}
          fallback={fallback}
          alt=""
          className="h-full w-full object-cover opacity-35"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-shrine-maroon-950/50 via-shrine-maroon-950/75 to-shrine-maroon-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-shrine-maroon-950/55 to-transparent" />
        <div className="bg-grain pointer-events-none absolute inset-0" />
      </div>
      <Container className="relative">
        <p className="rise-in text-xs font-semibold uppercase tracking-[0.3em] text-shrine-gold-300">
          {eyebrow}
        </p>
        <h1 className="rise-in rise-in-d1 mt-4 max-w-3xl font-display text-4xl text-shrine-cream text-balance sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description ? (
          <p className="rise-in rise-in-d2 mt-5 max-w-2xl text-lg leading-relaxed text-shrine-cream/80">
            {description}
          </p>
        ) : null}
        {children ? <div className="rise-in rise-in-d3 mt-8">{children}</div> : null}
      </Container>
    </section>
  );
}
