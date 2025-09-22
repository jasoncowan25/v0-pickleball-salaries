import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
        <p className="text-lg text-muted-foreground mb-8">Last updated: March 2024</p>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Agreement to Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed">
                These Terms of Service govern your use of DinkBank. By accessing our site, you agree to comply with
                these terms.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Use of Site</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed">
                Data is for informational purposes only. You may access and use our earnings data for personal,
                educational, or editorial purposes with proper attribution to DinkBank.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Obligations</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed">
                You may not misuse, copy, or resell content. Users are prohibited from scraping data, creating
                derivative databases, or using automated tools to access our services without permission.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Accuracy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed">
                We strive for accuracy but do not guarantee completeness. Earnings figures are compiled from confirmed
                and reported sources, and may be updated over time as new information becomes available.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Disclaimers</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed">
                DinkBank provides information "as is" without warranties. We are not liable for decisions made based on
                our data. Users should verify information independently for critical applications.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Governing Law</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed">
                These Terms are governed by the laws of Ontario, Canada. Any disputes will be resolved in the courts of
                Ontario.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
