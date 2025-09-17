import { Card } from "@/components/ui/card"
import { SourceFootnote } from "@/components/source-footnote"
import { mockPayouts } from "@/lib/mock-data"

export default function SourcesPage() {
  // Get all unique sources grouped by event
  const sourcesByEvent = mockPayouts.reduce(
    (acc, payout) => {
      if (!acc[payout.eventName]) {
        acc[payout.eventName] = {
          eventName: payout.eventName,
          eventSlug: payout.eventSlug,
          sources: [],
        }
      }

      payout.sources.forEach((source) => {
        const exists = acc[payout.eventName].sources.find((s) => s.url === source.url)
        if (!exists) {
          acc[payout.eventName].sources.push(source)
        }
      })

      return acc
    },
    {} as Record<
      string,
      {
        eventName: string
        eventSlug: string
        sources: Array<{ title: string; url: string; date: string; confidence: "confirmed" | "reported" | "estimated" }>
      }
    >,
  )

  return (
    <div className="min-h-screen bg-background">
      <main className="container py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Sources</h1>
          <p className="text-muted-foreground">
            All sources used to compile prize money and earnings data, organized by event
          </p>
        </div>

        <div className="space-y-8">
          {Object.values(sourcesByEvent).map((eventGroup) => (
            <Card key={eventGroup.eventSlug} className="p-6">
              <h2 className="text-xl font-semibold mb-4">{eventGroup.eventName}</h2>
              <div className="space-y-3">
                {eventGroup.sources.map((source, index) => (
                  <SourceFootnote key={index} source={source} />
                ))}
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
