import { notFound } from "next/navigation"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatCurrency } from "@/lib/format"
import { mockPayouts, mockPlayers } from "@/lib/mock-data"
import { generateEventJsonLd } from "@/lib/jsonld"

interface EventPageProps {
  params: {
    slug: string
  }
}

export default function EventPage({ params }: EventPageProps) {
  const eventPayouts = mockPayouts.filter((payout) => payout.eventSlug === params.slug)

  if (eventPayouts.length === 0) {
    notFound()
  }

  const event = eventPayouts[0]
  const totalPaid = eventPayouts.reduce((sum, payout) => sum + payout.prize, 0)
  const uniquePlayers = new Set(eventPayouts.map((p) => p.playerId)).size

  const jsonLd = generateEventJsonLd(event)

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="container py-6 space-y-6">
        <Card className="p-8">
          <h1 className="text-4xl font-bold mb-4">
            {event.tour} Tour: {event.eventName}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-muted-foreground mb-8">
            <span>{event.city}</span>
            <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100">
              {event.tour}
            </Badge>
            <span className="text-sm">{params.slug} Tour</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-500">{formatCurrency(event.purse)}</div>
              <div className="text-sm text-muted-foreground mt-1">Total Purse</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{formatCurrency(totalPaid)}</div>
              <div className="text-sm text-muted-foreground mt-1">Paid Out</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{eventPayouts.length}</div>
              <div className="text-sm text-muted-foreground mt-1">Prize Winners</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{uniquePlayers}</div>
              <div className="text-sm text-muted-foreground mt-1">Unique Players</div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-1">Prize Winners</h2>
            <p className="text-muted-foreground">All prize money recipients for this event</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold">Player</th>
                  <th className="text-left py-3 px-4 font-semibold">Discipline</th>
                  <th className="text-left py-3 px-4 font-semibold">Prize</th>
                  <th className="text-left py-3 px-4 font-semibold">Placement</th>
                </tr>
              </thead>
              <tbody>
                {eventPayouts.map((payout) => {
                  const player = mockPlayers.find((p) => p.id === payout.playerId)
                  if (!player) return null

                  return (
                    <tr key={payout.id} className="border-b hover:bg-muted/50 transition-colors">
                      <td className="py-4 px-4">
                        <Link
                          href={`/players/${player.slug}`}
                          className="flex items-center gap-3 hover:text-primary transition-colors"
                        >
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={player.headshotUrl || "/placeholder.svg"} alt={player.name} />
                            <AvatarFallback>
                              {player.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{player.name}</span>
                        </Link>
                      </td>
                      <td className="py-4 px-4">
                        {payout.bracket === "MS" && "Men's Singles"}
                        {payout.bracket === "WS" && "Women's Singles"}
                        {payout.bracket === "MD" && "Men's Doubles"}
                        {payout.bracket === "WD" && "Women's Doubles"}
                        {payout.bracket === "XD" && "Mixed Doubles"}
                      </td>
                      <td className="py-4 px-4 font-semibold">{formatCurrency(payout.prize)}</td>
                      <td className="py-4 px-4 font-semibold">{payout.result}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </main>
    </div>
  )
}
