import { describe, expect, it, beforeEach, afterEach } from "vitest";
import { act, render, screen, cleanup } from "@testing-library/react";
import { useScrollSpy } from "./useScrollSpy";

/**
 * Round-7 contract (docs/design-enhancement-round7-2026-08-31.md P-5):
 * the scrollspy tracks which ministry section is crossing the viewport's
 * middle band, falls back to the first id, disconnects on unmount, and
 * tolerates ids with no matching element.
 */

let instances: CapturingObserver[] = [];
let originalIO: typeof IntersectionObserver;

class CapturingObserver implements IntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin = "";
  readonly thresholds: readonly number[] = [];
  constructor(private readonly callback: IntersectionObserverCallback) {
    instances.push(this);
  }
  observed: Element[] = [];
  observe(target: Element) {
    this.observed.push(target);
  }
  unobserve() {}
  disconnect() {
    this.disconnected = true;
  }
  disconnected = false;
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
  fire(entries: Array<{ target: Element; isIntersecting: boolean }>) {
    this.callback(
      entries.map(
        (entry) => ({ isIntersecting: entry.isIntersecting, target: entry.target }) as IntersectionObserverEntry,
      ),
      this as unknown as IntersectionObserver,
    );
  }
}

function SpyProbe({ ids, sectionsFor }: { ids: string[]; sectionsFor?: string[] }) {
  const active = useScrollSpy(ids);
  return (
    <div>
      <span data-testid="spy-active">{active}</span>
      {(sectionsFor ?? ids).map((id) => (
        <section key={id} id={id} data-testid={`spy-section-${id}`} />
      ))}
    </div>
  );
}

function section(id: string): Element {
  const el = document.getElementById(id);
  if (!el) throw new Error(`missing #${id}`);
  return el;
}

describe("useScrollSpy", () => {
  beforeEach(() => {
    instances = [];
    originalIO = globalThis.IntersectionObserver;
    globalThis.IntersectionObserver =
      CapturingObserver as unknown as typeof IntersectionObserver;
  });
  afterEach(() => {
    globalThis.IntersectionObserver = originalIO;
    cleanup();
  });

  it("returns the first id as fallback before anything intersects", () => {
    render(<SpyProbe ids={["alpha", "beta"]} />);
    expect(screen.getByTestId("spy-active").textContent).toBe("alpha");
    // All ids were observed.
    const observed = instances.flatMap((instance) => instance.observed.map((el) => el.id));
    expect(observed).toEqual(["alpha", "beta"]);
  });

  it("adopts the id reported intersecting by the observer", () => {
    render(<SpyProbe ids={["alpha", "beta", "gamma"]} />);
    act(() => {
      instances[0].fire([{ target: section("beta"), isIntersecting: true }]);
    });
    expect(screen.getByTestId("spy-active").textContent).toBe("beta");
    act(() => {
      instances[0].fire([{ target: section("gamma"), isIntersecting: true }]);
    });
    expect(screen.getByTestId("spy-active").textContent).toBe("gamma");
  });

  it("resolves batched ties by document order, not delivery order", () => {
    // A fast programmatic scroll can push several sections through the thin
    // middle band inside ONE IntersectionObserver callback, and IO may deliver
    // those entries in any order. The reading-position semantic is "deepest
    // section in document order wins": gamma (ids[2]) must become active even
    // though its entry arrived first in the batch (round-7 audit L-2).
    render(<SpyProbe ids={["alpha", "beta", "gamma"]} />);
    act(() => {
      instances[0].fire([
        { target: section("gamma"), isIntersecting: true },
        { target: section("alpha"), isIntersecting: true },
      ]);
    });
    expect(screen.getByTestId("spy-active").textContent).toBe("gamma");
  });

  it("keeps the last active section when a batch leaves the band empty", () => {
    // Scrolling into a header/footer gap: nothing intersects the band any
    // more, and the pill must hold its position instead of flickering back
    // to the first id (round-7 remediation regression lock).
    render(<SpyProbe ids={["alpha", "beta", "gamma"]} />);
    act(() => {
      instances[0].fire([{ target: section("beta"), isIntersecting: true }]);
    });
    expect(screen.getByTestId("spy-active").textContent).toBe("beta");
    act(() => {
      instances[0].fire([{ target: section("beta"), isIntersecting: false }]);
    });
    expect(screen.getByTestId("spy-active").textContent).toBe("beta");
  });

  it("disconnects the observer on unmount", () => {
    const { unmount } = render(<SpyProbe ids={["alpha", "beta"]} />);
    expect(instances).toHaveLength(1);
    unmount();
    expect(instances[0].disconnected).toBe(true);
  });

  it("tolerates ids whose sections are not in the document", () => {
    // The probe renders only #alpha — "missing-section" has no element.
    render(<SpyProbe ids={["alpha", "missing-section"]} sectionsFor={["alpha"]} />);
    const observed = instances.flatMap((instance) => instance.observed.map((el) => el.id));
    expect(observed).toEqual(["alpha"]);
    act(() => {
      instances[0].fire([{ target: section("alpha"), isIntersecting: true }]);
    });
    expect(screen.getByTestId("spy-active").textContent).toBe("alpha");
  });
});
