import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

/**
 * Round-3 contract: the artifact ships a Cloudflare Pages `_headers` file so
 * the deployed static site gets the security headers a static HTML file
 * cannot set (HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy,
 * Permissions-Policy). The live deploy (2026-08-30) sent none of these —
 * see docs/code-review-audit-round3-2026-08-30.md (M-2/L-1).
 */
const root = resolve(__dirname, "..");
const headers = readFileSync(resolve(root, "public", "_headers"), "utf8");
const flat = headers.replace(/\s+/g, " ");

describe("public/_headers security directives", () => {
  it("exists and targets all routes", () => {
    expect(flat).toContain("/*");
  });

  it("pins HSTS for one year including subdomains", () => {
    expect(flat).toContain("Strict-Transport-Security: max-age=31536000; includeSubDomains");
  });

  it("prevents MIME sniffing", () => {
    expect(flat).toContain("X-Content-Type-Options: nosniff");
  });

  it("denies framing (clickjacking defense; frame-ancestors cannot be set via CSP meta)", () => {
    expect(flat).toContain("X-Frame-Options: DENY");
  });

  it("pins Referrer-Policy", () => {
    expect(flat).toContain("Referrer-Policy: strict-origin-when-cross-origin");
  });

  it("restricts powerful platform APIs", () => {
    expect(flat).toContain("Permissions-Policy: camera=(), microphone=(), geolocation=()");
  });
});
