"use client"

import Link from "next/link"
import Image from "next/image"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Search,
  User,
  Home,
  BookUser,
  Languages,
  Menu,
  ChevronDown
} from "lucide-react"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import React, { useState } from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/dashboard/public-policies", label: "Public policies" },
  { href: "/dashboard/lab", label: "Legislation Laboratory" },
  { href: "/dashboard/browse/federal-law", label: "Legislation", dropdown: true },
  { href: "/dashboard/constitution", label: "UAE Constitution" },
]

export function Header() {
  const userAvatar = PlaceHolderImages.find(p => p.id === 'user-avatar');
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background">
      <div className="container mx-auto flex h-16 items-center gap-4 px-4">
        <div className="flex items-center gap-4">
           <Image src="/logo1.svg" alt="UAE Gov Logo" width={40} height={40} />
           <Image src="/logo2.svg" alt="UAE Logo" width={40} height={40} />
           <Image src="/logo3.svg" alt="Ministry Logo" width={40} height={40} />
           <Image src="/logo4.svg" alt="AD Logo" width={40} height={40} />
        </div>

        <div className="hidden lg:flex flex-1 justify-center items-center gap-6">
            <div className="relative w-full max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                name="query"
                placeholder="research"
                className="w-full rounded-full bg-muted pl-10 pr-4 py-2 text-sm"
                aria-label="Search"
              />
            </div>
            <nav className="flex items-center gap-4">
                {navLinks.map(link => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                            buttonVariants({ variant: "ghost" }),
                            "text-sm font-medium",
                             pathname.startsWith(link.href) ? "text-primary" : "text-muted-foreground"
                        )}
                    >
                        {link.label}
                        {link.dropdown && <ChevronDown className="ml-1 h-4 w-4" />}
                    </Link>
                ))}
            </nav>
        </div>
        
        <div className="ml-auto flex items-center gap-2">
            <div className="hidden lg:flex items-center gap-2">
              <Button variant="ghost" size="icon"><User /></Button>
              <Button variant="ghost" size="icon"><Home /></Button>
              <Button variant="ghost" size="icon"><BookUser /></Button>
              <Button variant="ghost" size="icon" className="gap-1">EN <ChevronDown className="h-4 w-4" /></Button>
            </div>
            <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
                <Menu />
                <span className="sr-only">Toggle menu</span>
            </Button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t">
          <nav className="flex flex-col gap-2 p-4">
             {navLinks.map(link => (
                <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                        buttonVariants({ variant: "ghost", size: "sm" }),
                        "justify-start",
                         pathname.startsWith(link.href) ? "bg-accent text-accent-foreground" : ""
                    )}
                >
                    {link.label}
                </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
