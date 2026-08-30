import { Mail } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { images, ppcMembers, priests } from "@/data/content";
import { site } from "@/data/site";
import { monogram } from "@/utils/monogram";

const pillars = [
  {
    title: "Prayer",
    body: "A living relationship of the children of God with the Father. Humility is the foundation — so that we listen first to God, and not anyone else.",
  },
  {
    title: "Formation",
    body: "Not merely information but transformation. True formation changes mind, heart, and behaviour to be more like Christ.",
  },
  {
    title: "Mission",
    body: "The Church exists to evangelise. Mission includes charity, hospitality, mentoring future leaders, and reaching those outside our parish or faith.",
  },
];

export function About() {
  return (
    <>
      <PageHero
        eyebrow="The household"
        title="A Franciscan parish in Bukit Batok"
        description={`${site.tagline} ${site.vision}`}
        image={images.feast}
        fallback={images.heroFallback}
      />

      <section className="bg-shrine-cream py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Parish vision"
            title="Pray. Form. Go."
            description="Not a new programme, but a change of heart — returning to the essentials of Christian discipleship, in the school of Mary and of St Francis."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {pillars.map((pillar, index) => (
              <Reveal key={pillar.title} delay={index * 80}>
                <article className="card-lift h-full rounded-sm border border-shrine-stone bg-shrine-parchment p-8">
                  <p className="font-display text-5xl leading-none text-shrine-gold-300">
                    0{index + 1}
                  </p>
                  <h3 className="mt-4 font-display text-2xl">{pillar.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-shrine-charcoal/85">{pillar.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <p className="mt-10 max-w-3xl leading-relaxed text-shrine-charcoal/85">
            Inspired by the humility of Our Lady of the Angels and the fraternity of St Francis,
            the parish aligns with the Archdiocesan Pastoral Plan: lifelong formation, building
            communities, co-responsibility, unity in diversity, and synodality. Christ remains at
            the centre of every ministry.
          </p>
        </Container>
      </section>

      <section className="bg-shrine-parchment py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="From 1 January 2026"
            title="The friars"
            description="St Mary of the Angels is ministered by the Order of Friars Minor, Custody of St Anthony."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {priests.map((priest, index) => (
              <Reveal key={priest.name} delay={index * 70} className="h-full">
                <article className="card-lift h-full rounded-sm border border-shrine-stone bg-shrine-cream p-6">
                  <span
                    aria-hidden="true"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-shrine-gold-400/50 bg-shrine-maroon-50 font-display text-sm font-semibold text-shrine-maroon-700"
                  >
                    {monogram(priest.name)}
                  </span>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-shrine-maroon-500">
                    {priest.role}
                  </p>
                  <h3 className="mt-2 font-display text-xl leading-snug">{priest.name}</h3>
                  {priest.email ? (
                    <a
                      href={`mailto:${priest.email}`}
                      className="mt-3 inline-flex items-center gap-2 text-sm text-shrine-maroon-600 hover:text-shrine-maroon-500"
                    >
                      <Mail className="h-4 w-4" aria-hidden="true" />
                      Write
                    </a>
                  ) : null}
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-shrine-cream py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Parish team"
            title="A household of some 10,000"
            description="The Parish Office, guided by the friars, supports the day-to-day running of the parish and the pastoral needs of the west of Singapore."
          />
          <ul className="mt-10 divide-y divide-shrine-stone/70 border-y border-shrine-stone/70">
            {ppcMembers.map((member) => (
              <li
                key={`${member.role}-${member.name}`}
                className="flex flex-col gap-1 rounded-sm px-3 py-4 transition-colors hover:bg-shrine-maroon-50/60 sm:flex-row sm:justify-between"
              >
                <span className="text-sm uppercase tracking-[0.15em] text-shrine-maroon-500">
                  {member.role}
                </span>
                <span className="font-display text-lg text-shrine-maroon-700">{member.name}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-shrine-charcoal/75">
            For the Parish Office, write to{" "}
            <a className="link-underline text-shrine-maroon-600" href={`mailto:${site.contact.connectEmail}`}>
              {site.contact.connectEmail}
            </a>
            .
          </p>
        </Container>
      </section>
    </>
  );
}
