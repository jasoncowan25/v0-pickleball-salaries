import { notFound } from "next/navigation"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { DataTable } from "@/components/data-table"
import { SourceFootnote } from "@/components/source-footnote"
import { formatCurrency, formatShortDate } from "@/lib/format"
import { mockPayouts, mockPlayers } from "@/lib/mock-data"
import { generateEventJsonLd } from "@/lib/jsonld"
import type { EventPayout } from "@/lib/mock-data"

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

  const event = eventPayouts[0] // Get event details from first payout
  const totalPaid = eventPayouts.reduce((sum, payout) => sum + payout.prize, 0)

  const getConfidenceBadgeVariant = (confidence: string) => {
    switch (confidence) {
      case "confirmed":
        return "default"
      case "reported":
        return "secondary"
      case "estimated":
        return "outline"
      default:
        return "outline"
    }
  }

  const resultColumns = [
    {
      key: "bracket" as keyof EventPayout,
      header: "Bracket",
      cell: (payout: EventPayout) => <Badge variant="outline">{payout.bracket}</Badge>,
    },
    {
      key: "result" as keyof EventPayout,
      header: "Result",
      cell: (payout: EventPayout) => <div className="font-medium">{payout.result}</div>,
    },
    {
      key: "playerId" as keyof EventPayout,
      header: "Player",
      cell: (payout: EventPayout) => {
        const player = mockPlayers.find((p) => p.id === payout.playerId)
        if (!player) return <div>Unknown Player</div>
        return (
          <Link
            href={`/players/${player.slug}`}
            className="flex items-center gap-3 hover:text-primary transition-colors"
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src={player.headshotUrl || "/placeholder.svg"} alt={player.name} />
              <AvatarFallback>
                {player.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{player.name}</div>
              <div className="text-sm text-muted-foreground">{player.country}</div>
            </div>
          </Link>
        )
      },
    },
    {
      key: "prize" as keyof EventPayout,
      header: "Prize",
      cell: (payout: EventPayout) => <div className="font-semibold">{formatCurrency(payout.prize)}</div>,
      sortable: true,
    },
    {
      key: "sources" as keyof EventPayout,
      header: "Source",
      cell: (payout: EventPayout) => (
        <Badge variant={getConfidenceBadgeVariant(payout.sources[0]?.confidence)}>
          {payout.sources[0]?.confidence}
        </Badge>
      ),
    },
  ]

  const jsonLd = generateEventJsonLd(event)

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="container py-6">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/events">Events</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{event.eventName}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Event Header */}
        <Card className="p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{event.eventName}</h1>
              <div className="flex items-center gap-4 text-muted-foreground">
                <div>{formatShortDate(event.date)}</div>
                <div>{event.city}</div>
                <Badge variant="secondary">{event.tour} Tour</Badge>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{formatCurrency(event.purse)}</div>
              <div className="text-sm text-muted-foreground">Total Purse</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{formatCurrency(totalPaid)}</div>
              <div className="text-sm text-muted-foreground">Paid Out</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{eventPayouts.length}</div>
              <div className="text-sm text-muted-foreground">Prize Winners</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{new Set(eventPayouts.map((p) => p.bracket)).size}</div>
              <div className="text-sm text-muted-foreground">Brackets</div>
            </div>
          </div>
        </Card>

        {/* Results Table */}
        <Card className="p-6 mb-6">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Prize Winners</h2>
            <p className="text-sm text-muted-foreground">All prize money recipients for this event</p>
          </div>
          <DataTable data={eventPayouts} columns={resultColumns} pageSize={15} />
        </Card>

        {/* Purse Verification */}
        <Card className="p-6 mb-6">
          <h3 className="font-semibold mb-2">Prize Pool Verification</h3>
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
            <div>
              <div className="font-medium">Total Announced: {formatCurrency(event.purse)}</div>
              <div className="text-sm text-muted-foreground">Total Tracked: {formatCurrency(totalPaid)}</div>
            </div>
            <div className="text-right">
              <div
                className={`font-semibold ${totalPaid === event.purse ? "text-[hsl(var(--success))]" : "text-yellow-500"}`}
              >
                {totalPaid === event.purse ? "✓ Complete" : "⚠ Partial"}
              </div>
              <div className="text-sm text-muted-foreground">
                {((totalPaid / event.purse) * 100).toFixed(1)}% tracked
              </div>
            </div>
          </div>
        </Card>

        {/* Sources */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Sources</h3>
          <div className="space-y-3">
            {eventPayouts
              .flatMap((payout) => payout.sources)
              .filter((source, index, self) => index === self.findIndex((s) => s.url === source.url))
              .map((source, index) => (
                <SourceFootnote key={index} source={source} />
              ))}
          </div>
        </Card>
      </main>
    </div>
  )
}
