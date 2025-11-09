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
import { searchAction } from "@/app/actions"


export default function SearchPage({
  searchParams,
}: {
  searchParams?: { q?: string }
}) {
  const query = searchParams?.q || ""
  const results = getLegislations(query)

  return (
    <div className="container mx-auto px-4 py-8">
      <header>
        <h1 className="text-3xl font-bold font-headline">Search Results</h1>
        <form action={searchAction} className="mt-4 max-w-2xl">
            <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
                type="search"
                name="query"
                defaultValue={query}
                placeholder="Ask me about UAE legislation... (Natural language search)"
                className="w-full rounded-full bg-background pl-12 pr-24 py-3 h-14 text-lg"
                aria-label="Search legislation"
            />
            <Button type="submit" size="lg" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full h-11">
                Search
            </Button>
            </div>
        </form>
         <p className="text-muted-foreground mt-4">
          {query ? `Showing ${results.length} results for "${query}"` : "Enter a term to search for legislation."}
        </p>
      </header>
      
      {results.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-6">
          {results.map((item) => (
            <Card key={item.id} className="flex flex-col">
              <CardHeader>
                <Badge variant="secondary" className="w-fit mb-2">{item.category}</Badge>
                <CardTitle className="font-headline text-lg">{item.title}</CardTitle>
                <CardDescription className="text-xs">{item.legislationNumber} | {item.date}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground line-clamp-3">{item.summary}</p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={`/dashboard/legislation/${item.slug}`}>
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg mt-6">
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

    