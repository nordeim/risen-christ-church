import { useState } from "react";
import {
  BookOpen,
  Building2,
  Church,
  Flame,
  Globe,
  Heart,
  HeartHandshake,
  Landmark,
  Sprout,
  type LucideIcon,
} from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { givingOptions, images } from "@/data/content";
import { site } from "@/data/site";
import { cn } from "@/utils/cn";

const icons: Record<(typeof givingOptions)[number]["icon"], LucideIcon> = {
  flame: Flame,
  church: Church,
  sprout: Sprout,
  heart: Heart,
  book: BookOpen,
  "hand-heart": HeartHandshake,
  landmark: Landmark,
  globe: Globe,
};

/**
 * Round-12 (audit F-4): the UEN is a compliance string that used to perform as
 * the section's display heading. It lives here — inside the PayNow card, where
 * it is functionally needed — as a copyable detail row. Clipboard-first with a
 * legacy fallback; an honest no-op on failure (the label stays "Copy").
 */
function CopyUenButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        return;
      }
      const area = document.createElement("textarea");
      area.value = value;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      setCopied(document.execCommand("copy"));
      document.body.removeChild(area);
    } catch {
      // Leave the label as "Copy" so the failure is visible, not faked.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Copied" : `Copy UEN ${value}`}
      className="shrink-0 rounded-sm border border-shrine-gold-500/60 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-shrine-maroon-700 transition-colors hover:bg-shrine-maroon-50/60 focus-visible:bg-shrine-maroon-50/60"
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

export function Give() {
  return (
    <>
      <PageHero
        eyebrow="Give"
        title="An offering for the house of prayer"
        description="PayNow, the offertory, Mass intentions, and care for the poor of Toa Payoh."
        image={images.glass}
        fallback={images.heroFallback}
      />

      <section className="bg-shrine-cream py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="How to give"
            title="Ways to give"
            description={`Cheque payable to ${site.chequePayee}. The parish office receives offerings during reception hours.`}
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {givingOptions.map((option, index) => {
              const Icon = icons[option.icon];
              const featured = index === 0;
              return (
                <Reveal key={option.name} delay={index * 50} className="h-full">
                  <article
                    data-featured={featured ? "true" : undefined}
                    className={cn(
                      "card-tint h-full rounded-sm border border-shrine-stone bg-shrine-parchment p-6",
                      featured &&
                        "border-t-2 border-t-shrine-gold-500 bg-shrine-gold-100/40",
                    )}
                  >
                    <Icon className="h-5 w-5 text-shrine-gold-600" aria-hidden="true" />
                    <h3 className="mt-4 font-display text-xl">{option.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-shrine-charcoal/80">
                      {option.description}
                    </p>
                    {featured ? (
                      <div className="mt-4 flex items-center justify-between gap-3 rounded-sm border border-shrine-stone bg-shrine-cream px-3 py-2">
                        <span className="font-display text-sm text-shrine-maroon-700">
                          {site.uen}
                        </span>
                        <CopyUenButton value={site.uen} />
                      </div>
                    ) : null}
                  </article>
                </Reveal>
              );
            })}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href={site.ssvp}>Give via SSVP</Button>
            <Button href={`mailto:${site.contact.email}`} variant="secondary">
              Ask the office
            </Button>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-shrine-maroon-950 py-20 sm:py-24">
        <div className="bg-gold-bloom pointer-events-none absolute inset-0" />
        <div className="bg-grain pointer-events-none absolute inset-0" />
        <Container className="relative">
          <div className="flex items-start gap-3">
            <Building2 className="mt-1 h-5 w-5 shrink-0 text-shrine-gold-300" aria-hidden="true" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-shrine-gold-300">
                A house of prayer
              </p>
              <h2 className="mt-3 max-w-2xl font-display text-3xl text-shrine-cream">
                The 1971 church still needs its people.
              </h2>
              <p className="mt-4 max-w-xl leading-relaxed text-shrine-cream/75">
                {site.hours.reception} Phone {site.contact.officePhone}.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
