import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

/**
 * Round-6 contract (docs/code-review-audit-round6-2026-08-31.md): the CI
 * workflow must trigger on push/pull_request to main and run the documented
 * five-step gate. File-content contract, same pattern as
 * security-headers.test.ts. Note: the round-6 draft audit briefly flagged a
 * corrupted `branches: ain]` scalar — byte-level verification (0x5b 0x6d…)
 * proved both triggers valid; the apparent corruption was a display artifact.
 * This guard keeps the trigger contract pinned so a real corruption cannot
 * land silently.
 */
const root = resolve(__dirname, "..");
const ci = readFileSync(resolve(root, ".github", "workflows", "ci.yml"), "utf8");

/** Every `branches:` value in file order (push trigger first, then pull_request). */
const branchValues = [...ci.matchAll(/branches:\s*(\S+)/g)].map((m) => m[1]);

describe(".github/workflows/ci.yml trigger + gate contract", () => {
  it("declares exactly two branch filters", () => {
    expect(branchValues).toHaveLength(2);
  });

  it("triggers push and pull_request on main as a proper flow sequence", () => {
    expect(branchValues).toEqual(["[main]", "[main]"]);
  });

  it("uses flow-sequence syntax for both triggers (no plain-scalar corruption)", () => {
    const corrupted = branchValues.filter((v) => !(v.startsWith("[") && v.endsWith("]")));
    expect(corrupted).toEqual([]);
  });

  it("runs the five documented gate steps", () => {
    for (const step of ["pnpm lint", "pnpm typecheck", "pnpm test", "pnpm test:e2e", "pnpm build"]) {
      expect(ci).toContain(step);
    }
  });
});
