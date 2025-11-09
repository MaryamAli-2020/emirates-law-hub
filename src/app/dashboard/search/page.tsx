import Link from "next/link"
import { Search, ArrowRight } from "lucide-react"
import { getLegislations } from "@/lib/data"
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
import { Input } from "@/components/ui/input"
import { redirect } from "next/navigation"

export default function SearchPage({
  searchParams,
}: {
  searchParams?: { q?: string }
}) {
  const query = searchParams?.q || ""
  const results = getLegislations(query)

  async function searchAction(formData: FormData) {
    'use server'
    const query = formData.get('query') as string
    redirect(`/dashboard/search?q=${encodeURIComponent(query)}`)
  }

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-3xl font-bold font-headline">Search Results</h1>
        <p className="text-muted-foreground mt-2">
          {query ? `Showing ${results.length} results for "${query}"` : "Enter a term to search for legislation."}
        </p>
         <form action={searchAction} className="mt-6 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              name="query"
              defaultValue={query}
              placeholder="Search for legislation by keyword..."
              className="w-full rounded-md bg-white pl-10 pr-20 py-2"
              aria-label="Search legislation"
            />
            <Button type="submit" className="absolute right-1 top-1/2 -translate-y-1/2">
              Search
            </Button>
          </div>
        </form>
      </header>
      
      {results.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {results.map((item) => (
            <Card key={item.id} className="flex flex-col">
              <CardHeader>
                <Badge variant="secondary" className="w-fit mb-2">{item.category}</Badge>
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
            <Search className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">No results found</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Try searching for something else.
            </p>
        </div>
      )}
    </div>
  )
}
