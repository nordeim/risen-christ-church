import { Emblem } from "@/components/Emblem";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function NotFound() {
  return (
    <section className="flex min-h-[80vh] items-center bg-shrine-cream py-28">
      <Container className="text-center">
        <div className="rise-in mx-auto flex justify-center text-shrine-gold-500/70">
          <Emblem className="h-16 w-16" />
        </div>
        <p className="rise-in rise-in-d1 mt-8 text-xs font-semibold uppercase tracking-[0.35em] text-shrine-maroon-500">
          404
        </p>
        <h1 className="rise-in rise-in-d2 mt-4 font-display text-4xl text-balance sm:text-5xl">
          This path does not lead to the church.
        </h1>
        <p className="rise-in rise-in-d3 mx-auto mt-4 max-w-md text-shrine-charcoal/80">
          The page you asked for is not in this house. Return to the nave, or come in time for
          Mass.
        </p>
        <div className="rise-in rise-in-d4 mt-8 flex flex-wrap justify-center gap-3">
          <Button to="/">Return home</Button>
          <Button to="/worship" variant="secondary">
            Mass times
          </Button>
        </div>
      </Container>
    </section>
  );
}
