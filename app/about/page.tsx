import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function AboutPage() {
  return (
    <div className="py-8 space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">About DinkBank</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          The first authoritative, cross-tour earnings database for professional pickleball. Every dollar. Every pro
          event. Every player.
        </p>
      </div>

      {/* Mission Statement */}
      <Card>
        <CardHeader>
          <CardTitle>Our Mission</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-base">
            DinkBank is building the most complete and accessible source for professional pickleball earnings data. We
            believe that clear, structured information helps elevate the sport—giving fans, media, and brands a deeper
            understanding of how players are compensated across tours.
          </p>
          <p>
            Professional pickleball pay can be fragmented, inconsistent, and sometimes inflated or misunderstood.
            DinkBank breaks earnings down into a transparent structure of <strong>prize money</strong> and{" "}
            <strong>contract earnings</strong>, giving the sport a fair and accurate financial picture.
          </p>
        </CardContent>
      </Card>

      {/* What We Track */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-center">What We Track</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Prize Money
                <Badge variant="secondary">Live</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base">
                Earnings from <strong>every major pro event</strong>, updated within <strong>24–72 hours</strong> after
                tournaments conclude.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Multiple Tours
                <Badge variant="secondary">3 Tours</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base">Coverage across PPA Tour, Major League Pickleball (MLP), and APP Tour events.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Player Profiles
                <Badge variant="secondary">1,000+ Players</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base">
                Detailed earnings breakdowns, tournament history, and career milestones for every professional player we
                track.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Our Commitment */}
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Transparency</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p>
              We believe transparency strengthens the sport. While our internal methodology and source logs are
              maintained on the backend, every public number on DinkBank comes from:
            </p>
            <ul className="space-y-2 text-base">
              <li>• Official tour results</li>
              <li>• Official payout structures</li>
              <li>• Clearly classified estimates for reported contract figures</li>
            </ul>
            <p className="pt-2">Our transparency approach includes:</p>
            <ul className="space-y-2 text-base">
              <li>• Clear separation of prize earnings vs. contract earnings</li>
              <li>• Consistent rules for doubles payout splits</li>
              <li>• Labels for confirmed vs. estimated contract data</li>
              <li>• A correction channel for players, agents, and fans</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Accuracy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p>
              We aim to provide the most reliable earnings data in pickleball through a structured verification
              workflow. While not every value uses multiple sources—and we do not employ professional fact-checkers—our
              process includes:
            </p>
            <ul className="space-y-2 text-base">
              <li>
                • Verification against <strong>official tour results</strong>
              </li>
              <li>• Standardized payout mapping for each tour</li>
              <li>• Manual review for anomalies</li>
              <li>
                • Updates within <strong>24–72 hours</strong> after each event
              </li>
            </ul>
            <p className="pt-2">
              Our goal is continuous improvement and clear documentation of how every number is produced.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Why Transparency Matters */}
      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle className="text-center">Why Transparency Matters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Transparent earnings data helps players, fans, and partners understand the true economics of professional
            pickleball. By breaking numbers down into prize earnings and contract earnings—without inflating, grouping,
            or oversimplifying—DinkBank helps ensure the sport moves toward fairer compensation and a clearer financial
            landscape.
          </p>
        </CardContent>
      </Card>

      {/* Who We Serve */}
      <div className="space-y-6">
        <h2 className="font-bold text-center text-2xl">Who We Serve</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-lg">Fans</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base">Track your favorite players' earnings and career progression</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-lg">Media</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base">Reliable data for articles, broadcasts, and analysis</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-lg">Sponsors</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base">Market insights and player performance metrics</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-lg">Industry</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base">Agents, tours, and organizations making data-driven decisions</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Vision */}
      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle className="text-center">Our Vision</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-base">
            To become the definitive resource for professional pickleball data, supporting the growth and
            professionalization of the sport.
          </p>
          <p className="text-base">
            As pickleball continues its explosive growth, we're committed to providing the infrastructure and
            transparency that will help elevate the sport to new heights.
          </p>
        </CardContent>
      </Card>

      {/* Contact CTA */}
      <div className="text-center space-y-4 py-8">
        <h3 className="text-2xl font-bold">Questions or Corrections?</h3>
        <p className="text-muted-foreground">We're committed to accuracy and welcome feedback from the community.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/submit-correction"
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Submit a Correction
          </a>
          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  )
}
