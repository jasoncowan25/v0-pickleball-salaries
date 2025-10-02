"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import type { Gender } from "@/lib/mock-data"
import type { Tour } from "@/lib/filter-composition"
import { getGenderLabel, getTourLabel } from "@/lib/filter-composition"
import { getDisplayYear } from "@/lib/displayYear"

interface PlayersFilterChipsProps {
  year: string
  gender: Gender | "all"
  tour: Tour | "all"
  onClearYear: () => void
  onClearGender: () => void
  onClearTour: () => void
}

export function PlayersFilterChips({
  year,
  gender,
  tour,
  onClearYear,
  onClearGender,
  onClearTour,
}: PlayersFilterChipsProps) {
  const currentYear = getDisplayYear()
  const hasActiveFilters = year !== currentYear.toString() || gender !== "all" || tour !== "all"

  if (!hasActiveFilters) {
    return null
  }

  return (
    <div className="flex flex-wrap items-center gap-2 py-3">
      {year !== currentYear.toString() && (
        <Badge variant="secondary" className="gap-1.5 px-3 py-1">
          <span className="text-xs">Year: {year}</span>
          <Button
            variant="ghost"
            size="sm"
            className="h-auto p-0 hover:bg-transparent"
            onClick={onClearYear}
            aria-label="Clear year filter"
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      )}

      {gender !== "all" && (
        <Badge variant="secondary" className="gap-1.5 px-3 py-1">
          <span className="text-xs">Gender: {getGenderLabel(gender)}</span>
          <Button
            variant="ghost"
            size="sm"
            className="h-auto p-0 hover:bg-transparent"
            onClick={onClearGender}
            aria-label="Clear gender filter"
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      )}

      {tour !== "all" && (
        <Badge variant="secondary" className="gap-1.5 px-3 py-1">
          <span className="text-xs">Tour: {getTourLabel(tour)}</span>
          <Button
            variant="ghost"
            size="sm"
            className="h-auto p-0 hover:bg-transparent"
            onClick={onClearTour}
            aria-label="Clear tour filter"
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      )}
    </div>
  )
}
