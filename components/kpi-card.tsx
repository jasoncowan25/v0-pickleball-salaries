import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface KpiCardProps {
  title: string
  value: string
  tooltip?: string
  badge?: string
}

export function KpiCard({ title, value, tooltip, badge }: KpiCardProps) {
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
      </CardContent>
    </Card>
  )
}
