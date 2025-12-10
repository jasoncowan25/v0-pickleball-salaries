"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { formatCurrency } from "@/lib/format"

type Props = {
  prizeYTD?: number
  prizeAllTime?: number
  reportedContractsCurrentYear?: number
  rankAllTime?: number
  careerEstimated?: number
}

export default function PlayerKpis({
  prizeYTD,
  prizeAllTime,
  reportedContractsCurrentYear,
  rankAllTime,
  careerEstimated,
}: Props) {
  const annualEstimated = (prizeYTD ?? 0) + (reportedContractsCurrentYear ?? 0)
  const careerTotal = careerEstimated ?? (prizeAllTime ?? 0) + (reportedContractsCurrentYear ?? 0)

  return (
    <section aria-labelledby="player-kpis" className="mt-4">
      <h2 id="player-kpis" className="sr-only">
        Player Key Metrics
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* 1. This Year's Prize Money */}
        <Card className="h-full border border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">This Year's Prize Money</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold tracking-tight">{formatCurrency(prizeYTD ?? 0)}</div>
          </CardContent>
        </Card>

        {/* 2. Annual Earnings (Estimated) */}
        <Card className="h-full border border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Current Annual Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold tracking-tight">{formatCurrency(annualEstimated)}</div>
          </CardContent>
        </Card>

        {/* 3. Career Earnings (Estimated) */}
        <Card className="h-full border border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Career Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold tracking-tight">{formatCurrency(careerTotal)}</div>
          </CardContent>
        </Card>

        {/* 4. Career Earnings Rank */}
        <Card className="h-full border border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Career Earnings Rank</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold tracking-tight">{rankAllTime ? `#${rankAllTime}` : "—"}</div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
