/**
 * Initials from a display name. Strips honorifics so
 * "Fr Brian D'Souza" → "BD" and "Friar Esmond Chua, OFM" → "EC".
 */
const HONORIFICS = new Set([
  "fr",
  "fr.",
  "rev",
  "rev.",
  "friar",
  "bro",
  "bro.",
  "sr",
  "sr.",
  "ofm",
  "ofm.",
  "mdm",
  "mdm.",
  "mr",
  "mr.",
  "mrs",
  "mrs.",
  "ms",
  "ms.",
]);

export function monogram(name: string): string {
  const parts = name
    .replace(/,/g, " ")
    .split(/\s+/)
    .filter((part) => part.length > 0 && !HONORIFICS.has(part.toLowerCase()));

  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();

  const first = parts[0][0];
  const last = parts[parts.length - 1][0];
  return `${first}${last}`.toUpperCase();
}
