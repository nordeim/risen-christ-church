import { Link, useLocation } from "react-router-dom";
import { PageHero } from "@/components/PageHero";
import { SafeImage } from "@/components/SafeImage";
import { Container } from "@/components/ui/Container";
import { images, ministries } from "@/data/content";
import { cn } from "@/utils/cn";

export function Ministries() {
  const { hash } = useLocation();

  return (
    <>
      <PageHero
        eyebrow="Ministries"
        title="From doing church to forming disciples"
        description="Christ at the centre of every ministry. Prayer is the foundation of all service."
        image={images.hall}
        fallback={images.heroFallback}
      >
        <nav aria-label="Jump to ministry" className="flex flex-wrap gap-2">
          {ministries.map((ministry) => {
            const active = hash === `#${ministry.id}`;
            return (
              <Link
                key={ministry.id}
                to={`/ministries#${ministry.id}`}
                aria-current={active ? "true" : undefined}
                className={cn(
                  "inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-semibold uppercase tracking-wide transition-colors",
                  active
                    ? "border-shrine-gold-400 bg-shrine-gold-500 text-shrine-maroon-900"
                    : "border-shrine-cream/40 text-shrine-cream hover:border-shrine-gold-300 hover:text-shrine-gold-300",
                )}
              >
                {ministry.title}
              </Link>
            );
          })}
        </nav>
      </PageHero>

      {ministries.map((ministry, index) => (
        <section
          key={ministry.id}
          id={ministry.id}
          className={cn(
            "scroll-mt-28 py-20 sm:py-28",
            index % 2 === 0 ? "bg-shrine-cream" : "bg-shrine-parchment",
          )}
        >
          <Container className="grid items-center gap-10 lg:grid-cols-2">
            <div className={index % 2 === 1 ? "lg:order-2" : undefined}>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-shrine-maroon-500">
                Ministry
              </p>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl">{ministry.title}</h2>
              <div className="gold-rule-left mt-5 w-32" />
              <p className="mt-5 leading-relaxed text-shrine-charcoal/85">{ministry.summary}</p>
              <ul className="mt-6 space-y-2 text-sm text-shrine-charcoal/85">
                {ministry.details.map((detail) => (
                  <li key={detail} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-shrine-gold-500" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
            <div className="group overflow-hidden rounded-sm shadow-shrine">
              <SafeImage
                src={ministry.image}
                fallback={ministry.imageFallback}
                alt={ministry.imageAlt}
                className="img-zoom aspect-[16/10] w-full object-cover"
              />
            </div>
          </Container>
        </section>
      ))}
    </>
  );
}
