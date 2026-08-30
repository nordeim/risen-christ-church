import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { EventMeta } from "@/components/EventMeta";
import { images, upcomingEvents } from "@/data/content";

export function NewsEvents() {
  return (
    <>
      <PageHero
        compact
        eyebrow="News & events"
        title="What's on at St Mary's"
        description="Parish life, Franciscan devotion, formation, and the wider Archdiocese."
        image={images.feast}
        fallback={images.heroFallback}
      />
      <section className="bg-shrine-cream py-16 sm:py-24">
        <Container className="grid gap-5 md:grid-cols-2">
          {upcomingEvents.map((event, index) => (
            <Reveal key={event.title} delay={index * 50} className="h-full">
              <article className="card-lift h-full rounded-sm border border-shrine-stone bg-shrine-parchment p-7">
                <EventMeta category={event.category} date={event.date} />
                <h2 className="mt-3 font-display text-2xl">{event.title}</h2>
                <p className="mt-3 leading-relaxed text-shrine-charcoal/85">{event.summary}</p>
              </article>
            </Reveal>
          ))}
        </Container>
      </section>
    </>
  );
}
