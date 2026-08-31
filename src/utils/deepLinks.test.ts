import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { knownRoutePaths, resolveHashRedirect } from "@/utils/deepLinks";

/**
 * Round-12 contract — closes audit finding F-3: path-style deep links such as
 * /worship silently rendered Home under HashRouter (soft-404 for links shared
 * without the hash — reproduced locally 2026-08-31 before this fix). The
 * router stays HashRouter — the single-file deployment tradeoff documented in
 * App.tsx — so known path-style routes are rewritten to their hash equivalents
 * before React mounts. Unknown paths keep the existing behavior (out of the
 * audit's scope: "rewrites known path routes").
 */
describe("resolveHashRedirect", () => {
  it("rewrites each known route path to its hash equivalent", () => {
    expect(resolveHashRedirect("/worship", "")).toBe("/#/worship");
    expect(resolveHashRedirect("/news-events", "")).toBe("/#/news-events");
    expect(resolveHashRedirect("/give", "")).toBe("/#/give");
    expect(resolveHashRedirect("/faq", "")).toBe("/#/faq");
  });

  it("rewrites the alias routes too", () => {
    expect(resolveHashRedirect("/mass-times", "")).toBe("/#/mass-times");
    expect(resolveHashRedirect("/donate", "")).toBe("/#/donate");
    expect(resolveHashRedirect("/volunteer", "")).toBe("/#/volunteer");
    expect(resolveHashRedirect("/news-and-events", "")).toBe("/#/news-and-events");
  });

  it("normalizes trailing slashes", () => {
    expect(resolveHashRedirect("/worship/", "")).toBe("/#/worship");
  });

  it("returns null for the root and empty pathname (HashRouter owns them)", () => {
    expect(resolveHashRedirect("/", "")).toBeNull();
    expect(resolveHashRedirect("", "")).toBeNull();
  });

  it("returns null when the hash router already owns the URL", () => {
    expect(resolveHashRedirect("/", "#/give")).toBeNull();
    expect(resolveHashRedirect("/worship", "#/worship")).toBeNull();
    // A bare "#" carries no route; the path is still authoritative.
    expect(resolveHashRedirect("/worship", "#")).toBe("/#/worship");
  });

  it("returns null for unknown, case-mismatched, and file paths", () => {
    expect(resolveHashRedirect("/wp-admin", "")).toBeNull();
    expect(resolveHashRedirect("/Worship", "")).toBeNull();
    expect(resolveHashRedirect("/index.html", "")).toBeNull();
    expect(resolveHashRedirect("/images/hero-church.jpg", "")).toBeNull();
  });
});

describe("knownRoutePaths stays in sync with App.tsx", () => {
  it("covers exactly the concrete paths declared in src/App.tsx", () => {
    const appSource = readFileSync(resolve(process.cwd(), "src/App.tsx"), "utf8");
    const declared = [...appSource.matchAll(/path="([^"]+)"/g)]
      .map((m) => m[1]!)
      .filter((p) => p !== "*");

    expect(declared.length).toBeGreaterThan(0);
    for (const path of declared) {
      expect(
        knownRoutePaths,
        `App.tsx declares path="${path}" but deepLinks.ts does not redirect it`,
      ).toContain(path);
    }
    // No stale redirects for routes App.tsx no longer declares.
    expect(new Set(knownRoutePaths).size).toBe(knownRoutePaths.length);
    expect([...knownRoutePaths].sort()).toEqual([...declared].sort());
  });
});
