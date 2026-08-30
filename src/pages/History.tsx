import { PageHero } from "@/components/PageHero";
import { Timeline } from "@/components/Timeline";
import { Container } from "@/components/ui/Container";
import { images } from "@/data/content";

export function History() {
  return (
    <>
      <PageHero
        eyebrow="Our history"
        title="From a function hall to an empty tomb"
        description="Toa Payoh's first Catholic church — raised by a people who prayed in borrowed rooms, then built a house named for the Resurrection."
        image={images.hero}
        fallback={images.heroFallback}
      />

      <section className="bg-shrine-cream py-20 sm:py-28">
        <Container className="grid items-start gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div data-testid="history-story" className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-shrine-maroon-500">
              1969–2026
            </p>
            <h2 className="mt-3 font-display text-3xl text-balance sm:text-4xl">
              A church for a new town
            </h2>
            <div className="gold-rule-left mt-5 max-w-xs" />
            <p className="mt-6 leading-relaxed text-shrine-charcoal/85">
              In the late 1960s, Catholics of Toa Payoh held Mass at Ho Ping Centre and an HDB
              hall. Under Fr Pierre Abrial they raised some $450,000. On 3 July 1971 Archbishop
              Michel Olçomendy blessed Singapore's first fully air-conditioned church — and the
              first Catholic church in this satellite town.
            </p>
            <p className="mt-4 leading-relaxed text-shrine-charcoal/85">
              English, Mandarin, and Tamil have been prayed here since the 1970s. Filipino,
              Indonesian, and Myanmar Catholics found a home in later decades. The 2003 wing
              added classrooms and a youth room. The Golden Jubilee of 2021 looked back — and
              the call of 2026 still looks out: grateful, faithful, and sent.
            </p>
          </div>
          <Timeline />
        </Container>
      </section>
    </>
  );
}
