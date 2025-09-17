export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatShortDate(dateString: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(dateString))
}

export function formatCompactCurrency(amount: number): string {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`
  }
  if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(0)}K`
  }
  return formatCurrency(amount)
}

export const formatCurrencyUSD = (n?: number) =>
  n != null ? n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }) : "$0"

export const formatDelta = (pct: number) => (pct >= 0 ? "+" : "") + Math.abs(pct).toFixed(1) + "%"

export const compactSponsorList = (arr: string[] = []) =>
  arr.length <= 2 ? arr.join(", ") : arr.slice(0, 2).join(", ") + " +" + (arr.length - 2)

export const formatRank = (n?: number, i?: number) => `#${(n ?? (i != null ? i + 1 : 0)).toString()}`
