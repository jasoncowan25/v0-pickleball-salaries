import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function Top10Report2025Page() {
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
        <h1 className="text-3xl font-bold">2025's Top 10 Prize Money Earners</h1>
        <p className="text-base text-muted-foreground">
          A year-over-year look at the top prize-money earners in professional pickleball, how their rankings shifted
          from 2024, and where injuries and partnership changes shaped the final table.
        </p>
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <span>Report Type: Earnings Analysis</span>
          <span>·</span>
          <span>Published: December 2025</span>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-3 text-sm">
          <p className="text-yellow-900 font-medium">
            Prize money only (APP, MLP, PPA). Contracts, appearance fees, and endorsements are excluded from all
            figures.
          </p>
        </div>
      </div>

      {/* Overview */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <h2 className="text-xl font-bold">Overview</h2>
          <p>
            Prize money in professional pickleball continued to climb in 2025, with deeper draws and richer purses
            across PPA, MLP, and APP events. Using DinkBank's internal payout data, this report examines the top 10
            prize-money earners of 2025, compares them to their 2024 prize-money rankings, and highlights where
            injuries, schedule volume, and partnership changes shaped the final table. All figures below represent prize
            money only (APP + MLP + PPA) and exclude contracts, appearance fees, and endorsements.
          </p>
          <p>
            From a macro view, 2025 reinforced a familiar story at the top. Anna Leigh Waters and Ben Johns once again
            finished No. 1 and No. 2 in prize earnings. Behind them, however, the table churned. JW Johnson and Jorja
            Johnson posted some of the largest year-over-year climbs, while Christian Alshon, Gabriel Tardio, and Tyra
            Black broke into the top 10 for the first time. At the same time, established names like Catherine Parenteau
            and Federico Staksrud slid down the table, reflecting a more competitive and less predictable prize-money
            landscape.
          </p>
        </CardContent>
      </Card>

      {/* Methodology Snapshot */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <h2 className="text-xl font-bold">Methodology Snapshot</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Scope:</strong> PPA, MLP, and APP main draws only, 2025 season
            </li>
            <li>
              <strong>Metric:</strong> Prize money only per player (no contracts, appearance fees, bonuses, or
              endorsements)
            </li>
            <li>
              <strong>Source:</strong> DinkBank internal payout calculations built from official event prize breakdowns
              and brackets
            </li>
            <li>
              <strong>Comparison Year:</strong> 2024 prize-money rankings recalculated on the same basis (APP + MLP +
              PPA only)
            </li>
            <li>
              <strong>Movement:</strong> "Up / down X spots" is based solely on prize-money rank, not total earnings
              including contracts
            </li>
          </ul>
          <p className="text-sm text-muted-foreground">
            All dollar figures are compiled by DinkBank using official tour prize structures and publicly available
            payout information where possible. In cases where full breakdowns are not published, figures may reflect
            DinkBank estimates based on comparable events and historical distributions. Amounts are subject to revision
            if tours update or correct their published payouts. For more details, see the{" "}
            <Link href="/methodology" className="underline hover:text-foreground">
              Methodology page
            </Link>
            .
          </p>
        </CardContent>
      </Card>

      {/* 2025 Top 10 vs 2024 Table */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <h2 className="text-xl font-bold">2025 Top 10 vs 2024</h2>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Player</TableHead>
                  <TableHead className="text-right">2025 Prize Money</TableHead>
                  <TableHead className="text-right">2025 Rank</TableHead>
                  <TableHead className="text-right">2024 Rank</TableHead>
                  <TableHead>Movement</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Anna Leigh Waters</TableCell>
                  <TableCell className="text-right tabular-nums">$167,873</TableCell>
                  <TableCell className="text-right">1</TableCell>
                  <TableCell className="text-right">1</TableCell>
                  <TableCell className="text-muted-foreground">stays #1</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Ben Johns</TableCell>
                  <TableCell className="text-right tabular-nums">$132,970</TableCell>
                  <TableCell className="text-right">2</TableCell>
                  <TableCell className="text-right">2</TableCell>
                  <TableCell className="text-muted-foreground">stays #2</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">JW Johnson</TableCell>
                  <TableCell className="text-right tabular-nums">$86,223</TableCell>
                  <TableCell className="text-right">3</TableCell>
                  <TableCell className="text-right">6</TableCell>
                  <TableCell className="text-green-600">up 3 spots</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Jorja Johnson</TableCell>
                  <TableCell className="text-right tabular-nums">$83,547</TableCell>
                  <TableCell className="text-right">4</TableCell>
                  <TableCell className="text-right">7</TableCell>
                  <TableCell className="text-green-600">up 3 spots</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Anna Bright</TableCell>
                  <TableCell className="text-right tabular-nums">$80,595</TableCell>
                  <TableCell className="text-right">5</TableCell>
                  <TableCell className="text-right">5</TableCell>
                  <TableCell className="text-muted-foreground">stays #5</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Christian Alshon</TableCell>
                  <TableCell className="text-right tabular-nums">$77,317</TableCell>
                  <TableCell className="text-right">6</TableCell>
                  <TableCell className="text-right">—</TableCell>
                  <TableCell className="text-green-600 font-medium">new to Top 10</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Gabriel Tardio</TableCell>
                  <TableCell className="text-right tabular-nums">$73,647</TableCell>
                  <TableCell className="text-right">7</TableCell>
                  <TableCell className="text-right">—</TableCell>
                  <TableCell className="text-green-600 font-medium">new to Top 10</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Catherine Parenteau</TableCell>
                  <TableCell className="text-right tabular-nums">$68,571</TableCell>
                  <TableCell className="text-right">8</TableCell>
                  <TableCell className="text-right">4</TableCell>
                  <TableCell className="text-red-600">down 4 spots</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Federico Staksrud</TableCell>
                  <TableCell className="text-right tabular-nums">$64,274</TableCell>
                  <TableCell className="text-right">9</TableCell>
                  <TableCell className="text-right">3</TableCell>
                  <TableCell className="text-red-600">down 6 spots</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Tyra Black</TableCell>
                  <TableCell className="text-right tabular-nums">$60,300</TableCell>
                  <TableCell className="text-right">10</TableCell>
                  <TableCell className="text-right">—</TableCell>
                  <TableCell className="text-green-600 font-medium">new to Top 10</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <p className="text-sm text-muted-foreground">
            Prize totals reflect final reconciled APP, MLP, and PPA payouts for the 2025 season.
          </p>
        </CardContent>
      </Card>

      {/* Player Breakdown */}
      <Card>
        <CardContent className="pt-6 space-y-6">
          <h2 className="text-xl font-bold">Player Breakdown</h2>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">1. Anna Leigh Waters — $167,873 (stays #1)</h3>
            <p className="text-sm text-muted-foreground">2024 prize rank: 1st · Movement: no change</p>
            <p>
              Anna Leigh Waters repeats as the sport's top prize-money earner, once again pairing volume with
              consistency across singles, women's doubles, and mixed. While her absolute prize total dipped slightly
              from 2024, she remained the most reliable podium presence on tour.
            </p>
            <p>
              2025 also marked a notable partnership shift following the end of her long-running women's doubles pairing
              with Catherine Parenteau. Despite that reset, Waters continued to convert deep runs into prize money at a
              higher rate than anyone else.
            </p>
            <p>
              There were no major publicly reported injuries affecting her availability in late 2024 or 2025. Durability
              remains one of her biggest competitive advantages.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">2. Ben Johns — $132,970 (stays #2)</h3>
            <p className="text-sm text-muted-foreground">2024 prize rank: 2nd · Movement: no change</p>
            <p>
              Ben Johns holds steady at No. 2 for the second consecutive year. Even with a slightly lighter singles load
              at times, his results in men's doubles and mixed kept him firmly near the top of the prize table.
            </p>
            <p>
              A rolled ankle in late 2024 forced him to withdraw from a singles draw at one event, but the issue did not
              appear to carry into 2025. He returned quickly to championship form and continued to post high-leverage
              wins.
            </p>
            <p>
              Johns' 2025 prize ranking underscores how high his floor remains, even in seasons without a clear
              statistical peak.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">3. JW Johnson — $86,223 (up 3 spots)</h3>
            <p className="text-sm text-muted-foreground">2024 prize rank: 6th · Movement: up 3 spots</p>
            <p>
              JW Johnson recorded one of the largest jumps in the 2025 prize-money table, climbing three spots year over
              year. His rise was driven by consistent deep runs across multiple tours rather than a single breakout
              event.
            </p>
            <p>
              Johnson's ability to contribute immediately in new partnerships and anchor MLP lineups translated directly
              into steady prize accumulation. He was rarely absent from late rounds, and that consistency paid off
              financially.
            </p>
            <p>
              No major injuries were widely reported during the 2024–2025 window, allowing him to maintain a full
              schedule and capitalize on form.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">4. Jorja Johnson — $83,547 (up 3 spots)</h3>
            <p className="text-sm text-muted-foreground">2024 prize rank: 7th · Movement: up 3 spots</p>
            <p>
              Jorja Johnson matched JW Johnson for the largest year-over-year climb among returning top earners. She
              moved up three spots in 2025, driven by improved results in women's doubles and strong mixed performances.
            </p>
            <p>
              Her 2025 season included several high-profile wins against top-tier teams, reinforcing her position as a
              consistent threat late in tournaments. Availability also played a role—Jorja logged a full slate of events
              without extended absences.
            </p>
            <p>
              With no significant injuries reported, her rise reflects performance gains rather than a rebound from time
              off.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">5. Anna Bright — $80,595 (stays #5)</h3>
            <p className="text-sm text-muted-foreground">2024 prize rank: 5th · Movement: no change</p>
            <p>
              Anna Bright holds her position at No. 5, reinforcing her status as one of the most stable prize-money
              earners on tour. Her aggressive style and success across women's doubles and mixed continued to generate
              podium finishes throughout 2025.
            </p>
            <p>
              Bright benefited from a shifting partnership landscape at the top of the women's game, converting
              opportunities into consistent checks even as the field tightened.
            </p>
            <p>
              There were no widely reported injuries that materially limited her schedule, making her ranking a
              straightforward reflection of on-court output.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">6. Christian Alshon — $77,317 (new to Top 10)</h3>
            <p className="text-sm text-muted-foreground">2024 prize rank: Outside Top 10 · Movement: new entry</p>
            <p>
              Christian Alshon's entry into the top 10 is one of the most notable stories of 2025. His 2024 season was
              disrupted by surgery and subsequent knee issues that forced him out of multiple singles draws and limited
              his schedule.
            </p>
            <p>
              In 2025, a healthier Alshon returned to form, posting significant singles results and rounding out his
              doubles resume. The combination of improved health and increased volume translated directly into higher
              prize earnings.
            </p>
            <p>
              His season reads as a clear rebound, demonstrating how quickly prize-money rankings can shift when
              availability improves.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">7. Gabriel Tardio — $73,647 (new to Top 10)</h3>
            <p className="text-sm text-muted-foreground">2024 prize rank: Outside Top 10 · Movement: new entry</p>
            <p>
              Gabriel Tardio enters the top 10 in 2025 as a first-time prize-money finisher, landing at No. 7. Rather
              than a single breakout run, his season was defined by consistent appearances in later rounds and a heavier
              overall workload.
            </p>
            <p>
              Tardio built on momentum from 2024, where he posted multiple notable wins over top seeds, and carried that
              trajectory into a more complete 2025 campaign.
            </p>
            <p>
              No major injuries were publicly reported across the 2024–2025 period, making his rise primarily
              performance- and volume-driven.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">8. Catherine Parenteau — $68,571 (down 4 spots)</h3>
            <p className="text-sm text-muted-foreground">2024 prize rank: 4th · Movement: down 4 spots</p>
            <p>
              Catherine Parenteau slides from fourth to eighth despite remaining one of the most technically refined
              players in the sport. The most significant factor in her drop was the end of her long-standing partnership
              with Anna Leigh Waters early in 2025.
            </p>
            <p>
              While Parenteau continued to log strong results, the process of testing new pairings coincided with a more
              distributed podium landscape in women's doubles. The result was a lower aggregate prize total compared
              with recent seasons.
            </p>
            <p>
              No major injury absences were widely reported, suggesting the shift was driven more by competitive
              dynamics than health.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">9. Federico Staksrud — $64,274 (down 6 spots)</h3>
            <p className="text-sm text-muted-foreground">2024 prize rank: 3rd · Movement: down 6 spots</p>
            <p>
              Federico Staksrud experienced the steepest drop among returning top-10 earners, falling from third to
              ninth. After a banner prize-money year in 2024, his 2025 results were more uneven, with fewer dominant
              singles runs and less frequent finals appearances.
            </p>
            <p>
              Staksrud remained competitive throughout the season, but the emergence of new high-volume earners pushed
              him down the table.
            </p>
            <p>
              There were no widely reported long-term injuries, indicating that results variance and increased
              competition were the primary drivers of his movement.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">10. Tyra Black — $60,300 (new to Top 10)</h3>
            <p className="text-sm text-muted-foreground">2024 prize rank: Outside Top 10 · Movement: new entry</p>
            <p>
              Tyra Black rounds out the 2025 top 10 following a season defined by physical play and timely singles and
              doubles results. Her presence in later rounds, particularly in high-value PPA draws, translated into
              meaningful prize earnings.
            </p>
            <p>
              Media attention in 2024 highlighted her rapid rise; in 2025, that momentum converted into a top-10 prize
              finish. Importantly, she achieved this without relying on a heavy contract component, underscoring the
              strength of her on-court results.
            </p>
            <p>No major injuries were widely documented during the season, making her entry a clean breakout.</p>
          </div>
        </CardContent>
      </Card>

      {/* Who Dropped Out */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <h2 className="text-xl font-bold">Who Dropped Out of the Top 10?</h2>
          <p>Three players who finished in the 2024 prize-money top 10 fell out of the list in 2025:</p>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">Rachel Rohrbacher (2024: 8th)</h3>
              <p>
                A strong 2024 season gave way to a more crowded women's doubles field in 2025. While Rohrbacher remained
                competitive, tighter margins pushed her prize total just outside the top 10.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Dylan Frazier (2024: 9th)</h3>
              <p>
                Frazier continued to be a dangerous doubles presence, but a mix of schedule choices and intensified
                competition limited his ability to repeat as a top-10 prize earner.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Andrei Daescu (2024: 10th)</h3>
              <p>
                After meaningful prize checks across APP and MLP in 2024, Daescu's 2025 total fell short of the top 10
                as the field deepened and newer contenders emerged.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Takeaways */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <h2 className="text-xl font-bold">Takeaways for 2026</h2>
          <ul className="list-disc pl-6 space-y-3">
            <li>
              <strong>Stability at the top, volatility below.</strong> Waters and Johns remain entrenched at the summit,
              but positions three through ten are highly fluid.
            </li>
            <li>
              <strong>Health and availability matter.</strong> Alshon's rebound highlights how injuries can suppress
              prize earnings—and how quickly rankings can change once players return to full strength.
            </li>
            <li>
              <strong>Partnership decisions are financial decisions.</strong> Shifts in doubles pairings materially
              affected where prize money landed in 2025.
            </li>
            <li>
              <strong>New money is coming fast.</strong> The arrival of Tardio and Black signals that future seasons may
              see even more turnover among prize leaders.
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
