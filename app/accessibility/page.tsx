import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Eye, Keyboard, Users } from "lucide-react"
import Link from "next/link"

export default function AccessibilityPage() {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Accessibility</h1>
        <p className="text-lg text-muted-foreground mb-8">Our commitment to making DinkBank accessible to all users.</p>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Our Commitment</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed">
                DinkBank is committed to providing a website accessible to all users, regardless of ability or
                technology used. We believe that everyone should have equal access to professional pickleball earnings
                data.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Standards</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed">
                We follow WCAG 2.1 guidelines wherever possible, striving for Level AA compliance. Our accessibility
                efforts are ongoing as we continuously improve our platform.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Measures Taken</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-start gap-3">
                  <Eye className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Visual Design</h4>
                    <p className="text-sm text-muted-foreground">
                      High-contrast colors and clear typography for better readability
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Keyboard className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Keyboard Navigation</h4>
                    <p className="text-sm text-muted-foreground">
                      Full keyboard accessibility for all interactive elements
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Screen Readers</h4>
                    <p className="text-sm text-muted-foreground">Alt text for images and proper semantic markup</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Eye className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Responsive Design</h4>
                    <p className="text-sm text-muted-foreground">Works across all devices and screen sizes</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ongoing Improvements</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed mb-4">
                We regularly audit our site for accessibility issues and implement improvements. Our development process
                includes accessibility testing and we welcome feedback from our users.
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Regular accessibility audits and testing</li>
                <li>User feedback integration</li>
                <li>Staff training on accessibility best practices</li>
                <li>Continuous monitoring and updates</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed mb-4">
                If you encounter accessibility issues or have suggestions for improvement, please let us know through
                our Contact page. We take all accessibility feedback seriously and will respond promptly.
              </p>
              <Button asChild>
                <Link href="/contact">
                  <Mail className="h-4 w-4 mr-2" />
                  Report Accessibility Issue
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
