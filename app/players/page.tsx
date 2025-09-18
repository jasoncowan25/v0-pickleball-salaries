"use client"

import { useState, useMemo } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, ChevronLeft, ChevronRight, ArrowUp, ArrowDown, X } from "lucide-react"
import { mockPlayers } from "@/lib/mock-data"
import type { Gender } from "@/lib/mock-data"
import { TourBadges } from "@/components/TourBadges"
import { computePrimaryTour, visibleTours, type TourCode } from "@/lib/tours"
import { KpiCard } from "@/components/kpi-card"

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
  const searchParams = useSearchParams()

  const [search, setSearch] = useState(searchParams.get("search") || "")
  const [year, setYear] = useState(searchParams.get("year") || "2024")
  const [gender, setGender] = useState<Gender | "all">((searchParams.get("gender") as Gender | "all") || "all")
  const [sortColumn, setSortColumn] = useState(searchParams.get("sort") || "total")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">(
    (searchParams.get("dir") as "asc" | "desc") || "desc",
  )
  const [currentPage, setCurrentPage] = useState(Number.parseInt(searchParams.get("page") || "1"))
  const [pageSize, setPageSize] = useState(Number.parseInt(searchParams.get("pageSize") || "25"))
  const [scope, setScope] = useState(searchParams.get("scope") || "filters")

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

  const updateURL = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString())
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
    })
    router.push(`?${params.toString()}`, { scroll: false })
  }

  const handleSort = (column: string) => {
    if (column === "rank") {
      setSortColumn("total")
      setSortDirection("desc")
      updateURL({ sort: "total", dir: "desc" })
    } else {
      const newDirection = sortColumn === column && sortDirection === "desc" ? "asc" : "desc"
      setSortColumn(column)
      setSortDirection(newDirection)
      updateURL({ sort: column, dir: newDirection })
    }
  }

  const handleGenderChange = (newGender: Gender | "all") => {
    setGender(newGender)
    setCurrentPage(1)
    updateURL({ gender: newGender === "all" ? "" : newGender, page: "1" })
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    updateURL({ page: page.toString() })
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handlePageSizeChange = (size: number) => {
    setPageSize(size)
    setCurrentPage(1)
    updateURL({ pageSize: size.toString(), page: "1" })
  }

  const handleSearchChange = (value: string) => {
    setSearch(value)
    setCurrentPage(1)
    updateURL({ search: value || "", page: "1" })
  }

  const handleYearChange = (newYear: string) => {
    setYear(newYear)
    setCurrentPage(1)
    updateURL({ year: newYear, page: "1" })
  }

  const kpiData = useMemo(() => {
    const dataSet = scope === "all" ? playerRows : filteredAndSortedPlayers
    const totalPrizeMoney = dataSet.reduce((sum, player) => sum + (player.total - player.contract), 0)
    const totalContracts = dataSet.reduce((sum, player) => sum + player.contract, 0)
    const eventsCount = 42 // Mock stable count based on current data

    return {
      totalPrizeMoney,
      totalContracts,
      eventsCount,
    }
  }, [playerRows, filteredAndSortedPlayers, scope])

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
      setSearch("")
      updateURL({ search: "" })
    } else if (key === "gender") {
      setGender("all")
      updateURL({ gender: "" })
    } else if (key === "year") {
      setYear("2024")
      updateURL({ year: "2024" })
    }
    setCurrentPage(1)
  }

  const clearAllFilters = () => {
    setSearch("")
    setGender("all")
    setYear("2024")
    setCurrentPage(1)
    updateURL({ search: "", gender: "", year: "2024", page: "1" })
  }

  const SortIcon = ({ column }: { column: string }) => {
    if (sortColumn !== column) {
      return null
    }
    return sortDirection === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
  }

  const selectedYear = Number.parseInt(year)

  return (
    <div className="min-h-screen bg-background">
      <main className="container py-6">
        <div className="sticky top-[var(--header-height,56px)] z-20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b pb-2 mb-4">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between mb-4">
            <div className="flex-1">
              <div className="text-xs font-medium text-muted-foreground mb-1">Search players</div>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  className="pl-8"
                  placeholder="Search players..."
                  value={search}
                  onChange={(e) => handleSearchChange(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:w-[440px]">
              <div>
                <div className="text-xs font-medium text-muted-foreground mb-1">Gender</div>
                <Select value={gender} onValueChange={handleGenderChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="M">Men</SelectItem>
                    <SelectItem value="F">Women</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <div className="text-xs font-medium text-muted-foreground mb-1">Year</div>
                <Select value={year} onValueChange={handleYearChange}>
                  <SelectTrigger>
                    <SelectValue />
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

        <div className="grid gap-4 md:grid-cols-3 mb-6">
          <KpiCard title={`Total Prize Money (${year})`} value={formatUSD(kpiData.totalPrizeMoney)} />
          <KpiCard title={`Events Tracked (${year})`} value={kpiData.eventsCount.toString()} />
          <KpiCard title="Reported Contracts" value={formatUSD(kpiData.totalContracts)} />
        </div>

        <div className="flex items-center gap-2 mb-6">
          <span className="text-sm text-muted-foreground">KPI Scope:</span>
          <Select
            value={scope}
            onValueChange={(value) => {
              setScope(value)
              updateURL({ scope: value })
            }}
          >
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="filters">Current Filters</SelectItem>
              <SelectItem value="all">All {year}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
            <div>
              <h2 className="text-lg font-semibold">{getTitle()}</h2>
              <p className="text-sm text-muted-foreground">{getSubtitle()}</p>
            </div>
            <div className="text-xs text-muted-foreground md:text-right">
              Last updated: {new Date().toLocaleDateString()}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-2 text-xs">
            <span className="text-muted-foreground">Legend:</span>
            <Badge className="bg-blue-100 text-blue-800">PPA</Badge>
            <Badge className="bg-green-100 text-green-800">MLP</Badge>
            <Badge className="bg-purple-100 text-purple-800">APP</Badge>
            <Badge className="bg-muted text-foreground/80">Major</Badge>
          </div>

          <div className="hidden md:block">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="sticky top-0 bg-background">
                  <tr className="border-b">
                    <th className="text-center p-3">
                      <div
                        onClick={() => handleSort("rank")}
                        className={`font-semibold hover:bg-muted/20 px-2 py-1 rounded transition-colors cursor-pointer flex items-center justify-center gap-1 ${sortColumn === "rank" || sortColumn === "total" ? "bg-muted/40" : ""}`}
                      >
                        Rank <SortIcon column="rank" />
                      </div>
                    </th>
                    <th className="text-left p-3">
                      <div
                        onClick={() => handleSort("name")}
                        className={`font-semibold hover:bg-muted/20 px-2 py-1 rounded transition-colors cursor-pointer flex items-center gap-1 ${sortColumn === "name" ? "bg-muted/40" : ""}`}
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
                      >
                        PPA <SortIcon column="ppa" />
                      </div>
                    </th>
                    <th className="text-right p-3">
                      <div
                        onClick={() => handleSort("app")}
                        className={`font-semibold hover:bg-muted/20 px-2 py-1 rounded transition-colors cursor-pointer flex items-center justify-end gap-1 ${sortColumn === "app" ? "bg-muted/40" : ""}`}
                      >
                        APP <SortIcon column="app" />
                      </div>
                    </th>
                    <th className="text-right p-3">
                      <div
                        onClick={() => handleSort("mlp")}
                        className={`font-semibold hover:bg-muted/20 px-2 py-1 rounded transition-colors cursor-pointer flex items-center justify-end gap-1 ${sortColumn === "mlp" ? "bg-muted/40" : ""}`}
                      >
                        MLP <SortIcon column="mlp" />
                      </div>
                    </th>
                    <th className="text-right p-3">
                      <div
                        onClick={() => handleSort("major")}
                        className={`font-semibold hover:bg-muted/20 px-2 py-1 rounded transition-colors cursor-pointer flex items-center justify-end gap-1 ${sortColumn === "major" ? "bg-muted/40" : ""}`}
                      >
                        Major <SortIcon column="major" />
                      </div>
                    </th>
                    <th className="text-right p-3">
                      <div
                        onClick={() => handleSort("contract")}
                        className={`font-semibold hover:bg-muted/20 px-2 py-1 rounded transition-colors cursor-pointer flex items-center justify-end gap-1 ${sortColumn === "contract" ? "bg-muted/40" : ""}`}
                      >
                        Contract <SortIcon column="contract" />
                      </div>
                    </th>
                    <th className="text-right p-3 bg-muted/40">
                      <div
                        onClick={() => handleSort("total")}
                        className={`font-semibold hover:bg-muted/20 px-2 py-1 rounded transition-colors cursor-pointer flex items-center justify-end gap-1 ${sortColumn === "total" ? "bg-muted/60" : ""}`}
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

                  <div className="flex items-center gap-2 flex-wrap">
                    <TourBadges tours={player.tours || []} primary={player.primaryTour} mobile={true} />
                  </div>

                  <div className="space-y-1">
                    <div className="text-2xl font-bold tabular-nums">
                      <span className="text-xs text-muted-foreground">Year Total</span>
                      <div>{formatUSD(player.total)}</div>
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
                        <span className="text-muted-foreground">Major:</span>
                        <span className="tabular-nums">{player.major > 0 ? formatUSD(player.major) : "—"}</span>
                      </div>
                      <div className="flex justify-between col-span-2">
                        <span className="text-muted-foreground">Contract:</span>
                        <span className="tabular-nums">{player.contract > 0 ? formatUSD(player.contract) : "—"}</span>
                      </div>
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
