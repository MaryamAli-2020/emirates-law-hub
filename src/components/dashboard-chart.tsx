"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import type { LegislationCategory } from "@/lib/data"

interface DashboardChartProps {
    data: { name: LegislationCategory; value: number }[];
}

const chartConfig = {
  value: {
    label: "Count",
  },
  "Federal Law": {
    label: "Federal Law",
    color: "hsl(var(--chart-1))",
  },
  "Executive Regulations": {
    label: "Executive Regulations",
    color: "hsl(var(--chart-2))",
  },
  "Regulatory Decision": {
    label: "Regulatory Decision",
    color: "hsl(var(--chart-3))",
  },
  "Residence": {
    label: "Residence",
    color: "hsl(var(--chart-4))",
  },
  "Work": {
    label: "Work",
    color: "hsl(var(--chart-5))",
  },
} satisfies import("./ui/chart").ChartConfig

export function DashboardChart({ data }: DashboardChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Legislation Statistics</CardTitle>
        <CardDescription>Distribution of legislation types</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data} margin={{ top: 20, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                    dataKey="name"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    />
                    <YAxis />
                    <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" />}
                    />
                    <Bar dataKey="value" fill="var(--color-primary)" radius={4} />
                </BarChart>
            </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
