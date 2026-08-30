import {
  BookOpen,
  Building2,
  Church,
  Flame,
  Globe,
  Heart,
  HeartHandshake,
  Sprout,
  type LucideIcon,
} from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { givingOptions, images, type GivingOption } from "@/data/content";
import { site } from "@/data/site";

const icons: Record<GivingOption["icon"], LucideIcon> = {
  flame: Flame,
  church: Church,
  sprout: Sprout,
  heart: Heart,
  book: BookOpen,
  "hand-heart": HeartHandshake,
  landmark: Building2,
  globe: Globe,
};

export function Give() {
  return (
    <>
      <PageHero
        eyebrow="Love offering"
        title="Sharing what you have"
        description="Your giving enables St Mary's to be united as one body, and to make Jesus real in this community."
        image={images.glass}
        fallback={images.heroFallback}
      />
      <section className="bg-shrine-cream py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow={`UEN ${site.uen}`}
            title="How to give"
            description={`Cheque payable to ${site.chequePayee}. For the Poor & Needy Fund use UEN ${site.uenPoorNeedy}.`}
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {givingOptions.map((option, index) => {
              const Icon = icons[option.icon];
              return (
                <Reveal key={option.name} delay={index * 50}>
                  <article className="card-lift flex gap-4 rounded-sm border border-shrine-stone bg-shrine-parchment p-6">
                    <Icon className="mt-1 h-6 w-6 shrink-0 text-shrine-gold-600" aria-hidden="true" />
                    <div>
                      <h3 className="font-display text-xl">{option.name}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-shrine-charcoal/85">
                        {option.description}
                      </p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Round-5 closing band (docs/design-enhancement-round5-2026-08-30.md P-4):
          mirrors the Home CTA band so Give ends with closure, not a grid edge.
          Facts come from site.ts only. */}
      <section className="relative overflow-hidden bg-shrine-maroon-950 py-20 sm:py-28">
        <div className="bg-adobe-texture pointer-events-none absolute inset-0" />
        <div className="bg-gold-bloom pointer-events-none absolute inset-0" />
        <Container className="relative">
          <SectionHeading
            light
            eyebrow="In person"
            title="Every gift keeps the hill a house of prayer."
            description={`Prefer to give in person? Reception (${site.hours.reception}) receives cash and cheques, and the friars keep a seat for you at Mass. For questions about giving, write to the parish or call ${site.contact.officePhone}.`}
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={`mailto:${site.contact.connectEmail}`}>Write to the parish</Button>
            <Button to="/serve" variant="outline-light">
              Serve instead
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
