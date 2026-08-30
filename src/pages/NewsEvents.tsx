import { EventMeta } from "@/components/EventMeta";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { images, upcomingEvents } from "@/data/content";
import { site } from "@/data/site";

export function NewsEvents() {
  return (
    <>
      <PageHero
        eyebrow="News & events"
        title="The life of the parish"
        description="Feasts, formation, Sunday reflections, and the weekly bulletin."
        image={images.feast}
        fallback={images.heroFallback}
        compact
      >
        <Button href={site.bulletin} variant="outline-light">
          Open the bulletin
        </Button>
      </PageHero>

      <section className="bg-shrine-cream py-20 sm:py-28">
        <Container className="grid gap-5 sm:grid-cols-2">
          {upcomingEvents.map((event, index) => (
            <Reveal key={event.title} delay={index * 60} className="h-full">
              <article className="card-lift flex h-full flex-col rounded-sm border border-shrine-stone bg-shrine-parchment p-6">
                <EventMeta category={event.category} date={event.date} />
                <h2 className="mt-4 font-display text-2xl">{event.title}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-shrine-charcoal/80">
                  {event.summary}
                </p>
                {event.href ? (
                  <a
                    href={event.href}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="link-underline mt-4 w-fit text-sm text-shrine-maroon-600"
                  >
                    Learn more
                  </a>
                ) : null}
              </article>
            </Reveal>
          ))}
        </Container>
      </section>
    </>
  );
}
