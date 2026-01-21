import { ExternalLink } from "lucide-react"

interface Source {
  label: string
  url: string
}

interface SourcesBlockProps {
  sources: Source[]
  effectiveSeason: string
}

export function SourcesBlock({ sources, effectiveSeason }: SourcesBlockProps) {
  return (
    <div className="mt-6 pt-4 border-t border-border">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
            Sources
          </h4>
          <ul className="space-y-1">
            {sources.map((source, index) => (
              <li key={index}>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
                >
                  {source.label}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-sm text-muted-foreground">
          <span className="font-medium">Effective:</span> {effectiveSeason}
        </div>
      </div>
    </div>
  )
}
