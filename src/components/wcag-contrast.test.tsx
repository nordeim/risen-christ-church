import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { EventMeta, categoryTone } from "@/components/EventMeta";

/**
 * Round-12 contract — closes audit findings F-1 (Medium) and F-2 (Low) for
 * Risen Christ: "UI/UX Design Audit — St Mary of the Angels vs Risen Christ"
 * §7 (docs/remediation-plan-round12-2026-08-31.md).
 *
 * WCAG 2.2 AA 1.4.3 requires 4.5:1 for normal text. The chip label is
 * 0.65rem (≈10.4 px) bold uppercase — normal text, not large text — and the
 * date renders at text-sm. Both live on the parchment card surface #f2e9d6.
 *
 * Assertions are behavioral: ratios are computed from the token layer in
 * src/index.css, so the contract holds whichever token the tone map names
 * (a retone or a token value change re-verifies automatically). The round-12
 * red state: Devotion's terracotta-500 computes 3.92:1 — below AA.
 */

const PARCHMENT = "#f2e9d6";

function linear(channel: number): number {
  const c = channel / 255;
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

function luminance(hex: string): number {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return 0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b);
}

function contrast(fg: string, bg: string): number {
  const [l1, l2] = [luminance(fg), luminance(bg)].sort((a, b) => b - a);
  return (l1 + 0.05) / (l2 + 0.05);
}

/** Parse the shrine color tokens out of index.css @theme. */
function shrineTokens(): Map<string, string> {
  // vitest runs with project root as cwd; import.meta.url is rewritten to a
  // non-file scheme under the jsdom transform, so resolve from the root.
  const css = readFileSync(resolve(process.cwd(), "src/index.css"), "utf8");
  const tokens = new Map<string, string>();
  for (const m of css.matchAll(/--color-shrine-([a-z0-9-]+):\s*(#[0-9a-fA-F]{6})/g)) {
    tokens.set(m[1]!, m[2]!.toLowerCase());
  }
  return tokens;
}

/** "border-shrine-terracotta-500/70 text-shrine-terracotta-500" -> "terracotta-500". */
function toneToken(className: string): string {
  const m = className.match(/text-shrine-([a-z0-9-]+)/);
  expect(m, `tone class must name a shrine text color: ${className}`).not.toBeNull();
  return m![1]!;
}

describe("audit F-1: every event chip tone meets WCAG AA on parchment", () => {
  const tokens = shrineTokens();

  for (const [category, toneClass] of Object.entries(categoryTone)) {
    it(`${category} chip (${toneClass}) computes >= 4.5:1 on #f2e9d6`, () => {
      const token = toneToken(toneClass);
      const hex = tokens.get(token);
      expect(hex, `token --color-shrine-${token} must exist in index.css`).toBeTruthy();
      const ratio = contrast(hex!, PARCHMENT);
      // Report the measured ratio in the message for future audits.
      expect(
        ratio,
        `${category}: ${token} ${hex} on parchment is ${ratio.toFixed(2)}:1 (AA needs 4.5:1)`,
      ).toBeGreaterThanOrEqual(4.5);
    });
  }
});

describe("audit F-2: the event date meets WCAG AA on parchment", () => {
  it("date <time> tone token computes >= 4.5:1 on #f2e9d6", () => {
    render(<EventMeta category="Parish" date="1 January 2026" />);
    const chip = screen.getByText("Parish");
    const row = chip.closest("div");
    expect(row).not.toBeNull();
    const date = row!.querySelector("time");
    expect(date).not.toBeNull();
    const token = toneToken(date!.className);
    const hex = shrineTokens().get(token);
    expect(hex, `token --color-shrine-${token} must exist in index.css`).toBeTruthy();
    const ratio = contrast(hex!, PARCHMENT);
    expect(
      ratio,
      `date tone ${token} ${hex} on parchment is ${ratio.toFixed(2)}:1 (AA needs 4.5:1)`,
    ).toBeGreaterThanOrEqual(4.5);
  });
});
