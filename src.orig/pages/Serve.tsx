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
        title="Take a place in the household"
        description="No visitor should leave unnoticed. Hospitality itself is evangelisation."
        image={images.feast}
        fallback={images.heroFallback}
      />
      <section className="bg-shrine-cream py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Four doors"
            title="Where you might belong"
            description={`Write to ${site.contact.connectEmail}, or speak to a friar after Mass.`}
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {serveRoles.map((role, index) => (
              <Reveal key={role.title} delay={index * 70}>
                <article className="card-lift rounded-sm border border-shrine-stone bg-shrine-parchment p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-shrine-gold-600">
                    0{index + 1}
                  </p>
                  <h3 className="mt-3 font-display text-2xl">{role.title}</h3>
                  <p className="mt-3 leading-relaxed text-shrine-charcoal/85">{role.summary}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap gap-3">
            <Button href={`mailto:${site.contact.connectEmail}`}>Write to the parish</Button>
            <Button to="/worship#mass" variant="secondary">
              Come to Mass first
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
