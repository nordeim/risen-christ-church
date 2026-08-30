import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

/**
 * Round-6 contract (docs/code-review-audit-round6-2026-08-31.md M1/M3): the
 * four agent-facing docs must carry the verified Risen Christ contracts, not
 * the previous St Mary port. This guard pins the facts that most misled agents
 * during the round-6 audit; update it together with the docs when counts or
 * anchors legitimately change. Round-7 audit remediation (2026-08-31) added
 * CLAUDE.md coverage after its five-gate claim drifted to "test:e2e (40)".
 */
const root = resolve(__dirname, "..");

const skill = readFileSync(resolve(root, "risen-christ_SKILL.md"), "utf8");
const readme = readFileSync(resolve(root, "README.md"), "utf8");
const agents = readFileSync(resolve(root, "AGENTS.md"), "utf8");
const claude = readFileSync(resolve(root, "CLAUDE.md"), "utf8");

/**
 * The SKILL's contract region is everything before the historical appendices
 * (Appendix D documents the second hop TO St Mary and legitimately names its
 * facts as history). Current-state claims in appendices are covered by the
 * Quick Reference Card checks below.
 */
const skillContract = skill.split("## Appendix A")[0];
const skillQuickRef = skill.split("## Quick Reference Card")[1] ?? "";

describe("risen-christ_SKILL.md contract", () => {
  it("uses the language-communities ministries anchor (not #mandarin)", () => {
    expect(skillContract).toContain("#language-communities");
    expect(skillContract).not.toMatch(/#mandarin\b/);
  });

  it("advertises the verified 48-test E2E budget (not 42)", () => {
    expect(skillContract).toContain("48 E2E");
    expect(skillContract).not.toMatch(/42 E2E/);
    expect(skillContract).not.toContain("24/134");
    expect(skillContract).not.toContain("25/141");
    expect(skillContract).not.toContain("25/142");
  });

  it("carries no St Mary parish identity as current facts", () => {
    const stale = [
      "5 Bukit Batok East Ave 2",
      "T08CC4053H",
      "intake.stmary",
      "parish.stmary@catholic.org.sg",
      "6567 3866",
      "9682 7875",
      "esmond.stmary",
      "stmary.sg",
    ];
    const hits = stale.filter((s) => skillContract.includes(s));
    expect(hits).toEqual([]);
  });

  it("Quick Reference Card carries the ported test state and Risen Christ facts", () => {
    expect(skillQuickRef).toContain("32/179 + 48 E2E");
    expect(skillQuickRef).not.toContain("24/134");
    expect(skillQuickRef).not.toContain("42 E2E");
    expect(skillQuickRef).not.toContain("25/142");
    expect(skillQuickRef).not.toContain("32/175");
    expect(skillQuickRef).not.toContain("T08CC4053H");
    expect(skillQuickRef).toContain("1969–2026 Toa Payoh");
  });
});

describe("README.md contract", () => {
  it("does not claim tests are unported (round-6 M1)", () => {
    expect(readme).not.toContain("tests not yet ported");
    expect(readme).not.toContain("No test files found");
    expect(readme).not.toContain("Risen Christ port pending");
  });

  it("does not flag the e2e specs as STALE", () => {
    expect(readme).not.toContain("— STALE");
  });
});

describe("AGENTS.md contract", () => {
  it("states the verified 48-test E2E budget", () => {
    expect(agents).toContain("48 tests");
  });

  it("states the verified 32 files / 179 unit budget", () => {
    expect(agents).toContain("32 files / 179 tests");
  });
});

describe("CLAUDE.md contract", () => {
  it("states the five-command gate with the verified 48-test E2E budget (round-7 audit M-2)", () => {
    expect(claude).toContain("(48)");
    expect(claude).not.toMatch(/test:e2e` \(40\)/);
  });

  it("states the verified 32 files / 179 unit budget", () => {
    expect(claude).toContain("32 files / 179");
  });
});
