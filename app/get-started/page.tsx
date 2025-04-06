import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Navbar from "@/components/navbar"

export default function GetStarted() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />

      <div className="flex-1 container max-w-3xl px-4 py-16">
        <div className="mb-12 text-center">
          <Link href="/" className="inline-flex items-center text-blue-500 hover:text-blue-700 mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold mb-4">Get Started with Content Genie</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Create your first AI-powered video in minutes. Just enter a title and let our AI do the magic.
          </p>
        </div>

        <div className="bg-white border rounded-xl p-8 shadow-sm">
          <form className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Enter your video title</h2>
              <p className="text-gray-600">
                Be descriptive about what you want to create. Our AI will generate a complete video based on this title.
              </p>
              <Input placeholder="E.g., '10 Tips for Productivity When Working from Home'" className="h-12 text-lg" />
            </div>

            <div className="pt-4">
              <Button type="submit" size="lg" className="w-full">
                Generate Video <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <p className="text-sm text-gray-500 mt-2 text-center">
                This will take approximately 2-3 minutes to process.
              </p>
            </div>
          </form>
        </div>

        <div className="mt-12 space-y-8">
          <div className="border-t pt-8">
            <h2 className="text-xl font-semibold mb-4">How it works</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="font-bold text-blue-600">1</span>
                </div>
                <h3 className="font-medium mb-2">Enter a title</h3>
                <p className="text-gray-600 text-sm">Provide a descriptive title for your video content.</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="font-bold text-blue-600">2</span>
                </div>
                <h3 className="font-medium mb-2">AI generates content</h3>
                <p className="text-gray-600 text-sm">
                  Our AI creates a script, selects visuals, and produces your video.
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="font-bold text-blue-600">3</span>
                </div>
                <h3 className="font-medium mb-2">Download & share</h3>
                <p className="text-gray-600 text-sm">Review, download, and share your professional video.</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Need inspiration?</h2>
            <p className="text-gray-600 mb-4">Try one of these example titles:</p>
            <div className="grid gap-2">
              <Button variant="outline" className="justify-start text-left">
                The Future of Remote Work: Trends for 2025
              </Button>
              <Button variant="outline" className="justify-start text-left">
                5 Easy Recipes for Busy Professionals
              </Button>
              <Button variant="outline" className="justify-start text-left">
                How to Start Investing in Stocks: A Beginner's Guide
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

