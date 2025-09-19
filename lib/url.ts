"use client"

export function mergeSearchParams(current: URLSearchParams, updates: Record<string, string | undefined | null>) {
  const next = new URLSearchParams(current.toString())
  Object.entries(updates).forEach(([k, v]) => {
    if (v === undefined || v === null || v === "") {
      next.delete(k)
    } else {
      next.set(k, String(v))
    }
  })
  return next
}

export function stripEmpty(search: URLSearchParams) {
  const next = new URLSearchParams(search.toString())
  Array.from(next.keys()).forEach((k) => {
    const v = next.get(k)
    if (v === null || v === "") next.delete(k)
  })
  return next
}
