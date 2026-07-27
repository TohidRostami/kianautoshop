/**
 * Formats a number with thousands separators using Western (Latin) digits.
 *
 * Numerals are deliberately kept in Western digits in both the Persian and
 * English UI: they're set in a monospace "instrument" face (see the
 * `.figures` class in globals.css) that doesn't include Perso-Arabic digit
 * glyphs, and Western digits + thousands separators read clearly for prices
 * and odometer figures either way.
 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

/** Converts a local Iranian mobile number (e.g. "0912-345-6789") into the
 * international digits-only format wa.me links require ("989123456789"). */
export function toWhatsAppNumber(localNumber: string): string {
  const digits = localNumber.replace(/\D/g, "");
  return digits.replace(/^0/, "98");
}
