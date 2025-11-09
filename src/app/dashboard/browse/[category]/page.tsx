import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getLegislationsByCategory, getCategories, Legislation } from "@/lib/data"
import { notFound } from "next/navigation"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

type BrowsePageProps = {
  params: {
    category: string
  }
}

export function generateStaticParams() {
  const categories = getCategories()
  return categories.map((category) => ({
    category: category.slug,
  }))
}

export default function BrowsePage({ params }: BrowsePageProps) {
  const categorySlug = params.category
  const results = getLegislationsByCategory(categorySlug)
  
  if (results.length === 0) {
    // We check if the category itself is valid. If not, 404.
    const validCategories = getCategories().map(c => c.slug);
    if (!validCategories.includes(categorySlug)) {
        notFound();
    }
  }

  const categoryName = categorySlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-3xl font-bold font-headline">{categoryName}</h1>
        <p className="text-muted-foreground mt-2">
          {`Showing ${results.length} item(s) in this category.`}
        </p>
      </header>
      
      {results.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {results.map((item: Legislation) => (
            <Card key={item.id} className="flex flex-col">
              <CardHeader>
                <CardTitle className="font-headline text-lg">{item.title}</CardTitle>
                <CardDescription className="text-xs">{item.date}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground line-clamp-3">{item.summary}</p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                  <Link href={`/dashboard/legislation/${item.slug}`}>
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
            <h3 className="mt-4 text-lg font-semibold">No legislation found</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              There are currently no items in the "{categoryName}" category.
            </p>
            <Button asChild variant="link" className="mt-4">
              <Link href="/dashboard">Return to Dashboard</Link>
            </Button>
        </div>
      )}
    </div>
  )
}
