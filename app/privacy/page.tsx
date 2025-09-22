import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-lg text-muted-foreground mb-8">Last updated: March 2024</p>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Our Commitment</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed">
                At DinkBank, we respect your privacy and are committed to protecting your personal information.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Collected</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed">
                We may collect basic usage analytics and newsletter signup information. This includes page views, time
                spent on site, and email addresses for those who opt into our communications.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Use of Data</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed">
                We use collected data to improve our site and send updates you've opted into. Analytics help us
                understand which content is most valuable to our users.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sharing</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed">
                We do not sell personal data. Limited third-party analytics may apply (such as Google Analytics) to help
                us understand site usage patterns.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Rights</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed">
                You can request deletion of your data at any time. You may also opt out of communications and request
                information about what data we have collected.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed">
                For questions about this privacy policy or to exercise your rights, reach us via our Contact page.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
