import { Link, useLocation } from "react-router-dom";
import { PageHero } from "@/components/PageHero";
import { SafeImage } from "@/components/SafeImage";
import { Container } from "@/components/ui/Container";
import { images, ministries } from "@/data/content";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { cn } from "@/utils/cn";

export function Ministries() {
  const { hash } = useLocation();
  const current = hash.replace(/^#/, "");
  // Scrollspy tracks reading position; the clicked hash wins until the
  // sections cross the viewport's middle band again (round 7).
  const spyId = useScrollSpy(ministries.map((ministry) => ministry.id));
  const activeId = current || spyId;

  return (
    <>
      <PageHero
        eyebrow="Ministries"
        title="Take a place in the household"
        description="Liturgy, formation, care for the poor, family life, youth, and the language communities of Toa Payoh Central."
        image={images.glass}
        fallback={images.heroFallback}
      />

      <nav
        aria-label="Jump to ministry"
        className="sticky top-[3.5rem] z-40 border-b border-shrine-stone bg-shrine-cream/95 backdrop-blur-md lg:top-[5.5rem]"
      >
        <Container className="flex gap-2 overflow-x-auto py-3">
          {ministries.map((ministry) => (
            <Link
              key={ministry.id}
              to={`/ministries#${ministry.id}`}
              aria-current={activeId === ministry.id ? "true" : undefined}
              className={cn(
                "shrink-0 rounded-full border px-4 py-1.5 text-sm transition-colors",
                activeId === ministry.id
                  ? "border-shrine-gold-500 bg-shrine-gold-100 text-shrine-maroon-800"
                  : "border-shrine-stone text-shrine-charcoal/80 hover:border-shrine-gold-400",
              )}
            >
              {ministry.title}
            </Link>
          ))}
        </Container>
      </nav>

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
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-shrine-maroon-500">
                0{index + 1}
              </p>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl">{ministry.title}</h2>
              <div className="gold-rule-left mt-5 max-w-xs" />
              <p className="mt-6 leading-relaxed text-shrine-charcoal/85">{ministry.summary}</p>
              <ul className="mt-6 space-y-2 text-sm text-shrine-charcoal/80">
                {ministry.details.map((detail) => (
                  <li key={detail} className="flex gap-2.5">
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-shrine-gold-500"
                      aria-hidden="true"
                    />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
            <div className={cn("group overflow-hidden rounded-sm", index % 2 === 1 && "lg:order-1")}>
              <SafeImage
                src={ministry.image}
                fallback={ministry.imageFallback}
                alt={ministry.imageAlt}
                className="img-zoom aspect-[16/11] w-full object-cover"
              />
            </div>
          </Container>
        </section>
      ))}
    </>
  );
}
