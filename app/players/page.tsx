"use client"

import { useState, useMemo } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, ArrowUp, ArrowDown, Search } from "lucide-react"
import { mockPlayers } from "@/lib/mock-data"
import type { Gender } from "@/lib/mock-data"

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
}

const formatUSD = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount)
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

  const playerRows: PlayerRow[] = useMemo(() => {
    return mockPlayers.map((player) => {
      const totalPrize = player.totals.ytdPrize
      const ppa = player.primaryTour === "PPA" ? Math.floor(totalPrize * 0.6) : Math.floor(totalPrize * 0.2)
      const app = player.primaryTour === "APP" ? Math.floor(totalPrize * 0.6) : Math.floor(totalPrize * 0.15)
      const mlp = player.primaryTour === "MLP" ? Math.floor(totalPrize * 0.6) : Math.floor(totalPrize * 0.15)
      const major = Math.floor(totalPrize * 0.1)
      const contract = player.totals.reportedContracts || 0

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

  const SortIcon = ({ column }: { column: string }) => {
    if (sortColumn !== column) {
      return null
    }
    return sortDirection === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{getTitle()}</h1>
          <p className="text-muted-foreground">{getSubtitle()}</p>
        </div>

        <div className="mb-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search players..."
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={year} onValueChange={handleYearChange}>
              <SelectTrigger className="w-full sm:w-32">
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

          <div className="flex gap-2">
            <Button
              variant={gender === "all" ? "default" : "outline"}
              onClick={() => handleGenderChange("all")}
              className="rounded-full"
            >
              All Genders
            </Button>
            <Button
              variant={gender === "M" ? "default" : "outline"}
              onClick={() => handleGenderChange("M")}
              className="rounded-full"
            >
              Men
            </Button>
            <Button
              variant={gender === "F" ? "default" : "outline"}
              onClick={() => handleGenderChange("F")}
              className="rounded-full"
            >
              Women
            </Button>
          </div>
        </div>

        <Card className="p-6">
          <div className="hidden md:block">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="sticky top-0 bg-background">
                  <tr className="border-b">
                    <th className="text-center p-3">
                      <button
                        onClick={() => handleSort("rank")}
                        className="font-semibold hover:bg-yellow-100 px-2 py-1 rounded transition-colors"
                      >
                        Rank <SortIcon column="rank" />
                      </button>
                    </th>
                    <th className="text-left p-3">
                      <button
                        onClick={() => handleSort("name")}
                        className="font-semibold hover:bg-yellow-100 px-2 py-1 rounded transition-colors"
                      >
                        Player <SortIcon column="name" />
                      </button>
                    </th>
                    <th className="text-right p-3">
                      <button
                        onClick={() => handleSort("ppa")}
                        className={`font-semibold hover:bg-yellow-100 px-2 py-1 rounded transition-colors ${sortColumn === "ppa" ? "bg-muted/40" : ""}`}
                      >
                        PPA <SortIcon column="ppa" />
                      </button>
                    </th>
                    <th className="text-right p-3">
                      <button
                        onClick={() => handleSort("app")}
                        className={`font-semibold hover:bg-yellow-100 px-2 py-1 rounded transition-colors ${sortColumn === "app" ? "bg-muted/40" : ""}`}
                      >
                        APP <SortIcon column="app" />
                      </button>
                    </th>
                    <th className="text-right p-3">
                      <button
                        onClick={() => handleSort("mlp")}
                        className={`font-semibold hover:bg-yellow-100 px-2 py-1 rounded transition-colors ${sortColumn === "mlp" ? "bg-muted/40" : ""}`}
                      >
                        MLP <SortIcon column="mlp" />
                      </button>
                    </th>
                    <th className="text-right p-3">
                      <button
                        onClick={() => handleSort("major")}
                        className={`font-semibold hover:bg-yellow-100 px-2 py-1 rounded transition-colors ${sortColumn === "major" ? "bg-muted/40" : ""}`}
                      >
                        Major <SortIcon column="major" />
                      </button>
                    </th>
                    <th className="text-right p-3">
                      <button
                        onClick={() => handleSort("contract")}
                        className={`font-semibold hover:bg-yellow-100 px-2 py-1 rounded transition-colors ${sortColumn === "contract" ? "bg-muted/40" : ""}`}
                      >
                        Contract <SortIcon column="contract" />
                      </button>
                    </th>
                    <th className="text-right p-3 bg-muted/40">
                      <button
                        onClick={() => handleSort("total")}
                        className={`font-semibold hover:bg-yellow-100 px-2 py-1 rounded transition-colors ${sortColumn === "total" ? "bg-muted/60" : ""}`}
                      >
                        Total <SortIcon column="total" />
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedPlayers.map((player) => (
                    <tr key={player.id} className="border-b hover:bg-muted/20">
                      <td className="text-center p-3 font-semibold tabular-nums">#{player.rank}</td>
                      <td className="p-3">
                        <Link href={`/players/${player.slug}`} className="block">
                          <div className="flex items-center gap-3 hover:font-semibold transition-all">
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
                      <td className="text-right p-3 font-mono tabular-nums">
                        {player.ppa > 0 ? formatUSD(player.ppa) : "—"}
                      </td>
                      <td className="text-right p-3 font-mono tabular-nums">
                        {player.app > 0 ? formatUSD(player.app) : "—"}
                      </td>
                      <td className="text-right p-3 font-mono tabular-nums">
                        {player.mlp > 0 ? formatUSD(player.mlp) : "—"}
                      </td>
                      <td className="text-right p-3 font-mono tabular-nums">
                        {player.major > 0 ? formatUSD(player.major) : "—"}
                      </td>
                      <td className="text-right p-3 font-mono tabular-nums">
                        {player.contract > 0 ? formatUSD(player.contract) : "—"}
                      </td>
                      <td className="text-right p-3 font-mono tabular-nums font-semibold bg-muted/40">
                        {formatUSD(player.total)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="md:hidden space-y-4">
            {paginatedPlayers.map((player) => (
              <Card key={player.id} className="p-4 border shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <Link
                    href={`/players/${player.slug}`}
                    className="flex items-center gap-3 hover:font-semibold transition-all"
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
                    <div className="font-medium">{player.name}</div>
                  </Link>
                  <div className="font-semibold tabular-nums text-lg">#{player.rank}</div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex justify-between">
                    <span>PPA:</span>
                    <span className="font-mono tabular-nums">{player.ppa > 0 ? formatUSD(player.ppa) : "—"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>APP:</span>
                    <span className="font-mono tabular-nums">{player.app > 0 ? formatUSD(player.app) : "—"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>MLP:</span>
                    <span className="font-mono tabular-nums">{player.mlp > 0 ? formatUSD(player.mlp) : "—"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Major:</span>
                    <span className="font-mono tabular-nums">{player.major > 0 ? formatUSD(player.major) : "—"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Contract:</span>
                    <span className="font-mono tabular-nums">
                      {player.contract > 0 ? formatUSD(player.contract) : "—"}
                    </span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Total:</span>
                    <span className="font-mono tabular-nums">{formatUSD(player.total)}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="flex items-center justify-between mt-6 pt-4 border-t">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Show:</span>
              <Select value={pageSize.toString()} onValueChange={(value) => handlePageSizeChange(Number(value))}>
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
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
        </Card>
      </main>
    </div>
  )
}
