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
              <article className="card-tint flex h-full flex-col rounded-sm border border-shrine-stone bg-shrine-parchment p-6">
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

      <section className="relative overflow-hidden bg-shrine-maroon-950 py-20 sm:py-24">
        <div className="bg-gold-bloom pointer-events-none absolute inset-0" />
        <div className="bg-grain pointer-events-none absolute inset-0" />
        <Container className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-shrine-gold-300">
              The weekly word
            </p>
            <h2 className="mt-3 max-w-xl font-display text-3xl text-shrine-cream text-balance sm:text-4xl">
              The bulletin keeps the household in one conversation.
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-shrine-cream/75">
              {site.mass.secondCollection}.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href={site.bulletin} variant="outline-light">
              Read this week's bulletin
            </Button>
            <Button to="/worship#mass" variant="ghost" className="text-shrine-cream/90 hover:bg-shrine-cream/10">
              Mass times
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
