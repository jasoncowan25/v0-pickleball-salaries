import { FileQuestion } from "lucide-react"
import Link from "next/link"

interface EmptyStateProps {
  title: string
  description: string
  showMethodologyLink?: boolean
}

export function EmptyState({ title, description, showMethodologyLink = true }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <FileQuestion className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4 max-w-md">{description}</p>
      {showMethodologyLink && (
        <Link href="/methodology" className="text-primary hover:underline text-sm">
          Learn about our methodology
        </Link>
      )}
    </div>
  )
}

export function TableEmptyRow({
  colSpan,
  message = "No data available",
  hint,
}: { colSpan: number; message?: string; hint?: string }) {
  return (
    <tr>
      <td colSpan={colSpan} className="py-10 text-center text-sm text-muted-foreground">
        <div className="space-y-1">
          <div>{message}</div>
          {hint ? <div className="text-xs">{hint}</div> : null}
        </div>
      </td>
    </tr>
  )
}
