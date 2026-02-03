"use client"

import { useState } from "react"
import { notFound, useParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Trophy, Users } from "lucide-react"
import { formatCurrencyUSD } from "@/lib/format"
import { TourSwitcher } from "@/components/TourSwitcher"
import { TOUR_CONFIG, isValidTour, type TourId } from "@/lib/tour-config"
import { getPrizeMoneyData } from "@/lib/prize-money-data"
import { TourSection } from "@/components/prize-money/tour-section"

// 2026 PPA Prize Money by Event Type (Gold Card tier, per player)
const PPA_SLAMS_GOLD = {
  "Men's Doubles": [
    { place: "Winner", amount: 45000 },
    { place: "Second Place", amount: 25000 },
    { place: "Third Place", amount: 15000 },
    { place: "Fourth Place", amount: 12000 },
    { place: "Quarter Finals", amount: 6000 },
    { place: "Round of 16", amount: 3000 },
    { place: "Round of 32", amount: 1500 },
  ],
  "Women's Doubles": [
    { place: "Winner", amount: 45000 },
    { place: "Second Place", amount: 25000 },
    { place: "Third Place", amount: 15000 },
    { place: "Fourth Place", amount: 12000 },
    { place: "Quarter Finals", amount: 6000 },
    { place: "Round of 16", amount: 3000 },
    { place: "Round of 32", amount: 1500 },
  ],
  "Mixed Doubles": [
    { place: "Winner", amount: 38000 },
    { place: "Second Place", amount: 21000 },
    { place: "Third Place", amount: 12000 },
    { place: "Fourth Place", amount: 10000 },
    { place: "Quarter Finals", amount: 5000 },
    { place: "Round of 16", amount: 2000 },
    { place: "Round of 32", amount: 1000 },
  ],
  "Men's Singles": [
    { place: "Winner", amount: 23000 },
    { place: "Second Place", amount: 12000 },
    { place: "Third Place", amount: 7000 },
    { place: "Fourth Place", amount: 6000 },
    { place: "Quarter Finals", amount: 3000 },
    { place: "Round of 16", amount: 1000 },
    { place: "Round of 32", amount: 325 },
  ],
  "Women's Singles": [
    { place: "Winner", amount: 23000 },
    { place: "Second Place", amount: 12000 },
    { place: "Third Place", amount: 7000 },
    { place: "Fourth Place", amount: 6000 },
    { place: "Quarter Finals", amount: 3000 },
    { place: "Round of 16", amount: 1000 },
    { place: "Round of 32", amount: 325 },
  ],
}

const PPA_FINALS_GOLD = {
  "Men's Doubles": [
    { place: "Winner", amount: 35000 },
    { place: "Second Place", amount: 20000 },
    { place: "Third Place", amount: 15000 },
    { place: "Fourth Place", amount: 10000 },
    { place: "5-8", amount: 5000 },
  ],
  "Women's Doubles": [
    { place: "Winner", amount: 35000 },
    { place: "Second Place", amount: 20000 },
    { place: "Third Place", amount: 15000 },
    { place: "Fourth Place", amount: 10000 },
    { place: "5-8", amount: 5000 },
  ],
  "Mixed Doubles": [
    { place: "Winner", amount: 35000 },
    { place: "Second Place", amount: 20000 },
    { place: "Third Place", amount: 15000 },
    { place: "Fourth Place", amount: 10000 },
    { place: "5-8", amount: 5000 },
  ],
  "Men's Singles": [
    { place: "Winner", amount: 10000 },
    { place: "Second Place", amount: 5000 },
    { place: "Third Place", amount: 3500 },
    { place: "Fourth Place", amount: 3000 },
    { place: "5-8", amount: 2500 },
  ],
  "Women's Singles": [
    { place: "Winner", amount: 10000 },
    { place: "Second Place", amount: 5000 },
    { place: "Third Place", amount: 3500 },
    { place: "Fourth Place", amount: 3000 },
    { place: "5-8", amount: 2500 },
  ],
}

const PPA_CUPS_GOLD = {
  "Men's Doubles": [
    { place: "Winner", amount: 28000 },
    { place: "Second Place", amount: 15000 },
    { place: "Third Place", amount: 9000 },
    { place: "Fourth Place", amount: 7500 },
    { place: "Quarter Finals", amount: 3800 },
    { place: "Round of 16", amount: 1900 },
    { place: "Round of 32", amount: 933 },
  ],
  "Women's Doubles": [
    { place: "Winner", amount: 28000 },
    { place: "Second Place", amount: 15000 },
    { place: "Third Place", amount: 9000 },
    { place: "Fourth Place", amount: 7500 },
    { place: "Quarter Finals", amount: 3800 },
    { place: "Round of 16", amount: 1900 },
    { place: "Round of 32", amount: 933 },
  ],
  "Mixed Doubles": [
    { place: "Winner", amount: 23000 },
    { place: "Second Place", amount: 13000 },
    { place: "Third Place", amount: 7500 },
    { place: "Fourth Place", amount: 6300 },
    { place: "Quarter Finals", amount: 3200 },
    { place: "Round of 16", amount: 1600 },
    { place: "Round of 32", amount: 622 },
  ],
  "Men's Singles": [
    { place: "Winner", amount: 7000 },
    { place: "Second Place", amount: 3750 },
    { place: "Third Place", amount: 2250 },
    { place: "Fourth Place", amount: 1900 },
    { place: "Quarter Finals", amount: 950 },
    { place: "Round of 16", amount: 500 },
    { place: "Round of 32", amount: 202 },
  ],
  "Women's Singles": [
    { place: "Winner", amount: 7000 },
    { place: "Second Place", amount: 3750 },
    { place: "Third Place", amount: 2250 },
    { place: "Fourth Place", amount: 1900 },
    { place: "Quarter Finals", amount: 950 },
    { place: "Round of 16", amount: 500 },
    { place: "Round of 32", amount: 202 },
  ],
}

const PPA_OPENS_GOLD = {
  "Men's Doubles": [
    { place: "Winner", amount: 19000 },
    { place: "Second Place", amount: 10000 },
    { place: "Third Place", amount: 6000 },
    { place: "Fourth Place", amount: 5000 },
    { place: "Quarter Finals", amount: 2500 },
    { place: "Round of 16", amount: 1500 },
    { place: "Round of 32", amount: 627 },
  ],
  "Women's Doubles": [
    { place: "Winner", amount: 19000 },
    { place: "Second Place", amount: 10000 },
    { place: "Third Place", amount: 6000 },
    { place: "Fourth Place", amount: 5000 },
    { place: "Quarter Finals", amount: 2500 },
    { place: "Round of 16", amount: 1500 },
    { place: "Round of 32", amount: 627 },
  ],
  "Mixed Doubles": [
    { place: "Winner", amount: 15000 },
    { place: "Second Place", amount: 8500 },
    { place: "Third Place", amount: 5000 },
    { place: "Fourth Place", amount: 4000 },
    { place: "Quarter Finals", amount: 2000 },
    { place: "Round of 16", amount: 1000 },
    { place: "Round of 32", amount: 418 },
  ],
  "Men's Singles": [
    { place: "Winner", amount: 4500 },
    { place: "Second Place", amount: 2500 },
    { place: "Third Place", amount: 1500 },
    { place: "Fourth Place", amount: 1250 },
    { place: "Quarter Finals", amount: 750 },
    { place: "Round of 16", amount: 375 },
    { place: "Round of 32", amount: 136 },
  ],
  "Women's Singles": [
    { place: "Winner", amount: 4500 },
    { place: "Second Place", amount: 2500 },
    { place: "Third Place", amount: 1500 },
    { place: "Fourth Place", amount: 1250 },
    { place: "Quarter Finals", amount: 750 },
    { place: "Round of 16", amount: 375 },
    { place: "Round of 32", amount: 136 },
  ],
}

const EVENT_DATA: Record<string, typeof PPA_SLAMS_GOLD> = {
  slams: PPA_SLAMS_GOLD,
  finals: PPA_FINALS_GOLD,
  cups: PPA_CUPS_GOLD,
  opens: PPA_OPENS_GOLD,
}

// Tier Multipliers based on contract grid
const TIER_MULTIPLIERS: Record<string, number> = {
  gold: 1.0,
  standard: 0.4,
  futures: 0.2,
  unsigned: 0.1,
}

const TIER_LABELS: Record<string, string> = {
  gold: "Gold Card",
  standard: "Standard",
  futures: "Futures",
  unsigned: "Unsigned",
}

const EVENT_LABELS: Record<string, string> = {
  slams: "Slams",
  finals: "Finals",
  cups: "Cups",
  opens: "Opens",
}

const MLP_EVENT_LABELS: Record<string, string> = {
  midseason: "Midseason",
  playoffs: "Playoffs",
}

// MLP Prize Money Data (Gold Card tier, per player)
const MLP_MIDSEASON_GOLD = {
  placements: [
    { place: "1st Place", amount: 50000 },
    { place: "2nd Place", amount: 35000 },
    { place: "3rd Place", amount: 25000 },
    { place: "4th Place", amount: 15000 },
    { place: "Quarterfinal", amount: 10000 },
    { place: "9-12", amount: 5000 },
  ],
}

const MLP_PLAYOFFS_GOLD = {
  placements: [
    { place: "1st Place", amount: 250000 },
    { place: "2nd Place", amount: 100000 },
    { place: "3rd Place", amount: 75000 },
    { place: "4th Place", amount: 50000 },
    { place: "Quarterfinal", amount: 25000 },
    { place: "9-12", amount: 10000 },
  ],
}

const MLP_APPEARANCE_FEES_GOLD = [
  { ranking: "1st", seasonLong: 40000, combined: 80000 },
  { ranking: "2nd", seasonLong: 35000, combined: 70000 },
  { ranking: "3rd", seasonLong: 30000, combined: 60000 },
  { ranking: "4th", seasonLong: 25000, combined: 50000 },
  { ranking: "5-8", seasonLong: 20000, combined: 160000 },
  { ranking: "9-12", seasonLong: 15000, combined: 120000 },
  { ranking: "13-20", seasonLong: 10000, combined: 160000 },
  { ranking: "21+", seasonLong: 5000, combined: 300000 },
]

// Standard tier MLP data
const MLP_MIDSEASON_STANDARD = {
  placements: [
    { place: "1st Place", amount: 20000 },
    { place: "2nd Place", amount: 14000 },
    { place: "3rd Place", amount: 10000 },
    { place: "4th Place", amount: 6000 },
    { place: "Quarterfinal", amount: 4000 },
    { place: "9-12", amount: 2000 },
  ],
}

const MLP_PLAYOFFS_STANDARD = {
  placements: [
    { place: "1st Place", amount: 125000 },
    { place: "2nd Place", amount: 50000 },
    { place: "3rd Place", amount: 37500 },
    { place: "4th Place", amount: 25000 },
    { place: "Quarterfinal", amount: 12500 },
    { place: "9-12", amount: 5000 },
  ],
}

const MLP_APPEARANCE_FEES_STANDARD = [
  { ranking: "1st", seasonLong: 20000, combined: 40000 },
  { ranking: "2nd", seasonLong: 17500, combined: 35000 },
  { ranking: "3rd", seasonLong: 15000, combined: 30000 },
  { ranking: "4th", seasonLong: 12500, combined: 25000 },
  { ranking: "5-8", seasonLong: 10000, combined: 80000 },
  { ranking: "9-12", seasonLong: 7500, combined: 60000 },
  { ranking: "13-20", seasonLong: 5000, combined: 80000 },
  { ranking: "21+", seasonLong: 2500, combined: 150000 },
]

// Futures tier MLP data
const MLP_MIDSEASON_FUTURES = {
  placements: [
    { place: "1st Place", amount: 10000 },
    { place: "2nd Place", amount: 7000 },
    { place: "3rd Place", amount: 5000 },
    { place: "4th Place", amount: 3000 },
    { place: "Quarterfinal", amount: 2000 },
    { place: "9-12", amount: 1000 },
  ],
}

const MLP_PLAYOFFS_FUTURES = {
  placements: [
    { place: "1st Place", amount: 62500 },
    { place: "2nd Place", amount: 25000 },
    { place: "3rd Place", amount: 18750 },
    { place: "4th Place", amount: 12500 },
    { place: "Quarterfinal", amount: 6250 },
    { place: "9-12", amount: 2500 },
  ],
}

const MLP_APPEARANCE_FEES_FUTURES = [
  { ranking: "1st", seasonLong: 10000, combined: 0 },
  { ranking: "2nd", seasonLong: 8750, combined: 0 },
  { ranking: "3rd", seasonLong: 7500, combined: 0 },
  { ranking: "4th", seasonLong: 6250, combined: 0 },
  { ranking: "5-8", seasonLong: 5000, combined: 0 },
  { ranking: "9-12", seasonLong: 3750, combined: 0 },
  { ranking: "13-20", seasonLong: 2500, combined: 0 },
  { ranking: "21+", seasonLong: 1250, combined: 0 },
]

// Unsigned tier: 50% of Futures
const MLP_MIDSEASON_UNSIGNED = {
  placements: [
    { place: "1st Place", amount: 5000 },
    { place: "2nd Place", amount: 3500 },
    { place: "3rd Place", amount: 2500 },
    { place: "4th Place", amount: 1500 },
    { place: "Quarterfinal", amount: 1000 },
    { place: "9-12", amount: 500 },
  ],
}

const MLP_PLAYOFFS_UNSIGNED = {
  placements: [
    { place: "1st Place", amount: 31250 },
    { place: "2nd Place", amount: 12500 },
    { place: "3rd Place", amount: 9375 },
    { place: "4th Place", amount: 6250 },
    { place: "Quarterfinal", amount: 3125 },
    { place: "9-12", amount: 1250 },
  ],
}

const MLP_APPEARANCE_FEES_UNSIGNED = [
  { ranking: "1st", seasonLong: 5000, combined: 0 },
  { ranking: "2nd", seasonLong: 4375, combined: 0 },
  { ranking: "3rd", seasonLong: 3750, combined: 0 },
  { ranking: "4th", seasonLong: 3125, combined: 0 },
  { ranking: "5-8", seasonLong: 2500, combined: 0 },
  { ranking: "9-12", seasonLong: 1875, combined: 0 },
  { ranking: "13-20", seasonLong: 1250, combined: 0 },
  { ranking: "21+", seasonLong: 625, combined: 0 },
]

// Organize MLP data by tier
const MLP_DATA_BY_TIER: Record<
  string,
  {
    midseason: typeof MLP_MIDSEASON_GOLD
    playoffs: typeof MLP_PLAYOFFS_GOLD
    appearance: typeof MLP_APPEARANCE_FEES_GOLD
  }
> = {
  gold: {
    midseason: MLP_MIDSEASON_GOLD,
    playoffs: MLP_PLAYOFFS_GOLD,
    appearance: MLP_APPEARANCE_FEES_GOLD,
  },
  standard: {
    midseason: MLP_MIDSEASON_STANDARD,
    playoffs: MLP_PLAYOFFS_STANDARD,
    appearance: MLP_APPEARANCE_FEES_STANDARD,
  },
  futures: {
    midseason: MLP_MIDSEASON_FUTURES,
    playoffs: MLP_PLAYOFFS_FUTURES,
    appearance: MLP_APPEARANCE_FEES_FUTURES,
  },
  unsigned: {
    midseason: MLP_MIDSEASON_UNSIGNED,
    playoffs: MLP_PLAYOFFS_UNSIGNED,
    appearance: MLP_APPEARANCE_FEES_UNSIGNED,
  },
}

// MLP Tier Multipliers
const MLP_TIER_MULTIPLIERS: Record<string, { midseason: number; playoffs: number; appearance: number }> = {
  gold: { midseason: 1.0, playoffs: 1.0, appearance: 1.0 },
  standard: { midseason: 0.4, playoffs: 0.5, appearance: 0.4 },
  futures: { midseason: 0.2, playoffs: 0.0, appearance: 0.25 },
  unsigned: { midseason: 0.1, playoffs: 0.0, appearance: 0.125 },
}

// MLP Event Data
const MLP_EVENT_DATA: Record<string, typeof MLP_MIDSEASON_GOLD> = {
  midseason: MLP_MIDSEASON_GOLD,
  playoffs: MLP_PLAYOFFS_GOLD,
}

export default function TourPrizeMoneyPage() {
  const params = useParams()
  const tourParam = params?.tour as string

  // Validate tour parameter
  if (!isValidTour(tourParam)) {
    notFound()
  }

  const tour: TourId = tourParam
  const tourConfig = TOUR_CONFIG[tour]

  const [selectedTier, setSelectedTier] = useState<string>("gold")
  const [selectedEvent, setSelectedEvent] = useState<string>("slams")
  const [selectedMLPEvent, setSelectedMLPEvent] = useState<string>("playoffs")
  
  const multiplier = TIER_MULTIPLIERS[selectedTier]
  const eventData = EVENT_DATA[selectedEvent]

  // Calculate hero card values for PPA
  const doublesWinner = Math.round(eventData["Men's Doubles"][0].amount * multiplier)
  const mixedWinner = Math.round(eventData["Mixed Doubles"][0].amount * multiplier)

  // Calculate hero card values for MLP
  const mlpTierData = MLP_DATA_BY_TIER[selectedTier]
  const mlpEventData = selectedMLPEvent === "midseason" ? mlpTierData.midseason : mlpTierData.playoffs
  const mlpWinner = mlpEventData.placements[0].amount
  const mlpSecond = mlpEventData.placements[1].amount
  const mlpAppearanceFees = mlpTierData.appearance

  const mlpEventMultiplier = MLP_TIER_MULTIPLIERS[selectedTier][selectedMLPEvent]
  const mlpMultipliers = MLP_TIER_MULTIPLIERS[selectedTier]

  return (
    <div className="py-12">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-1">Prize Money</h1>
        <p className="text-sm text-muted-foreground mb-4">
          Pro Pickleball Prize Money by Event, Finish & Contract Tier (PPA, MLP, APP)
        </p>

        {/* Tour Switcher */}
        <TourSwitcher currentTour={tour} />
      </div>

      {/* Divider */}
      <div className="border-t my-6" />

      {tour === "ppa" ? (
        <>
          {/* Selectors for PPA */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            {/* Tier Selector */}
            <div className="flex-1">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
                Contract Tier
              </label>
              <div className="inline-flex rounded-lg border bg-muted/30 p-1 w-full sm:w-auto">
                {Object.entries(TIER_LABELS).map(([tier, label]) => (
                  <button
                    key={tier}
                    onClick={() => setSelectedTier(tier)}
                    className={`flex-1 sm:flex-none px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                      selectedTier === tier
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Event Type Selector */}
            <div className="flex-1">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
                Event Type
              </label>
              <div className="inline-flex rounded-lg border bg-muted/30 p-1 w-full sm:w-auto">
                {Object.entries(EVENT_LABELS).map(([event, label]) => (
                  <button
                    key={event}
                    onClick={() => setSelectedEvent(event)}
                    className={`flex-1 sm:flex-none px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                      selectedEvent === event
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Hero Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Card className="p-6 border-2">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-muted">
                  <Trophy className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-muted-foreground mb-1">
                    {EVENT_LABELS[selectedEvent]} Doubles Winner
                  </div>
                  <div className="text-3xl font-bold font-mono tabular-nums">
                    {formatCurrencyUSD(doublesWinner)}
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">Per player payout</div>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-2">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-muted">
                  <Users className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-muted-foreground mb-1">
                    {EVENT_LABELS[selectedEvent]} Mixed Doubles Winner
                  </div>
                  <div className="text-3xl font-bold font-mono tabular-nums">
                    {formatCurrencyUSD(mixedWinner)}
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">Per player payout</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Data Tables */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Doubles */}
            <Card className="overflow-hidden">
              <div className="px-4 py-3 border-b bg-muted/30 flex items-center gap-2">
                <Trophy className="h-4 w-4" />
                <h3 className="font-semibold">Doubles (Men's & Women's)</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/20">
                      <th className="text-left py-2 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Placement
                      </th>
                      <th className="text-right py-2 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Payout
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {eventData["Men's Doubles"].map((row, idx) => (
                      <tr key={row.place} className={idx % 2 === 0 ? "bg-background" : "bg-muted/10"}>
                        <td className="py-2.5 px-4 text-sm font-medium">{row.place}</td>
                        <td className="py-2.5 px-4 text-sm text-right tabular-nums font-mono">
                          {formatCurrencyUSD(Math.round(row.amount * multiplier))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-4 py-3 border-t bg-muted/20 text-xs text-muted-foreground">
                Per player payouts
              </div>
            </Card>

            {/* Singles */}
            <Card className="overflow-hidden">
              <div className="px-4 py-3 border-b bg-muted/30 flex items-center gap-2">
                <Users className="h-4 w-4" />
                <h3 className="font-semibold">Singles (Men's & Women's)</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/20">
                      <th className="text-left py-2 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Placement
                      </th>
                      <th className="text-right py-2 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Payout
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {eventData["Men's Singles"].map((row, idx) => (
                      <tr key={row.place} className={idx % 2 === 0 ? "bg-background" : "bg-muted/10"}>
                        <td className="py-2.5 px-4 text-sm font-medium">{row.place}</td>
                        <td className="py-2.5 px-4 text-sm text-right tabular-nums font-mono">
                          {formatCurrencyUSD(Math.round(row.amount * multiplier))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-4 py-3 border-t bg-muted/20 text-xs text-muted-foreground">
                Per player earnings
              </div>
            </Card>

            {/* Mixed Doubles */}
            <Card className="overflow-hidden lg:col-span-2">
              <div className="px-4 py-3 border-b bg-muted/30 flex items-center gap-2">
                <Trophy className="h-4 w-4" />
                <h3 className="font-semibold">Mixed Doubles</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/20">
                      <th className="text-left py-2 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Placement
                      </th>
                      <th className="text-right py-2 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Payout
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {eventData["Mixed Doubles"].map((row, idx) => (
                      <tr key={row.place} className={idx % 2 === 0 ? "bg-background" : "bg-muted/10"}>
                        <td className="py-2.5 px-4 text-sm font-medium">{row.place}</td>
                        <td className="py-2.5 px-4 text-sm text-right tabular-nums font-mono">
                          {formatCurrencyUSD(Math.round(row.amount * multiplier))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-4 py-3 border-t bg-muted/20 text-xs text-muted-foreground">
                Per player payouts
              </div>
            </Card>
          </div>

          {/* Footer Note */}
          <p className="mt-6 text-xs text-muted-foreground leading-relaxed">
            2026 PPA Tour earning model based on official contract tier structures. Multipliers applied:{" "}
            Gold Card (1.0x), Standard (0.4x), Futures (0.2x), Unsigned (0.1x). Source: UPA Player
            Contracts 2026-2028.
          </p>
        </>
      ) : tour === "mlp" ? (
        <>
          {/* Selectors for MLP */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            {/* Tier Selector */}
            <div className="flex-1">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
                Contract Tier
              </label>
              <div className="inline-flex rounded-lg border bg-muted/30 p-1 w-full sm:w-auto">
                {Object.entries(TIER_LABELS).map(([tier, label]) => (
                  <button
                    key={tier}
                    onClick={() => setSelectedTier(tier)}
                    className={`flex-1 sm:flex-none px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                      selectedTier === tier
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Event Type Selector */}
            <div className="flex-1">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
                Event Type
              </label>
              <div className="inline-flex rounded-lg border bg-muted/30 p-1 w-full sm:w-auto">
                {Object.entries(MLP_EVENT_LABELS).map(([event, label]) => (
                  <button
                    key={event}
                    onClick={() => setSelectedMLPEvent(event)}
                    className={`flex-1 sm:flex-none px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                      selectedMLPEvent === event
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Hero Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Card className="p-6 border-2">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-muted">
                  <Trophy className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-muted-foreground mb-1">
                    {MLP_EVENT_LABELS[selectedMLPEvent]} 1st Place
                  </div>
                  <div className="text-3xl font-bold font-mono tabular-nums">
                    {mlpWinner > 0 ? formatCurrencyUSD(mlpWinner) : "—"}
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">Per player payout</div>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-2">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-muted">
                  <Users className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-muted-foreground mb-1">
                    {MLP_EVENT_LABELS[selectedMLPEvent]} 2nd Place
                  </div>
                  <div className="text-3xl font-bold font-mono tabular-nums">
                    {mlpSecond > 0 ? formatCurrencyUSD(mlpSecond) : "—"}
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">Per player payout</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Data Tables */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Event Placements */}
            <Card className="overflow-hidden">
              <div className="px-4 py-3 border-b bg-muted/30 flex items-center gap-2">
                <Trophy className="h-4 w-4" />
                <h3 className="font-semibold">{MLP_EVENT_LABELS[selectedMLPEvent]} Placements</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/20">
                      <th className="text-left py-2 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Placement
                      </th>
                      <th className="text-right py-2 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Payout
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {mlpEventData.placements.map((row, idx) => (
                      <tr key={row.place} className={idx % 2 === 0 ? "bg-background" : "bg-muted/10"}>
                        <td className="py-2.5 px-4 text-sm font-medium">{row.place}</td>
                        <td className="py-2.5 px-4 text-sm text-right tabular-nums font-mono">
                          {row.amount > 0 ? formatCurrencyUSD(row.amount) : "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-4 py-3 border-t bg-muted/20 text-xs text-muted-foreground">
                Per player payouts
              </div>
            </Card>

            {/* Regular Season Appearance Fees */}
            <Card className="overflow-hidden">
              <div className="px-4 py-3 border-b bg-muted/30 flex items-center gap-2">
                <Users className="h-4 w-4" />
                <h3 className="font-semibold">Regular Season Appearance Fee</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/20">
                      <th className="text-left py-2 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        PPA Ranking
                      </th>
                      <th className="text-right py-2 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Season Long
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {mlpAppearanceFees.map((row, idx) => (
                      <tr key={row.ranking} className={idx % 2 === 0 ? "bg-background" : "bg-muted/10"}>
                        <td className="py-2.5 px-4 text-sm font-medium">{row.ranking}</td>
                        <td className="py-2.5 px-4 text-sm text-right tabular-nums font-mono">
                          {row.seasonLong > 0 ? formatCurrencyUSD(row.seasonLong) : "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-4 py-3 border-t bg-muted/20 text-xs text-muted-foreground">
                Based on PPA World Ranking on first day of MLP season
              </div>
            </Card>
          </div>

          {/* Footer Note */}
          <p className="mt-6 text-xs text-muted-foreground leading-relaxed">
            2026 MLP earning model based on official contract tier structures. Gold Card players receive full Midseason
            ($50k winner) and Playoff ($250k winner) payouts plus appearance fees up to $40k. Standard players receive
            Midseason ($20k winner) and Playoff ($125k winner) payouts plus appearance fees up to $20k. Futures players
            receive Midseason ($10k winner) and Playoff ($62.5k winner) payouts plus appearance fees up to $10k.
            Unsigned players receive 50% of Futures tier payouts. All amounts per player. Source: UPA Player Contracts
            2026-2028.
          </p>
        </>
      ) : tour === "app" ? (
        <>
          {/* APP Tour Prize Money using new structure */}
          {(() => {
            const prizeData = getPrizeMoneyData("2026")
            const appData = prizeData.tours.find((t) => t.tour === "APP")
            if (!appData) {
              return (
                <Card className="overflow-hidden opacity-50">
                  <div className="p-8 text-center text-muted-foreground">
                    <p className="text-sm">APP prize money data not found.</p>
                  </div>
                </Card>
              )
            }
            return <TourSection tourSection={appData} />
          })()}
        </>
      ) : (
        <>
          {/* Placeholder for other tours */}
          <div className="space-y-6">
            {/* Hero Cards Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-6 border-2 opacity-50">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-muted">
                    <Trophy className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-muted-foreground mb-1">Coming Soon</div>
                    <div className="text-3xl font-bold font-mono tabular-nums">—</div>
                    <div className="text-xs text-muted-foreground mt-2">Prize money data</div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Table Skeleton */}
            <Card className="overflow-hidden opacity-50">
              <div className="px-4 py-3 border-b bg-muted/30">
                <h3 className="font-semibold">{tourConfig.fullName} Prize Money</h3>
              </div>
              <div className="p-8 text-center text-muted-foreground">
                <p className="text-sm">
                  {tourConfig.fullName} prize money data coming soon. Check back for updates.
                </p>
              </div>
            </Card>
          </div>
        </>
      )}
    </div>
  )
}
