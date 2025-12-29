import { ReportCard } from "@/components/report-card"

export default function ReportsPage() {
  return (
    <main className="py-12">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Reports & Analysis</h1>
        <p className="text-muted-foreground mb-2 text-lg">
          In-depth reports and analysis of professional pickleball earnings, trends, and player performance.
        </p>
      </div>

      <div className="space-y-4">
        <ReportCard
          title="2025's Top 10 Prize Money Earners"
          description="An earnings breakdown of the top-performing pros, drawn from prize money awarded across all major tours in 2025."
          href="/reports/2025-top-10-prize-money-earners"
          publishDate="Published: December 2025"
          badge="New Report"
        />

        <ReportCard
          title="Why 'Appearance Fees' Often Aren't Extra Money"
          description="Understanding how appearance fees in pro pickleball often function as contract guarantees rather than performance-based prize money."
          href="/reports/appearance-fees-not-extra-money"
          publishDate="Published: December 2025"
          badge="New Report"
        />
      </div>
    </main>
  )
}
