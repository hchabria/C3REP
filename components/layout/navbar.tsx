"use client"

import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"

export function Navbar() {
  return (
    <nav className="border-b">
      <div className="container flex h-16 items-center px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl">✨</span>
          <span className="font-bold">Content Genie</span>
        </Link>
        <div className="ml-auto flex items-center space-x-4">
          <Link 
            href="/features" 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Features
          </Link>
          <Link 
            href="/pricing" 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Pricing
          </Link>
          <Link 
            href="/about" 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            About
          </Link>
          <ModeToggle />
          <Link 
            href="/login" 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md"
          >
            Sign up
          </Link>
        </div>
      </div>
    </nav>
  )
} 