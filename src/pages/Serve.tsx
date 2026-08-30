import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { images, serveRoles } from "@/data/content";
import { site } from "@/data/site";

export function Serve() {
  return (
    <>
      <PageHero
        eyebrow="Serve"
        title="Take a place at the table"
        description="The Resurrection is not a spectator feast. There is a chair for you — at the altar, in formation, among the poor, at the doors."
        image={images.hall}
        fallback={images.heroFallback}
      />

      <section className="bg-shrine-cream py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Roles"
            title="Where the household needs hands"
            description={`Write to ${site.contact.connectEmail} or the Secretariat.`}
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {serveRoles.map((role, index) => (
              <Reveal key={role.title} delay={index * 70}>
                <article className="card-tint h-full rounded-sm border border-shrine-stone bg-shrine-parchment p-8">
                  <p className="font-display text-5xl text-shrine-maroon-700/15" aria-hidden="true">
                    0{index + 1}
                  </p>
                  <h3 className="mt-2 font-display text-2xl">{role.title}</h3>
                  <p className="mt-3 leading-relaxed text-shrine-charcoal/85">{role.summary}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap gap-3">
            <Button href={`mailto:${site.contact.connectEmail}`}>Write to pastoral care</Button>
            <Button href={`mailto:${site.contact.email}`} variant="secondary">
              Write to the Secretariat
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
