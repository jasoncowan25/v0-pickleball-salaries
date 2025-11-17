import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SourcesPage() {
  return (
    <main aria-labelledby="sources-heading" className="container py-8 md:py-12">
      {/* Page Header */}
      <div className="mb-8 md:mb-12">
        <h1 id="sources-heading" className="text-3xl font-bold tracking-tight mb-3">
          Sources
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
          How DinkBank compiles professional pickleball earnings data using publicly available information.
        </p>
      </div>

      <section className="mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Where Our Data Comes From</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-base leading-relaxed">
              DinkBank compiles professional pickleball earnings using publicly available information, including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-2">
              <li>Media articles and recaps</li>
              <li>Player and coach announcements</li>
              <li>Tour press releases</li>
              <li>Social media posts</li>
              <li>Independent tournament reports</li>
              <li>Sponsor/event partner announcements</li>
              <li>Interviews, podcasts, and video descriptions</li>
            </ul>
            <p className="text-base leading-relaxed pt-2">
              We cross-reference publicly available tour announcements for accuracy but do not scrape, extract, or
              republish structured data from PPA, MLP, or APP websites.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Professional Tours (Context Only)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-base leading-relaxed">
              We reference public announcements from each professional tour to confirm event details such as dates,
              locations, and purse announcements. We do not scrape or extract structured data from tour websites.
            </p>
            <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-2">
              <li>PPA Tour</li>
              <li>Major League Pickleball</li>
              <li>APP Tour</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <div className="text-sm text-muted-foreground max-w-3xl">
        <p>
          All data on DinkBank is compiled manually from public sources and verified for accuracy. Each dataset entry
          includes source attribution and confidence indicators for full transparency.
        </p>
      </div>
    </main>
  )
}
