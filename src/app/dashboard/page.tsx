import Link from "next/link"
import Image from "next/image"
import { redirect } from 'next/navigation'
import {
  Briefcase,
  FileText,
  Home,
  Landmark,
  Scale,
  Search,
  ArrowRight,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DashboardChart } from "@/components/dashboard-chart"
import {
  getLegislations,
  getLegislationStats,
  getCategories,
  LegislationCategory
} from "@/lib/data"
import { PlaceHolderImages } from "@/lib/placeholder-images"

const categoryIcons: Record<LegislationCategory, React.ReactNode> = {
  "Regulatory Decision": <Scale className="h-6 w-6" />,
  "Executive Regulations": <FileText className="h-6 w-6" />,
  "Federal Law": <Landmark className="h-6 w-6" />,
  "Residence": <Home className="h-6 w-6" />,
  "Work": <Briefcase className="h-6 w-6" />,
}

export default function Dashboard() {
  const recentLegislations = getLegislations().slice(0, 5)
  const stats = getLegislationStats()
  const categories = getCategories()

  async function searchAction(formData: FormData) {
    'use server'
    const query = formData.get('query') as string
    redirect(`/dashboard/search?q=${encodeURIComponent(query)}`)
  }

  return (
    <div className="flex flex-1 flex-col gap-6">
      <section className="text-center py-10 md:py-16">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary tracking-tight">
          Emirates Law Hub
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Your comprehensive portal for navigating UAE legislation.
        </p>
        <form action={searchAction} className="mt-8 max-w-xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              name="query"
              placeholder="Search for legislation by keyword..."
              className="w-full rounded-full bg-white pl-10 pr-20 py-6 text-base"
              aria-label="Search legislation"
            />
            <Button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full px-6 py-3 bg-accent text-accent-foreground hover:bg-accent/90">
              Search
            </Button>
          </div>
        </form>
      </section>

      <section>
        <h2 className="text-2xl font-bold font-headline mb-4">Browse by Category</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {categories.map((category) => {
            const placeholder = PlaceHolderImages.find(p => p.id === category.slug);
            return (
              <Link href={`/dashboard/browse/${category.slug}`} key={category.slug}>
                <Card className="group overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
                  <div className="relative h-40 w-full">
                    {placeholder && (
                       <Image
                         src={placeholder.imageUrl}
                         alt={category.name}
                         fill
                         data-ai-hint={placeholder.imageHint}
                         className="object-cover transition-transform group-hover:scale-105"
                       />
                    )}
                     <div className="absolute inset-0 bg-black/40"></div>
                  </div>
                  <CardHeader className="relative -mt-16 z-10">
                      <div className="bg-primary/80 backdrop-blur-sm text-primary-foreground rounded-full p-3 w-fit mb-2 shadow-xl border border-primary-foreground/20">
                        {categoryIcons[category.name]}
                      </div>
                      <CardTitle className="font-headline text-white">{category.name}</CardTitle>
                  </CardHeader>
                </Card>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="lg:col-span-4">
            <DashboardChart data={stats} />
        </div>
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Recent Legislation</CardTitle>
              <CardDescription>
                The latest updates to the legal framework.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead className="hidden sm:table-cell">Category</TableHead>
                    <TableHead className="text-right">View</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentLegislations.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium max-w-xs truncate">{item.title}</TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge variant="secondary">{item.category}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button asChild size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Link href={`/dashboard/legislation/${item.slug}`}>
                            <ArrowRight className="h-4 w-4" />
                            <span className="sr-only">View Details</span>
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
