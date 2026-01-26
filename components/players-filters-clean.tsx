"use client"

import { useState, useMemo, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"
import type { Gender } from "@/lib/mock-data"
import { getDisplayYear } from "@/lib/displayYear"

interface PlayersFiltersCleanProps {
  search: string
  gender: Gender | "all"
  year: string
  contractTier: "gold" | "standard" | "futures" | "unsigned" | "all"
  onSearchChange: (value: string) => void
  onGenderChange: (value: Gender | "all") => void
  onYearChange: (value: string) => void
  onContractTierChange: (value: "gold" | "standard" | "futures" | "unsigned" | "all") => void
  onClearAll: () => void
  activeFilters: Array<{ key: string; label: string; value: string }>
  onClearFilter: (key: string) => void
}

function PlayersFiltersClean({
  search,
  gender,
  year,
  contractTier,
  onSearchChange,
  onGenderChange,
  onYearChange,
  onContractTierChange,
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
    const currentYear = getDisplayYear()
    if (gender !== "all") count++
    if (year !== currentYear.toString()) count++
    if (contractTier !== "all") count++
    if (search) count++
    return count
  }, [gender, year, contractTier, search])

  const getGenderLabel = () => {
    if (gender === "all") return "All Genders"
    return gender === "M" ? "Men" : "Women"
  }

  const getContractTierLabel = () => {
    if (contractTier === "all") return "All Tiers"
    const labels = { gold: "Gold Card", standard: "Standard", futures: "Futures", unsigned: "Unsigned" }
    return labels[contractTier]
  }

  // Filter out tour from active filters since we don't show tour dropdown
  const filteredActiveFilters = activeFilters.filter((filter) => filter.key !== "tour")

  return (
    <>
      {/* Desktop filters - always visible */}
      <div className="hidden md:block mb-6">
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
              <SelectItem value="all">All Genders</SelectItem>
              <SelectItem value="M">Men</SelectItem>
              <SelectItem value="F">Women</SelectItem>
            </SelectContent>
          </Select>

          <Select value={year} onValueChange={onYearChange}>
            <SelectTrigger className="w-[100px]" aria-label="Year">
              <SelectValue>{year}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
              <SelectItem value="2021">2021</SelectItem>
            </SelectContent>
          </Select>

          <Select value={contractTier} onValueChange={onContractTierChange}>
            <SelectTrigger className="w-[140px]" aria-label="Contract Tier">
              <SelectValue>{getContractTierLabel()}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tiers</SelectItem>
              <SelectItem value="gold">Gold Card</SelectItem>
              <SelectItem value="standard">Standard</SelectItem>
              <SelectItem value="futures">Futures</SelectItem>
              <SelectItem value="unsigned">Unsigned</SelectItem>
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
    </>
  )
}

export default PlayersFiltersClean
