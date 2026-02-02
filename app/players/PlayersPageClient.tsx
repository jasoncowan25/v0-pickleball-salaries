"use client"

import { Suspense, useMemo, useTransition, useState, useEffect } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, ArrowUp, ArrowDown } from "lucide-react"
import { mockPlayers, events } from "@/lib/mock-data"
import type { Gender } from "@/lib/mock-data"
import { computePrimaryTour, visibleTours, type TourCode } from "@/lib/tours"
import { KpiCard } from "@/components/kpi-card"
import { mergeSearchParams, stripEmpty } from "@/lib/url"
import { TourBadge } from "@/components/TourBadge"
import { ContractTierBadge } from "@/components/contract-tier-badge"
import PlayerProfileLink from "@/components/PlayerProfileLink"
import { MobileFilterBar } from "@/components/mobile-filter-bar"
import { FilterBottomSheet } from "@/components/filter-bottom-sheet"
import PlayersFiltersClean from "@/components/players-filters-clean"
import { useFilterParams } from "@/hooks/use-filter-params"
import { composePrefix, composeHeading, type Tour } from "@/lib/filter-composition"
import { getDisplayYear } from "@/lib/displayYear"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { VerificationStamp } from "@/components/verification-stamp"

type PlayerRow = {
  id: string
  slug: string
  name: string
  gender: "M" | "F"
  nation?: string
  ppa: number
  app: number
  mlp: number
  major: number
  contract: number
  total: number
  rank: number
  headshotUrl?: string
  tours: TourCode[]
  primaryTour: TourCode | null
  earningsByTour?: Record<Tour, number>
  contractTier?: "gold" | "futures" | "standard" | "unsigned"
}

type Money = number

function getYearFilteredPlayers(allPlayers: PlayerRow[], year: number): PlayerRow[] {
  const currentYear = getDisplayYear()

  // If it's the current year, return players as-is
  if (year === currentYear) {
    return allPlayers
  }

  // For past years, simulate lower earnings (each year back = 20% reduction)
  const yearDiff = currentYear - year
  const multiplier = Math.max(0.2, 1 - yearDiff * 0.2)

  return allPlayers.map((player) => ({
    ...player,
    ppa: Math.floor(player.ppa * multiplier),
    app: Math.floor(player.app * multiplier),
    mlp: Math.floor(player.mlp * multiplier),
    major: Math.floor(player.major * multiplier),
    contract: Math.floor(player.contract * multiplier),
    total: Math.floor(player.total * multiplier),
  }))
}

function computeGlobalTotalsForYear(allPlayers: PlayerRow[], year: number) {
  const players = getYearFilteredPlayers(allPlayers, year)
  const totalPrizeMoney: Money = players.reduce((sum, p) => sum + (p.total - p.contract), 0)
  const reportedContracts: Money = players.reduce((sum, p) => sum + p.contract, 0)

  // Filter events by year if events have date property
  const eventsTracked = events?.filter((e) => new Date(e.date).getFullYear() === year).length || 42

  return { totalPrizeMoney, eventsTracked, reportedContracts }
}

const EARNINGS_THRESHOLD_USD = 2500
const ROLLING_WINDOW_LABEL = "last 12 months"

const TOUR_LABEL: Record<TourCode, string> = {
  PPA: "Professional Pickleball Association Tour",
  APP: "APP Tour",
  MLP: "Major League Pickleball",
}

const tourBadgeClass: Record<TourCode, string> = {
  PPA: "bg-blue-100 text-blue-800",
  MLP: "bg-green-100 text-green-800",
  APP: "bg-purple-100 text-purple-800",
}

const primaryEmphasis = "ring-1 ring-foreground/20 ring-offset-1 ring-offset-background shadow-sm"

const formatCurrencyUSD = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  })
    .format(amount)
    .replace("US$", "$")
}

const toNumber = (value: string | number): number => {
  if (typeof value === "number") return value
  return Number.parseFloat(value.replace(/[$,]/g, "")) || 0
}

const rankize = (players: PlayerRow[]): PlayerRow[] => {
  return players.map((player, index) => ({
    ...player,
    rank: index + 1,
  }))
}

function PlayersPageContent() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false)
  const { filterState, activeFilters, updateFilters, clearFilter, clearAllFilters } = useFilterParams()

  const currentYear = getDisplayYear()
  const search = searchParams.get("search") || ""
  const year = searchParams.get("year") || currentYear.toString()
  const gender = (searchParams.get("gender") as Gender | "all") || "all"
  const tour = (searchParams.get("tour") as Tour | "all") || "all"
  const contractTier = (searchParams.get("contractTier") as "gold" | "standard" | "futures" | "unsigned" | "all") || "all"
  const sortColumn = searchParams.get("sort") || "total"
  const sortDirection = (searchParams.get("dir") as "asc" | "desc") || "desc"
  const currentPage = Number.parseInt(searchParams.get("page") || "1")
  const pageSize = Number.parseInt(searchParams.get("pageSize") || "25")

  const selectedYear = Number.parseInt(year)

  useEffect(() => {
    console.log("[v0] PlayersPageContent - Component rendered")
    console.log("[v0] PlayersPageContent - Current URL:", window.location.href)
    console.log("[v0] PlayersPageContent - gender from searchParams:", gender)
    console.log("[v0] PlayersPageContent - year from searchParams:", year)
    console.log("[v0] PlayersPageContent - tour from searchParams:", tour)
  }, [gender, year, tour])

  function setFilter(updates: Record<string, string | undefined | null>) {
    console.log("[v0] setFilter - called with updates:", updates)
    const merged = mergeSearchParams(searchParams, updates)
    const cleaned = stripEmpty(merged)
    const qs = cleaned.toString()
    const href = qs ? `${pathname}?${qs}` : pathname
    console.log("[v0] setFilter - new URL will be:", href)

    startTransition(() => {
      router.replace(href, { scroll: false })
    })
  }

  const playerRows: PlayerRow[] = useMemo(() => {
    return mockPlayers.map((player) => {
      const totalPrize = player.totals.ytdPrize
      const ppa = player.primaryTour === "PPA" ? Math.floor(totalPrize * 0.6) : Math.floor(totalPrize * 0.2)
      const app = player.primaryTour === "APP" ? Math.floor(totalPrize * 0.6) : Math.floor(totalPrize * 0.15)
      const mlp = player.primaryTour === "MLP" ? Math.floor(totalPrize * 0.6) : Math.floor(totalPrize * 0.15)
      const major = Math.floor(totalPrize * 0.1)
      const contract = player.totals.reportedContracts || 0

      const enhancedPlayer = {
        ...player,
        tours: player.tours || [],
        ppa,
        app,
        mlp,
        major,
        contract,
        total: ppa + app + mlp + major + contract,
      }

      return {
        id: player.id,
        slug: player.slug,
        name: player.name,
        gender: player.gender as "M" | "F",
        nation: player.country,
        ppa,
        app,
        mlp,
        major,
        contract,
        total: ppa + app + mlp + major + contract,
        rank: 0,
        headshotUrl: player.headshotUrl,
        tours: visibleTours(enhancedPlayer),
        primaryTour: computePrimaryTour(enhancedPlayer),
        earningsByTour: { PPA: ppa, MLP: mlp, APP: app },
        contractTier: player.contractTier,
      }
    })
  }, [])

  const yearFilteredPlayerRows = useMemo(() => {
    return getYearFilteredPlayers(playerRows, selectedYear)
  }, [playerRows, selectedYear])

  const filteredAndSortedPlayers = useMemo(() => {
    const tourParam = tour.toUpperCase() as Tour | "ALL"
    const filteredByTour =
      tourParam === "ALL"
        ? yearFilteredPlayerRows
        : yearFilteredPlayerRows.filter((p) => (p.earningsByTour?.[tourParam] ?? 0) > 0)

    const filtered = filteredByTour.filter((player) => {
      if (gender !== "all" && player.gender !== gender) return false
      if (search && !player.name.toLowerCase().includes(search.toLowerCase())) return false
      if (contractTier !== "all" && player.contractTier !== contractTier) return false
      return true
    })

    let effectiveSortColumn = sortColumn
    let effectiveSortDirection = sortDirection

    if (tour !== "all" && sortColumn === "total") {
      effectiveSortColumn = tour.toLowerCase()
      effectiveSortDirection = "desc"
    }

    filtered.sort((a, b) => {
      let aValue: any = a[effectiveSortColumn as keyof PlayerRow]
      let bValue: any = b[effectiveSortColumn as keyof PlayerRow]

      if (effectiveSortColumn === "name") {
        aValue = aValue.toLowerCase()
        bValue = bValue.toLowerCase()
      } else if (typeof aValue === "number") {
      } else {
        aValue = toNumber(aValue)
        bValue = toNumber(bValue)
      }

      if (effectiveSortDirection === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
      }
    })

    return rankize(filtered)
  }, [yearFilteredPlayerRows, gender, search, tour, sortColumn, sortDirection])

  const totalPages = Math.ceil(filteredAndSortedPlayers.length / pageSize)
  const paginatedPlayers = filteredAndSortedPlayers.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  const getTitle = () => {
    const genderLabel = gender === "all" ? "" : gender === "F" ? "Women's " : "Men's "
    const tourLabel = tour === "all" ? "" : `${tour.toUpperCase()} `
    return `${year} ${genderLabel}${tourLabel}Player Earnings`
  }

  const getSubtitle = () => {
    const subtitle = `Showing ${paginatedPlayers.length} of ${filteredAndSortedPlayers.length} players`
    if (tour !== "all") {
      const genderFilter = gender !== "all" ? `Gender = ${gender === "M" ? "Men" : "Women"}, ` : ""
      return `${subtitle} • Filtered by: ${genderFilter}Tour = ${tour.toUpperCase()}`
    }
    return subtitle
  }

  const handleSort = (column: string) => {
    if (column === "rank") {
      setFilter({ sort: "total", dir: "desc" })
    } else {
      const newDirection = sortColumn === column && sortDirection === "desc" ? "asc" : "desc"
      setFilter({ sort: column, dir: newDirection })
    }
  }

  const handleGenderChange = (newGender: Gender | "all") => {
    console.log("[v0] handleGenderChange - called with:", newGender)
    console.log("[v0] handleGenderChange - current gender:", gender)
    console.log("[v0] handleGenderChange - current year:", year)

    // Apply both gender and year in a single setFilter call to avoid race conditions
    setFilter({
      gender: newGender === "all" ? null : newGender,
      year: year !== currentYear.toString() ? year : null,
      page: "1",
    })
  }

  const handleTourChange = (newTour: Tour | "all") => {
    if (tour.toLowerCase() === newTour.toLowerCase() && newTour !== "all") {
      setFilter({ tour: null, page: "1" })
    } else {
      setFilter({ tour: newTour === "all" ? null : newTour.toLowerCase(), page: "1" })
    }
  }

  const handlePageChange = (page: number) => {
    setFilter({ page: page.toString() })
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handlePageSizeChange = (size: number) => {
    setFilter({ pageSize: size.toString(), page: "1" })
  }

  const handleSearchChange = (value: string) => {
    setFilter({ search: value || null, page: "1" })
  }

  const handleYearChange = (newYear: string) => {
    console.log("[v0] handleYearChange - called with:", newYear)
    setFilter({ year: newYear !== currentYear.toString() ? newYear : null, page: "1" })
  }

  const handleContractTierChange = (newContractTier: "gold" | "standard" | "futures" | "unsigned" | "all") => {
    console.log("[v0] handleContractTierChange - called with:", newContractTier)
    setFilter({ contractTier: newContractTier === "all" ? null : newContractTier, page: "1" })
  }

  const kpiFilters = useMemo(() => {
    let filteredPlayers = yearFilteredPlayerRows

    if (gender !== "all") {
      filteredPlayers = filteredPlayers.filter((p) => p.gender === gender)
    }

    if (tour !== "all") {
      const tourParam = tour.toUpperCase() as Tour
      filteredPlayers = filteredPlayers.filter((p) => (p.earningsByTour?.[tourParam] ?? 0) > 0)
    }

    return filteredPlayers
  }, [yearFilteredPlayerRows, gender, tour])

  const { totalPrizeMoney, eventsTracked, reportedContracts } = useMemo(() => {
    const totalPrizeMoney = kpiFilters.reduce((sum, p) => sum + (p.total - p.contract), 0)
    const reportedContracts = kpiFilters.reduce((sum, p) => sum + p.contract, 0)
    const eventsTracked = events?.filter((e) => new Date(e.date).getFullYear() === selectedYear).length || 42

    return { totalPrizeMoney, eventsTracked, reportedContracts }
  }, [kpiFilters, selectedYear])

  const lastSeasonData = useMemo(() => {
    const lastYear = selectedYear - 1
    const lastYearPlayers = getYearFilteredPlayers(playerRows, lastYear)

    let filteredLastYear = lastYearPlayers
    if (gender !== "all") {
      filteredLastYear = filteredLastYear.filter((p) => p.gender === gender)
    }
    if (tour !== "all") {
      const tourParam = tour.toUpperCase() as Tour
      filteredLastYear = filteredLastYear.filter((p) => (p.earningsByTour?.[tourParam] ?? 0) > 0)
    }

    const lastYearPrizeMoney = filteredLastYear.reduce((sum, p) => sum + (p.total - p.contract), 0)
    const lastYearContracts = filteredLastYear.reduce((sum, p) => sum + p.contract, 0)
    const lastYearEvents = events?.filter((e) => new Date(e.date).getFullYear() === lastYear).length || 38

    return {
      prizeMoney: lastYearPrizeMoney,
      contracts: lastYearContracts,
      events: lastYearEvents,
    }
  }, [playerRows, selectedYear, gender, tour])

  const prizeChangeAmount = totalPrizeMoney - lastSeasonData.prizeMoney
  const prizeChangePercent =
    lastSeasonData.prizeMoney > 0
      ? ((totalPrizeMoney - lastSeasonData.prizeMoney) / lastSeasonData.prizeMoney) * 100
      : 0

  const contractsChangeAmount = reportedContracts - lastSeasonData.contracts
  const contractsChangePercent =
    lastSeasonData.contracts > 0 ? ((reportedContracts - lastSeasonData.contracts) / lastSeasonData.contracts) * 100 : 0

  const eventsChangeAmount = eventsTracked - lastSeasonData.events
  const eventsChangePercent =
    lastSeasonData.events > 0 ? ((eventsTracked - lastSeasonData.events) / lastSeasonData.events) * 100 : 0

  const kpiPrefix = useMemo(() => {
    const prefix = composePrefix({ gender, tour })
    return prefix ? `${prefix} ` : ""
  }, [gender, tour])

  const tableHeading = useMemo(() => {
    return composeHeading({ year: selectedYear, gender, tour })
  }, [selectedYear, gender, tour])

  const activeFiltersLegacy = useMemo(() => {
    const filters = []
    if (search) filters.push({ key: "search", label: `Search: "${search}"`, value: search })
    if (gender !== "all")
      filters.push({ key: "gender", label: `Gender: ${gender === "M" ? "Men" : "Women"}`, value: gender })
    if (year !== currentYear.toString()) filters.push({ key: "year", label: `Year: ${year}`, value: year })
    if (tour !== "all") filters.push({ key: "tour", label: `Tour: ${tour.toUpperCase()}`, value: tour })
    if (contractTier !== "all") {
      const tierLabels = { gold: "Gold Card", standard: "Standard", futures: "Futures", unsigned: "Unsigned" }
      filters.push({ key: "contractTier", label: `Tier: ${tierLabels[contractTier]}`, value: contractTier })
    }
    return filters
  }, [search, gender, year, tour, contractTier, currentYear])

  const clearFilterLegacy = (key: string) => {
    if (key === "search") {
      setFilter({ search: null, page: "1" })
    } else if (key === "gender") {
      setFilter({ gender: null, page: "1" })
    } else if (key === "year") {
      setFilter({ year: currentYear.toString(), page: "1" })
    } else if (key === "tour") {
      setFilter({ tour: null, page: "1" })
    } else if (key === "contractTier") {
      setFilter({ contractTier: null, page: "1" })
    }
  }

  const clearAllFiltersLegacy = () => {
    setFilter({
      search: null,
      gender: null,
      year: currentYear.toString(),
      tour: null,
      contractTier: null,
      page: "1",
      sort: null,
      dir: null,
      pageSize: null,
    })
  }

  const SortIcon = ({ column }: { column: string }) => {
    if (sortColumn !== column) {
      return null
    }
    return sortDirection === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
  }

  const getGenderLabel = () => {
    if (gender === "all") return "All"
    return gender === "M" ? "Men" : "Women"
  }

  const showEmptyState = filteredAndSortedPlayers.length === 0 && tour !== "all"

  const handleApplyBothFilters = (newGender: Gender | "all", newYear: string) => {
    console.log("[v0] handleApplyBothFilters - called with gender:", newGender, "year:", newYear)

    setFilter({
      gender: newGender === "all" ? null : newGender,
      year: newYear !== currentYear.toString() ? newYear : null,
      page: "1",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <MobileFilterBar
        search={search}
        onSearchChange={handleSearchChange}
        activeFilters={activeFiltersLegacy}
        onClearFilter={clearFilterLegacy}
        onClearAll={clearAllFiltersLegacy}
        onOpenFilters={() => setIsFilterSheetOpen(true)}
      />

      <FilterBottomSheet
        isOpen={isFilterSheetOpen}
        onClose={() => setIsFilterSheetOpen(false)}
        gender={gender}
        year={year}
        contractTier={contractTier}
        onGenderChange={handleGenderChange}
        onYearChange={handleYearChange}
        onContractTierChange={handleContractTierChange}
        onApplyBothFilters={handleApplyBothFilters}
        onApplyFilters={() => setIsFilterSheetOpen(false)}
        onResetFilters={clearAllFiltersLegacy}
      />

      <main className="container py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Pro Pickleball Player Earnings</h1>
          <p className="text-base text-muted-foreground">
            View all tracked pro pickleball players ranked by earnings, with filters to explore by tour, gender, or
            year.
          </p>
          <p className="text-sm text-muted-foreground mt-3">
            Last DinkBank update: {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </p>
        </div>

        <PlayersFiltersClean
          search={search}
          gender={gender}
          year={year}
          contractTier={contractTier}
          onSearchChange={handleSearchChange}
          onGenderChange={handleGenderChange}
          onYearChange={handleYearChange}
          onContractTierChange={handleContractTierChange}
          onClearAll={clearAllFiltersLegacy}
          activeFilters={activeFiltersLegacy}
          onClearFilter={clearFilterLegacy}
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-6">
          <KpiCard
            title={`${kpiPrefix}Prize Money`}
            value={formatCurrencyUSD(totalPrizeMoney)}
            badge={`${selectedYear} Season`}
            comparison={{
              changeAmount: formatCurrencyUSD(prizeChangeAmount),
              changePercent: prizeChangePercent,
              isPositive: prizeChangeAmount >= 0,
            }}
          />
          <KpiCard
            title="Events Tracked"
            value={eventsTracked.toString()}
            badge={`${selectedYear} Season`}
            comparison={{
              changeAmount: eventsChangeAmount >= 0 ? `+${eventsChangeAmount}` : eventsChangeAmount.toString(),
              changePercent: eventsChangePercent,
              isPositive: eventsChangeAmount >= 0,
            }}
          />
          <KpiCard
            title={`${kpiPrefix}Contract Earnings`}
            value={formatCurrencyUSD(reportedContracts)}
            badge={`${selectedYear} Season`}
            comparison={{
              changeAmount: formatCurrencyUSD(contractsChangeAmount),
              changePercent: contractsChangePercent,
              isPositive: contractsChangeAmount >= 0,
            }}
          />
        </div>

        <Card className="p-6">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">{tableHeading}</h2>
            <p className="text-muted-foreground">{getSubtitle()}</p>
          </div>

          {showEmptyState ? (
            <div className="text-center py-12">
              <div className="bg-muted/30 rounded-lg p-8 max-w-md mx-auto">
                <h3 className="text-lg font-medium mb-2">No {tour.toUpperCase()} earnings found</h3>
                <p className="text-muted-foreground mb-4">
                  No {tour.toUpperCase()} earnings found for {year}{" "}
                  {gender === "all" ? "" : gender === "M" ? "men's" : "women's"} players. Try clearing filters.
                </p>
                <Button onClick={clearAllFiltersLegacy} variant="outline">
                  Clear all filters
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="hidden lg:block">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th
                          onClick={() => handleSort("rank")}
                          className={`text-center py-2 px-3 font-medium text-muted-foreground text-xs uppercase tracking-wider hover:bg-muted/20 cursor-pointer ${sortColumn === "rank" ? "bg-muted/40" : ""}`}
                          aria-sort={
                            sortColumn === "rank" ? (sortDirection === "asc" ? "ascending" : "descending") : "none"
                          }
                        >
                          <div className="flex items-center justify-center gap-1">
                            Rank <SortIcon column="rank" />
                          </div>
                        </th>
                        <th
                          onClick={() => handleSort("name")}
                          className={`text-left py-2 px-3 font-medium text-muted-foreground text-xs uppercase tracking-wider hover:bg-muted/20 cursor-pointer ${sortColumn === "name" ? "bg-muted/40" : ""}`}
                          aria-sort={
                            sortColumn === "name" ? (sortDirection === "asc" ? "ascending" : "descending") : "none"
                          }
                        >
                          <div className="flex items-center gap-1">
                            Player <SortIcon column="name" />
                          </div>
                        </th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground text-xs uppercase tracking-wider">
                          Contract Tier
                        </th>
                        <th
                          onClick={() => handleSort("ppa")}
                          className={`py-2 px-3 font-medium text-muted-foreground text-xs uppercase tracking-wider hover:bg-muted/20 cursor-pointer ${sortColumn === "ppa" ? "bg-muted/40" : ""}`}
                          aria-sort={
                            sortColumn === "ppa" ? (sortDirection === "asc" ? "ascending" : "descending") : "none"
                          }
                        >
                          <div className="grid grid-cols-[1fr_24px] gap-1.5 items-center">
                            <div className="text-right flex items-center justify-end gap-1">
                              PPA <SortIcon column="ppa" />
                            </div>
                            <div></div>
                          </div>
                        </th>
                        <th
                          onClick={() => handleSort("app")}
                          className={`py-2 px-3 font-medium text-muted-foreground text-xs uppercase tracking-wider hover:bg-muted/20 cursor-pointer ${sortColumn === "app" ? "bg-muted/40" : ""}`}
                          aria-sort={
                            sortColumn === "app" ? (sortDirection === "asc" ? "ascending" : "descending") : "none"
                          }
                        >
                          <div className="grid grid-cols-[1fr_24px] gap-1.5 items-center">
                            <div className="text-right flex items-center justify-end gap-1">
                              APP <SortIcon column="app" />
                            </div>
                            <div></div>
                          </div>
                        </th>
                        <th
                          onClick={() => handleSort("mlp")}
                          className={`py-2 px-3 font-medium text-muted-foreground text-xs uppercase tracking-wider hover:bg-muted/20 cursor-pointer ${sortColumn === "mlp" ? "bg-muted/40" : ""}`}
                          aria-sort={
                            sortColumn === "mlp" ? (sortDirection === "asc" ? "ascending" : "descending") : "none"
                          }
                        >
                          <div className="grid grid-cols-[1fr_24px] gap-1.5 items-center">
                            <div className="text-right flex items-center justify-end gap-1">
                              MLP <SortIcon column="mlp" />
                            </div>
                            <div></div>
                          </div>
                        </th>
                        <th
                          onClick={() => handleSort("contract")}
                          className={`py-2 px-3 font-medium text-muted-foreground text-xs uppercase tracking-wider hover:bg-muted/20 cursor-pointer ${sortColumn === "contract" ? "bg-muted/40" : ""}`}
                          aria-sort={
                            sortColumn === "contract"
                              ? sortDirection === "asc"
                                ? "ascending"
                                : "descending"
                              : "none"
                          }
                        >
                          <div className="grid grid-cols-[1fr_24px] gap-1.5 items-center">
                            <div className="text-right flex items-center justify-end gap-1">
                              Contracts <SortIcon column="contract" />
                            </div>
                            <div></div>
                          </div>
                        </th>
                        <th
                          onClick={() => handleSort("total")}
                          className={`bg-muted/30 py-2 px-3 font-medium text-muted-foreground text-xs uppercase tracking-wider hover:bg-muted/20 cursor-pointer ${sortColumn === "total" ? "bg-muted/40" : ""}`}
                          aria-sort={
                            sortColumn === "total" ? (sortDirection === "asc" ? "ascending" : "descending") : "none"
                          }
                        >
                          <div className="grid grid-cols-[1fr_24px] gap-1.5 items-center">
                            <div className="text-right flex items-center justify-end gap-1">
                              Total <SortIcon column="total" />
                            </div>
                            <div></div>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedPlayers.map((player) => {
                        return (
                          <tr key={player.id} className="border-b hover:bg-muted/20">
                            <td className="text-center p-3 font-semibold tabular-nums">#{player.rank}</td>
                            <td className="p-3">
                              <PlayerProfileLink
                                href={`/players/${player.slug}`}
                                name={player.name}
                                gender={player.gender}
                                location={player.nation}
                                headshotUrl={player.headshotUrl}
                                showImage={false}
                              />
                            </td>
                            <td className="whitespace-nowrap px-3 py-3.5 align-middle">
                              {player.contractTier && <ContractTierBadge tier={player.contractTier} />}
                            </td>
                            <td className="text-right p-3">
                              <div className="grid grid-cols-[1fr_24px] gap-1.5 items-center">
                                <div className="text-right tabular-nums">
                                  {player.ppa > 0 ? formatCurrencyUSD(player.ppa) : "—"}
                                </div>
                                <div className="flex items-center justify-center">
                                  {player.ppa > 0 && <VerificationStamp variant="verified" />}
                                </div>
                              </div>
                            </td>
                            <td className="text-right p-3">
                              <div className="grid grid-cols-[1fr_24px] gap-1.5 items-center">
                                <div className="text-right tabular-nums">
                                  {player.app > 0 ? formatCurrencyUSD(player.app) : "—"}
                                </div>
                                <div className="flex items-center justify-center">
                                  {player.app > 0 && <VerificationStamp variant="verified" />}
                                </div>
                              </div>
                            </td>
                            <td className="text-right p-3">
                              <div className="grid grid-cols-[1fr_24px] gap-1.5 items-center">
                                <div className="text-right tabular-nums">
                                  {player.mlp > 0 ? formatCurrencyUSD(player.mlp) : "—"}
                                </div>
                                <div className="flex items-center justify-center">
                                  {player.mlp > 0 && <VerificationStamp variant="verified" />}
                                </div>
                              </div>
                            </td>
                            <td className="text-right p-3">
                              <div className="grid grid-cols-[1fr_24px] gap-1.5 items-center">
                                <div className="text-right tabular-nums text-[#737373]">
                                  {player.contract > 0 ? formatCurrencyUSD(player.contract) : "—"}
                                </div>
                                <div className="flex items-center justify-center">
                                  {player.contract > 0 && <VerificationStamp variant="estimated" />}
                                </div>
                              </div>
                            </td>
                            <td className="bg-muted/30 font-semibold tabular-nums text-right p-3">
                              <div className="grid grid-cols-[1fr_24px] gap-1.5 items-center">
                                <div className="text-right tabular-nums text-[#737373] font-semibold">
                                  {formatCurrencyUSD(player.total)}
                                </div>
                                <div className="flex items-center justify-center">
                                  <VerificationStamp variant="estimated" />
                                </div>
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan={7} className="px-3 py-3 bg-gray-50/50 border-t text-sm text-muted-foreground">
                          <strong className="font-semibold">DinkBank Methodology:</strong> Confirmed figures are verified using official or reputable public sources. Other figures are DinkBank estimates and may be updated. Contract amounts reflect base retainers only and exclude endorsements, appearance fees, and off-tour income. All amounts in USD.
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              <div className="lg:hidden space-y-4">
                {paginatedPlayers.map((player) => {
                  return (
                    <Link
                      key={player.id}
                      href={`/players/${player.slug}`}
                      className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-2xl"
                    >
                      <div className="relative bg-muted/30 rounded-2xl p-4 shadow-sm border overflow-hidden space-y-2 hover:bg-muted/50 active:scale-[0.98] transition-all min-h-[44px]">
                        <div className="flex items-start gap-3">
                          <Avatar className="size-14 rounded-full object-cover shrink-0 border border-gray-300">
                            <AvatarFallback className="text-sm font-semibold">
                              {player.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .slice(0, 2)
                                .toUpperCase()}
                            </AvatarFallback>
                          </Avatar>

                          <div className="min-w-0 flex-1">
                            <div className="text-sm text-muted-foreground font-medium">#{player.rank}</div>
                            <div className="text-lg sm:text-xl font-semibold leading-tight truncate">{player.name}</div>
                            <div className="text-xs text-muted-foreground mt-0.5">
                              {player.gender === "M" ? "Men" : "Women"} • {player.nation || "—"}
                            </div>
                            {player.contractTier && (
                              <div className="mt-1.5">
                                <ContractTierBadge tier={player.contractTier} />
                              </div>
                            )}
                            <div className="mt-2 flex items-center gap-2">
                              <div className="text-2xl sm:text-3xl font-extrabold tabular-nums break-words text-[#737373]">
                                {formatCurrencyUSD(player.total)}
                              </div>
                              <VerificationStamp variant="estimated" />
                            </div>
                          </div>

                          <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0 mt-1" />
                        </div>

                        <div className="mt-2 grid grid-cols-1 gap-y-1 text-sm">
                          <div className="flex items-baseline justify-between gap-3">
                            <span className="text-muted-foreground">PPA:</span>
                            <div className="flex items-center gap-1.5">
                              <span className="font-medium tabular-nums">
                                {player.ppa > 0 ? formatCurrencyUSD(player.ppa) : "—"}
                              </span>
                              {player.ppa > 0 && <VerificationStamp variant="verified" />}
                            </div>
                          </div>
                          <div className="flex items-baseline justify-between gap-3">
                            <span className="text-muted-foreground">APP:</span>
                            <div className="flex items-center gap-1.5">
                              <span className="font-medium tabular-nums">
                                {player.app > 0 ? formatCurrencyUSD(player.app) : "—"}
                              </span>
                              {player.app > 0 && <VerificationStamp variant="verified" />}
                            </div>
                          </div>
                          <div className="flex items-baseline justify-between gap-3">
                            <span className="text-muted-foreground">MLP:</span>
                            <div className="flex items-center gap-1.5">
                              <span className="font-medium tabular-nums">
                                {player.mlp > 0 ? formatCurrencyUSD(player.mlp) : "—"}
                              </span>
                              {player.mlp > 0 && <VerificationStamp variant="verified" />}
                            </div>
                          </div>
                          <div className="flex items-baseline justify-between gap-3">
                            <span className="text-muted-foreground">Contract:</span>
                            <div className="flex items-center gap-1.5">
                              <span className="font-medium tabular-nums text-[#737373]">
                                {player.contract > 0 ? formatCurrencyUSD(player.contract) : "—"}
                              </span>
                              {player.contract > 0 && <VerificationStamp variant="estimated" />}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>

              <div className="flex items-center justify-between mt-6 pt-4 border-t">
                <div className="hidden lg:flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Show:</span>
                  <Select value={pageSize.toString()} onValueChange={(value) => handlePageSizeChange(Number(value))}>
                    <SelectTrigger className="w-20 h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="25">25</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                      <SelectItem value="100">100</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="hidden lg:flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Prev
                  </Button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const page = i + 1
                      return (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => handlePageChange(page)}
                          className="w-8 h-8 p-0"
                        >
                          {page}
                        </Button>
                      )
                    })}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>

                <div className="lg:hidden flex items-center justify-center gap-2 w-full">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Prev
                  </Button>

                  <span className="text-sm text-muted-foreground px-2">
                    {currentPage} of {totalPages}
                  </span>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>


            </>
          )}
        </Card>

        <Card className="mt-6 mb-6">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <img src="/images/dinkbank-favicon.png" alt="DinkBank" className="w-6 h-6" />
              <h2 className="text-xl font-bold">DinkBank Data</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              DinkBank provides structured earnings data for professional pickleball, including prize money, contracts,
              and season-long performance across major tours. Some figures shown are estimates based on public
              information and internal modeling and are refined as new data becomes available. Our goal is to offer a
              clear, transparent view of how players are compensated throughout the season.{" "}
              <Link href="/about" className="underline hover:text-[#1F1F1F]">
                Learn More
              </Link>
            </p>
          </div>
        </Card>
      </main>
    </div>
  )
}

export default function PlayersPageClient() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background">
          <main className="container py-6">
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading players...</p>
              </div>
            </div>
          </main>
        </div>
      }
    >
      <PlayersPageContent />
    </Suspense>
  )
}
