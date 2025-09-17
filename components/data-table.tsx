"use client"

import type React from "react"
import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { ChevronLeft, ChevronRight, ArrowUp, ArrowDown, ChevronRightIcon } from "lucide-react"
import { formatCurrencyUSD, compactSponsorList, formatRank } from "@/lib/format"
import { TableEmptyRow } from "@/components/empty-state"
import Link from "next/link"

interface Column<T> {
  key: keyof T
  header: string
  cell?: (item: T, index: number) => React.ReactNode
  sortable?: boolean
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  searchKey?: keyof T
  pageSize?: number
  loading?: boolean
  variant?: "money-list" | "players" | "events"
  showPagination?: boolean
}

const TourBadge = ({ tour }: { tour?: string }) => (
  <Badge variant="secondary" className="font-medium">
    {tour ?? "—"}
  </Badge>
)

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  searchKey,
  pageSize = 10,
  loading = false,
  variant = "players",
  showPagination = true,
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortKey, setSortKey] = useState<keyof T | null>("rankValue" as keyof T)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [currentPage, setCurrentPage] = useState(1)
  const [mobileLoadCount, setMobileLoadCount] = useState(25)

  // Filter data based on search term
  const filteredData = searchKey
    ? data.filter((item) => String(item[searchKey]).toLowerCase().includes(searchTerm.toLowerCase()))
    : data

  // Sort data
  const sortedData = sortKey
    ? [...filteredData].sort((a, b) => {
        const aVal = a[sortKey]
        const bVal = b[sortKey]
        if (typeof aVal === "number" && typeof bVal === "number") {
          return sortDirection === "asc" ? aVal - bVal : bVal - aVal
        }
        return sortDirection === "asc"
          ? String(aVal).localeCompare(String(bVal))
          : String(bVal).localeCompare(String(aVal))
      })
    : filteredData

  // Desktop pagination
  const totalPages = Math.ceil(sortedData.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const paginatedData = sortedData.slice(startIndex, startIndex + pageSize)

  // Mobile load more
  const mobileData = sortedData.slice(0, mobileLoadCount)

  const handleSort = (key: keyof T) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortKey(key)
      setSortDirection("desc")
    }
  }

  const handleLoadMore = () => {
    setMobileLoadCount((prev) => Math.min(prev + 25, sortedData.length))
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {/* Desktop skeleton */}
        <div className="hidden md:block">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  {columns.map((column) => (
                    <TableHead key={String(column.key)}>
                      <Skeleton className="h-4 w-20" />
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 6 }).map((_, i) => (
                  <TableRow key={i}>
                    {columns.map((column) => (
                      <TableCell key={String(column.key)}>
                        <Skeleton className="h-4 w-16" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Mobile skeleton */}
        <div className="md:hidden space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="p-4 border rounded-lg">
              <Skeleton className="h-4 w-32 mb-2" />
              <Skeleton className="h-3 w-48" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {searchKey && (
        <Input
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      )}

      {/* Desktop Table */}
      <div className="hidden md:block rounded-md border">
        <Table>
          <TableHeader className="sticky top-14 bg-background z-10">
            <TableRow>
              {columns.map((column) => (
                <TableHead
                  key={String(column.key)}
                  className={column.key === "rankValue" || column.key === "totals" ? "text-right" : ""}
                >
                  {column.sortable ? (
                    <Button
                      variant="ghost"
                      onClick={() => handleSort(column.key)}
                      className="h-auto p-0 font-semibold hover:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                      aria-sort={sortKey === column.key ? sortDirection : "none"}
                    >
                      {column.header}
                      {sortKey === column.key &&
                        (sortDirection === "asc" ? (
                          <ArrowUp className="ml-2 h-4 w-4" />
                        ) : (
                          <ArrowDown className="ml-2 h-4 w-4" />
                        ))}
                    </Button>
                  ) : (
                    column.header
                  )}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length === 0 ? (
              <TableEmptyRow colSpan={columns.length} message="No data available" hint="Try adjusting filters." />
            ) : (
              paginatedData.map((item, index) => (
                <TableRow
                  key={index}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => {
                    if (item.slug && variant !== "events") {
                      window.location.href = `/players/${item.slug}`
                    } else if (variant === "events" && item.slug) {
                      window.location.href = `/events/${item.slug}`
                    }
                  }}
                >
                  {columns.map((column) => (
                    <TableCell
                      key={String(column.key)}
                      className={`tabular-nums ${column.key === "rankValue" || column.key === "totals" ? "text-right" : ""}`}
                    >
                      {column.cell ? column.cell(item, startIndex + index) : String(item[column.key])}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-2">
        {mobileData.length === 0 ? (
          <div className="p-8 text-center text-sm text-muted-foreground">
            <div className="space-y-1">
              <div>No data available</div>
              <div className="text-xs">Try adjusting filters.</div>
            </div>
          </div>
        ) : (
          mobileData.map((item, index) => (
            <Link
              key={index}
              href={
                variant === "events"
                  ? `/events/${item.slug}`
                  : `/players/${item.slug || item.name?.toLowerCase().replace(/\s+/g, "-")}`
              }
              className="block"
            >
              <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg">
                      {formatRank(item.rank, index)} • {item.name}
                      {variant === "money-list" && (
                        <span className="text-xs text-muted-foreground ml-1">
                          {item.country ?? "—"}
                          {item.gender ? ` • ${item.gender}` : ""}
                        </span>
                      )}
                    </span>
                  </div>
                  <ChevronRightIcon className="h-4 w-4 text-muted-foreground" />
                </div>

                <div className="flex flex-wrap gap-2 text-sm">
                  <Badge variant="secondary" className="tabular-nums">
                    Prize: {formatCurrencyUSD(item.rankValue || item.totals?.ytdPrize)}
                  </Badge>
                  <Badge variant="secondary" className="tabular-nums">
                    Contracts: {formatCurrencyUSD(item.totals?.reportedContracts)}
                  </Badge>
                  <Badge variant="secondary" className="tabular-nums">
                    Endorsements: {formatCurrencyUSD(item.totals?.endorsementsEstimate)}
                  </Badge>
                  {variant === "money-list"
                    ? item.primaryTour && (
                        <Badge
                          variant="secondary"
                          className={`text-xs font-medium ${
                            item.primaryTour === "PPA"
                              ? "bg-blue-100 text-blue-800"
                              : item.primaryTour === "MLP"
                                ? "bg-green-100 text-green-800"
                                : item.primaryTour === "APP"
                                  ? "bg-purple-100 text-purple-800"
                                  : ""
                          }`}
                        >
                          {item.primaryTour}
                        </Badge>
                      )
                    : item.sponsors &&
                      item.sponsors.length > 0 && (
                        <Badge variant="outline" className="text-xs" title={item.sponsors.join(", ")}>
                          {compactSponsorList(item.sponsors)}
                        </Badge>
                      )}
                </div>
              </div>
            </Link>
          ))
        )}

        {/* Load More Button */}
        {mobileLoadCount < sortedData.length && (
          <div className="flex justify-center pt-4">
            <Button
              onClick={handleLoadMore}
              variant="outline"
              className="min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 bg-transparent"
            >
              Load more ({sortedData.length - mobileLoadCount} remaining)
            </Button>
          </div>
        )}
      </div>

      {/* Desktop Pagination */}
      {showPagination && totalPages > 1 && (
        <div className="hidden md:flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to {Math.min(startIndex + pageSize, sortedData.length)} of {sortedData.length}{" "}
            results
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <div className="text-sm">
              Page {currentPage} of {totalPages}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
