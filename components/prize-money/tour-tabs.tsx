"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Tour } from "@/lib/prize-money-data"

interface TourTabsProps {
  value: Tour | "ALL"
  onChange: (tour: Tour | "ALL") => void
}

export function TourTabs({ value, onChange }: TourTabsProps) {
  return (
    <Tabs value={value} onValueChange={(v) => onChange(v as Tour | "ALL")}>
      <TabsList>
        <TabsTrigger value="ALL">All</TabsTrigger>
        <TabsTrigger value="PPA">PPA</TabsTrigger>
        <TabsTrigger value="MLP">MLP</TabsTrigger>
        <TabsTrigger value="APP">APP</TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
