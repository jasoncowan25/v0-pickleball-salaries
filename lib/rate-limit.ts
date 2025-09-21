const buckets = new Map<string, number[]>()

export function checkRateLimit(ip: string, opts = { limit: 5, windowMs: 10 * 60 * 1000 }) {
  const now = Date.now()
  const arr = (buckets.get(ip) ?? []).filter((ts) => now - ts < opts.windowMs)
  if (arr.length >= opts.limit) return { allowed: false }
  arr.push(now)
  buckets.set(ip, arr)
  return { allowed: true }
}
