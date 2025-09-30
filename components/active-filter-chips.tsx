"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

interface ActiveFilter {
  key: string
  label: string
  value: string
}

interface ActiveFilterChipsProps {
  activeFilters: ActiveFilter[]
  onClearFilter: (key: string) => void
  onClearAll: () => void
  className?: string
}

export function ActiveFilterChips({
  activeFilters,
  onClearFilter,
  onClearAll,
  className = "",
}: ActiveFilterChipsProps) {
  if (activeFilters.length === 0) {
    return null
  }

  return (
    <div className={`flex items-center gap-2 overflow-x-auto scrollbar-hide ${className}`}>
      <div className="flex items-center gap-2 flex-nowrap">
        {activeFilters.map((filter) => (
          <Badge
            key={filter.key}
            variant="secondary"
            className="flex items-center gap-1 whitespace-nowrap bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
          >
            <span className="text-xs font-medium">{filter.label}</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-0 hover:bg-transparent"
              onClick={() => onClearFilter(filter.key)}
              aria-label={`Remove filter: ${filter.label}`}
            >
              <X className="h-3 w-3 text-gray-500 hover:text-gray-700" />
            </Button>
          </Badge>
        ))}
      </div>

      {activeFilters.length > 0 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearAll}
          className="text-xs text-muted-foreground hover:text-foreground whitespace-nowrap ml-2 px-2"
        >
          Clear all
        </Button>
      )}
    </div>
  )
}
