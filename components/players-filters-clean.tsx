"use client"

import { useState, useMemo, useEffect } from "react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, X, ChevronDown } from "lucide-react"
import type { Gender } from "@/lib/mock-data"

interface PlayersFiltersCleanProps {
  search: string
  gender: Gender | "all"
  year: string
  onSearchChange: (value: string) => void
  onGenderChange: (value: Gender | "all") => void
  onYearChange: (value: string) => void
  onClearAll: () => void
  activeFilters: Array<{ key: string; label: string; value: string }>
  onClearFilter: (key: string) => void
}

export function PlayersFiltersClean({
  search,
  gender,
  year,
  onSearchChange,
  onGenderChange,
  onYearChange,
  onClearAll,
  activeFilters,
  onClearFilter,
}: PlayersFiltersCleanProps) {
  const [open, setOpen] = useState(false)

  // Restore state from sessionStorage
  useEffect(() => {
    const saved = sessionStorage.getItem("filtersOpen")
    if (saved) setOpen(saved === "true")
  }, [])

  useEffect(() => {
    sessionStorage.setItem("filtersOpen", String(open))
  }, [open])

  const activeCount = useMemo(() => {
    let count = 0
    if (gender !== "all") count++
    if (year !== "2024") count++
    if (search) count++
    return count
  }, [gender, year, search])

  const getGenderLabel = () => {
    if (gender === "all") return "All"
    return gender === "M" ? "Men" : "Women"
  }

  // Filter out tour from active filters since we don't show tour dropdown
  const filteredActiveFilters = activeFilters.filter((filter) => filter.key !== "tour")

  return (
    <>
      {/* Desktop filters - always visible */}
      <div className="hidden md:block">
        <div className="flex items-center gap-3">
          <div className="relative flex-1 min-w-[360px]">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search players..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-8 w-full"
              aria-label="Search players"
            />
          </div>

          <Select value={gender} onValueChange={onGenderChange}>
            <SelectTrigger className="w-[140px]" aria-label="Gender">
              <SelectValue>{getGenderLabel()}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="M">Men</SelectItem>
              <SelectItem value="F">Women</SelectItem>
            </SelectContent>
          </Select>

          <Select value={year} onValueChange={onYearChange}>
            <SelectTrigger className="w-[100px]" aria-label="Year">
              <SelectValue>{year}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
              <SelectItem value="2021">2021</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Active filters display for desktop */}
        {filteredActiveFilters.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mt-4">
            {filteredActiveFilters.map((filter) => (
              <Badge key={filter.key} variant="secondary" className="gap-1">
                {filter.label}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 hover:bg-transparent"
                  onClick={() => onClearFilter(filter.key)}
                  aria-label={`Clear ${filter.label} filter`}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
            <Button variant="ghost" size="sm" onClick={onClearAll}>
              Clear all
            </Button>
          </div>
        )}
      </div>

      <div className="md:hidden">
        <div className="flex items-center justify-between mb-2">
          <Collapsible open={open} onOpenChange={setOpen}>
            <CollapsibleTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                aria-expanded={open}
                className="flex items-center gap-2 bg-transparent"
              >
                Filters
                {activeCount > 0 && <span className="ml-1 text-xs opacity-80">• {activeCount} active</span>}
                <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
              </Button>
            </CollapsibleTrigger>

            {activeCount > 0 && (
              <Button variant="ghost" size="sm" onClick={onClearAll} aria-label="Clear all filters">
                Clear
              </Button>
            )}

            <CollapsibleContent className="mt-3 space-y-3 transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search players..."
                  value={search}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="pl-8 w-full"
                  aria-label="Search players"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Select value={gender} onValueChange={onGenderChange}>
                  <SelectTrigger aria-label="Gender">
                    <SelectValue>{getGenderLabel()}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="M">Men</SelectItem>
                    <SelectItem value="F">Women</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={year} onValueChange={onYearChange}>
                  <SelectTrigger aria-label="Year">
                    <SelectValue>{year}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2022">2022</SelectItem>
                    <SelectItem value="2021">2021</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Active filters display for mobile */}
              {filteredActiveFilters.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  {filteredActiveFilters.map((filter) => (
                    <Badge key={filter.key} variant="secondary" className="gap-1">
                      {filter.label}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 hover:bg-transparent"
                        onClick={() => onClearFilter(filter.key)}
                        aria-label={`Clear ${filter.label} filter`}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              )}
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </>
  )
}
