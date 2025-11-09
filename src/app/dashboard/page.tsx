import Link from "next/link"
import {
  FileText,
  Search,
  BookCopy,
  Star,
  Newspaper
} from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { searchAction } from "@/app/actions"
import { getCategories } from "@/lib/data"


export default function Dashboard() {
  const categories = getCategories();

  return (
    <div className="flex-1 flex flex-col">
       <section className="bg-muted/30 py-12 md:py-20">
        <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary">
              Access UAE Legislation with AI Assistance
            </h1>
            <p className="mt-2 max-w-2xl mx-auto text-lg text-muted-foreground">
                Find, understand, and apply UAE laws and regulations
            </p>
            <form action={searchAction} className="mt-8 max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  name="query"
                  placeholder="Ask me about UAE legislation... (Natural language search)"
                  className="w-full rounded-full bg-background pl-12 pr-24 py-3 h-14 text-lg"
                  aria-label="Search legislation"
                />
                <Button type="submit" size="lg" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full h-11">
                  Search
                </Button>
              </div>
            </form>
        </div>
      </section>

      <section className="flex-1">
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <Card className="hover:border-primary/50 hover:shadow-md transition-all">
                    <CardHeader className="flex-row items-center gap-4 space-y-0">
                        <BookCopy className="h-8 w-8 text-primary" />
                        <CardTitle className="font-headline">Browse by Category</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                           {categories.slice(0, 4).map(category => (
                             <li key={category.slug}>
                                <Link href={`/dashboard/browse/${category.slug}`} className="hover:text-primary hover:underline">
                                    {category.name}
                                </Link>
                            </li>
                           ))}
                            <li>
                                <Link href="/dashboard/browse" className="text-primary font-semibold hover:underline">
                                    View all...
                                </Link>
                            </li>
                        </ul>
                    </CardContent>
                </Card>

                <Card className="hover:border-primary/50 hover:shadow-md transition-all">
                    <CardHeader className="flex-row items-center gap-4 space-y-0">
                        <Newspaper className="h-8 w-8 text-primary" />
                        <CardTitle className="font-headline">Recent Updates</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            Latest amendments and new regulations.
                        </p>
                         <ul className="mt-2 space-y-1 text-sm">
                            <li><Link href="#" className="hover:text-primary hover:underline">MR No. 23 of 2024</Link></li>
                            <li><Link href="#" className="hover:text-primary hover:underline">CR No. 58 of 2022</Link></li>
                         </ul>
                    </CardContent>
                </Card>

                <Card className="hover:border-primary/50 hover:shadow-md transition-all">
                    <CardHeader className="flex-row items-center gap-4 space-y-0">
                        <Star className="h-8 w-8 text-primary" />
                        <CardTitle className="font-headline">Most Viewed</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            Popular legislation and resources.
                        </p>
                        <ul className="mt-2 space-y-1 text-sm">
                            <li><Link href="#" className="hover:text-primary hover:underline">Federal Law on Public Health</Link></li>
                            <li><Link href="#" className="hover:text-primary hover:underline">Executive Regulation of Labour Law</Link></li>
                         </ul>
                    </CardContent>
                </Card>

            </div>
        </div>
      </section>

    </div>
  )
}

    