import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function AppearanceFeesReportPage() {
  return (
    <div className="max-w-7xl mx-auto lg:px-8 py-6 px-4 space-y-8">
      {/* Back Link */}
      <Link
        href="/reports"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Reports
      </Link>

      {/* Hero Section */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Why "Appearance Fees" Often Aren't Extra Money</h1>
        <p className="text-lg text-muted-foreground">
          Understanding how appearance fees in pro pickleball often function as contract guarantees rather than
          performance-based prize money.
        </p>
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <span>Report Type: Tour Economics</span>
          <span>·</span>
          <span>Published: December 2025</span>
        </div>
      </div>

      {/* Overview Section */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <h2 className="text-2xl font-bold">Overview</h2>
          <p>
            In pro pickleball, "appearance fees" are often described like bonuses paid to get stars to show up. In many
            tour structures, they function more like scheduled payments from pre-negotiated player contracts—so the
            headline "prize pool" can overstate the amount actually available as performance-based prize money.
          </p>
        </CardContent>
      </Card>

      {/* What an appearance fee means in mature sports */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <h2 className="text-2xl font-bold">What an appearance fee means in mature sports</h2>
          <p>In established individual sports, an appearance fee is typically:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>A discretionary payment to a specific athlete to participate</li>
            <li>Paid in addition to the published prize money</li>
            <li>Separate from the event's round-by-round payout grid</li>
          </ul>
          <p>
            That separation matters because the prize pool remains a liquid pool that any entrant can earn through
            results.
          </p>
        </CardContent>
      </Card>

      {/* How it's often used in modern pickleball */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <h2 className="text-2xl font-bold">How it's often used in modern pickleball</h2>
          <p>In several publicly described tour payout structures, "appearance fees" are commonly used as:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>A distribution channel for guaranteed contract payments</li>
            <li>
              A way to allocate a large portion of the event's "total purse" to contracted players before results occur
            </li>
            <li>
              A mechanism that can make a "$1M+ purse" event function, in practice, like a much smaller performance
              prize pool for the field
            </li>
          </ul>
          <p>
            This does not mean the money is fake. It means the label "prize pool" can mix different categories of
            compensation (guarantees vs. results-based payouts).
          </p>
        </CardContent>
      </Card>

      {/* Why the advertised purse can differ */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <h2 className="text-2xl font-bold">Why the advertised purse can differ from "play-for" prize money</h2>
          <p>Common components included in headline purse figures:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Guaranteed payments (sometimes labeled as appearance fees)</li>
            <li>Stipends (travel or housing support in some formats)</li>
            <li>Performance prize money (the liquid pool paid by results)</li>
          </ul>
          <p>
            <strong>Implication:</strong> If guarantees make up most of the headline number, the share that is actually
            earned through match results can be materially smaller than fans assume.
          </p>
        </CardContent>
      </Card>

      {/* Contract status can change what players receive */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <h2 className="text-2xl font-bold">Contract status can change what players actually receive</h2>
          <p>
            Some published rules and payout grids have included contract-linked conditions that affect payouts, such as:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Different treatment for signed vs. unsigned players</li>
            <li>Reductions or adjustments tied to tour affiliation</li>
          </ul>
          <p>This can create two parallel earning realities:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Contracted players:</strong> income is less dependent on placing (Champion through Round of 64)
            </li>
            <li>
              <strong>Non-contracted players:</strong> earnings rely heavily on the performance payout grid and can be
              structurally disadvantaged
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Closing */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <h2 className="text-2xl font-bold">Closing</h2>
          <p>
            In short, appearance fees are often contract guarantees labeled inside the purse, not extra prize money
            earned by results.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
