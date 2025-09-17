"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { KpiCard } from "@/components/kpi-card"
import { EarningsBreakdown } from "@/components/earnings-breakdown"
import { formatCurrencyUSD, formatDelta } from "@/lib/format"
import { getRankedPlayers } from "@/lib/rank"
import { mockPlayers, events } from "@/lib/mock-data"
import type { Player } from "@/lib/mock-data"
import Link from "next/link"

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
        <div className="flex items-center gap-3">
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
      ),
    },
    {
      key: "rankValue" as keyof (Player & { rank: number; rankValue: number }),
      header: activeTab === "thisyear" ? "This Year Prize" : "All-Time Prize",
      cell: (player: Player & { rank: number; rankValue: number }) => (
        <div className="font-semibold tabular-nums">{formatCurrencyUSD(player.rankValue)}</div>
      ),
    },
    {
      key: "totals" as keyof (Player & { rank: number; rankValue: number }),
      header: "Contracts",
      cell: (player: Player & { rank: number }) => (
        <div className="text-muted-foreground tabular-nums">
          {formatCurrencyUSD(player.totals.reportedContracts || 0)}
        </div>
      ),
    },
    {
      key: "totals" as keyof (Player & { rank: number; rankValue: number }),
      header: "Endorsements",
      cell: (player: Player & { rank: number }) => (
        <div className="text-muted-foreground tabular-nums">
          {formatCurrencyUSD(player.totals.endorsementsEstimate)}
        </div>
      ),
    },
    {
      key: "primaryTour" as keyof (Player & { rank: number; rankValue: number }),
      header: "Tours",
      cell: (player: Player & { rank: number }) => (
        <div className="flex gap-1">
          {player.primaryTour && (
            <Badge
              variant="secondary"
              className={`text-xs font-medium ${
                player.primaryTour === "PPA"
                  ? "bg-blue-100 text-blue-800"
                  : player.primaryTour === "MLP"
                    ? "bg-green-100 text-green-800"
                    : player.primaryTour === "APP"
                      ? "bg-purple-100 text-purple-800"
                      : ""
              }`}
            >
              {player.primaryTour}
            </Badge>
          )}
        </div>
      ),
    },
    {
      key: "id" as keyof (Player & { rank: number; rankValue: number }),
      header: "Details",
      cell: (player: Player & { rank: number }) => <EarningsBreakdown player={player} />,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <main className="container py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Pickleball Earnings Index</h1>
          <p className="text-muted-foreground mb-2">
            Track professional pickleball earnings across PPA, MLP, and APP tours
          </p>
          <p className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-4 md:grid-cols-3 mb-6">
          <KpiCard
            title="Total Prize Money This Year"
            value={formatCurrencyUSD(totalPrizeThisYear)}
            delta={{
              value: formatCurrencyUSD(15000),
              percentage: formatDelta(12.5),
              isPositive: true,
            }}
          />
          <KpiCard title="Events Tracked" value={eventsTracked.toString()} />
          <KpiCard
            title="Reported Contracts"
            value={formatCurrencyUSD(totalContracts)}
            delta={{
              value: formatCurrencyUSD(50000),
              percentage: formatDelta(8.2),
              isPositive: true,
            }}
          />
        </div>

        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as "thisyear" | "alltime")}
          className="mb-6"
        >
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
                        <th key={column.key} className="text-left py-3 px-4 font-medium text-muted-foreground">
                          {column.header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {topPlayers.map((player, index) => (
                      <tr key={player.id} className="border-b hover:bg-muted/50">
                        {columns.map((column) => (
                          <td key={column.key} className="py-3 px-4">
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
                {topPlayers.map((player, index) => (
                  <div key={player.id} className="bg-muted/30 rounded-lg p-4 shadow-sm border">
                    {/* Card Header: Rank + Name on left, Breakdown button on right */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
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
                      </div>
                      <div className="min-h-[44px] min-w-[44px] flex items-center">
                        <EarningsBreakdown player={player} />
                      </div>
                    </div>

                    {/* Prize Money - most prominent */}
                    <div className="mb-2">
                      <div className="text-2xl font-bold tabular-nums">{formatCurrencyUSD(player.rankValue)}</div>
                      <div className="text-sm text-muted-foreground">
                        {activeTab === "thisyear" ? "This Year Prize" : "All-Time Prize"}
                      </div>
                    </div>

                    {/* Contracts */}
                    <div className="mb-2">
                      <div className="text-lg font-medium tabular-nums text-muted-foreground">
                        {formatCurrencyUSD(player.totals.reportedContracts || 0)}
                      </div>
                      <div className="text-xs text-muted-foreground">Contracts</div>
                    </div>

                    {/* Endorsements */}
                    <div className="mb-3">
                      <div className="text-lg font-medium tabular-nums text-muted-foreground">
                        {formatCurrencyUSD(player.totals.endorsementsEstimate)}
                      </div>
                      <div className="text-xs text-muted-foreground">Endorsements</div>
                    </div>

                    {/* Tour Icons */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Tours:</span>
                      {player.primaryTour && (
                        <Badge
                          variant="secondary"
                          className={`text-xs font-medium ${
                            player.primaryTour === "PPA"
                              ? "bg-blue-100 text-blue-800"
                              : player.primaryTour === "MLP"
                                ? "bg-green-100 text-green-800"
                                : player.primaryTour === "APP"
                                  ? "bg-purple-100 text-purple-800"
                                  : ""
                          }`}
                        >
                          {player.primaryTour}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 text-center">
                <Link href="/players">
                  <Button variant="outline">See All Players</Button>
                </Link>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
