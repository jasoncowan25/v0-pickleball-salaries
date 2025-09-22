export default function Loading() {
  return (
    <section className="container mx-auto px-4 py-6 space-y-6">
      {/* Hero section skeleton */}
      <div className="space-y-4">
        <div className="h-8 w-64 rounded-md bg-muted/50" />
        <div className="h-4 w-96 rounded-md bg-muted/30" />
      </div>

      {/* KPI cards skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="h-24 rounded-xl bg-muted/50" />
        <div className="h-24 rounded-xl bg-muted/50" />
        <div className="h-24 rounded-xl bg-muted/50" />
      </div>

      {/* Table skeleton */}
      <div className="rounded-xl border">
        <div className="h-12 border-b bg-muted/30 rounded-t-xl" />
        <div className="divide-y">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="h-16 bg-muted/20" />
          ))}
        </div>
      </div>
    </section>
  )
}
