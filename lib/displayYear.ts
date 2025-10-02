/**
 * Returns the current display year for the season.
 * Always returns the current year.
 */
export function getDisplayYear(d = new Date()): number {
  return d.getFullYear()
}
