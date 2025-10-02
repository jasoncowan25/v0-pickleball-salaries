"use client"

import { useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DataTable } from "@/components/data-table"
import { formatCurrency, formatShortDate } from "@/lib/format"
import { events } from "@/lib/mock-data"

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTours, setSelectedTours] = useState<string[]>([])
  const [selectedYear, setSelectedYear] = useState("2024")

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `${event.city}, ${event.stateCountry}`.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTour = selectedTours.length === 0 || selectedTours.includes(event.tour)
    const matchesYear = new Date(event.startDate).getFullYear().toString() === selectedYear
    return matchesSearch && matchesTour && matchesYear
  })

  const toggleTour = (tour: string) => {
    setSelectedTours((prev) => (prev.includes(tour) ? prev.filter((t) => t !== tour) : [...prev, tour]))
  }

  const columns = [
    {
      key: "eventName" as keyof (typeof events)[0],
      header: "Event",
      cell: (event: (typeof events)[0]) => (
        <Link href={`/events/${event.slug}`} className="hover:text-primary transition-colors">
          <div className="font-medium">{event.eventName}</div>
          <div className="text-sm text-muted-foreground">
            {event.city}, {event.stateCountry}
          </div>
        </Link>
      ),
    },
    {
      key: "tour" as keyof (typeof events)[0],
      header: "Tours",
      cell: (event: (typeof events)[0]) => (
        <Badge
          className={
            event.tour === "PPA"
              ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
              : event.tour === "MLP"
                ? "bg-green-100 text-green-800 hover:bg-green-100"
                : event.tour === "APP"
                  ? "bg-purple-100 text-purple-800 hover:bg-purple-100"
                  : ""
          }
        >
          {event.tour}
        </Badge>
      ),
    },
    {
      key: "startDate" as keyof (typeof events)[0],
      header: "Date",
      cell: (event: (typeof events)[0]) => <div className="font-medium">{formatShortDate(event.startDate)}</div>,
      sortable: true,
    },
    {
      key: "prizePoolAmount" as keyof (typeof events)[0],
      header: "Prize Pool",
      cell: (event: (typeof events)[0]) => (
        <div className="font-semibold">{event.prizePoolAmount ? formatCurrency(event.prizePoolAmount) : "TBD"}</div>
      ),
      sortable: true,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <main className="container py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Events</h1>
          <p className="text-muted-foreground">Browse professional pickleball tournaments across all tours</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
          <Input
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-80"
          />

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
            <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">Tours:</span>
            <div className="flex flex-wrap gap-2">
              {["PPA", "MLP", "APP"].map((tour) => (
                <Button
                  key={tour}
                  variant={selectedTours.includes(tour) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleTour(tour)}
                  className={
                    selectedTours.includes(tour)
                      ? tour === "PPA"
                        ? "bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200"
                        : tour === "MLP"
                          ? "bg-green-100 text-green-800 hover:bg-green-100 border-green-200"
                          : "bg-purple-100 text-purple-800 hover:bg-purple-100 border-purple-200"
                      : tour === "PPA"
                        ? "hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200"
                        : tour === "MLP"
                          ? "hover:bg-green-50 hover:text-green-700 hover:border-green-200"
                          : "hover:bg-purple-50 hover:text-purple-700 hover:border-purple-200"
                  }
                >
                  {tour}
                </Button>
              ))}
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-24 sm:w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div>
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">{selectedYear} Pro Pickleball Events</h2>
            <DataTable
              data={filteredEvents}
              columns={columns}
              pageSize={10}
              variant="events"
              hideSearch={true}
              searchQuery={searchQuery}
            />
          </Card>
        </div>
      </main>
    </div>
  )
}
