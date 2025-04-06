"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import { useTheme } from "next-themes"
import { MoonIcon, SunIcon } from "lucide-react"

export default function Navbar() {
  const { theme, setTheme } = useTheme()

  return (
    <header className="border-b">
      <div className="container max-w-6xl flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Sparkles className="h-5 w-5 text-blue-500" />
          <span>Content Genie</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/features" className="text-sm font-medium hover:text-blue-500 transition-colors">
            Features
          </Link>
          <Link href="/pricing" className="text-sm font-medium hover:text-blue-500 transition-colors">
            Pricing
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-blue-500 transition-colors">
            About
          </Link>
          <Link href="/login" className="text-sm font-medium hover:text-blue-500 transition-colors">
            Log in
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Button asChild className="hidden md:inline-flex">
            <Link href="/signup">Sign up</Link>
          </Button>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
            <span className="sr-only">Toggle theme</span>
          </button>
        </div>
      </div>
    </header>
  )
}

