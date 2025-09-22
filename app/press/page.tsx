import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Download, Mail } from "lucide-react"
import Link from "next/link"

export default function PressPage() {
  return (
    <div className="container mx-auto px-4 py-10">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Press & Media</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Your source for data, insights, and official resources from DinkBank.
        </p>
      </div>

      {/* Overview */}
      <div className="mb-12">
        <Card>
          <CardContent className="pt-6">
            <p className="text-lg leading-relaxed">
              DinkBank tracks every dollar in pro pickleball. We provide verified earnings data across PPA, MLP, and APP
              tours, making us the go-to source for journalists, sponsors, and industry coverage.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Media Kit */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Media Kit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Logos and graphics are free for editorial use with attribution to DinkBank.
            </p>
            <Button className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Download Media Kit
            </Button>
          </CardContent>
        </Card>

        {/* Media Contact */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Media Contact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              For interviews, data requests, or fact-checks, please contact our team.
            </p>
            <Button asChild className="w-full">
              <Link href="/contact">
                <Mail className="h-4 w-4 mr-2" />
                Contact Us
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Featured Coverage */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Featured Coverage</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <Badge variant="secondary" className="w-fit mb-2">
                Pickleball Magazine
              </Badge>
              <CardTitle className="text-lg">The Rise of Pickleball Prize Money</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                An in-depth look at how professional pickleball earnings have grown 300% in the past two years,
                featuring exclusive data from DinkBank...
              </p>
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4 mr-2" />
                Read Article
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Badge variant="secondary" className="w-fit mb-2">
                Sports Business Journal
              </Badge>
              <CardTitle className="text-lg">Transparency in Professional Pickleball</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                How DinkBank is bringing much-needed financial transparency to the fastest-growing sport in America...
              </p>
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4 mr-2" />
                Read Article
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Badge variant="secondary" className="w-fit mb-2">
                ESPN
              </Badge>
              <CardTitle className="text-lg">Following the Money in Pro Pickleball</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                ESPN's analysis of professional pickleball's financial landscape, powered by comprehensive earnings data
                from DinkBank...
              </p>
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4 mr-2" />
                Read Article
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Press Releases */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Press Releases</h2>
        <div className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold">DinkBank Launches Comprehensive Pickleball Earnings Database</h3>
                <Badge variant="outline">March 15, 2024</Badge>
              </div>
              <p className="text-muted-foreground mb-4">
                DinkBank today announced the launch of the most comprehensive database of professional pickleball
                earnings, tracking prize money across all major tours including PPA, MLP, and APP.
              </p>
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4 mr-2" />
                Read Full Release
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold">
                  DinkBank Reports Record Prize Money Growth in Professional Pickleball
                </h3>
                <Badge variant="outline">February 8, 2024</Badge>
              </div>
              <p className="text-muted-foreground mb-4">
                New data from DinkBank reveals that total prize money in professional pickleball has increased by 275%
                year-over-year, with total payouts exceeding $12 million in 2023.
              </p>
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4 mr-2" />
                Read Full Release
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
