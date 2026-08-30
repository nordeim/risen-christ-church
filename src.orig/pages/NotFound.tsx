import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Emblem } from "@/components/Emblem";

export function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-shrine-maroon-950 pt-24">
      {/* Round-5 (docs/design-enhancement-round5-2026-08-30.md P-10): ghosted
          tau cross anchors the dead-end page with the parish's own mark. */}
      <Emblem className="pointer-events-none absolute -right-6 bottom-2 h-44 w-44 text-shrine-cream/5 sm:right-10" />
      <Container className="relative py-24 text-center">
        <p className="rise-in text-xs font-semibold uppercase tracking-[0.3em] text-shrine-gold-300">
          404
        </p>
        <h1 className="rise-in rise-in-d1 mt-4 font-display text-4xl text-shrine-cream sm:text-5xl">
          This path does not lead to the church.
        </h1>
        <p className="rise-in rise-in-d2 mx-auto mt-4 max-w-md text-shrine-cream/75">
          The address you asked for is not on these grounds. Return home, or come in time for
          Mass.
        </p>
        <div className="rise-in rise-in-d3 mt-8 flex flex-wrap justify-center gap-3">
          <Button to="/">Return home</Button>
          <Button to="/worship" variant="outline-light">
            Mass times
          </Button>
        </div>
      </Container>
    </section>
  );
}
