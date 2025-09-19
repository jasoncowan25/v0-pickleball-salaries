"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import type { Tour, Gender } from "@/lib/mock-data"

interface FiltersProps {
  onFiltersChange: (filters: {
    tours: Tour[]
    gender: Gender | "all"
    activeStatus?: "active" | "inactive" | "all"
    year: string
    search: string
  }) => void
  showActiveStatus?: boolean
}

export function Filters({ onFiltersChange, showActiveStatus = false }: FiltersProps) {
  const [selectedTours, setSelectedTours] = useState<Tour[]>([])
  const [selectedGender, setSelectedGender] = useState<Gender | "all">("all")
  const [selectedActiveStatus, setSelectedActiveStatus] = useState<"active" | "inactive" | "all">("all")
  const [selectedYear, setSelectedYear] = useState("2024")
  const [searchTerm, setSearchTerm] = useState("")

  const tours: Tour[] = ["PPA", "MLP", "APP"]
  const genders = [
    { value: "all", label: "All Genders" },
    { value: "M", label: "Male" },
    { value: "F", label: "Female" },
  ]
  const activeStatuses = [
    { value: "all", label: "All Statuses" },
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ]
  const years = ["2024", "2023", "2022", "2021"]

  const handleTourToggle = (tour: Tour) => {
    const newTours = selectedTours.includes(tour) ? selectedTours.filter((t) => t !== tour) : [...selectedTours, tour]

    setSelectedTours(newTours)
    onFiltersChange({
      tours: newTours,
      gender: selectedGender,
      activeStatus: selectedActiveStatus,
      year: selectedYear,
      search: searchTerm,
    })
  }

  const handleGenderChange = (gender: string) => {
    const newGender = gender as Gender | "all"
    setSelectedGender(newGender)
    onFiltersChange({
      tours: selectedTours,
      gender: newGender,
      activeStatus: selectedActiveStatus,
      year: selectedYear,
      search: searchTerm,
    })
  }

  const handleActiveStatusChange = (status: string) => {
    const newStatus = status as "active" | "inactive" | "all"
    setSelectedActiveStatus(newStatus)
    onFiltersChange({
      tours: selectedTours,
      gender: selectedGender,
      activeStatus: newStatus,
      year: selectedYear,
      search: searchTerm,
    })
  }

  const handleYearChange = (year: string) => {
    setSelectedYear(year)
    onFiltersChange({
      tours: selectedTours,
      gender: selectedGender,
      activeStatus: selectedActiveStatus,
      year,
      search: searchTerm,
    })
  }

  const handleSearchChange = (search: string) => {
    setSearchTerm(search)
    onFiltersChange({
      tours: selectedTours,
      gender: selectedGender,
      activeStatus: selectedActiveStatus,
      year: selectedYear,
      search,
    })
  }

  return (
    <div className="flex flex-wrap items-center gap-4 p-4 bg-card/50 rounded-lg w-full max-w-full overflow-x-hidden">
      <div className="flex-1 min-w-[200px]">
        <Input
          placeholder="Search players..."
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium">Tours:</span>
        {tours.map((tour) => (
          <Button
            key={tour}
            variant={selectedTours.includes(tour) ? "default" : "outline"}
            size="sm"
            onClick={() => handleTourToggle(tour)}
            className={
              selectedTours.includes(tour)
                ? tour === "PPA"
                  ? "bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200"
                  : tour === "MLP"
                    ? "bg-green-100 text-green-800 hover:bg-green-100 border-green-200"
                    : "bg-purple-100 text-purple-800 hover:bg-purple-100 border-purple-200"
                : tour === "PPA"
                  ? "hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200"
                  : tour === "MLP"
                    ? "hover:bg-green-50 hover:text-green-700 hover:border-green-200"
                    : "hover:bg-purple-50 hover:text-purple-700 hover:border-purple-200"
            }
          >
            {tour}
          </Button>
        ))}
      </div>

      <Select value={selectedGender} onValueChange={handleGenderChange}>
        <SelectTrigger className="w-[140px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent
          position="popper"
          align="start"
          className="min-w-[var(--radix-select-trigger-width)] max-w-[calc(100vw-1rem)]"
        >
          {genders.map((gender) => (
            <SelectItem key={gender.value} value={gender.value}>
              {gender.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {showActiveStatus && (
        <Select value={selectedActiveStatus} onValueChange={handleActiveStatusChange}>
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent
            position="popper"
            align="start"
            className="min-w-[var(--radix-select-trigger-width)] max-w-[calc(100vw-1rem)]"
          >
            {activeStatuses.map((status) => (
              <SelectItem key={status.value} value={status.value}>
                {status.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      <Select value={selectedYear} onValueChange={handleYearChange}>
        <SelectTrigger className="w-[100px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent
          position="popper"
          align="start"
          className="min-w-[var(--radix-select-trigger-width)] max-w-[calc(100vw-1rem)]"
        >
          {years.map((year) => (
            <SelectItem key={year} value={year}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {(selectedTours.length > 0 ||
        selectedGender !== "all" ||
        (showActiveStatus && selectedActiveStatus !== "all") ||
        searchTerm) && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setSelectedTours([])
            setSelectedGender("all")
            setSelectedActiveStatus("all")
            setSearchTerm("")
            onFiltersChange({
              tours: [],
              gender: "all",
              activeStatus: "all",
              year: selectedYear,
              search: "",
            })
          }}
        >
          <X className="h-4 w-4 mr-1" />
          Clear
        </Button>
      )}
    </div>
  )
}
