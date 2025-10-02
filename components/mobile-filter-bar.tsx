"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, X } from "lucide-react"

interface ActiveFilter {
  key: string
  label: string
  value: string
}

interface MobileFilterBarProps {
  search: string
  onSearchChange: (value: string) => void
  activeFilters: ActiveFilter[]
  onClearFilter: (key: string) => void
  onClearAll: () => void
  onOpenFilters: () => void
}

export function MobileFilterBar({
  search,
  onSearchChange,
  activeFilters,
  onClearFilter,
  onClearAll,
  onOpenFilters,
}: MobileFilterBarProps) {
  const [searchValue, setSearchValue] = useState(search)

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(searchValue)
    }, 250)

    return () => clearTimeout(timer)
  }, [searchValue])

  // Sync with external search changes
  useEffect(() => {
    setSearchValue(search)
  }, [search])

  const activeFilterCount = activeFilters.length

  return (
    <div className="md:hidden sticky top-0 z-10 bg-background border-b shadow-sm">
      {/* Main filter row */}
      <div className="flex items-center gap-3 p-4">
        {/* Search input - 75% width */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search players..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="pl-10 h-11 border-input"
            aria-label="Search players"
          />
        </div>

        {/* Filter button - 25% width */}
        <Button
          variant="outline"
          onClick={onOpenFilters}
          className="flex items-center gap-2 h-11 px-4 whitespace-nowrap bg-transparent"
          aria-expanded={false}
        >
          <Filter className="h-4 w-4" />
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <Badge variant="secondary" className="ml-1 h-5 min-w-5 px-1.5 text-xs">
              {activeFilterCount}
            </Badge>
          )}
        </Button>
      </div>

      {/* Active filters chip rail */}
      {activeFilters.length > 0 && (
        <div className="px-4 pb-3">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            <div className="flex items-center gap-2 flex-nowrap">
              {activeFilters.map((filter) => (
                <Badge key={filter.key} variant="secondary" className="flex items-center gap-1 whitespace-nowrap">
                  <span className="text-xs">{filter.label}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 hover:bg-transparent"
                    onClick={() => onClearFilter(filter.key)}
                    aria-label={`Remove filter: ${filter.label}`}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
            {activeFilters.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearAll}
                className="text-xs text-muted-foreground hover:text-foreground whitespace-nowrap ml-2"
              >
                Clear all
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
