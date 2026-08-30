/**
 * Round-5 (docs/design-enhancement-round5-2026-08-30.md P-5): initials
 * monogram — first letters of the person's given name + surname, skipping
 * honorifics and order suffixes ("Friar Esmond Chua, OFM" → "EC").
 * Extracted to utils for testability — see audit R5-L2 / R5-M1.
 */
const MONOGRAM_TITLES = new Set(["friar", "fr", "rev", "father", "ofm"]);

export function monogram(name: string): string {
  const words = name
    .split(/\s+/)
    .map((word) => word.replace(/[^A-Za-z]/g, ""))
    .filter((word) => word.length > 0 && !MONOGRAM_TITLES.has(word.toLowerCase()));
  const first = words[0]?.[0] ?? "";
  const last = words[words.length - 1]?.[0] ?? "";
  return `${first}${last}`.toUpperCase();
}
