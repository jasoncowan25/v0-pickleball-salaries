import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CookiesPage() {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Cookie Policy</h1>
        <p className="text-lg text-muted-foreground mb-8">Last updated: March 2024</p>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>About Cookies</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed">
                DinkBank uses cookies to improve your browsing experience and understand how our site is used.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Types of Cookies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Essential Cookies</h4>
                  <p className="text-muted-foreground">
                    Required for basic site functionality, including navigation and access to secure areas.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Analytics Cookies</h4>
                  <p className="text-muted-foreground">
                    Help us understand traffic patterns and which content is most valuable to users.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Preference Cookies</h4>
                  <p className="text-muted-foreground">
                    Remember your settings and preferences, such as saved filters and display options.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Managing Cookies</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed">
                You can disable cookies via your browser settings, though some site features may not work properly. Most
                browsers allow you to control cookies through their privacy settings.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Consent</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed">
                By using our site, you consent to cookie use as described in this policy. You can withdraw consent at
                any time by adjusting your browser settings.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
