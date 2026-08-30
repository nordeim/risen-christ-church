import { PageHero } from "@/components/PageHero";
import { Accordion } from "@/components/ui/Accordion";
import { Container } from "@/components/ui/Container";
import { faqs, images } from "@/data/content";

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
    </>
  );
}
