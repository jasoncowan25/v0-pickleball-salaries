"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { KpiCard } from "@/components/kpi-card"
import { formatCurrencyUSD } from "@/lib/format"
import { getRankedPlayers } from "@/lib/rank"
import { mockPlayers, events } from "@/lib/mock-data"
import type { Player } from "@/lib/mock-data"
import Link from "next/link"
import PlayerProfileLink from "@/components/PlayerProfileLink"
import { getDisplayYear } from "@/lib/displayYear"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ArrowRight } from "lucide-react"
import { ContractTierBadge } from "@/components/contract-tier-badge"
import { VerificationStamp } from "@/components/verification-stamp"

export default function Page() {
  const [activeTab, setActiveTab] = useState<"thisyear" | "alltime">("thisyear")
  const [mobileDisplayCount, setMobileDisplayCount] = useState<5 | 10>(5)

  const YEAR = getDisplayYear()

  const rankedPlayers = getRankedPlayers(activeTab === "thisyear" ? "ytd" : "alltime")

  const desktopPlayers = rankedPlayers.slice(0, 10)
  const mobilePlayers = rankedPlayers.slice(0, mobileDisplayCount)

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
      cell: (player: Player & { rank: number }) => {
        const isGoldTier = player.name === "Ben Johns" || player.name === "Anna Leigh Waters"
        return (
          <PlayerProfileLink
            href={`/players/${player.slug}`}
            name={player.name}
            gender={player.gender}
            location={player.country}
            headshotUrl={player.headshotUrl}
            goldTier={isGoldTier}
            showImage={false}
          />
        )
      },
    },
    {
      key: "contractTier" as keyof (Player & { rank: number; rankValue: number }),
      header: "Contract Tier",
      cell: (player: Player & { rank: number }) => {
        return (
          <div className="w-[100px]">
            <ContractTierBadge tier={player.contractTier} />
          </div>
        )
      },
    },
    {
      key: "rankValue" as keyof (Player & { rank: number; rankValue: number }),
      header: "Prize",
      cell: (player: Player & { rank: number; rankValue: number }) => (
        <div className="grid grid-cols-[1fr_24px] gap-3 items-center">
          <div className="text-right tabular-nums">{formatCurrencyUSD(player.rankValue)}</div>
          <div className="flex items-center justify-center">
            <VerificationStamp variant="verified" />
          </div>
        </div>
      ),
    },
    {
      key: "totals" as keyof (Player & { rank: number; rankValue: number }),
      header: "Contract",
      cell: (player: Player & { rank: number }) => (
        <div className="grid grid-cols-[1fr_24px] gap-3 items-center">
          <div className="tabular-nums text-right text-[#737373]">
            {formatCurrencyUSD(player.totals.reportedContracts || 0)}
          </div>
          <div className="flex items-center justify-center">
            <VerificationStamp variant="estimated" />
          </div>
        </div>
      ),
    },
    {
      key: "total" as keyof (Player & { rank: number; rankValue: number }),
      header: "Total",
      cell: (player: Player & { rank: number; rankValue: number }) => (
        <div className="grid grid-cols-[1fr_24px] gap-3 items-center">
          <div className="font-bold tabular-nums text-right text-[#737373]">
            {formatCurrencyUSD(player.rankValue + (player.totals.reportedContracts || 0))}
          </div>
          <div className="flex items-center justify-center">
            <VerificationStamp variant="estimated" />
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className="py-12">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Pickleball Earnings Leaders</h1>
        <p className="text-muted-foreground mb-2 text-lg">
          Welcome to DinkBank – a single, trusted place to see prize money and player contract figures across PPA, MLP,
          and APP tours.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <KpiCard title="Total Prize Money" value={formatCurrencyUSD(totalPrizeThisYear)} />
        <KpiCard title="Events Tracked" value={eventsTracked.toString()} />
        <KpiCard title="Contract Earnings" value={formatCurrencyUSD(totalContracts)} />
      </div>

      <Card className="mb-6 bg-amber-50 border-amber-200">
        <div className="p-4">
          <h3 className="text-sm font-semibold mb-1">2026 Contract Figures — Under Review</h3>
          <p className="text-sm text-muted-foreground">
            2026 contract earnings currently reflect the same estimated amounts used for 2025 while DinkBank evaluates
            the impact of recent UPA changes. All 2026 contract figures are estimates and subject to revision.
          </p>
        </div>
      </Card>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "thisyear" | "alltime")} className="mb-6">
        <div className="flex justify-between mb-4 items-end">
          <TabsList>
            <TabsTrigger value="thisyear">This Year</TabsTrigger>
            <TabsTrigger value="alltime">All-Time</TabsTrigger>
          </TabsList>
          <p className="text-sm text-muted-foreground">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" })}
          </p>
        </div>

        <TabsContent value={activeTab} className="space-y-6">
          <Card className="p-6">
            <div className="mb-4">
              <h2 className="text-lg font-semibold">
                {activeTab === "thisyear" ? `${YEAR} Top Earners` : "All-Time Top Earners"}
              </h2>
              <p className="text-muted-foreground">UPA contract tiers shown</p>
            </div>

            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    {columns.map((column) => (
                      <th
                        key={column.key}
                        className={`text-left py-2 px-3 font-medium text-muted-foreground text-xs uppercase tracking-wider ${
                          column.header === "Total" ? "bg-muted/30" : ""
                        }`}
                      >
                        {column.header === "Prize" || column.header === "Contract" || column.header === "Total" ? (
                          <div className="grid grid-cols-[1fr_24px] gap-3 items-center">
                            <div className="text-right">{column.header}</div>
                            <div></div>
                          </div>
                        ) : (
                          column.header
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {desktopPlayers.map((player, index) => (
                    <tr key={player.id} className="border-b hover:bg-muted/50">
                      {columns.map((column) => (
                        <td key={column.key} className={`py-2 px-3 ${column.header === "Total" ? "bg-muted/30" : ""}`}>
                          {column.cell(player, index)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="lg:hidden space-y-3">
              {mobilePlayers.map((player, index) => {
                const totalEarnings = player.rankValue + (player.totals.reportedContracts || 0)
                const isGoldTier = player.name === "Ben Johns" || player.name === "Anna Leigh Waters"

                return (
                  <div key={player.id} className="bg-muted/30 rounded-lg p-3 shadow-sm border">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-start gap-3 min-w-0 flex-1">
                        <Avatar
                          className={`size-14 object-cover shrink-0 ${
                            isGoldTier
                              ? "border-2 border-[#C9A227] rounded-full"
                              : "rounded-full border border-gray-300"
                          }`}
                        >
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
                          <Link
                            href={`/players/${player.slug}`}
                            className="text-lg sm:text-xl font-semibold leading-tight truncate block hover:underline"
                            title={player.name}
                          >
                            {player.name}
                          </Link>
                          {(player.gender || player.country) && (
                            <div className="text-sm text-muted-foreground truncate">
                              {player.gender && player.country
                                ? `${player.gender} • ${player.country}`
                                : player.gender || player.country}
                            </div>
                          )}
                          <div className="mt-1">
                            <ContractTierBadge tier={player.contractTier} />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-3 flex items-center gap-2">
                      <div>
                        <div className="text-xl font-bold tabular-nums text-[#737373]">
                          {formatCurrencyUSD(totalEarnings)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {activeTab === "thisyear" ? `${YEAR} Earnings` : "All-Time Earnings"}
                        </div>
                      </div>
                      <VerificationStamp variant="estimated" />
                    </div>

                    <div className="border-t border-muted-foreground/20 pt-2">
                      <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">Prize: </span>
                          <span className="font-semibold tabular-nums">{formatCurrencyUSD(player.rankValue)}</span>
                          <VerificationStamp variant="verified" />
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">Contract: </span>
                          <span className="font-semibold tabular-nums text-[#737373]">
                            {formatCurrencyUSD(player.totals.reportedContracts || 0)}
                          </span>
                          <VerificationStamp variant="estimated" />
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <hr className="mt-4 mb-2 border-[#EAEAEA]" />
            <p className="text-xs text-[#6B6B6B] leading-[1.4] max-w-full md:max-w-[80%] mt-3 mb-4 flex items-start gap-1">
              <span className="mt-0.5 shrink-0 mr-1">
                <VerificationStamp />
              </span>
              <span>
                <strong>DinkBank Confirmed:</strong> Verified amounts from public reporting or official tour sources.
                Totals may also be marked as confirmed when all underlying amounts are verified. Figures without a
                checkmark are estimates based on public data and DinkBank modeling and may be updated as new information
                becomes available. Contract amounts reflect base retainers only and exclude endorsements or appearance
                fees. All amounts in USD.
              </span>
            </p>

            <div className="mt-4">
              <div className="hidden lg:block text-center">
                <Link href="/players">
                  <Button variant="secondary">View Full Leaderboard →</Button>
                </Link>
              </div>

              <div className="lg:hidden text-center">
                {mobileDisplayCount === 5 ? (
                  <Button variant="secondary" onClick={() => setMobileDisplayCount(10)}>
                    Show Full Top 10
                  </Button>
                ) : (
                  <Link href="/players">
                    <Button variant="secondary">View Full Leaderboard →</Button>
                  </Link>
                )}
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid gap-6 md:grid-cols-2 md:items-start mb-6">
        <Card>
          <div className="p-6 my-0">
            <h2 className="text-lg font-semibold mb-4">Featured Report</h2>
            <Link href="/reports/2025-top-10-prize-money-earners" className="block group">
              <div className="my-0 space-y-3 px-3 py-1.5">
                <h3 className="text-xl font-bold leading-tight group-hover:text-accent transition-colors mt-3">
                  2025's Top 10 Prize Money Earners
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  An earnings breakdown of the top-performing pros, drawn from prize money awarded across all major
                  tours in 2025.
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-border/50">
                  <div className="text-sm text-muted-foreground">Last Updated: December 2025</div>
                  <Button variant="secondary" className="group/btn gap-2">
                    View Report
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </Link>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Player News</h2>
            <div className="space-y-3">
              <Link
                href="/players/anna-leigh-waters"
                className="block p-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="text-xs text-muted-foreground mb-1">Jan 7, 2026</div>
                <div className="font-semibold mb-1">Anna Leigh Waters</div>
                <div className="text-sm text-muted-foreground">ALW and Paddletek part ways</div>
              </Link>

              <Link
                href="/players/james-ignatowich"
                className="block p-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="text-xs text-muted-foreground mb-1">Jan 1, 2026</div>
                <div className="font-semibold mb-1">James Ignatowich</div>
                <div className="text-sm text-muted-foreground">UPA suspends Ignatowich</div>
              </Link>

              <Link href="/players/parris-todd" className="block p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="text-xs text-muted-foreground mb-1">Jan 1, 2026</div>
                <div className="font-semibold mb-1">Parris Todd</div>
                <div className="text-sm text-muted-foreground">
                  UPA hands Parris Todd two-event suspension, $50,000 fine
                </div>
              </Link>
            </div>
          </div>
        </Card>
      </div>

      <Card className="mt-6 mb-6">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <img src="/images/dinkbank-favicon.png" alt="DinkBank" className="w-6 h-6" />
            <h2 className="text-lg font-semibold">DinkBank Data</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            DinkBank provides structured earnings data for professional pickleball, including prize money, contracts,
            and season-long performance across major tours. Some figures shown are estimates based on public information
            and internal modeling and are refined as new data becomes available. Our goal is to offer a clear,
            transparent view of how players are compensated throughout the season.{" "}
            <Link href="/about" className="underline hover:text-[#1F1F1F]">
              Learn More →
            </Link>
          </p>
        </div>
      </Card>
    </div>
  )
}
