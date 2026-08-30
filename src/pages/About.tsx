import { PageHero } from "@/components/PageHero";
import { SafeImage } from "@/components/SafeImage";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { images, ppcMembers, priests } from "@/data/content";
import { site } from "@/data/site";
import { monogram } from "@/utils/monogram";

const pillars = [
  {
    title: "Grateful",
    body: "We receive the Resurrection as gift — Mass at dawn and dusk, the Adoration Room through the week, a bulletin that keeps the household in one conversation.",
  },
  {
    title: "Faithful",
    body: "We keep the altar in many tongues: English through the day, Mandarin at 8.15, Tamil, Tagalog, and Bahasa Indonesia by the month. Fidelity is a practice, not a mood.",
  },
  {
    title: "Sent",
    body: "SSVP, F.R.E.E., the Couple Empowerment Programme, and a youth room in the 2003 wing — the empty tomb is not a destination. It is a sending.",
  },
];

export function About() {
  return (
    <>
      <PageHero
        eyebrow="The parish"
        title="A people of the Resurrection"
        description="Church of the Risen Christ gathers some eight thousand faithful at 91 Toa Payoh Central — the first Catholic church in this new town, still named for an empty tomb."
        image={images.hero}
        fallback={images.heroFallback}
      />

      <section className="bg-shrine-cream py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Vision"
            title={site.tagline}
            description="Three notes of a household that lives from Easter."
          />
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {pillars.map((pillar, index) => (
              <Reveal key={pillar.title} delay={index * 80}>
                <article className="card-tint relative overflow-hidden rounded-sm border border-shrine-stone bg-shrine-parchment p-8">
                  <span
                    className="font-display text-5xl text-shrine-maroon-700/15"
                    aria-hidden="true"
                  >
                    0{index + 1}
                  </span>
                  <h3 className="mt-4 font-display text-2xl">{pillar.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-shrine-charcoal/85">
                    {pillar.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
          <p className="mt-12 max-w-3xl leading-relaxed text-shrine-charcoal/80">
            Inspired by the first witnesses of Easter and the Archdiocesan Pastoral Plan, the
            parish aligns around lifelong formation, communities of care, and co-responsibility.
            Christ remains at the centre of every ministry.
          </p>
        </Container>
      </section>

      <section className="bg-shrine-parchment py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Priests"
            title="Shepherds of the household"
            description="Three priests serve the altar at Toa Payoh Central."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {priests.map((priest, index) => (
              <Reveal key={priest.name} delay={index * 70}>
                <article className="card-tint rounded-sm border border-shrine-stone bg-shrine-cream p-6">
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-full border border-shrine-gold-400/50 bg-shrine-parchment font-display text-lg text-shrine-maroon-700"
                    aria-hidden="true"
                  >
                    {monogram(priest.name)}
                  </div>
                  <h3 className="mt-5 font-display text-2xl">{priest.name}</h3>
                  <p className="mt-1 text-sm text-shrine-maroon-600">{priest.role}</p>
                  {priest.email ? (
                    <a
                      href={`mailto:${priest.email}`}
                      className="link-underline mt-3 block w-fit text-sm text-shrine-charcoal/80 hover:text-shrine-maroon-600"
                    >
                      {priest.email}
                    </a>
                  ) : null}
                  {priest.phone ? (
                    <a
                      href={`tel:+${priest.phone.replace(/\D/g, "")}`}
                      className="link-underline mt-1 block w-fit text-sm text-shrine-charcoal/80 hover:text-shrine-maroon-600"
                    >
                      {priest.phone}
                    </a>
                  ) : null}
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-shrine-cream py-20 sm:py-28">
        <Container className="grid items-start gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              eyebrow="The household"
              title="Office, pastoral care, and youth"
              description="The parish office holds the ordinary work of a living church."
            />
            <ul className="mt-8 divide-y divide-shrine-stone border-y border-shrine-stone">
              {ppcMembers.map((member) => (
                <li
                  key={`${member.role}-${member.name}`}
                  className="-mx-2 flex justify-between gap-4 rounded-sm px-2 py-3 transition-colors hover:bg-shrine-maroon-50/60"
                >
                  <span className="text-sm text-shrine-charcoal/75">{member.role}</span>
                  <span className="text-right font-display text-shrine-maroon-700">
                    {member.name}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-shrine-charcoal/75">
              Secretariat {site.contact.email} · Administrator {site.contact.adminEmail} · Office{" "}
              {site.contact.officePhone}
            </p>
          </Reveal>
          <Reveal delay={120}>
            <SafeImage
              src={images.garden}
              fallback={images.garden}
              alt="Courtyard garden of the Church of the Risen Christ"
              className="aspect-[4/5] w-full rounded-sm object-cover shadow-shrine"
            />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
