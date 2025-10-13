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
import { KpiCard } from "@/components/kpi-card"
import { ConfidenceBadge } from "@/components/confidence-badge"
import { formatCurrency, formatShortDate } from "@/lib/format"
import { mockPlayers } from "@/lib/mock-data"
import { getPlayerPayouts } from "@/lib/rank"
import { generatePlayerJsonLd } from "@/lib/jsonld"
import { FileText } from "lucide-react"

interface PlayerPageProps {
  params: {
    slug: string
  }
}

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

  const currency = (n?: number) =>
    n == null
      ? "—"
      : n
          .toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 })
          .replace("US$", "$")

  const totalFor = (r: (typeof mockCareerEarnings)[0]) =>
    (r.ppa ?? 0) + (r.app ?? 0) + (r.mlp ?? 0) + (r.major ?? 0) + (r.contracts ?? 0)

  const careerEarningsWithTotals = mockCareerEarnings
    .map((yearData) => ({
      ...yearData,
      yearTotal: totalFor(yearData),
    }))
    .sort((a, b) => b.year - a.year)

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
              <div className="flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-3 mb-3">
                <h1 className="text-4xl sm:text-5xl font-bold">{player.name}</h1>
                {player.country && (
                  <span className="text-3xl sm:text-4xl">
                    {player.country === "US" ? "🇺🇸" : player.country === "CA" ? "🇨🇦" : "🌍"}
                  </span>
                )}
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-4 text-muted-foreground mb-4">
                <div className="text-base sm:text-lg">
                  Plays: {player.handedness === "R" ? "Right-handed" : "Left-handed"}
                </div>
              </div>
              <div className="flex gap-2 flex-wrap justify-center sm:justify-start">
                {player.sponsors?.map((sponsor) => (
                  <Badge key={sponsor} variant="secondary" className="text-sm px-3 py-1">
                    {sponsor}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* KPI Cards */}
        <div className="grid gap-4 md:grid-cols-3 mb-6">
          <KpiCard title="This Year Prize Money" value={formatCurrency(player.totals.ytdPrize)} />
          <KpiCard title="All-Time Prize Money" value={formatCurrency(player.totals.allTimePrize)} />
          <KpiCard title="Reported Contracts" value={formatCurrency(player.totals.reportedContracts || 0)} />
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
                    <th scope="col" className="text-left py-3 px-4 font-medium text-muted-foreground">
                      Year
                    </th>
                    <th scope="col" className="text-right py-3 px-4 font-medium text-muted-foreground">
                      PPA
                    </th>
                    <th scope="col" className="text-right py-3 px-4 font-medium text-muted-foreground">
                      APP
                    </th>
                    <th scope="col" className="text-right py-3 px-4 font-medium text-muted-foreground">
                      MLP
                    </th>
                    <th scope="col" className="text-right py-3 px-4 font-medium text-muted-foreground">
                      Major
                    </th>
                    <th scope="col" className="text-right py-3 px-4 font-medium text-muted-foreground">
                      Contracts
                    </th>
                    <th scope="col" className="text-right py-3 px-4 font-medium text-muted-foreground">
                      Year Total
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
                      <td className="py-3 px-4 font-semibold">{yearData.year}</td>
                      <td className="py-3 px-4 text-right tabular-nums text-secondary-foreground">
                        {currency(yearData.ppa)}
                      </td>
                      <td className="py-3 px-4 text-right tabular-nums text-secondary-foreground">
                        {currency(yearData.app)}
                      </td>
                      <td className="py-3 px-4 text-right tabular-nums text-secondary-foreground">
                        {currency(yearData.mlp)}
                      </td>
                      <td className="py-3 px-4 text-right tabular-nums text-secondary-foreground">
                        {currency(yearData.major)}
                      </td>
                      <td className="py-3 px-4 text-right tabular-nums text-secondary-foreground">
                        {currency(yearData.contracts)}
                      </td>
                      <td className="py-3 px-4 text-right font-semibold tabular-nums bg-gray-50">
                        {currency(yearData.yearTotal)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden space-y-4">
              {careerEarningsWithTotals.map((yearData) => (
                <Card key={yearData.year} className="p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-lg">{yearData.year}</span>
                    <span className="font-bold text-lg">{currency(yearData.yearTotal)}</span>
                  </div>
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <dt>PPA</dt>
                      <dd className="font-semibold">{currency(yearData.ppa)}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>APP</dt>
                      <dd className="font-semibold">{currency(yearData.app)}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>MLP</dt>
                      <dd className="font-semibold">{currency(yearData.mlp)}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>Major</dt>
                      <dd className="font-semibold">{currency(yearData.major)}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>Contracts</dt>
                      <dd className="font-semibold">{currency(yearData.contracts)}</dd>
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
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Event</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Tour</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Bracket</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Placement</th>
                        <th className="text-right py-3 px-4 font-medium text-muted-foreground">Prize</th>
                        <th className="text-right py-3 px-4 font-medium text-muted-foreground">Source</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPayouts.map((payout, index) => (
                        <tr
                          key={`${payout.eventSlug}-${payout.bracket}`}
                          className={`border-b hover:bg-muted/50 ${index % 2 === 0 ? "bg-muted/25" : ""}`}
                        >
                          <td className="py-3 px-4 font-medium">{formatShortDate(payout.date)}</td>
                          <td className="py-3 px-4">
                            <Link href={`/events/${payout.eventSlug}`} className="hover:text-primary transition-colors">
                              <div className="font-medium">{payout.eventName}</div>
                              <div className="text-sm text-muted-foreground">{payout.city}</div>
                            </Link>
                          </td>
                          <td className="py-3 px-4">
                            <Badge className={`${getTourBadge(payout.tour)}`}>{payout.tour}</Badge>
                          </td>
                          <td className="py-3 px-4 text-muted-foreground">{payout.bracket}</td>
                          <td className="py-3 px-4 font-medium">{payout.result}</td>
                          <td className="py-3 px-4 text-right font-semibold tabular-nums">
                            {formatCurrency(payout.prize)}
                          </td>
                          <td className="py-3 px-4 text-right">
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
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
              <div>
                <h2 className="text-lg font-semibold">Contracts & Endorsements</h2>
                <p className="text-sm text-muted-foreground">
                  Endorsements, contracts, bonuses, and other transactions
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {mockTransactions.map((transaction, index) => (
                <Card key={index} className="p-4 shadow-sm">
                  <div className="flex flex-col md:flex-row md:items-start justify-between mb-2 gap-2">
                    <h3 className="font-semibold text-base flex-1" aria-labelledby={`transaction-${index}`}>
                      {transaction.title}
                    </h3>
                    <span className="font-semibold text-black text-right md:whitespace-nowrap">
                      {currency(transaction.amount)}
                    </span>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center gap-2 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span>{formatShortDate(transaction.date)}</span>
                      <span>•</span>
                      <span>{transaction.type}</span>
                      <span>•</span>
                      <span className="truncate">{transaction.counterparty}</span>
                    </div>
                    <div className="md:ml-auto">
                      <ConfidenceBadge status={transaction.confidence as any} />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-3">{transaction.notes}</p>
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
      </main>
    </div>
  )
}
