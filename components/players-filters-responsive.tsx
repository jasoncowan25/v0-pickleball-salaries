"use client"
import { useState, useMemo, useEffect } from "react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, X, ChevronDown } from "lucide-react"
import type { Gender } from "@/lib/mock-data"

type Tour = "PPA" | "MLP" | "APP"

interface PlayersFiltersResponsiveProps {
  search: string
  gender: Gender | "all"
  year: string
  tour: Tour | "all"
  onSearchChange: (value: string) => void
  onGenderChange: (value: Gender | "all") => void
  onYearChange: (value: string) => void
  onTourChange: (value: Tour | "all") => void
  onClearAll: () => void
  activeFilters: Array<{ key: string; label: string; value: string }>
  onClearFilter: (key: string) => void
}

export function PlayersFiltersResponsive({
  search,
  gender,
  year,
  tour,
  onSearchChange,
  onGenderChange,
  onYearChange,
  onTourChange,
  onClearAll,
  activeFilters,
  onClearFilter,
}: PlayersFiltersResponsiveProps) {
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
    if (tour !== "all") count++
    if (search) count++
    return count
  }, [gender, year, tour, search])

  const getGenderLabel = () => {
    if (gender === "all") return "All"
    return gender === "M" ? "Men" : "Women"
  }

  return (
    <>
      {/* Desktop filters - always visible */}
      <div className="hidden md:block">
        <div className="grid grid-cols-12 gap-3 md:gap-4 items-end mb-4">
          <div className="col-span-12 md:col-span-6">
            <div className="sr-only">Search players</div>
            <div className="relative w-full">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-8 h-11 w-full"
                placeholder="Search players..."
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                aria-label="Search players"
              />
            </div>
          </div>

          <div className="col-span-6 md:col-span-2">
            <div className="sr-only">Gender</div>
            <Select value={gender} onValueChange={onGenderChange}>
              <SelectTrigger className="h-11" aria-label="Gender">
                <SelectValue>{getGenderLabel()}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="M">Men</SelectItem>
                <SelectItem value="F">Women</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="col-span-6 md:col-span-2">
            <div className="sr-only">Year</div>
            <Select value={year} onValueChange={onYearChange}>
              <SelectTrigger className="h-11" aria-label="Year">
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

          <div className="col-span-6 md:col-span-2 hidden">
            <div className="sr-only">Tour</div>
            <Select value={tour} onValueChange={onTourChange}>
              <SelectTrigger className="h-11" aria-label="Tour">
                <SelectValue>{tour === "all" ? "All" : tour.toUpperCase()}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="PPA">PPA</SelectItem>
                <SelectItem value="MLP">MLP</SelectItem>
                <SelectItem value="APP">APP</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {activeFilters.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {activeFilters.map((filter) => (
              <Badge key={filter.key} variant="secondary" className="gap-1">
                {filter.label}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 hover:bg-transparent"
                  onClick={() => onClearFilter(filter.key)}
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

      {/* Mobile filters - collapsible */}
      <div className="md:hidden mb-4">
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
                  className="pl-8 h-11 w-full"
                  placeholder="Search players..."
                  value={search}
                  onChange={(e) => onSearchChange(e.target.value)}
                  aria-label="Search players"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <Select value={gender} onValueChange={onGenderChange}>
                  <SelectTrigger className="h-11" aria-label="Gender">
                    <SelectValue>{getGenderLabel()}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="M">Men</SelectItem>
                    <SelectItem value="F">Women</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={year} onValueChange={onYearChange}>
                  <SelectTrigger className="h-11" aria-label="Year">
                    <SelectValue>{year}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2022">2022</SelectItem>
                    <SelectItem value="2021">2021</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={tour} onValueChange={onTourChange}>
                  <SelectTrigger className="h-11" aria-label="Tour">
                    <SelectValue>{tour === "all" ? "All" : tour.toUpperCase()}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="PPA">PPA</SelectItem>
                    <SelectItem value="MLP">MLP</SelectItem>
                    <SelectItem value="APP">APP</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {activeFilters.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  {activeFilters.map((filter) => (
                    <Badge key={filter.key} variant="secondary" className="gap-1">
                      {filter.label}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 hover:bg-transparent"
                        onClick={() => onClearFilter(filter.key)}
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
