import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface KpiCardProps {
  title: string
  value: string
  tooltip?: string
  badge?: string
  comparison?: {
    changeAmount: string
    changePercent: number
    isPositive?: boolean
  }
}

export function KpiCard({ title, value, tooltip, badge, comparison }: KpiCardProps) {
  return (
    <Card className="relative overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base font-medium">{title}</CardTitle>
          {badge && (
            <Badge variant="secondary" className="shrink-0" aria-hidden="true">
              {badge}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="text-2xl font-semibold tabular-nums">{value}</div>
        {tooltip ? <p className="mt-1 text-xs text-muted-foreground">{tooltip}</p> : null}
        {comparison && (
          <p className="mt-1 font-normal text-sm">
            <span className="text-foreground">{comparison.changeAmount}</span>
            {' '}
            <span style={{ color: comparison.isPositive !== false ? '#2E7D32' : '#D32F2F' }}>
              {comparison.changePercent > 0 ? '+' : ''}{comparison.changePercent.toFixed(1)}%
            </span>
            {' '}
            <span className="text-muted-foreground">vs last season</span>
          </p>
        )}
      </CardContent>
    </Card>
  )
}
