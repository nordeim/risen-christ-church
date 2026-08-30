import { Phone } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Accordion } from "@/components/ui/Accordion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqs, images } from "@/data/content";
import { site } from "@/data/site";

export function FAQ() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Questions we are often asked"
        description="Mass times, confession, parking, baptism, and the Adoration Room."
        image={images.chapel}
        fallback={images.heroFallback}
        compact
      />
      <section className="bg-shrine-cream py-20 sm:py-28">
        <Container className="max-w-3xl">
          <Accordion items={faqs} />
        </Container>
      </section>
      <section className="border-t border-shrine-stone bg-shrine-parchment py-16 sm:py-20">
        <Container className="max-w-3xl">
          <SectionHeading
            eyebrow="The office"
            title="Still have questions?"
            description="The parish office is glad to help — by phone or by email."
          />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-8">
            <a
              href={`tel:+${site.contact.officePhone.replace(/\D/g, "")}`}
              className="link-underline inline-flex items-center gap-2.5 text-shrine-maroon-700"
            >
              <Phone className="h-4 w-4 text-shrine-gold-600" aria-hidden="true" />
              {site.contact.officePhone}
            </a>
            <a
              href={`mailto:${site.contact.email}`}
              className="link-underline inline-flex items-center gap-2.5 text-shrine-maroon-700"
            >
              {site.contact.email}
            </a>
          </div>
          <p className="mt-4 text-sm text-shrine-charcoal/75">{site.hours.reception}</p>
        </Container>
      </section>
    </>
  );
}
