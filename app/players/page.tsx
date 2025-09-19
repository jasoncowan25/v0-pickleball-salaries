"use client"

import { useMemo, useTransition } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Search, ChevronLeft, ChevronRight, ArrowUp, ArrowDown, X, Info } from "lucide-react"
import { mockPlayers, events } from "@/lib/mock-data"
import type { Gender } from "@/lib/mock-data"
import { TourBadges } from "@/components/TourBadges"
import { computePrimaryTour, visibleTours, type TourCode } from "@/lib/tours"
import { KpiCard } from "@/components/kpi-card"
import { mergeSearchParams, stripEmpty } from "@/lib/url"

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
}

type Money = number

function getYearFilteredPlayers(allPlayers: PlayerRow[], year: number): PlayerRow[] {
  // For now, return all players as we don't have year-specific filtering in the data structure
  return allPlayers
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

const formatUSD = (amount: number): string => {
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

export default function PlayersPage() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const search = searchParams.get("search") || ""
  const year = searchParams.get("year") || "2024"
  const gender = (searchParams.get("gender") as Gender | "all") || "all"
  const sortColumn = searchParams.get("sort") || "total"
  const sortDirection = (searchParams.get("dir") as "asc" | "desc") || "desc"
  const currentPage = Number.parseInt(searchParams.get("page") || "1")
  const pageSize = Number.parseInt(searchParams.get("pageSize") || "25")

  function setFilter(updates: Record<string, string | undefined | null>) {
    const merged = mergeSearchParams(searchParams, updates)
    const cleaned = stripEmpty(merged)
    const qs = cleaned.toString()
    const href = qs ? `${pathname}?${qs}` : pathname

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
      }
    })
  }, [])

  const filteredAndSortedPlayers = useMemo(() => {
    const filtered = playerRows.filter((player) => {
      if (gender !== "all" && player.gender !== gender) return false
      if (search && !player.name.toLowerCase().includes(search.toLowerCase())) return false
      return true
    })

    filtered.sort((a, b) => {
      let aValue: any = a[sortColumn as keyof PlayerRow]
      let bValue: any = b[sortColumn as keyof PlayerRow]

      if (sortColumn === "name") {
        aValue = aValue.toLowerCase()
        bValue = bValue.toLowerCase()
      } else if (typeof aValue === "number") {
      } else {
        aValue = toNumber(aValue)
        bValue = toNumber(bValue)
      }

      if (sortDirection === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
      }
    })

    return rankize(filtered)
  }, [playerRows, gender, search, sortColumn, sortDirection])

  const totalPages = Math.ceil(filteredAndSortedPlayers.length / pageSize)
  const paginatedPlayers = filteredAndSortedPlayers.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  const getTitle = () => {
    const genderLabel = gender === "all" ? "" : gender === "F" ? "Women's " : "Men's "
    return `${year} ${genderLabel}Player Earnings`
  }

  const getSubtitle = () => {
    return `Showing ${paginatedPlayers.length} of ${filteredAndSortedPlayers.length} players`
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
    setFilter({ gender: newGender === "all" ? null : newGender, page: "1" })
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
    setFilter({ year: newYear, page: "1" })
  }

  const selectedYear = Number.parseInt(year)
  const { totalPrizeMoney, eventsTracked, reportedContracts } = computeGlobalTotalsForYear(playerRows, selectedYear)

  const activeFilters = useMemo(() => {
    const filters = []
    if (search) filters.push({ key: "search", label: `Search: "${search}"`, value: search })
    if (gender !== "all")
      filters.push({ key: "gender", label: `Gender: ${gender === "M" ? "Men" : "Women"}`, value: gender })
    if (year !== "2024") filters.push({ key: "year", label: `Year: ${year}`, value: year })
    return filters
  }, [search, gender, year])

  const clearFilter = (key: string) => {
    if (key === "search") {
      setFilter({ search: null, page: "1" })
    } else if (key === "gender") {
      setFilter({ gender: null, page: "1" })
    } else if (key === "year") {
      setFilter({ year: null, page: "1" }) // Remove year parameter instead of setting to "2024"
    }
  }

  const clearAllFilters = () => {
    setFilter({
      search: null,
      gender: null,
      year: null,
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

  return (
    <div className="min-h-screen bg-background">
      <main className="container py-6">
        <div className="border-b pb-2 mb-4">
          <div className="grid grid-cols-12 gap-3 md:gap-4 items-end mb-4">
            <div className="col-span-12 md:col-span-8">
              <div className="sr-only">Search players</div>
              <div className="relative w-full">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  className="pl-8 h-11 w-full"
                  placeholder="Search players..."
                  value={search}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  aria-label="Search players"
                />
              </div>
            </div>

            <div className="col-span-6 md:col-span-2">
              <div className="sr-only">Gender</div>
              <Select value={gender} onValueChange={handleGenderChange}>
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
              <Select value={year} onValueChange={handleYearChange}>
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
                    onClick={() => clearFilter(filter.key)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
              <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                Clear all
              </Button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 mb-4">
          <h3 className="text-sm font-medium text-muted-foreground">KPI Scope</h3>
          <TooltipProvider delayDuration={150}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  aria-label="KPI details"
                  className="inline-flex h-5 w-5 items-center justify-center text-muted-foreground hover:text-foreground"
                >
                  <Info className="h-4 w-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom" align="start" className="max-w-xs text-sm">
                <p>Scope reflects filters applied (year, gender, search)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-6">
          <KpiCard title={`Total Prize Money (${selectedYear})`} value={formatUSD(totalPrizeMoney)} />
          <KpiCard title={`Events Tracked (${selectedYear})`} value={eventsTracked.toString()} />
          <KpiCard
            title="Reported Contracts"
            value={formatUSD(reportedContracts)}
            tooltip="Reported player contracts and sponsorships, based on available sources"
          />
        </div>

        <Card className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
            <div>
              <h2 className="text-lg font-semibold">{getTitle()}</h2>
              <p className="text-sm text-muted-foreground">{getSubtitle()}</p>

              {(gender !== "all" || (search?.length ?? 0) > 0) && (
                <p className="mt-1 text-xs text-muted-foreground">
                  Filtered by:
                  {gender !== "all" && <span className="ml-1">Gender = {gender === "M" ? "Men" : "Women"}</span>}
                  {(search?.length ?? 0) > 0 && <span className="ml-2">Search = "{search}"</span>}
                </p>
              )}
            </div>
            <div className="text-xs text-muted-foreground md:text-right">
              Last updated: {new Date().toLocaleDateString()}
            </div>
          </div>

          <div className="hidden md:block">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-center p-3">
                      <div
                        onClick={() => handleSort("rank")}
                        className={`font-semibold hover:bg-muted/20 px-2 py-1 rounded transition-colors cursor-pointer flex items-center justify-center gap-1 ${sortColumn === "rank" || sortColumn === "total" ? "bg-muted/40" : ""}`}
                        aria-sort={
                          sortColumn === "rank" || sortColumn === "total"
                            ? sortDirection === "asc"
                              ? "ascending"
                              : "descending"
                            : "none"
                        }
                      >
                        Rank <SortIcon column="rank" />
                      </div>
                    </th>
                    <th className="text-left p-3">
                      <div
                        onClick={() => handleSort("name")}
                        className={`font-semibold hover:bg-muted/20 px-2 py-1 rounded transition-colors cursor-pointer flex items-center gap-1 ${sortColumn === "name" ? "bg-muted/40" : ""}`}
                        aria-sort={
                          sortColumn === "name" ? (sortDirection === "asc" ? "ascending" : "descending") : "none"
                        }
                      >
                        Player <SortIcon column="name" />
                      </div>
                    </th>
                    <th className="text-left p-3">
                      <div className="font-semibold px-2 py-1">Tours</div>
                    </th>
                    <th className="text-right p-3">
                      <div
                        onClick={() => handleSort("ppa")}
                        className={`font-semibold hover:bg-muted/20 px-2 py-1 rounded transition-colors cursor-pointer flex items-center justify-end gap-1 ${sortColumn === "ppa" ? "bg-muted/40" : ""}`}
                        aria-sort={
                          sortColumn === "ppa" ? (sortDirection === "asc" ? "ascending" : "descending") : "none"
                        }
                      >
                        PPA <SortIcon column="ppa" />
                      </div>
                    </th>
                    <th className="text-right p-3">
                      <div
                        onClick={() => handleSort("app")}
                        className={`font-semibold hover:bg-muted/20 px-2 py-1 rounded transition-colors cursor-pointer flex items-center justify-end gap-1 ${sortColumn === "app" ? "bg-muted/40" : ""}`}
                        aria-sort={
                          sortColumn === "app" ? (sortDirection === "asc" ? "ascending" : "descending") : "none"
                        }
                      >
                        APP <SortIcon column="app" />
                      </div>
                    </th>
                    <th className="text-right p-3">
                      <div
                        onClick={() => handleSort("mlp")}
                        className={`font-semibold hover:bg-muted/20 px-2 py-1 rounded transition-colors cursor-pointer flex items-center justify-end gap-1 ${sortColumn === "mlp" ? "bg-muted/40" : ""}`}
                        aria-sort={
                          sortColumn === "mlp" ? (sortDirection === "asc" ? "ascending" : "descending") : "none"
                        }
                      >
                        MLP <SortIcon column="mlp" />
                      </div>
                    </th>
                    <th className="text-right p-3">
                      <div
                        onClick={() => handleSort("major")}
                        className={`font-semibold hover:bg-muted/20 px-2 py-1 rounded transition-colors cursor-pointer flex items-center justify-end gap-1 ${sortColumn === "major" ? "bg-muted/40" : ""}`}
                        aria-sort={
                          sortColumn === "major" ? (sortDirection === "asc" ? "ascending" : "descending") : "none"
                        }
                      >
                        Majors <SortIcon column="major" />
                      </div>
                    </th>
                    <th className="text-right p-3">
                      <TooltipProvider delayDuration={150}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div
                              onClick={() => handleSort("contract")}
                              className={`font-semibold hover:bg-muted/20 px-2 py-1 rounded transition-colors cursor-pointer flex items-center justify-end gap-1 ${sortColumn === "contract" ? "bg-muted/40" : ""}`}
                              aria-sort={
                                sortColumn === "contract"
                                  ? sortDirection === "asc"
                                    ? "ascending"
                                    : "descending"
                                  : "none"
                              }
                            >
                              Contract <Info className="h-3 w-3 ml-1" /> <SortIcon column="contract" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent side="bottom" align="end" className="max-w-xs text-sm">
                            <p>Reported player contracts and sponsorships, based on available sources</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </th>
                    <th className="text-right p-3 bg-muted/30">
                      <div
                        onClick={() => handleSort("total")}
                        className={`font-semibold hover:bg-muted/20 px-2 py-1 rounded transition-colors cursor-pointer flex items-center justify-end gap-1 ${sortColumn === "total" ? "bg-muted/60" : ""}`}
                        aria-sort={
                          sortColumn === "total" ? (sortDirection === "asc" ? "ascending" : "descending") : "none"
                        }
                      >
                        Total <SortIcon column="total" />
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
                          <Link href={`/players/${player.slug}`} className="block">
                            <div className="flex items-center gap-3 hover:underline font-medium transition-all">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={player.headshotUrl || "/placeholder.svg"} alt={player.name} />
                                <AvatarFallback>
                                  {player.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{player.name}</div>
                                <div className="text-sm text-muted-foreground">
                                  {player.gender} • {player.nation}
                                </div>
                              </div>
                            </div>
                          </Link>
                        </td>
                        <td className="whitespace-nowrap px-3 py-3.5 align-middle">
                          <TourBadges tours={player.tours || []} primary={player.primaryTour} />
                        </td>
                        <td className="text-right p-3 tabular-nums text-base text-secondary-foreground">
                          {player.ppa > 0 ? formatUSD(player.ppa) : "—"}
                        </td>
                        <td className="text-right p-3 tabular-nums text-secondary-foreground">
                          {player.app > 0 ? formatUSD(player.app) : "—"}
                        </td>
                        <td className="text-right p-3 tabular-nums text-secondary-foreground">
                          {player.mlp > 0 ? formatUSD(player.mlp) : "—"}
                        </td>
                        <td className="text-right p-3 tabular-nums text-secondary-foreground">
                          {player.major > 0 ? formatUSD(player.major) : "—"}
                        </td>
                        <td className="text-right p-3 tabular-nums">
                          {player.contract > 0 ? formatUSD(player.contract) : "—"}
                        </td>
                        <td className="bg-muted/30 font-semibold tabular-nums text-right p-3">
                          {formatUSD(player.total)}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="md:hidden space-y-4">
            {paginatedPlayers.map((player) => {
              return (
                <div key={player.id} className="bg-muted/30 rounded-lg p-4 shadow-sm border space-y-2">
                  <div className="flex items-center justify-between">
                    <Link
                      href={`/players/${player.slug}`}
                      className="flex items-center gap-3 hover:underline font-medium transition-all"
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={player.headshotUrl || "/placeholder.svg"} alt={player.name} />
                        <AvatarFallback className="text-sm font-semibold">
                          {player.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="font-medium">
                        #{player.rank} {player.name}
                      </div>
                    </Link>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/players/${player.slug}`}>View</Link>
                    </Button>
                  </div>

                  <div className="text-2xl font-bold tabular-nums">{formatUSD(player.total)}</div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <TourBadges tours={player.tours || []} primary={player.primaryTour} mobile={true} />
                  </div>

                  <div className="grid grid-cols-2 gap-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">PPA:</span>
                      <span className="tabular-nums">{player.ppa > 0 ? formatUSD(player.ppa) : "—"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">APP:</span>
                      <span className="tabular-nums">{player.app > 0 ? formatUSD(player.app) : "—"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">MLP:</span>
                      <span className="tabular-nums">{player.mlp > 0 ? formatUSD(player.mlp) : "—"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Majors:</span>
                      <span className="tabular-nums">{player.major > 0 ? formatUSD(player.major) : "—"}</span>
                    </div>
                    <div className="flex justify-between col-span-2">
                      <span className="text-muted-foreground">Contract:</span>
                      <span className="tabular-nums">{player.contract > 0 ? formatUSD(player.contract) : "—"}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="flex items-center justify-between mt-6 pt-4 border-t">
            <div className="flex items-center gap-2">
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

            <div className="flex items-center gap-2">
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
          </div>

          <div className="pt-3 border-t mt-3 text-xs text-muted-foreground">
            All amounts in USD.{" "}
            <Link href="/methodology" className="underline hover:no-underline">
              See Methodology →
            </Link>
          </div>
        </Card>
      </main>
    </div>
  )
}
