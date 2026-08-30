import { cn } from "@/utils/cn";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
}: SectionHeadingProps) {
  return (
    <div className={cn(align === "center" && "text-center")}>
      {eyebrow ? (
        <p
          className={cn(
            "text-xs font-semibold uppercase tracking-[0.3em]",
            light ? "text-shrine-gold-300" : "text-shrine-maroon-500",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "mt-3 font-display text-3xl leading-tight text-balance sm:text-4xl",
          light ? "text-shrine-cream" : "text-shrine-maroon-700",
        )}
      >
        {title}
      </h2>
      <div className={cn("gold-rule mt-5", align === "center" ? "mx-auto w-40" : "w-40")} />
      {description ? (
        <p
          className={cn(
            "mt-5 max-w-2xl text-base leading-relaxed sm:text-lg",
            light ? "text-shrine-cream/80" : "text-shrine-charcoal/80",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
