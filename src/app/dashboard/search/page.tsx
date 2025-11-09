import Link from "next/link"
import { Search, ArrowRight, BookText, Star, Bot } from "lucide-react"
import { getLegislations, Legislation } from "@/lib/data"
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
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"

export default function SearchPage({
  searchParams,
}: {
  searchParams?: { q?: string }
}) {
  const query = searchParams?.q || ""
  const results = getLegislations(query)

  // Mocked AI data for demonstration
  const getMockRelevance = (id: string) => {
    // Simple hash function for pseudo-random but consistent scores
    const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return 85 + (hash % 15); // Relevance between 85% and 99%
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <header>
        <h1 className="text-3xl font-bold font-headline">Search Results</h1>
        <p className="text-muted-foreground mt-1">Search results page with AI-powered filtering and relevance scoring.</p>
        <form action={searchAction} className="mt-4 max-w-2xl">
            <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
                type="search"
                name="query"
                defaultValue={query}
                placeholder="Ask me about UAE legislation..."
                className="w-full rounded-md border-2 border-primary/50 bg-background pl-12 pr-24 py-3 h-14 text-lg"
                aria-label="Search legislation"
            />
            <Button type="submit" size="lg" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md h-11">
                Search
            </Button>
            </div>
        </form>
      </header>

      <div className="mt-8 grid md:grid-cols-4 gap-8">
        {/* AI Filters Sidebar */}
        <aside className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-headline">AI Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="filter-economic" defaultChecked />
                  <label htmlFor="filter-economic" className="text-sm font-medium leading-none">Economic Law</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="filter-business" defaultChecked />
                  <label htmlFor="filter-business" className="text-sm font-medium leading-none">Business</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="filter-2020" />
                  <label htmlFor="filter-2020" className="text-sm font-medium leading-none">2020-2025</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="filter-dubai" />
                  <label htmlFor="filter-dubai" className="text-sm font-medium leading-none">Dubai Specific</label>
                </div>
              </div>
              <Separator />
              <div>
                <h4 className="font-semibold mb-2">Suggested</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Free zones</Badge>
                  <Badge variant="outline">Licensing</Badge>
                  <Badge variant="outline">Capital</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </aside>

        {/* Search Results */}
        <main className="md:col-span-3">
            <p className="text-muted-foreground text-sm">
                {query ? `${results.length} results found (relevance: AI-ranked)` : "Enter a term to search for legislation."}
            </p>
            {results.length > 0 ? (
                <div className="space-y-6 mt-4">
                {results.map((item) => (
                    <div key={item.id} className="border-b pb-6">
                        <p className="text-sm text-muted-foreground mb-1">
                            Relevance: {getMockRelevance(item.id)}% • <span className="text-primary">{item.category}</span>
                        </p>
                        <h2 className="text-xl font-bold font-headline text-primary">
                            <Link href={`/dashboard/legislation/${item.slug}`} className="hover:underline">
                                {item.title}
                            </Link>
                        </h2>
                        <p className="text-sm text-muted-foreground mt-1">{item.legislationNumber}</p>
                        
                        <div className="mt-2 flex items-start gap-2">
                            <Bot className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <div>
                                <h4 className="font-semibold">AI Summary:</h4>
                                <p className="text-sm text-muted-foreground">{item.summary}</p>
                            </div>
                        </div>

                        <div className="mt-4 flex items-center gap-4 text-sm font-medium">
                            <Link href={`/dashboard/legislation/${item.slug}`} className="flex items-center gap-1 text-primary hover:underline">
                                <BookText className="h-4 w-4" /> View Full Law
                            </Link>
                            <Link href="#" className="flex items-center gap-1 text-primary hover:underline">
                                <Bot className="h-4 w-4" /> Ask AI
                            </Link>
                             <Link href="#" className="flex items-center gap-1 text-primary hover:underline">
                                <Star className="h-4 w-4" /> Add to Favorites
                            </Link>
                        </div>
                    </div>
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
        </main>
      </div>
    </div>
  )
}
