import { PageHero } from "@/components/PageHero";
import { Accordion } from "@/components/ui/Accordion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqs, images } from "@/data/content";

export function FAQ() {
  return (
    <>
      <PageHero
        compact
        eyebrow="Questions"
        title="Before you come"
        description="Mass, confession, parking, sacraments, and the columbarium."
        image={images.garden}
        fallback={images.heroFallback}
      />
      <section className="bg-shrine-cream py-16 sm:py-24">
        <Container className="max-w-3xl">
          <SectionHeading
            eyebrow="FAQ"
            title="A few things people ask"
            description="If your question is not here, Reception will help during opening hours."
          />
          <div className="mt-10">
            <Accordion items={faqs} />
          </div>
        </Container>
      </section>
    </>
  );
}
