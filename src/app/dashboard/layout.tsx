
"use client"

import Link from "next/link"
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from "@/components/ui/sidebar"
import {
  Landmark,
  LayoutDashboard,
  Scale,
  Search,
  Briefcase,
  Home,
  FileText,
} from "lucide-react"
import { usePathname } from "next/navigation"
import { Header } from "@/components/header"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === '/dashboard') return pathname === path;
    return pathname.startsWith(path);
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full flex-col bg-background">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2 p-2">
              <Landmark className="h-6 w-6 text-primary" />
              <h2 className="text-lg font-semibold font-headline text-primary-foreground group-data-[collapsible=icon]:hidden">
                <span className="text-primary">Emirates Law</span>
              </h2>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/dashboard")}
                  tooltip={{ children: "Dashboard" }}
                >
                  <Link href="/dashboard">
                    <LayoutDashboard />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/dashboard/search")}
                  tooltip={{ children: "Search" }}
                >
                  <Link href="/dashboard/search">
                    <Search />
                    <span>Search</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/dashboard/browse/federal-law")}
                  tooltip={{ children: "Federal Law" }}
                >
                  <Link href="/dashboard/browse/federal-law">
                    <Landmark />
                    <span>Federal Law</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/dashboard/browse/executive-regulations")}
                  tooltip={{ children: "Executive Regulations" }}
                >
                  <Link href="/dashboard/browse/executive-regulations">
                    <FileText />
                    <span>Executive Regulations</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/dashboard/browse/regulatory-decision")}
                  tooltip={{ children: "Regulatory Decisions" }}
                >
                  <Link href="/dashboard/browse/regulatory-decision">
                    <Scale />
                    <span>Regulatory Decisions</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/dashboard/browse/residence")}
                  tooltip={{ children: "Residence" }}
                >
                  <Link href="/dashboard/browse/residence">
                    <Home />
                    <span>Residence</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/dashboard/browse/work")}
                  tooltip={{ children: "Work" }}
                >
                  <Link href="/dashboard/browse/work">
                    <Briefcase />
                    <span>Work</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <SidebarInset className="bg-background">
          <Header />
          <main className="p-4 sm:p-6">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
