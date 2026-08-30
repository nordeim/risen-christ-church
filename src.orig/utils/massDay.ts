/**
 * Round-5 (docs/design-enhancement-round5-2026-08-30.md P-3): single source
 * for the Worship page's "today" Mass-card highlight.
 *
 * Parish schedule shape: one weekday card (Mon–Fri), one Saturday card
 * (vigil + Tamil), one Sunday card (six English/Mandarin slots).
 */
export type MassDayKey = "weekdays" | "saturday" | "sunday";

export function massDayKey(date: Date): MassDayKey {
  switch (date.getDay()) {
    case 0:
      return "sunday";
    case 6:
      return "saturday";
    default:
      return "weekdays";
  }
}
