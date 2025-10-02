import type { Gender } from "@/lib/mock-data"

export type Tour = "PPA" | "MLP" | "APP"

export interface FilterState {
  year: number
  gender: Gender | "all"
  tour: Tour | "all"
}

/**
 * Composes a prefix for KPI card titles based on active filters
 * Examples:
 * - Tour only → "PPA" / "APP" / "MLP"
 * - Gender only → "Men" / "Women"
 * - Tour + Gender → "PPA Men" / "APP Women" / etc.
 * - None → "" (no prefix)
 */
export function composePrefix(filters: Pick<FilterState, "gender" | "tour">): string {
  const { gender, tour } = filters
  const parts: string[] = []

  // Add tour first if present
  if (tour !== "all") {
    parts.push(tour.toUpperCase())
  }

  // Add gender if present
  if (gender !== "all") {
    parts.push(gender === "M" ? "Men" : "Women")
  }

  return parts.join(" ")
}

/**
 * Composes a dynamic table heading based on active filters
 * Examples:
 * - "2024 Women PPA Player Earnings"
 * - "2025 Men Player Earnings"
 * - "2024 Player Earnings" (default)
 */
export function composeHeading(filters: FilterState): string {
  const { year, gender, tour } = filters
  const parts: string[] = []

  // Year is always included
  parts.push(year.toString())

  // Add gender if not "all"
  if (gender !== "all") {
    parts.push(gender === "M" ? "Men" : "Women")
  }

  // Add tour if not "all"
  if (tour !== "all") {
    parts.push(tour.toUpperCase())
  }

  // Always end with "Player Earnings"
  parts.push("Player Earnings")

  return parts.join(" ")
}

/**
 * Gets the display label for a gender filter value
 */
export function getGenderLabel(gender: Gender | "all"): string {
  if (gender === "all") return "All Genders"
  return gender === "M" ? "Men" : "Women"
}

/**
 * Gets the display label for a tour filter value
 */
export function getTourLabel(tour: Tour | "all"): string {
  if (tour === "all") return "All Tours"
  return tour.toUpperCase()
}
