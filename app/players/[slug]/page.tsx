"use client"

import { useState } from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ConfidenceBadge } from "@/components/confidence-badge"
import { ContractTierBadge } from "@/components/contract-tier-badge"
import { VerificationStamp } from "@/components/verification-stamp"
import { formatCurrency, formatShortDate } from "@/lib/format"
import { format } from "date-fns" // Added date-fns import for DOB formatting
import { mockPlayers } from "@/lib/mock-data"
import { getPlayerPayouts } from "@/lib/rank"
import { generatePlayerJsonLd } from "@/lib/jsonld"
import { FileText, Star, Check, TrendingUp } from "lucide-react"
import PlayerKpis from "@/components/player/PlayerKpis"

interface PlayerPageProps {
  params: {
    slug: string
  }
}

function displayGender(g: string | null | undefined) {
  if (!g) return null
  const val = g.toLowerCase()
  if (val === "w" || val === "woman" || val === "f") return "Female"
  if (val === "m" || val === "man") return "Male"
  return g
}

function calculateAge(dob: string) {
  const birth = new Date(dob)
  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  const m = today.getMonth() - birth.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--
  return age
}

function formatCurrencyUSD(n?: number) {
  return n == null
    ? "—"
    : n.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 }).replace("US$", "$")
}

export default function PlayerPage({ params }: PlayerPageProps) {
  const [activeTab, setActiveTab] = useState("career")
  const [selectedYear, setSelectedYear] = useState("2024")

  const player = mockPlayers.find((p) => p.slug === params.slug)

  if (!player) {
    notFound()
  }

  const playerPayouts = getPlayerPayouts(player.id)
  const filteredPayouts = playerPayouts.filter(
    (payout) => new Date(payout.date).getFullYear().toString() === selectedYear,
  )

  const getTourBadge = (tour: string) => {
    const variants = {
      PPA: "bg-blue-100 text-blue-800",
      MLP: "bg-green-100 text-green-800",
      APP: "bg-purple-100 text-purple-800",
    }
    return variants[tour as keyof typeof variants] || "bg-gray-100 text-gray-800"
  }

  const totalFor = (r: (typeof mockCareerEarnings)[0]) =>
    (r.ppa ?? 0) + (r.app ?? 0) + (r.mlp ?? 0) + (r.major ?? 0) + (r.contracts ?? 0)

  const mockCareerEarnings = [
    {
      year: 2024,
      ppa: 45000,
      app: 35000,
      mlp: 25000,
      major: 20000,
      contracts: 500000,
      confidence: { contracts: "confirmed" },
    },
    {
      year: 2023,
      ppa: 38000,
      app: 28000,
      mlp: 22000,
      major: 10000,
      contracts: 450000,
      confidence: { contracts: "confirmed" },
    },
    {
      year: 2022,
      ppa: 32000,
      app: 25000,
      mlp: 18000,
      major: 12000,
      contracts: 400000,
      confidence: { contracts: "reported" },
    },
    {
      year: 2021,
      ppa: 28000,
      app: 20000,
      mlp: 12000,
      major: 5000,
      contracts: 300000,
      confidence: { contracts: "reported" },
    },
  ]

  const mockTransactions = [
    {
      date: "2024-01-15",
      type: "Endorsement",
      title: "JOOLA Multi-Year Partnership Extension",
      amount: 150000,
      counterparty: "JOOLA",
      notes: "Three-year extension with performance bonuses and signature paddle line.",
      confidence: "confirmed",
      attachments: 2,
    },
    {
      date: "2023-12-01",
      type: "Contract",
      title: "PPA Tour Player Agreement Renewal",
      amount: 75000,
      counterparty: "PPA Tour",
      notes: "Annual player agreement with appearance requirements and media obligations.",
      confidence: "confirmed",
      attachments: 1,
    },
    {
      date: "2023-08-20",
      type: "Bonus",
      title: "Championship Performance Bonus",
      amount: 25000,
      counterparty: "JOOLA",
      notes: "Performance bonus for winning three consecutive PPA tournaments.",
      confidence: "reported",
      attachments: 0,
    },
  ]

  const careerEarningsWithTotals = mockCareerEarnings
    .map((yearData) => ({
      ...yearData,
      yearTotal: totalFor(yearData),
    }))
    .sort((a, b) => b.year - a.year)

  const careerTotal = careerEarningsWithTotals.reduce((sum, yearData) => sum + yearData.yearTotal, 0)

  const jsonLd = generatePlayerJsonLd(player)

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="max-w-7xl mx-auto lg:px-8 py-6 px-[0]">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/players">Players</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{player.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Player Header */}
        <Card className="p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-start gap-6">
            <Avatar className="h-32 w-32 sm:h-40 sm:w-40 mx-auto sm:mx-0">
              <AvatarImage src={player.headshotUrl || "/placeholder.svg"} alt={player.name} />
              <AvatarFallback className="text-3xl sm:text-4xl">
                {player.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center sm:text-left w-full">
              <div className="flex flex-col">
                <h1 className="text-3xl sm:text-4xl font-bold flex items-center justify-center sm:justify-start gap-2">
                  {player.name}
                  {player.country && (
                    <span className="text-2xl sm:text-3xl">
                      {player.country === "US" ? "🇺🇸" : player.country === "CA" ? "🇨🇦" : "🌍"}
                    </span>
                  )}
                </h1>

                {/* Metadata line with gender, country, age, and DOB */}
                <p className="text-sm text-muted-foreground mt-1">
                  {displayGender(player.gender)}
                  {player.country && ` • ${player.country}`}
                  {player.dob && ` • Age ${calculateAge(player.dob)}`}
                  {player.dob && ` • Born ${format(new Date(player.dob), "MMMM d, yyyy")}`}
                </p>
              </div>

              <div className="flex items-center justify-center sm:justify-start gap-4 text-muted-foreground mb-4 mt-3">
                {player.bio ? (
                  <p className="text-base text-foreground leading-relaxed max-w-3xl">{player.bio}</p>
                ) : (
                  <div className="text-base sm:text-lg">
                    Plays: {player.handedness === "R" ? "Right-handed" : "Left-handed"}
                  </div>
                )}
              </div>
              {player.slug === "ben-johns" && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">UPA Contract Status</h3>
                  <div className="flex gap-2 flex-wrap">
                    <span className="inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-medium border bg-gray-50 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300 border-gray-200/50 dark:border-gray-700/50">
                      Signed • Standard Contract
                    </span>
                    <span className="inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-medium border bg-amber-50/70 dark:bg-amber-950/20 text-amber-800 dark:text-amber-300 border-amber-200/40 dark:border-amber-800/40">
                      Signed • Gold Card
                    </span>
                    <span className="inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-medium border bg-blue-50/50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300 border-blue-200/30 dark:border-blue-800/30">
                      Signed • Futures Contract
                    </span>
                    <span className="inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-medium border bg-transparent dark:bg-transparent text-gray-500 dark:text-gray-400 border-gray-300 dark:border-gray-600">
                      Unsigned
                    </span>
                  </div>
                </div>
              )}
              {player.sponsors && player.sponsors.length > 0 && (
                <div className="flex gap-2 flex-wrap justify-center sm:justify-start mt-2">
                  {player.sponsors.map((sponsor) => (
                    <Badge key={sponsor} variant="secondary" className="text-sm px-3 py-1">
                      {sponsor}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* New PlayerKpis component */}
        <div className="mb-6">
          <PlayerKpis
            prizeYTD={player.totals.ytdPrize}
            prizeAllTime={player.totals.allTimePrize}
            reportedContractsCurrentYear={player.totals.reportedContracts}
            rankAllTime={1}
            careerEstimated={careerTotal}
          />
        </div>

        <div className="w-full mb-6">
          {/* Mobile Segmented Control */}
          <div className="md:hidden">
            <div className="flex border border-[#EDEDED] rounded-xl p-1 bg-white" role="tablist">
              <button
                onClick={() => setActiveTab("career")}
                className={`flex-1 px-2 py-2 text-sm font-medium rounded-lg transition-all ${
                  activeTab === "career"
                    ? "bg-white shadow-sm border-b-2 border-[#111] font-semibold"
                    : "text-muted-foreground"
                }`}
                role="tab"
                aria-selected={activeTab === "career"}
              >
                Career Earnings
              </button>
              <button
                onClick={() => setActiveTab("results")}
                className={`flex-1 px-2 py-2 text-sm font-medium rounded-lg transition-all ${
                  activeTab === "results"
                    ? "bg-white shadow-sm border-b-2 border-[#111] font-semibold"
                    : "text-muted-foreground"
                }`}
                role="tab"
                aria-selected={activeTab === "results"}
              >
                Yearly Results
              </button>
              <button
                onClick={() => setActiveTab("transactions")}
                className={`flex-1 px-2 py-2 text-sm font-medium rounded-lg transition-all ${
                  activeTab === "transactions"
                    ? "bg-white shadow-sm border-b-2 border-[#111] font-semibold"
                    : "text-muted-foreground"
                }`}
                role="tab"
                aria-selected={activeTab === "transactions"}
              >
                Transactions
              </button>
            </div>
          </div>

          {/* Desktop Tabs */}
          <div className="hidden md:block">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
                <TabsTrigger
                  value="career"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
                >
                  Career Earnings
                </TabsTrigger>
                <TabsTrigger
                  value="results"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
                >
                  Yearly Results
                </TabsTrigger>
                <TabsTrigger
                  value="transactions"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
                >
                  Transactions
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Career Earnings Tab */}
        {activeTab === "career" && (
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold">Career Earnings by Year</h2>
              </div>
            </div>

            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full" aria-label="Career earnings by year">
                <thead className="sticky top-0 bg-background">
                  <tr className="border-b">
                    <th scope="col" className="py-2 px-3 text-left font-medium text-muted-foreground text-xs uppercase tracking-wider">
                      Year
                    </th>
                    <th scope="col" className="py-2 px-3 font-medium text-muted-foreground text-xs uppercase tracking-wider">
                      <div className="grid grid-cols-[1fr_24px] gap-1.5 items-center">
                        <div className="text-right">PPA</div>
                        <div></div>
                      </div>
                    </th>
                    <th scope="col" className="py-2 px-3 font-medium text-muted-foreground text-xs uppercase tracking-wider">
                      <div className="grid grid-cols-[1fr_24px] gap-1.5 items-center">
                        <div className="text-right">APP</div>
                        <div></div>
                      </div>
                    </th>
                    <th scope="col" className="py-2 px-3 font-medium text-muted-foreground text-xs uppercase tracking-wider">
                      <div className="grid grid-cols-[1fr_24px] gap-1.5 items-center">
                        <div className="text-right">MLP</div>
                        <div></div>
                      </div>
                    </th>
                    <th scope="col" className="py-2 px-3 font-medium text-muted-foreground text-xs uppercase tracking-wider">
                      <div className="grid grid-cols-[1fr_24px] gap-1.5 items-center">
                        <div className="text-right">Contracts</div>
                        <div></div>
                      </div>
                    </th>
                    <th scope="col" className="py-2 px-3 bg-muted/30 font-medium text-muted-foreground text-xs uppercase tracking-wider">
                      <div className="grid grid-cols-[1fr_24px] gap-1.5 items-center">
                        <div className="text-right">Total</div>
                        <div></div>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {careerEarningsWithTotals.map((yearData, index) => (
                    <tr
                      key={yearData.year}
                      className={`border-b hover:bg-muted/50 focus-within:bg-muted/50 ${index % 2 === 0 ? "bg-muted/25" : ""}`}
                      tabIndex={0}
                    >
                      <td className="p-3 font-semibold">{yearData.year}</td>
                      <td className="p-3 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <span className="tabular-nums">
                            {yearData.ppa > 0 ? formatCurrencyUSD(yearData.ppa) : <span className="text-muted-foreground">—</span>}
                          </span>
                          {yearData.ppa > 0 && <VerificationStamp variant="verified" />}
                        </div>
                      </td>
                      <td className="p-3 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <span className="tabular-nums">
                            {yearData.app > 0 ? formatCurrencyUSD(yearData.app) : <span className="text-muted-foreground">—</span>}
                          </span>
                          {yearData.app > 0 && <VerificationStamp variant="verified" />}
                        </div>
                      </td>
                      <td className="p-3 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <span className="tabular-nums">
                            {yearData.mlp > 0 ? formatCurrencyUSD(yearData.mlp) : <span className="text-muted-foreground">—</span>}
                          </span>
                          {yearData.mlp > 0 && <VerificationStamp variant="verified" />}
                        </div>
                      </td>
                      <td className="p-3 text-right">
                        <div className="grid grid-cols-[1fr_24px] gap-1.5 items-center">
                          <div className="text-right tabular-nums">{formatCurrencyUSD(yearData.contracts)}</div>
                          <div className="flex items-center justify-center">
                            <VerificationStamp variant="estimated" />
                          </div>
                        </div>
                      </td>
                      <td className="p-3 text-right font-semibold bg-gray-50">
                        <div className="grid grid-cols-[1fr_24px] gap-1.5 items-center">
                          <div className="text-right tabular-nums">{formatCurrencyUSD(yearData.yearTotal)}</div>
                          <div className="flex items-center justify-center">
                            <VerificationStamp variant="estimated" />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={6} className="px-3 py-3 bg-gray-50/50 border-t text-sm text-muted-foreground">
                      <strong className="font-semibold">DinkBank Methodology:</strong> Confirmed figures are verified using official or reputable public sources. Other figures are DinkBank estimates and may be updated. Contract amounts reflect base retainers only and exclude endorsements, appearance fees, and off-tour income. All amounts in USD.
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden space-y-4">
              {careerEarningsWithTotals.map((yearData) => (
                <Card key={yearData.year} className="p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-lg">{yearData.year}</span>
                    <span className="font-bold text-lg">{formatCurrencyUSD(yearData.yearTotal)}</span>
                  </div>
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <dt>PPA</dt>
                      <dd className="font-semibold inline-flex items-center gap-1.5">
                        {formatCurrencyUSD(yearData.ppa)}
                        {yearData.ppa > 0 && <VerificationStamp variant="verified" />}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>APP</dt>
                      <dd className="font-semibold inline-flex items-center gap-1.5">
                        {formatCurrencyUSD(yearData.app)}
                        {yearData.app > 0 && <VerificationStamp variant="verified" />}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>MLP</dt>
                      <dd className="font-semibold inline-flex items-center gap-1.5">
                        {formatCurrencyUSD(yearData.mlp)}
                        {yearData.mlp > 0 && <VerificationStamp variant="verified" />}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>Contracts</dt>
                      <dd className="font-semibold">{formatCurrencyUSD(yearData.contracts)}</dd>
                    </div>
                  </dl>
                </Card>
              ))}
            </div>


          </Card>
        )}

        {/* Yearly Results Tab */}
        {activeTab === "results" && (
          <Card className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
              <div>
                <h2 className="text-lg font-semibold">Tournament Results & Earnings</h2>
                <p className="text-sm text-muted-foreground">
                  {filteredPayouts.length === 0
                    ? `No results for ${selectedYear}.`
                    : `Showing ${filteredPayouts.length} results for ${selectedYear}.`}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="w-full md:w-[120px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2022">2022</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {filteredPayouts.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No data yet for {selectedYear}</p>
                <Link href="/sources" className="hover:underline text-sm text-foreground">
                  View our sources →
                </Link>
              </div>
            ) : (
              <>
                {/* Desktop Table */}
                <div className="hidden lg:block overflow-x-auto">
                  <table className="w-full">
                    <thead className="sticky top-0 bg-background">
                      <tr className="border-b">
                        <th className="p-3 text-left text-sm font-medium text-muted-foreground">Date</th>
                        <th className="p-3 text-left text-sm font-medium text-muted-foreground">Event</th>
                        <th className="p-3 text-left text-sm font-medium text-muted-foreground">Tour</th>
                        <th className="p-3 text-left text-sm font-medium text-muted-foreground">Bracket</th>
                        <th className="p-3 text-left text-sm font-medium text-muted-foreground">Tier</th>
                        <th className="p-3 text-left text-sm font-medium text-muted-foreground">Placement</th>
                        <th className="p-3 text-right text-sm font-medium text-muted-foreground">Prize</th>
                        <th className="p-3 text-right text-sm font-medium text-muted-foreground">Source</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPayouts.map((payout, index) => (
                        <tr
                          key={`${payout.eventSlug}-${payout.bracket}`}
                          className={`border-b hover:bg-muted/50 ${index % 2 === 0 ? "bg-muted/25" : ""}`}
                        >
                          <td className="p-3 font-medium">{formatShortDate(payout.date)}</td>
                          <td className="p-3">
                            <Link href={`/events/${payout.eventSlug}`} className="hover:text-primary transition-colors">
                              <div className="font-medium">{payout.eventName}</div>
                              <div className="text-sm text-muted-foreground">{payout.city}</div>
                            </Link>
                          </td>
                          <td className="p-3">
                            <Badge className={`${getTourBadge(payout.tour)}`}>{payout.tour}</Badge>
                          </td>
                          <td className="p-3 text-muted-foreground">{payout.bracket}</td>
                          <td className="p-3">
                            <ContractTierBadge tier={payout.contractTier} />
                          </td>
                          <td className="p-3 font-medium">{payout.result}</td>
                          <td className="p-3 text-right font-semibold tabular-nums">{formatCurrency(payout.prize)}</td>
                          <td className="p-3 text-right">
                            <ConfidenceBadge status={payout.sources[0]?.confidence as any} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="lg:hidden space-y-4">
                  {filteredPayouts.map((payout) => (
                    <Card key={`${payout.eventSlug}-${payout.bracket}`} className="p-4 shadow-sm">
                      <div className="flex items-start justify-between mb-2 gap-2">
                        <Link
                          href={`/events/${payout.eventSlug}`}
                          className="hover:text-primary transition-colors flex-1 mr-3"
                        >
                          <div className="font-semibold text-base">{payout.eventName}</div>
                        </Link>
                        <span className="font-semibold text-black whitespace-nowrap">
                          {formatCurrency(payout.prize)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3 flex-wrap">
                        <span>{formatShortDate(payout.date)}</span>
                        <span>•</span>
                        <Badge className={`text-xs ${getTourBadge(payout.tour)}`}>{payout.tour}</Badge>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Bracket</span>
                          <span>{payout.bracket}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Tier</span>
                          <ContractTierBadge tier={payout.contractTier} />
                        </div>
                        <div className="flex justify-between">
                          <span>Placement</span>
                          <span>{payout.result}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Source</span>
                          <ConfidenceBadge status={payout.sources[0]?.confidence as any} />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </Card>
        )}

        {/* Transactions Tab */}
        {activeTab === "transactions" && (
          <Card className="p-6">
            <div className="mb-4">
              <h2 className="text-lg font-semibold">Contracts & Endorsements</h2>
              <p className="text-sm text-muted-foreground">
                Known deals, endorsements, and other non-prize income reported by DinkBank. Some values estimated.
              </p>
            </div>

            <div className="space-y-4">
              {mockTransactions.map((transaction) => (
                <Card key={transaction.date} className="p-4 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-xs">
                          {transaction.type}
                        </Badge>
                        <ConfidenceBadge
                          status={transaction.confidence as "confirmed" | "reported" | "estimated"}
                        />
                      </div>
                      <h3 className="font-semibold text-base sm:text-lg">{transaction.title}</h3>
                      <p className="text-sm text-muted-foreground">with {transaction.counterparty}</p>
                    </div>
                    <div className="text-left sm:text-right">
                      <div className="font-bold text-xl">{formatCurrencyUSD(transaction.amount)}</div>
                      <div className="text-sm text-muted-foreground">{formatShortDate(transaction.date)}</div>
                    </div>
                  </div>

                  {transaction.notes && <p className="text-sm text-muted-foreground mb-2">{transaction.notes}</p>}

                  {transaction.attachments > 0 && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <FileText className="h-4 w-4" />
                      <span>
                        {transaction.attachments} attachment{transaction.attachments > 1 ? "s" : ""}
                      </span>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </Card>
        )}

        {/* DinkBank Player Data banner */}
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
