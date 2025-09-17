import { Card } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"

interface KpiCardProps {
  title: string
  value: string
  delta?: {
    value: string
    percentage: string
    isPositive: boolean
  }
  caption?: string
}

export function KpiCard({ title, value, delta, caption }: KpiCardProps) {
  return (
    <Card className="p-4 bg-card/50 backdrop-blur">
      <div className="mb-4">
        <h3 className="text-sm text-muted-foreground">{title}</h3>
        {caption && <p className="text-xs text-muted-foreground mt-1">{caption}</p>}
      </div>
      <div>
        <p className="text-2xl font-bold tabular-nums">{value}</p>
        {delta && (
          <div className="flex items-center gap-1 mt-1">
            {delta.isPositive ? (
              <TrendingUp className="h-4 w-4 text-[hsl(var(--success))]" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500" />
            )}
            <span
              className={`text-sm tabular-nums ${delta.isPositive ? "text-[hsl(var(--success))]" : "text-red-500"}`}
            >
              {delta.percentage}
            </span>
          </div>
        )}
      </div>
    </Card>
  )
}
