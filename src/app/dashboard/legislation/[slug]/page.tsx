import { getLegislationBySlug, getLegislations } from "@/lib/data"
import { notFound } from "next/navigation"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Bot, FileText, Share, Star, HelpCircle } from "lucide-react"

type LegislationPageProps = {
  params: {
    slug: string
  }
}

export function generateStaticParams() {
  const legislations = getLegislations()
  return legislations.map((item) => ({
    slug: item.slug,
  }))
}

export default function LegislationPage({ params }: LegislationPageProps) {
  const legislation = getLegislationBySlug(params.slug)

  if (!legislation) {
    notFound()
  }

  // Placeholder for article parsing
  const articles = legislation.fullText.split(/(?=Article \d+:)/g).map((art, index) => ({
    id: `article-${index + 1}`,
    title: art.substring(0, art.indexOf('\n')).trim() || `Article ${index + 1}`,
  })).filter(art => art.title);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <Card className="overflow-hidden mb-8">
            <CardHeader className="bg-muted/50 p-6">
                <CardTitle className="font-headline text-3xl text-primary">{legislation.title}</CardTitle>
                <CardDescription className="text-base flex items-center gap-4">
                    <span>Effective Date: {new Date(legislation.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</span>
                    <span className="text-muted-foreground">•</span>
                    <span>Issuing Authority: {legislation.legislationType.includes('Federal') ? 'Federal Government' : 'Local Government'}</span>
                </CardDescription>
                 <div className="flex items-center gap-4 text-sm font-medium mt-2">
                    <Button variant="link" className="p-0 h-auto">Download PDF</Button>
                    <Button variant="link" className="p-0 h-auto">Add to Favorites</Button>
                    <Button variant="link" className="p-0 h-auto">Share</Button>
                    <Button variant="link" className="p-0 h-auto">Get AI Summary</Button>
                  </div>
            </CardHeader>
        </Card>
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Contents Sidebar (Left) */}
            <aside className="lg:col-span-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-lg">Contents</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2 text-sm">
                           {articles.map((art) => (
                             <li key={art.id}>
                                <Link href={`#${art.id}`} className="text-muted-foreground hover:text-primary">
                                    {art.title.split(':')[0]}
                                </Link>
                            </li>
                           ))}
                           {articles.length > 3 && (
                             <li><Link href="#" className="text-primary font-semibold hover:underline">More...</Link></li>
                           )}
                        </ul>
                    </CardContent>
                </Card>
            </aside>

            {/* Legislation Text (Center) */}
            <main className="lg:col-span-7">
                <Card>
                    <CardContent className="p-6">
                        {/* AI Summary */}
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                            <h3 className="font-headline text-lg font-bold flex items-center gap-2">
                                <Bot className="h-5 w-5 text-yellow-600" />
                                AI Summary
                            </h3>
                            <p className="text-sm text-yellow-800 mt-2">{legislation.summary}</p>
                        </div>

                        {/* Full Text */}
                        <div className="prose prose-sm md:prose-base max-w-none text-foreground space-y-6">
                           {legislation.fullText.split(/(?=Article \d+:)/g).map((art, index) => {
                                const articleId = `article-${index + 1}`;
                                const titleMatch = art.match(/(Article \d+:.*?)\n/);
                                const title = titleMatch ? titleMatch[1] : '';
                                const content = title ? art.substring(title.length) : art;

                                if (!title) return null;

                                return (
                                    <div key={articleId} id={articleId}>
                                        <h3 className="font-bold font-headline">{title}</h3>
                                        <p className="whitespace-pre-wrap text-muted-foreground">{content.trim()}</p>
                                    </div>
                                )
                           })}
                        </div>
                    </CardContent>
                </Card>
            </main>

            {/* AI Help Sidebar (Right) */}
            <aside className="lg:col-span-3">
                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-lg flex items-center gap-2">
                           <HelpCircle className="h-5 w-5 text-primary" />
                           AI Help
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h4 className="font-semibold text-sm">Section</h4>
                            <p className="text-sm text-muted-foreground">Article 1 defines key terms used throughout the law.</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-sm">Related</h4>
                             <ul className="list-disc pl-5 text-sm space-y-1 text-muted-foreground mt-1">
                                <li><a href="#" className="text-primary hover:underline">Article 5</a></li>
                                <li><a href="#" className="text-primary hover:underline">Regulation 2022</a></li>
                                <li><a href="#" className="text-primary hover:underline">Amendments</a></li>
                            </ul>
                        </div>
                         <Button variant="outline" className="w-full">
                           Ask about this section
                        </Button>
                    </CardContent>
                </Card>
            </aside>

        </div>
      </div>
    </div>
  )
}
