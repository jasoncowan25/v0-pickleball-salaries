import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function AboutPage() {
  return (
    <div className="py-8 space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">About DinkBank</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          The first authoritative, cross-tour earnings database for professional pickleball. Every dollar. Every event.
          Every player.
        </p>
      </div>

      {/* Mission Statement */}
      <Card>
        <CardHeader>
          <CardTitle>Our Mission</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg">
            DinkBank is building the definitive source for professional pickleball earnings data, bringing transparency
            and accessibility to the fastest-growing sport in America.
          </p>
          <p>
            Just as Spotrac revolutionized how fans and industry professionals track athlete salaries in traditional
            sports, DinkBank is creating the same comprehensive resource for professional pickleball across all major
            tours.
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
              <p>
                Complete earnings data from every professional pickleball event, updated in real-time as tournaments
                conclude.
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
              <p>Comprehensive coverage across PPA Tour, Major League Pickleball (MLP), and APP Tour events.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Player Profiles
                <Badge variant="secondary">500+ Players</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Detailed earnings breakdowns, tournament history, and career statistics for every professional player.
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
              We believe in complete transparency in our data collection and methodology. Every figure is sourced,
              verified, and traceable.
            </p>
            <ul className="space-y-2 text-sm">
              <li>• Open methodology documentation</li>
              <li>• Source attribution for all data</li>
              <li>• Community correction system</li>
              <li>• Regular data audits</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Accuracy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p>
              Our data is meticulously verified through multiple sources and continuously updated to ensure the highest
              level of accuracy.
            </p>
            <ul className="space-y-2 text-sm">
              <li>• Multi-source verification</li>
              <li>• Real-time tournament updates</li>
              <li>• Professional fact-checking</li>
              <li>• Community-driven corrections</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Who We Serve */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-center">Who We Serve</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-lg">Fans</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Track your favorite players' earnings and career progression</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-lg">Media</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Reliable data for articles, broadcasts, and analysis</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-lg">Sponsors</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Market insights and player performance metrics</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-lg">Industry</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Agents, tours, and organizations making data-driven decisions</p>
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
          <p className="text-lg">
            To become the definitive resource for professional pickleball data, supporting the growth and
            professionalization of the sport.
          </p>
          <p>
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
