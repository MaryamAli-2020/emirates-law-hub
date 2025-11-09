import Link from "next/link";
import { getCategories, LegislationCategory } from "@/lib/data";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export default function BrowseAllPage() {
    const categories = getCategories();

    return (
        <div className="container mx-auto px-4 py-8">
            <header>
                <h1 className="text-3xl font-bold font-headline">Browse all Categories</h1>
                <p className="text-muted-foreground mt-2">
                    Explore legislation across all available categories.
                </p>
            </header>

            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {categories.map((category) => (
                    <Link key={category.slug} href={`/dashboard/browse/${category.slug}`} className="block hover:no-underline">
                        <Card className="h-full hover:border-primary/50 hover:shadow-md transition-all group">
                             <CardHeader>
                                <CardTitle className="font-headline text-lg group-hover:text-primary transition-colors">{category.name}</CardTitle>
                                <CardDescription className="flex items-center justify-between text-xs">
                                    <span>Explore category</span>
                                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
