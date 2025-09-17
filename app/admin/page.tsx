import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container py-6 max-w-4xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Admin Panel</h1>
          <p className="text-muted-foreground">Manage events, payouts, and player data</p>
        </div>

        <Alert className="mb-6">
          <InfoIcon className="h-4 w-4" />
          <AlertDescription>
            This is a placeholder admin interface. Server actions and database integration will be added in a future
            update.
          </AlertDescription>
        </Alert>

        <div className="grid gap-6">
          {/* Add Event */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Add New Event</h2>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="eventName">Event Name</Label>
                  <Input id="eventName" placeholder="PPA Masters 2024" />
                </div>
                <div>
                  <Label htmlFor="eventSlug">Event Slug</Label>
                  <Input id="eventSlug" placeholder="ppa-masters-2024" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="tour">Tour</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select tour" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PPA">PPA</SelectItem>
                      <SelectItem value="MLP">MLP</SelectItem>
                      <SelectItem value="APP">APP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="date" />
                </div>
                <div>
                  <Label htmlFor="purse">Total Purse</Label>
                  <Input id="purse" type="number" placeholder="150000" />
                </div>
              </div>

              <div>
                <Label htmlFor="city">City</Label>
                <Input id="city" placeholder="Indian Wells, CA" />
              </div>

              <Button disabled>Add Event (Coming Soon)</Button>
            </div>
          </Card>

          {/* Add Payout */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Add Prize Payout</h2>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="player">Player</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select player" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ben-johns">Ben Johns</SelectItem>
                      <SelectItem value="anna-leigh-waters">Anna Leigh Waters</SelectItem>
                      <SelectItem value="jw-johnson">JW Johnson</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="event">Event</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select event" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ppa-masters-2024">PPA Masters 2024</SelectItem>
                      <SelectItem value="mlp-premier-2024">MLP Premier 2024</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="bracket">Bracket</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select bracket" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MS">Men's Singles</SelectItem>
                      <SelectItem value="WS">Women's Singles</SelectItem>
                      <SelectItem value="MD">Men's Doubles</SelectItem>
                      <SelectItem value="WD">Women's Doubles</SelectItem>
                      <SelectItem value="XD">Mixed Doubles</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="result">Result</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select result" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Winner">Winner</SelectItem>
                      <SelectItem value="Finalist">Finalist</SelectItem>
                      <SelectItem value="Semifinal">Semifinal</SelectItem>
                      <SelectItem value="Quarter">Quarter</SelectItem>
                      <SelectItem value="Round">Round</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="prize">Prize Amount</Label>
                  <Input id="prize" type="number" placeholder="25000" />
                </div>
              </div>

              <div>
                <Label htmlFor="source">Source Information</Label>
                <Textarea id="source" placeholder="Source title, URL, and confidence level..." />
              </div>

              <Button disabled>Add Payout (Coming Soon)</Button>
            </div>
          </Card>

          {/* Bulk Import */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Bulk Import</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="csvFile">Upload CSV File</Label>
                <Input id="csvFile" type="file" accept=".csv" disabled />
              </div>
              <Button disabled>Import Data (Coming Soon)</Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
