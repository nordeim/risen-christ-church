import { describe, expect, it, beforeEach, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { Reveal } from "./Reveal";

/**
 * Round-7 contract (docs/design-enhancement-round7-2026-08-31.md P-1):
 * the reveal system is resilient — content must become visible even when
 * IntersectionObserver is unavailable (constructor throws), and the observer
 * must be constructed with a slight early-entry rootMargin so entries begin
 * revealing just before they enter the viewport (no fast-scroll pop-in).
 */

let originalIO: typeof IntersectionObserver;
const capturedOptions: IntersectionObserverInit[] = [];

class OptionsCapturingObserver implements IntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin = "";
  readonly thresholds: readonly number[] = [];
  constructor(
    _callback: IntersectionObserverCallback,
    ctorOptions?: IntersectionObserverInit,
  ) {
    capturedOptions.push(ctorOptions ?? {});
  }
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

describe("Reveal resilience", () => {
  beforeEach(() => {
    originalIO = globalThis.IntersectionObserver;
    capturedOptions.length = 0;
  });

  afterEach(() => {
    globalThis.IntersectionObserver = originalIO;
    cleanup();
  });

  it("falls back to visible when IntersectionObserver construction throws", () => {
    globalThis.IntersectionObserver = (function () {
      throw new TypeError("IntersectionObserver is not supported");
    }) as unknown as typeof IntersectionObserver;
    render(
      <Reveal>
        <p>Sanctuary content</p>
      </Reveal>,
    );
    const el = screen.getByText("Sanctuary content").parentElement!;
    expect(el.className).toContain("reveal-visible");
  });

  it("constructs the observer with an early-entry bottom rootMargin", () => {
    globalThis.IntersectionObserver =
      OptionsCapturingObserver as unknown as typeof IntersectionObserver;
    render(
      <Reveal>
        <p>Early entry content</p>
      </Reveal>,
    );
    expect(capturedOptions.length).toBeGreaterThan(0);
    expect(capturedOptions[0]?.rootMargin).toBe("0px 0px 8% 0px");
    expect(capturedOptions[0]?.threshold).toBe(0.15);
  });
});
