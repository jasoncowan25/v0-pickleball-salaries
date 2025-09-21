import { Card } from "@/components/ui/card"

interface KpiCardProps {
  title: string
  value: string
  caption?: string
  tooltip?: string
}

export function KpiCard({ title, value, caption }: KpiCardProps) {
  return (
    <Card className="p-4 bg-card/50 backdrop-blur">
      <div className="mb-4">
        <h3 className="text-sm text-muted-foreground">{title}</h3>
        {caption && <p className="text-xs text-muted-foreground mt-1">{caption}</p>}
      </div>
      <div>
        <p className="text-2xl font-bold tabular-nums">{value}</p>
      </div>
    </Card>
  )
}
