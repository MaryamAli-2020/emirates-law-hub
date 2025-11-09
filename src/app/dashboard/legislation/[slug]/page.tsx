import { getLegislationBySlug, getLegislations } from "@/lib/data"
import { notFound } from "next/navigation"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Card className="overflow-hidden">
            <CardHeader className="bg-muted/50 p-6">
            <div className="flex flex-wrap gap-2 mb-2">
                <Badge variant="secondary">{legislation.category}</Badge>
                <Badge variant="outline">{legislation.legislationType}</Badge>
            </div>
            <CardTitle className="font-headline text-3xl text-primary">{legislation.title}</CardTitle>
            <CardDescription className="text-base">
                {legislation.legislationNumber} | Enacted on: {new Date(legislation.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
                <div className="prose prose-sm md:prose-base max-w-none text-foreground">
                    <h3 className="font-bold">Subject Matter</h3>
                    <p className="text-muted-foreground">{legislation.subjectMatter}</p>
                    
                    <Separator className="my-6" />
                    
                    <h3 className="font-bold">Summary</h3>
                    <p className="text-muted-foreground">{legislation.summary}</p>
                    
                    <Separator className="my-6" />

                    <h3 className="font-bold">Full Text</h3>
                    <div className="space-y-4 whitespace-pre-wrap font-mono text-sm">
                        {legislation.fullText}
                    </div>
                </div>
            </CardContent>
        </Card>

        <div className="mt-6">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-lg">Related Documents</CardTitle>
                    <CardDescription>Associated amendments and guidelines.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="list-disc pl-5 text-sm space-y-2 text-muted-foreground">
                        <li><a href="#" className="text-primary hover:underline">Amendment A.1</a></li>
                        <li><a href="#" className="text-primary hover:underline">Guideline for Implementation</a></li>
                    </ul>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  )
}
