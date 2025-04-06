"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-4 py-24 text-center">
        <div className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
          Introducing Content Genie
        </div>
        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
          AI-Powered Video Creation
          <span className="block bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            From Just a Title
          </span>
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
          Transform your ideas into professional videos in minutes. No editing
          skills required. Just enter a title and let our AI do the magic.
        </p>
        <div className="mt-10 flex items-center gap-x-6">
          <Button asChild size="lg">
            <Link href="/create">Get Started →</Link>
          </Button>
          <Button variant="outline" asChild size="lg">
            <Link href="#demo">Watch Full Demo</Link>
          </Button>
        </div>
      </section>

      {/* Video Demo Frame */}
      <section className="mx-auto w-full max-w-5xl px-4 py-12">
        <div className="overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-900">
          <div className="aspect-video w-full">
            <video
              className="h-full w-full object-cover"
              poster="/demo-poster.jpg"
              controls
            >
              <source src="/demo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-24 md:grid-cols-3">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 rounded-full bg-blue-100 p-3 dark:bg-blue-900">
            <svg
              className="h-6 w-6 text-blue-600 dark:text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <h3 className="mb-2 text-xl font-semibold">AI-Generated Ideas</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Get 10 content ideas instantly from just a title using ChatGPT 4.0 technology.
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 rounded-full bg-purple-100 p-3 dark:bg-purple-900">
            <svg
              className="h-6 w-6 text-purple-600 dark:text-purple-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h3 className="mb-2 text-xl font-semibold">Automatic Video Creation</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Scripts and images are automatically converted into polished videos with captions and transitions.
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 rounded-full bg-green-100 p-3 dark:bg-green-900">
            <svg
              className="h-6 w-6 text-green-600 dark:text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            </svg>
          </div>
          <h3 className="mb-2 text-xl font-semibold">One-Click Sharing</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Preview, download, and share your videos directly to social media platforms.
          </p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-50 px-4 py-24 dark:bg-gray-900/50">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-bold">How It Works</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="relative flex flex-col items-center text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
                1
              </div>
              <h3 className="mb-2 text-xl font-semibold">Enter a Title</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Simply enter the title of the video you want to create.
              </p>
            </div>
            <div className="relative flex flex-col items-center text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
                2
              </div>
              <h3 className="mb-2 text-xl font-semibold">Select Content Ideas</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Choose from AI-generated content ideas that match your title.
              </p>
            </div>
            <div className="relative flex flex-col items-center text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
                3
              </div>
              <h3 className="mb-2 text-xl font-semibold">Download Your Video</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Our AI creates and edits your video automatically. Just download and share.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold">Ready to Transform Your Content Creation?</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Join thousands of creators who are saving time and creating professional videos with Content Genie.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/create">Get Started for Free →</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}

