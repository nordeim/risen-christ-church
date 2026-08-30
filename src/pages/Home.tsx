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
            alt="Church of St Mary of the Angels at dusk"
            className="hero-ken-burns h-full w-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-shrine-maroon-950/40 via-shrine-maroon-950/55 to-shrine-maroon-950" />
          <div className="absolute inset-0 bg-gradient-to-r from-shrine-maroon-950/70 via-shrine-maroon-950/30 to-transparent" />
          <div className="bg-grain pointer-events-none absolute inset-0" />
        </div>

        <Container className="relative flex min-h-[92vh] flex-col justify-end pb-16 pt-36 sm:pb-24">
          <p className="rise-in text-xs font-semibold uppercase tracking-[0.35em] text-shrine-gold-300">
            A Franciscan parish since 1970
          </p>
          <h1 className="rise-in rise-in-d1 mt-4 max-w-3xl font-display text-4xl text-shrine-cream text-balance sm:text-6xl lg:text-7xl">
            According to Thy Word.
          </h1>
          <p className="rise-in rise-in-d2 mt-6 max-w-xl text-lg leading-relaxed text-shrine-cream/80">
            Named for the Portiuncula in Assisi — the little portion of land St Francis loved —
            this hill in Bukit Batok still gathers a household of prayer, formation, and mission.
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
              <dd className="mt-1 font-display text-lg">7.15 a.m.–7 p.m.</dd>
            </div>
            <div>
              <dt className="text-[0.65rem] uppercase tracking-[0.2em] text-shrine-gold-300">
                MRT
              </dt>
              <dd className="mt-1 font-display text-lg">Bukit Batok</dd>
            </div>
            <div>
              <dt className="text-[0.65rem] uppercase tracking-[0.2em] text-shrine-gold-300">
                Feast
              </dt>
              <dd className="mt-1 font-display text-lg">{site.feast.date}</dd>
            </div>
            <div>
              <dt className="text-[0.65rem] uppercase tracking-[0.2em] text-shrine-gold-300">
                Friars
              </dt>
              <dd className="mt-1 font-display text-lg">OFM</dd>
            </div>
          </dl>
        </Container>
      </section>

      <section className="bg-shrine-cream py-20 sm:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              eyebrow="Welcome"
              title={site.tagline}
              description={site.vision}
            />
            <p className="mt-6 max-w-xl leading-relaxed text-shrine-charcoal/85">
              Every pilgrim who walks through these doors meets the same story: friars sent to a
              sociological institute in 1957, a hilltop chapel blessed by Archbishop Olçomendy,
              and a parish named for Our Lady of the Angels — the Portiuncula where the
              Franciscan movement began.
            </p>
            <p className="mt-4 max-w-xl leading-relaxed text-shrine-charcoal/85">
              The orchards became Bukit Batok. The chapel became a WOHA church of folded light.
              You are not a visitor here. You are expected.
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
                alt="Sanctuary of St Mary of the Angels"
                className="aspect-[4/5] w-full rounded-sm object-cover shadow-shrine-lg"
              />
              <div className="absolute -bottom-6 -left-6 hidden max-w-xs border border-shrine-gold-400/40 bg-shrine-parchment p-6 shadow-shrine sm:block">
                <p className="font-display text-xl text-shrine-maroon-700">
                  Pray. Form. Go.
                </p>
                <p className="mt-2 text-sm text-shrine-charcoal/80">
                  Three pillars of a parish returning to the essentials of discipleship.
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
            title="A little portion of land"
            description="From the Corpus of Christ to Mary in the Garden of Peace, the east–west axis still brings people to her Son."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {grounds.map((place, index) => (
              <Reveal key={place.id} delay={index * 80}>
                <Link
                  to={`/worship#visit`}
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
              description="Feasts, formation, and the Franciscan Jubilee Year."
            />
            <Button to="/news-events" variant="ghost" icon={<ArrowRight className="h-4 w-4" />}>
              All events
            </Button>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {featured.map((event, index) => (
              <Reveal key={event.title} delay={index * 70} className="h-full">
                <article className="card-lift h-full rounded-sm border border-shrine-stone bg-shrine-parchment p-6">
                  <EventMeta category={event.category} date={event.date} />
                  <h3 className="mt-2 font-display text-2xl text-shrine-maroon-700">{event.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-shrine-charcoal/80">
                    {event.summary}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-shrine-maroon-950 py-20 sm:py-28">
        <div className="bg-adobe-texture pointer-events-none absolute inset-0" />
        <div className="bg-gold-bloom pointer-events-none absolute inset-0" />
        <Container className="relative grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              light
              eyebrow="Take a place"
              title="The church exists to evangelise."
              description="Mission flows from prayer and formation. Serve at the altar, in the classroom, among the poor — or simply keep a seat for the stranger."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/serve">Serve</Button>
              <Button to="/give" variant="outline-light">
                Give
              </Button>
            </div>
          </div>
          <SafeImage
            src={images.feast}
            fallback={images.feast}
            alt="Parish feast gathering on the piazza"
            className="aspect-[16/10] w-full rounded-sm object-cover shadow-shrine-lg"
          />
        </Container>
      </section>
    </>
  );
}
