import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"
import { formatShortDate } from "@/lib/format"

interface SourceFootnoteProps {
  source: {
    title: string
    url: string
    date: string
    confidence: "confirmed" | "reported" | "estimated"
  }
}

export function SourceFootnote({ source }: SourceFootnoteProps) {
  const getConfidenceBadgeVariant = (confidence: string) => {
    switch (confidence) {
      case "confirmed":
        return "default"
      case "reported":
        return "secondary"
      case "estimated":
        return "outline"
      default:
        return "outline"
    }
  }

  return (
    <div className="flex items-center justify-between p-3 rounded-lg border bg-card/50">
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <a
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium hover:text-primary transition-colors"
          >
            {source.title}
          </a>
          <ExternalLink className="h-3 w-3 text-muted-foreground" />
        </div>
        <div className="text-sm text-muted-foreground">{formatShortDate(source.date)}</div>
      </div>
      <Badge variant={getConfidenceBadgeVariant(source.confidence)}>{source.confidence}</Badge>
    </div>
  )
}
