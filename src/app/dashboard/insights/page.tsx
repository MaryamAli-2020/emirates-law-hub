'use client';

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Bot, Zap, BarChart, Lightbulb, Folder, Clock, FileText, ArrowRight } from "lucide-react";

export default function PersonalizedDashboardPage() {
  // Placeholder data - in a real app this would come from user data
  const user = { name: "User" };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-3xl font-bold font-headline">Personalized Dashboard</h1>
                <p className="text-muted-foreground mt-1">
                    AI-curated insights and recommendations for {user.name}.
                </p>
            </div>
             <Button asChild variant="outline">
                <Link href="/dashboard">Go to Main Dashboard <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
        </div>
      </header>

      <div className="space-y-6">
        {/* AI Insights */}
        <Card className="bg-amber-50 border-amber-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline text-xl text-amber-900">
              <Bot className="h-6 w-6" />
              AI Insights for You
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-amber-800 list-disc list-inside">
              <li>3 amendments to your followed legislation.</li>
              <li>New economic regulations in your interest areas.</li>
              <li className="font-semibold">Upcoming deadline: Business license renewal (30 days).</li>
            </ul>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Access */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline text-xl">
                <Zap className="h-6 w-6 text-primary" />
                Quick Access
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-md flex items-center gap-2"><FileText className="h-5 w-5 text-muted-foreground" />Recently Viewed:</h3>
                <ul className="mt-2 space-y-1 text-sm list-disc list-inside text-muted-foreground">
                  <li><Link href="#" className="hover:underline text-primary">Federal Decree-Law 37/2021</Link> • Commercial Licensing Guide</li>
                  <li><Link href="#" className="hover:underline text-primary">Business Registry Form</Link></li>
                </ul>
              </div>
              <Separator />
               <div>
                <h3 className="font-semibold text-md flex items-center gap-2"><Folder className="h-5 w-5 text-muted-foreground" />Saved Collections:</h3>
                 <div className="mt-2 flex flex-wrap gap-2 text-sm">
                    <Button variant="outline" size="sm" asChild>
                        <Link href="#">Business Startup (12 items)</Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                        <Link href="#">Employment Law (8 items)</Link>
                    </Button>
                     <Button variant="outline" size="sm" asChild>
                        <Link href="#">Tax Regulations (5 items)</Link>
                    </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline text-xl">
                <BarChart className="h-6 w-6 text-primary" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
               <div>
                <h3 className="font-semibold text-md">Today:</h3>
                 <p className="text-muted-foreground mt-1">Searched: "business licensing", Viewed: 3 documents, AI conversations: 2.</p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold text-md">This Week:</h3>
                <p className="text-muted-foreground mt-1">15 searches, 8 documents saved, 5 AI summaries generated.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline text-xl">
              <Lightbulb className="h-6 w-6 text-primary" />
              AI Recommendations Based on Your Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-muted-foreground list-disc list-inside">
              <li><Link href="#" className="hover:underline text-primary">Federal Law on Data Protection</Link> (relevant to your business interests).</li>
              <li><Link href="#" className="hover:underline text-primary">New amendments to Employment Law</Link> (affects your saved regulations).</li>
              <li><Link href="#" className="hover:underline text-primary">UAE Commercial Companies Law update</Link> (frequently searched topic).</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
