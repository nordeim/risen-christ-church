import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { EventMeta } from "@/components/EventMeta";
import { SafeImage } from "@/components/SafeImage";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { grounds, images, upcomingEvents } from "@/data/content";
import { site } from "@/data/site";

const featured = upcomingEvents.slice(0, 4);

export function Home() {
  return (
    <>
      <section className="relative isolate min-h-[92vh] overflow-hidden bg-shrine-maroon-950">
        <div className="absolute inset-0">
          <SafeImage
            src={images.hero}
            fallback={images.heroFallback}
            alt="Church of the Risen Christ at dusk in Toa Payoh"
            className="hero-ken-burns h-full w-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-shrine-maroon-950/40 via-shrine-maroon-950/55 to-shrine-maroon-950" />
          <div className="absolute inset-0 bg-gradient-to-r from-shrine-maroon-950/70 via-shrine-maroon-950/30 to-transparent" />
          <div className="bg-grain pointer-events-none absolute inset-0" />
        </div>

        <Container className="relative flex min-h-[92vh] flex-col justify-end pt-36 pb-16 sm:pb-24">
          <p className="rise-in text-xs font-semibold uppercase tracking-[0.35em] text-shrine-gold-300">
            A parish since 1971 · {site.chineseName}
          </p>
          <h1 className="rise-in rise-in-d1 mt-4 max-w-3xl font-display text-4xl text-shrine-cream text-balance sm:text-6xl lg:text-7xl">
            He is risen.
          </h1>
          <p className="rise-in rise-in-d2 mt-6 max-w-xl text-lg leading-relaxed text-shrine-cream/80">
            The first Catholic church in Toa Payoh still gathers a household at the heart of the
            new town — grateful, faithful, and sent from an empty tomb.
          </p>
          <div className="rise-in rise-in-d3 mt-8 flex flex-wrap gap-3">
            <Button to="/worship#mass">Mass times</Button>
            <Button to="/about" variant="outline-light">
              The parish
            </Button>
          </div>
          <dl className="rise-in rise-in-d4 mt-12 grid max-w-2xl grid-cols-2 gap-6 text-shrine-cream sm:grid-cols-4">
            <div>
              <dt className="text-[0.65rem] uppercase tracking-[0.2em] text-shrine-gold-300">
                Sunday
              </dt>
              <dd className="mt-1 font-display text-lg">7 a.m.–5.30 p.m.</dd>
            </div>
            <div>
              <dt className="text-[0.65rem] uppercase tracking-[0.2em] text-shrine-gold-300">MRT</dt>
              <dd className="mt-1 font-display text-lg">Toa Payoh</dd>
            </div>
            <div>
              <dt className="text-[0.65rem] uppercase tracking-[0.2em] text-shrine-gold-300">
                Feast
              </dt>
              <dd className="mt-1 font-display text-lg">Easter</dd>
            </div>
            <div>
              <dt className="text-[0.65rem] uppercase tracking-[0.2em] text-shrine-gold-300">
                Blessed
              </dt>
              <dd className="mt-1 font-display text-lg">1971</dd>
            </div>
          </dl>
        </Container>
      </section>

      <section className="bg-shrine-cream py-20 sm:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeading eyebrow="Welcome" title={site.tagline} description={site.vision} />
            <p className="mt-6 max-w-xl leading-relaxed text-shrine-charcoal/85">
              Every pilgrim who walks through these doors meets the same story: Masses in a
              function hall in 1969, a plot of land at Toa Payoh Central, and a church named for
              the Resurrection — blessed by Archbishop Olçomendy on 3 July 1971.
            </p>
            <p className="mt-4 max-w-xl leading-relaxed text-shrine-charcoal/85">
              The kampongs became a new town. The hall became a house of air and light. You are
              not a visitor here. You are expected.
            </p>
            <div className="mt-8">
              <Button to="/history" variant="secondary" icon={<ArrowRight className="h-4 w-4" />}>
                Walk the years
              </Button>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="relative">
              <SafeImage
                src={images.sanctuary}
                fallback={images.sanctuary}
                alt="Sanctuary of the Church of the Risen Christ"
                className="aspect-[4/5] w-full rounded-sm object-cover shadow-shrine-lg"
              />
              <div className="absolute -bottom-6 -left-6 hidden max-w-xs border border-shrine-gold-400/40 bg-shrine-parchment p-6 shadow-shrine sm:block">
                <p className="font-display text-xl text-shrine-maroon-700">
                  Grateful. Faithful. Sent.
                </p>
                <p className="mt-2 text-sm text-shrine-charcoal/80">
                  Three notes of a parish that lives from Easter, not merely remembers it.
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-shrine-parchment py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="The grounds"
            title="A house at the heart of Toa Payoh"
            description="From the nave to the Adoration Room and the 2003 wing of classrooms, the parish still gathers around an empty tomb."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {grounds.map((place, index) => (
              <Reveal key={place.id} delay={index * 80}>
                <Link
                  to="/worship#visit"
                  className="card-lift group block overflow-hidden rounded-sm border border-shrine-stone bg-shrine-cream"
                >
                  <SafeImage
                    src={place.image}
                    fallback={place.imageFallback}
                    alt={place.imageAlt}
                    className="img-zoom aspect-[16/10] w-full object-cover"
                  />
                  <div className="p-6">
                    <h3 className="font-display text-2xl text-shrine-maroon-700">{place.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-shrine-charcoal/80">
                      {place.summary}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-shrine-cream py-20 sm:py-28">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="What's on"
              title="The life of the parish"
              description="Feasts, formation, and the weekly bulletin."
            />
            <Button to="/news-events" variant="ghost" icon={<ArrowRight className="h-4 w-4" />}>
              All events
            </Button>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {featured.map((event, index) => (
              <Reveal key={event.title} delay={index * 70} className="h-full">
                <Link
                  to="/news-events"
                  className="card-lift block h-full rounded-sm border border-shrine-stone bg-shrine-parchment p-6"
                >
                  <article>
                    <EventMeta category={event.category} date={event.date} />
                    <h3 className="mt-4 font-display text-2xl text-shrine-maroon-700">{event.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-shrine-charcoal/80">
                      {event.summary}
                    </p>
                  </article>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-shrine-maroon-950 py-20 sm:py-24">
        <div className="bg-gold-bloom pointer-events-none absolute inset-0" />
        <div className="bg-grain pointer-events-none absolute inset-0" />
        <Container className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-shrine-gold-300">
              Come and see
            </p>
            <h2 className="mt-3 max-w-xl font-display text-3xl text-shrine-cream text-balance sm:text-4xl">
              Unite your struggles to Him — and you will be with Him in Paradise.
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button to="/worship#mass">Join us for Mass</Button>
            <Button to="/give" variant="outline-light">
              Support the parish
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
