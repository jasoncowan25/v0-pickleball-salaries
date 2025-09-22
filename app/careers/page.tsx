import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Briefcase, Users, Globe, Heart, Mail } from "lucide-react"
import Link from "next/link"

export default function CareersPage() {
  return (
    <div className="container mx-auto px-4 py-10">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Careers at DinkBank</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Be part of the team bringing transparency to pro pickleball.
        </p>
      </div>

      {/* Culture Section */}
      <div className="mb-12">
        <Card>
          <CardContent className="pt-6">
            <p className="text-lg leading-relaxed">
              At DinkBank, our mission is simple: Every dollar. Every event. We make pro pickleball more transparent,
              accessible, and exciting. We value accuracy, innovation, and a genuine love for the game.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Current Openings */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Current Openings</h2>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              No Open Roles Right Now
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">We're growing fast! Check back soon for new opportunities.</p>
            <Button variant="outline" asChild>
              <Link href="/contact">
                <Mail className="h-4 w-4 mr-2" />
                Join Our Talent Network
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Why Work With Us */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Why Work With Us</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-primary" />
                Startup Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Shape the future of pickleball analytics from the ground up.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Growing Sport
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Join the fastest-growing sport in North America.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                Flexible & Remote
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">We're a digital-first team, built for collaboration anywhere.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                Culture
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">We prize creativity, transparency, and love for sport.</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-xl font-semibold mb-4">Want to be part of the journey?</h3>
            <p className="text-muted-foreground mb-6">Reach out and let us know how you can help.</p>
            <Button asChild size="lg">
              <Link href="/contact">
                <Mail className="h-4 w-4 mr-2" />
                Contact Us
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
