"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { KpiCard } from "@/components/kpi-card"
import { formatCurrencyUSD } from "@/lib/format"
import { getRankedPlayers } from "@/lib/rank"
import { mockPlayers, events } from "@/lib/mock-data"
import type { Player } from "@/lib/mock-data"
import Link from "next/link"
import { TourBadge } from "@/components/TourBadges"
import { computePrimaryTour, visibleTours } from "@/lib/tours"
import { TOUR_META } from "@/lib/tours"

export default function Page() {
  const [activeTab, setActiveTab] = useState<"thisyear" | "alltime">("thisyear")

  // Get ranked players based on active tab
  const rankedPlayers = getRankedPlayers(activeTab === "thisyear" ? "ytd" : "alltime")

  const topPlayers = rankedPlayers.slice(0, 5)

  // Calculate KPIs
  const totalPrizeThisYear = mockPlayers.reduce((sum, player) => sum + player.totals.ytdPrize, 0)
  const totalContracts = mockPlayers.reduce((sum, player) => sum + (player.totals.reportedContracts || 0), 0)
  const eventsTracked = events.length

  const columns = [
    {
      key: "rank" as keyof (Player & { rank: number; rankValue: number }),
      header: "Rank",
      cell: (player: Player & { rank: number }) => (
        <div className="font-semibold text-black tabular-nums">#{player.rank}</div>
      ),
    },
    {
      key: "name" as keyof (Player & { rank: number; rankValue: number }),
      header: "Player",
      cell: (player: Player & { rank: number }) => (
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
                {player.gender ? `${player.gender} • ` : ""}
                {player.country}
              </div>
            </div>
          </div>
        </Link>
      ),
    },
    {
      key: "tours" as keyof (Player & { rank: number; rankValue: number }),
      header: "Tours",
      cell: (player: Player & { rank: number }) => {
        const enhancedPlayer = {
          ...player,
          tours: player.tours || [],
        }
        const tours = visibleTours(enhancedPlayer)
        const primaryTour = computePrimaryTour(enhancedPlayer)

        if (tours.length === 0) return <span className="text-gray-400">—</span>

        const visibleToursList = tours.slice(0, 3)
        const overflowCount = tours.length - 3

        return (
          <div className="flex items-center gap-1 flex-wrap">
            {visibleToursList.map((tour) => (
              <TourBadge key={tour} code={tour} primary={tour === primaryTour} />
            ))}
            {overflowCount > 0 && (
              <div
                className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
                title={`Also: ${tours
                  .slice(3)
                  .map((t) => TOUR_META[t].label)
                  .join(", ")}`}
              >
                +{overflowCount}
              </div>
            )}
          </div>
        )
      },
    },
    {
      key: "rankValue" as keyof (Player & { rank: number; rankValue: number }),
      header: activeTab === "thisyear" ? "Prize (2024)" : "Prize (All-Time)",
      cell: (player: Player & { rank: number; rankValue: number }) => (
        <div className="font-semibold tabular-nums text-right">{formatCurrencyUSD(player.rankValue)}</div>
      ),
    },
    {
      key: "totals" as keyof (Player & { rank: number; rankValue: number }),
      header: "Contract",
      cell: (player: Player & { rank: number }) => (
        <div className="text-muted-foreground tabular-nums text-right">
          {formatCurrencyUSD(player.totals.reportedContracts || 0)}
        </div>
      ),
    },
    {
      key: "total" as keyof (Player & { rank: number; rankValue: number }),
      header: "Total",
      cell: (player: Player & { rank: number; rankValue: number }) => (
        <div className="font-bold tabular-nums text-right">
          {formatCurrencyUSD(player.rankValue + (player.totals.reportedContracts || 0))}
        </div>
      ),
    },
  ]

  return (
    <div className="py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Pickleball Earnings Leaders</h1>
        <p className="text-muted-foreground mb-2">
          Tracking pro pickleball prize money and contracts across PPA, MLP, and APP tours.
        </p>
        <p className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <KpiCard title="Total Prize Money This Year" value={formatCurrencyUSD(totalPrizeThisYear)} />
        <KpiCard title="Events Tracked" value={eventsTracked.toString()} />
        <KpiCard title="Reported Contracts" value={formatCurrencyUSD(totalContracts)} />
      </div>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "thisyear" | "alltime")} className="mb-6">
        <TabsList>
          <TabsTrigger value="thisyear">This Year</TabsTrigger>
          <TabsTrigger value="alltime">All-Time</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-6">
          {/* Data Table */}
          <Card className="p-6">
            <div className="mb-4">
              <h2 className="text-lg font-semibold">
                {activeTab === "thisyear" ? "This Year's Top Earners" : "All-Time Top Earners"}
              </h2>
              <p className="text-sm text-muted-foreground">Showing top {topPlayers.length} players</p>
            </div>

            {/* Responsive leaderboard with desktop table and mobile cards */}
            {/* Desktop Table - hidden on mobile */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    {columns.map((column) => (
                      <th
                        key={column.key}
                        className={`text-left py-3 px-4 font-medium text-muted-foreground ${
                          column.header === "Total" ? "bg-muted/30" : ""
                        } ${
                          column.header === "Prize (2024)" ||
                          column.header === "Prize (All-Time)" ||
                          column.header === "Contract" ||
                          column.header === "Total"
                            ? "text-right"
                            : ""
                        }`}
                      >
                        {column.header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {topPlayers.map((player, index) => (
                    <tr key={player.id} className="border-b hover:bg-muted/50">
                      {columns.map((column) => (
                        <td key={column.key} className={`py-3 px-4 ${column.header === "Total" ? "bg-muted/30" : ""}`}>
                          {column.cell(player, index)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards - hidden on desktop */}
            <div className="md:hidden space-y-4">
              {topPlayers.map((player, index) => {
                const enhancedPlayer = {
                  ...player,
                  tours: player.tours || [],
                }
                const tours = visibleTours(enhancedPlayer)
                const primaryTour = computePrimaryTour(enhancedPlayer)
                const totalEarnings = player.rankValue + (player.totals.reportedContracts || 0)

                return (
                  <div key={player.id} className="bg-muted/30 rounded-lg p-4 shadow-sm border">
                    <div className="flex items-center justify-between mb-4">
                      <Link
                        href={`/players/${player.slug}`}
                        className="flex items-center gap-3 hover:underline font-medium transition-all"
                      >
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={player.headshotUrl || "/placeholder.svg"} alt={player.name} />
                          <AvatarFallback>
                            {player.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold text-lg">
                            #{player.rank} {player.name}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {player.gender ? `${player.gender} • ` : ""}
                            {player.country}
                          </div>
                        </div>
                      </Link>
                    </div>

                    <div className="mb-4">
                      <div className="text-2xl font-bold tabular-nums">{formatCurrencyUSD(totalEarnings)}</div>
                      <div className="text-sm text-muted-foreground">
                        {activeTab === "thisyear" ? "2025 Earnings" : "All-Time Earnings"}
                      </div>
                    </div>

                    <div className="border-t border-muted-foreground/20 pt-3 mb-3">
                      <div className="flex justify-between items-center text-sm mb-3">
                        <div>
                          <span className="text-muted-foreground">Prize: </span>
                          <span className="font-semibold tabular-nums">{formatCurrencyUSD(player.rankValue)}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Contract: </span>
                          <span className="font-semibold tabular-nums">
                            {formatCurrencyUSD(player.totals.reportedContracts || 0)}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-1">
                        {tours.length === 0 ? (
                          <span className="text-gray-400">—</span>
                        ) : (
                          tours.map((tour) => <TourBadge key={tour} code={tour} primary={tour === primaryTour} />)
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-4 text-center">
              <Link href="/players">
                <Button variant="outline">See All Players</Button>
              </Link>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
