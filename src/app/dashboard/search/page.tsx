'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Search,
  ArrowRight,
  BookText,
  Star,
  Bot,
  Filter,
} from 'lucide-react';
import { getLegislations, Legislation, LegislationCategory } from '@/lib/data';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { searchAction } from '@/app/actions';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';

// Helper function to calculate relevance score
const getRelevance = (item: Legislation, query: string): number => {
  const queryWords = query.toLowerCase().split(/\s+/).filter(Boolean);
  let score = 0;
  if (queryWords.length === 0) return 100;

  const itemTitle = item.title.toLowerCase();
  const itemSummary = item.summary.toLowerCase();
  const itemSubject = item.subjectMatter.toLowerCase();
  const itemText = item.fullText.toLowerCase();
  const itemCategory = item.category.toLowerCase();
  const itemLegislationNumber = item.legislationNumber.toLowerCase();

  queryWords.forEach(word => {
    if (itemTitle.includes(word)) {
      score += 30 / queryWords.length;
    }
    if (itemSummary.includes(word)) {
      score += 20 / queryWords.length;
    }
    if (itemSubject.includes(word)) {
      score += 25 / queryWords.length;
    }
    if (itemText.includes(word)) {
      score += 20 / queryWords.length;
    }
    if (itemCategory.includes(word)) {
      score += 3 / queryWords.length;
    }
    if (itemLegislationNumber.includes(word)) {
      score += 2 / queryWords.length;
    }
  });
  
  // Simple hash to add some pseudo-randomness for variety
  const hash = item.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const pseudoRandomBoost = (hash % 10); // 0-9
  
  return Math.min(100, Math.floor(score + pseudoRandomBoost));
};

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const allResults = useMemo(() => 
    getLegislations(query)
      .map(item => ({ ...item, relevance: getRelevance(item, query) }))
      .sort((a, b) => b.relevance - a.relevance),
    [query]
  );
  
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  const [selectedYears, setSelectedYears] = useState<Set<string>>(new Set());

  const availableCategories = useMemo(() => {
    const categories = new Set(allResults.map(item => item.category));
    return Array.from(categories);
  }, [allResults]);

  const availableYears = useMemo(() => {
    const years = new Set(allResults.map(item => new Date(item.date).getFullYear().toString()));
    return Array.from(years).sort((a, b) => parseInt(b) - parseInt(a));
  }, [allResults]);

  const filteredResults = useMemo(() => {
    return allResults.filter(item => {
      const categoryMatch = selectedCategories.size === 0 || selectedCategories.has(item.category);
      const yearMatch = selectedYears.size === 0 || selectedYears.has(new Date(item.date).getFullYear().toString());
      return categoryMatch && yearMatch;
    });
  }, [allResults, selectedCategories, selectedYears]);

  const handleCategoryChange = (category: string, checked: boolean) => {
    setSelectedCategories(prev => {
      const newSet = new Set(prev);
      if (checked) {
        newSet.add(category);
      } else {
        newSet.delete(category);
      }
      return newSet;
    });
  };
  
  const handleYearChange = (year: string, checked: boolean) => {
    setSelectedYears(prev => {
      const newSet = new Set(prev);
      if (checked) {
        newSet.add(year);
      } else {
        newSet.delete(year);
      }
      return newSet;
    });
  };
  
  // AI-suggested keywords based on query
  const suggestedKeywords = useMemo(() => {
    if (query.toLowerCase().includes('business')) return ['Free zones', 'Licensing', 'Capital'];
    if (query.toLowerCase().includes('family')) return ['Marriage', 'Divorce', 'Inheritance'];
    if (query.toLowerCase().includes('cyber')) return ['Data', 'Privacy', 'Forensics'];
    return ['Regulations', 'Amendments', 'Law'];
  }, [query]);

  return (
    <div className="container mx-auto px-4 py-8">
      <header>
        <h1 className="text-3xl font-bold font-headline">Search Results</h1>
        <p className="text-muted-foreground mt-1">
          Showing results for "{query}". Use AI filters to refine your search.
        </p>
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
            <Button
              type="submit"
              size="lg"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md h-11"
            >
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
              <CardTitle className="text-lg font-headline flex items-center gap-2">
                <Filter className="h-5 w-5" /> AI Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {availableCategories.length > 0 && (
                <div className="space-y-2">
                   <h4 className="font-semibold mb-2 text-sm">Categories</h4>
                  {availableCategories.map(category => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`filter-${category.replace(/\s+/g, '-')}`} 
                        onCheckedChange={(checked) => handleCategoryChange(category, !!checked)}
                        checked={selectedCategories.has(category)}
                      />
                      <label
                        htmlFor={`filter-${category.replace(/\s+/g, '-')}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              )}
              {availableYears.length > 0 && availableCategories.length > 0 && <Separator />}
              {availableYears.length > 0 && (
                 <div className="space-y-2">
                    <h4 className="font-semibold mb-2 text-sm">Year of Issue</h4>
                   {availableYears.map(year => (
                     <div key={year} className="flex items-center space-x-2">
                       <Checkbox 
                        id={`filter-${year}`}
                        onCheckedChange={(checked) => handleYearChange(year, !!checked)}
                        checked={selectedYears.has(year)}
                       />
                       <label
                         htmlFor={`filter-${year}`}
                         className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                       >
                         {year}
                       </label>
                     </div>
                   ))}
                 </div>
              )}
              
              <Separator />
              <div>
                <h4 className="font-semibold mb-2 text-sm">Suggested Topics</h4>
                <div className="flex flex-wrap gap-2">
                  {suggestedKeywords.map(keyword => (
                     <Button asChild key={keyword} variant="outline" size="sm" className="text-xs h-7">
                        <Link href={`/dashboard/search?q=${encodeURIComponent(keyword)}`}>{keyword}</Link>
                     </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </aside>

        {/* Search Results */}
        <main className="md:col-span-3">
          <p className="text-muted-foreground text-sm">
            {`${filteredResults.length} results found (relevance: AI-ranked)`}
          </p>
          {filteredResults.length > 0 ? (
            <div className="space-y-6 mt-4">
              {filteredResults.map(item => (
                <div key={item.id} className="border-b pb-6">
                  <p className="text-sm text-muted-foreground mb-1">
                    Relevance: {item.relevance}% •{' '}
                    <span className="text-primary">{item.category}</span>
                  </p>
                  <h2 className="text-xl font-bold font-headline text-primary">
                    <Link
                      href={`/dashboard/legislation/${item.slug}`}
                      className="hover:underline"
                    >
                      {item.title}
                    </Link>
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    {item.legislationNumber}
                  </p>

                  <div className="mt-2 flex items-start gap-2">
                    <Bot className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">AI Summary:</h4>
                      <p className="text-sm text-muted-foreground">
                        {item.summary}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-4 text-sm font-medium">
                    <Link
                      href={`/dashboard/legislation/${item.slug}`}
                      className="flex items-center gap-1 text-primary hover:underline"
                    >
                      <BookText className="h-4 w-4" /> View Full Law
                    </Link>
                    <Link
                      href="#"
                      className="flex items-center gap-1 text-primary hover:underline"
                    >
                      <Bot className="h-4 w-4" /> Ask AI
                    </Link>
                    <Link
                      href="#"
                      className="flex items-center gap-1 text-primary hover:underline"
                    >
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
                Try adjusting your search query or filters.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
