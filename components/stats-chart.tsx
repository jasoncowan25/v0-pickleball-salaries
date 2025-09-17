"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts"
import { formatCurrency } from "@/lib/format"

const data = [
  { date: "Jan", value: 45000 },
  { date: "Feb", value: 52000 },
  { date: "Mar", value: 48000 },
  { date: "Apr", value: 61000 },
  { date: "May", value: 55000 },
  { date: "Jun", value: 67000 },
  { date: "Jul", value: 73000 },
  { date: "Aug", value: 69000 },
  { date: "Sep", value: 78000 },
  { date: "Oct", value: 85000 },
  { date: "Nov", value: 92000 },
  { date: "Dec", value: 98000 },
]

export function StatsChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">Prize Money</span>
                        <span className="font-bold text-muted-foreground">
                          {formatCurrency(payload[0].value as number)}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">Month</span>
                        <span className="font-bold">{payload[0].payload.date}</span>
                      </div>
                    </div>
                  </div>
                )
              }
              return null
            }}
          />
          <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
