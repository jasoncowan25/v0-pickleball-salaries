"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import type { Gender } from "@/lib/mock-data"
import { getDisplayYear } from "@/lib/displayYear"

interface FilterBottomSheetProps {
  isOpen: boolean
  onClose: () => void
  gender: Gender | "all"
  year: string
  onGenderChange: (value: Gender | "all") => void
  onYearChange: (value: string) => void
  onApplyBothFilters?: (gender: Gender | "all", year: string) => void
  onApplyFilters: () => void
  onResetFilters: () => void
}

export function FilterBottomSheet({
  isOpen,
  onClose,
  gender,
  year,
  onGenderChange,
  onYearChange,
  onApplyBothFilters,
  onApplyFilters,
  onResetFilters,
}: FilterBottomSheetProps) {
  const [localGender, setLocalGender] = useState<Gender | "all">(gender)
  const [localYear, setLocalYear] = useState(year)

  useEffect(() => {
    if (isOpen) {
      setLocalGender(gender)
      setLocalYear(year)
    }
  }, [isOpen, gender, year])

  const handleApply = () => {
    if (onApplyBothFilters) {
      onApplyBothFilters(localGender, localYear)
    } else {
      // Fallback to old behavior
      onGenderChange(localGender)
      onYearChange(localYear)
    }
    onApplyFilters()
    onClose()
  }

  const handleReset = () => {
    const currentYear = getDisplayYear()
    setLocalGender("all")
    setLocalYear(currentYear.toString())
    onGenderChange("all")
    onYearChange(currentYear.toString())
    onResetFilters()
    onClose()
  }

  const getGenderLabel = (value: Gender | "all") => {
    if (value === "all") return "All Genders"
    return value === "M" ? "Men" : "Women"
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-auto max-h-[80vh]">
        <SheetHeader className="pb-4">
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>

        <div className="space-y-6 pb-6">
          {/* Gender Section */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Gender</Label>
            <Select value={localGender} onValueChange={(value) => setLocalGender(value as Gender | "all")}>
              <SelectTrigger className="w-full h-11">
                <SelectValue>{getGenderLabel(localGender)}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Genders</SelectItem>
                <SelectItem value="M">Men</SelectItem>
                <SelectItem value="F">Women</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Year Section */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Year</Label>
            <Select value={localYear} onValueChange={setLocalYear}>
              <SelectTrigger className="w-full h-11">
                <SelectValue>{localYear}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2025">2025</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
                <SelectItem value="2021">2021</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t">
          <Button variant="ghost" onClick={handleReset} className="text-muted-foreground hover:text-foreground">
            Reset
          </Button>
          <Button onClick={handleApply} className="px-8">
            Apply Filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
