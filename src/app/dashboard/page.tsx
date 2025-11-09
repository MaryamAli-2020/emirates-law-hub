"use client";

import Link from "next/link"
import Image from "next/image"
import {
  Briefcase,
  FileText,
  Home,
  Landmark,
  Scale,
  Search,
  ArrowRight,
  HeartPulse,
  BookOpen,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  getLegislations,
  getLegislationStats,
  getCategories,
  LegislationCategory
} from "@/lib/data"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { searchAction } from "@/app/actions"

const categoryIcons: Record<LegislationCategory, React.ReactNode> = {
  "Regulatory Decision": <Scale className="h-6 w-6" />,
  "Executive Regulations": <FileText className="h-6 w-6" />,
  "Federal Law": <Landmark className="h-6 w-6" />,
  "Residence": <Home className="h-6 w-6" />,
  "Work": <Briefcase className="h-6 w-6" />,
  "Health": <HeartPulse className="h-6 w-6" />,
  "Education": <BookOpen className="h-6 w-6" />,
}

export default function Dashboard() {
  const recentLegislations = getLegislations().slice(0, 5)
  const stats = getLegislationStats()
  const categories = getCategories()

  return (
    <div className="flex flex-1 flex-col">
       <section className="relative py-20 md:py-32 text-white bg-gradient-to-br from-red-800 to-blue-900 overflow-hidden">
        <div 
          className="absolute inset-0 bg-[url('/hero-bg-dots.svg')] bg-repeat bg-center opacity-10" 
          style={{ backgroundSize: '30px 30px' }}>
        </div>
        <div className="container mx-auto px-4 relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight">
              UAE legislation
            </h1>
            <p className="mt-4 max-w-4xl text-lg">
                The "Emirates Legislation" platform is the official platform for the legislation of the United Arab Emirates government. It is developed and supervised by the General Secretariat of the Council of Ministers in coordination with all relevant authorities. The platform aims to be a unified, integrated, comprehensive and updated system that includes all legislation in force in the country, and makes it more accessible to all segments of society from inside and outside the country. The platform's contents include federal laws, their executive regulations and other regulatory decisions in accordance with the latest amendments These legislations can be reviewed by selecting one of the main sectors listed below, or using the platform's search engine.
            </p>
        </div>
      </section>

      <section className="container mx-auto px-4 -mt-16 relative z-10">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="md:col-span-2 lg:col-span-1">
                <CardHeader>
                    <CardTitle>Legislation statistics</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-around items-center">
                    {stats.slice(0,3).map(stat => (
                        <div key={stat.name} className="text-center">
                            <p className="text-4xl font-bold text-primary">{stat.value}</p>
                            <p className="text-xs text-muted-foreground mt-1">{stat.name}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>
             {categories.slice(0,3).map((category) => {
                const placeholder = PlaceHolderImages.find(p => p.id === category.slug);
                return (
                  <Link href={`/dashboard/browse/${category.slug}`} key={category.slug}>
                    <Card className="group overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 h-full">
                      <div className="relative h-full">
                        {placeholder && (
                           <Image
                             src={placeholder.imageUrl}
                             alt={category.name}
                             fill
                             data-ai-hint={placeholder.imageHint}
                             className="object-cover transition-transform group-hover:scale-105"
                           />
                        )}
                         <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-4">
                            <div className="text-white">
                                <p className="text-2xl font-bold">{stats.find(s => s.name === category.name)?.value}</p>
                                <p className="text-sm">Legislation</p>
                                <p className="font-semibold mt-1">{category.name}</p>
                            </div>
                         </div>
                      </div>
                    </Card>
                  </Link>
                )
              })}
        </div>
      </section>
      
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold font-headline mb-4">Browse by Category</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => {
                const placeholder = PlaceHolderImages.find(p => p.id === category.slug);
                return (
                <Link href={`/dashboard/browse/${category.slug}`} key={category.slug}>
                    <Card className="group overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
                    <CardHeader>
                        <CardTitle className="font-headline text-primary">{category.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                            Browse all legislation under the {category.name} category.
                        </p>
                    </CardContent>
                    <CardFooter>
                        <Button variant="link" className="p-0">
                            View All <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </CardFooter>
                    </Card>
                </Link>
                )
            })}
        </div>
      </section>

    </div>
  )
}
