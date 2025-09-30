"use client"

import { useCallback, useMemo } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import type { Gender } from "@/lib/mock-data"

interface FilterState {
  search: string
  gender: Gender | "all"
  year: string
  tour: string
  sortColumn: string
  sortDirection: "asc" | "desc"
  currentPage: number
  pageSize: number
}

interface ActiveFilter {
  key: string
  label: string
  value: string
}

export function useFilterParams() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Extract current filter state from URL params
  const filterState: FilterState = useMemo(
    () => ({
      search: searchParams.get("search") || "",
      gender: (searchParams.get("gender") as Gender | "all") || "all",
      year: searchParams.get("year") || "2024",
      tour: searchParams.get("tour") || "all",
      sortColumn: searchParams.get("sort") || "total",
      sortDirection: (searchParams.get("dir") as "asc" | "desc") || "desc",
      currentPage: Number.parseInt(searchParams.get("page") || "1"),
      pageSize: Number.parseInt(searchParams.get("pageSize") || "25"),
    }),
    [searchParams],
  )

  // Generate active filters array for display
  const activeFilters: ActiveFilter[] = useMemo(() => {
    const filters: ActiveFilter[] = []

    if (filterState.search) {
      filters.push({
        key: "search",
        label: `Search: "${filterState.search}"`,
        value: filterState.search,
      })
    }

    if (filterState.gender !== "all") {
      filters.push({
        key: "gender",
        label: `Gender: ${filterState.gender === "M" ? "Men" : "Women"}`,
        value: filterState.gender,
      })
    }

    if (filterState.year !== "2024") {
      filters.push({
        key: "year",
        label: `Year: ${filterState.year}`,
        value: filterState.year,
      })
    }

    if (filterState.tour !== "all") {
      filters.push({
        key: "tour",
        label: `Tour: ${filterState.tour.toUpperCase()}`,
        value: filterState.tour,
      })
    }

    return filters
  }, [filterState])

  // Update URL with new filter values
  const updateFilters = useCallback(
    (updates: Partial<FilterState>) => {
      const newParams = new URLSearchParams(searchParams.toString())

      // Apply updates
      Object.entries(updates).forEach(([key, value]) => {
        if (
          value === null ||
          value === undefined ||
          value === "" ||
          (key === "gender" && value === "all") ||
          (key === "year" && value === "2024") ||
          (key === "tour" && value === "all") ||
          (key === "sort" && value === "total") ||
          (key === "dir" && value === "desc") ||
          (key === "page" && value === 1) ||
          (key === "pageSize" && value === 25)
        ) {
          newParams.delete(key)
        } else {
          newParams.set(key, value.toString())
        }
      })

      // Reset page to 1 when filters change (except when explicitly setting page)
      if (
        !updates.hasOwnProperty("page") &&
        Object.keys(updates).some((key) =>
          ["search", "gender", "year", "tour", "sort", "dir", "pageSize"].includes(key),
        )
      ) {
        newParams.delete("page")
      }

      const queryString = newParams.toString()
      const href = queryString ? `${pathname}?${queryString}` : pathname

      router.replace(href, { scroll: false })
    },
    [router, pathname, searchParams],
  )

  // Clear a specific filter
  const clearFilter = useCallback(
    (key: string) => {
      const updates: Partial<FilterState> = {}

      if (key === "search") {
        updates.search = ""
      } else if (key === "gender") {
        updates.gender = "all"
      } else if (key === "year") {
        updates.year = "2024"
      } else if (key === "tour") {
        updates.tour = "all"
      }

      updateFilters(updates)
    },
    [updateFilters],
  )

  // Clear all filters
  const clearAllFilters = useCallback(() => {
    updateFilters({
      search: "",
      gender: "all",
      year: "2024",
      tour: "all",
      sortColumn: "total",
      sortDirection: "desc",
      currentPage: 1,
      pageSize: 25,
    })
  }, [updateFilters])

  return {
    filterState,
    activeFilters,
    updateFilters,
    clearFilter,
    clearAllFilters,
  }
}
