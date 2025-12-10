import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface ReportCardProps {
  title: string
  description: string
  href: string
  publishDate?: string
  badge?: string
}

export function ReportCard({ title, description, href, publishDate, badge }: ReportCardProps) {
  return (
    <Card className="overflow-hidden border-2 hover:border-accent/50 transition-colors">
      <Link href={href} className="block group">
        <div className="p-8 md:p-10 bg-gradient-to-br from-background via-background to-muted/20 md:px-6 md:py-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1">
              {badge && (
                <div className="inline-flex items-center gap-1.5 mb-3 px-3 py-1 bg-accent/10 text-accent-foreground rounded-full text-xs font-semibold uppercase tracking-wide">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  {badge}
                </div>
              )}
              <h3 className="text-2xl font-bold leading-tight text-balance mb-3 group-hover:text-accent transition-colors md:text-2xl">
                {title}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{description}</p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border/50">
            {publishDate && <div className="text-sm text-muted-foreground">{publishDate}</div>}
            <div className="ml-auto">
              <Button variant="default" className="group/btn gap-2">
                View Report
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </Card>
  )
}
