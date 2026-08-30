import { describe, expect, it } from "vitest";
import { monogram } from "@/utils/monogram";

/**
 * Audit R5-L2: monogram() was tested only via the DOM (EC/JM/JL/RT).
 * These unit tests lock the helper's edge behaviour — honorific stripping,
 * punctuation, hyphenation, single-name, and empty input.
 */
describe("monogram", () => {
  it("strips Friar/OFM and initials adjacent names", () => {
    expect(monogram("Friar Esmond Chua, OFM")).toBe("EC");
    expect(monogram("Friar Julian Mariaratnam, OFM")).toBe("JM");
    expect(monogram("Friar Justin Lim, OFM")).toBe("JL");
    expect(monogram("Friar Robin Toha, OFM")).toBe("RT");
  });

  it("handles names without honorifics", () => {
    expect(monogram("Esmond Chua")).toBe("EC");
    expect(monogram("Julian Mariaratnam")).toBe("JM");
  });

  it("strips Fr./Rev./Father variants case-insensitively", () => {
    expect(monogram("Fr. John Doe")).toBe("JD");
    expect(monogram("Rev. Jane Smith")).toBe("JS");
    expect(monogram("FATHER Michael OFM")).toBe("MM");
    expect(monogram("friar john paul")).toBe("JP");
  });

  it("handles hyphenated and multi-word names", () => {
    expect(monogram("John-Paul Smith")).toBe("JS");
    expect(monogram("Mary Anne Lee")).toBe("ML");
    expect(monogram("Jean-Pierre O'Connor")).toBe("JO");
  });

  it("returns a single initial duplicated when only one word remains", () => {
    // Single-word input → first and last are the same word.
    expect(monogram("Francis")).toBe("FF");
    expect(monogram("OFM")).toBe("");
    expect(monogram("Friar")).toBe("");
  });

  it("returns empty string for empty or honorific-only input", () => {
    expect(monogram("")).toBe("");
    expect(monogram("   ")).toBe("");
    expect(monogram("Friar OFM")).toBe("");
  });

  it("is case-insensitive and punctuation-tolerant", () => {
    expect(monogram("friar esmond chua, ofm")).toBe("EC");
    expect(monogram("  Friar  Esmond   Chua  ")).toBe("EC");
    expect(monogram("Esmond,, Chua..")).toBe("EC");
  });
});
