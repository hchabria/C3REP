"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Play } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="border-b">
        <div className="container max-w-6xl py-4">
          <nav className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold">
              Content Genie
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/create">
                <Button>Get Started</Button>
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20">
          <div className="container max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                  Create Professional Videos with AI
                </h1>
                <p className="text-xl text-muted-foreground">
                  Transform your ideas into engaging videos in minutes. No editing skills required.
                </p>
                <div className="flex gap-4">
                  <Link href="/create">
                    <Button size="lg">Get Started</Button>
                  </Link>
                  <Link href="/login">
                    <Button size="lg" variant="outline">Login</Button>
                  </Link>
                </div>
              </div>
              <div className="relative">
                <Card className="overflow-hidden">
                  <div className="aspect-video relative">
                    <video
                      className="w-full h-full object-cover"
                      poster="/sample-poster.jpg"
                      controls
                    >
                      <source src="/sample-video.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                      <Button size="icon" className="h-16 w-16">
                        <Play className="h-8 w-8" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-muted">
          <div className="container max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-2">AI-Powered</h3>
                <p className="text-muted-foreground">
                  Our AI generates high-quality videos from your text input.
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-2">Easy to Use</h3>
                <p className="text-muted-foreground">
                  No technical skills required. Just enter your title and let AI do the rest.
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-2">Fast Results</h3>
                <p className="text-muted-foreground">
                  Get your video in minutes, not hours or days.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20">
          <div className="container max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4">
                  1
                </div>
                <h3 className="font-semibold mb-2">Enter Title</h3>
                <p className="text-muted-foreground">
                  Start with a title for your video
                </p>
              </div>
              <div className="text-center">
                <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4">
                  2
                </div>
                <h3 className="font-semibold mb-2">Generate</h3>
                <p className="text-muted-foreground">
                  Let AI create your video
                </p>
              </div>
              <div className="text-center">
                <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4">
                  3
                </div>
                <h3 className="font-semibold mb-2">Preview</h3>
                <p className="text-muted-foreground">
                  Review your video
                </p>
              </div>
              <div className="text-center">
                <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4">
                  4
                </div>
                <h3 className="font-semibold mb-2">Download</h3>
                <p className="text-muted-foreground">
                  Get your video ready to share
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-muted">
          <div className="container max-w-6xl text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Create?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Start creating professional videos in minutes
            </p>
            <Link href="/create">
              <Button size="lg">Get Started</Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-6">
        <div className="container max-w-6xl">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-bold">
              Content Genie
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/privacy">Privacy</Link>
              <Link href="/terms">Terms</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

