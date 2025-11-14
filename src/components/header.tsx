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
  LogOut,
  Menu,
  ChevronDown
} from "lucide-react"
import React, { useState } from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useUser, useAuth } from "@/firebase"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { signOut } from "firebase/auth"
import { useRouter }from "next/navigation"

const navLinks = [
  { href: "/dashboard/insights", label: "My Dashboard" },
  { href: "/dashboard/browse", label: "Browse Legislation" },
  { href: "#", label: "UAE Constitution", disabled: true },
]

export function Header() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    if(auth) {
      await signOut(auth);
      router.push('/login');
    }
  };


  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background">
      <div className="container mx-auto flex h-16 items-center gap-4 px-4">
        <Link href="/dashboard" className="flex items-center gap-4">
           <Image src="/logo1.svg" alt="UAE Gov Logo" width={40} height={40} />
           <Image src="/logo2.svg" alt="UAE Logo" width={40} height={40} />
           <Image src="/logo3.svg" alt="Ministry Logo" width={40} height={40} />
           <Image src="/logo4.svg" alt="AD Logo" width={40} height={40} />
        </Link>

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
                        href={link.disabled ? "#" : link.href}
                        className={cn(
                            buttonVariants({ variant: "ghost" }),
                            "text-sm font-medium",
                             pathname.startsWith(link.href) && !link.disabled ? "text-primary" : "text-muted-foreground",
                             link.disabled && "pointer-events-none opacity-50"
                        )}
                    >
                        {link.label}
                    </Link>
                ))}
            </nav>
        </div>
        
        <div className="ml-auto flex items-center gap-2">
            <div className="hidden lg:flex items-center gap-2">
              {!isUserLoading && !user && (
                <Button asChild>
                  <Link href="/login">Login</Link>
                </Button>
              )}
              {user && (
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.photoURL || undefined} alt={user.email || "user"} />
                          <AvatarFallback>
                            <User />
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">My Account</p>
                          <p className="text-xs leading-none text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleSignOut}>
                          <LogOut className="mr-2 h-4 w-4" />
                          <span>Log out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
              )}
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
                    href={link.disabled ? "#" : link.href}
                    className={cn(
                        buttonVariants({ variant: "ghost", size: "sm" }),
                        "justify-start",
                         pathname.startsWith(link.href) && !link.disabled ? "bg-accent text-accent-foreground" : "",
                         link.disabled && "pointer-events-none opacity-50"
                    )}
                >
                    {link.label}
                </Link>
            ))}
            <DropdownMenuSeparator />
            {!isUserLoading && !user && (
              <Button asChild>
                <Link href="/login">Login</Link>
              </Button>
            )}
             {user && (
                <>
                  <div className="flex items-center gap-2 p-2">
                     <Avatar className="h-8 w-8">
                        <AvatarImage src={user.photoURL || undefined} alt={user.email || "user"} />
                        <AvatarFallback>
                          <User />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">My Account</p>
                          <p className="text-xs leading-none text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                  </div>
                   <Button variant="ghost" onClick={handleSignOut} className="justify-start">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </Button>
                </>
             )}
          </nav>
        </div>
      )}
    </header>
  )
}
