import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Video, Wand2, Clock, Sparkles, Layers, Share2 } from "lucide-react"
import Navbar from "@/components/navbar"

export default function Features() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />

      <div className="flex-1 container max-w-6xl px-4 py-16">
        <div className="mb-12">
          <Link href="/" className="inline-flex items-center text-blue-500 hover:text-blue-700 mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold mb-4">Features</h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Discover how Content Genie transforms your content creation process with powerful AI tools.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Wand2 className="h-6 w-6 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">AI Script Generation</h3>
            <p className="text-gray-600">
              Our AI analyzes your title and generates professional scripts optimized for engagement.
            </p>
          </div>

          <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Video className="h-6 w-6 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Automatic Video Creation</h3>
            <p className="text-gray-600">
              Transform scripts into fully produced videos with matching visuals and audio.
            </p>
          </div>

          <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Clock className="h-6 w-6 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Time-Saving</h3>
            <p className="text-gray-600">Create professional videos in minutes instead of hours or days.</p>
          </div>

          <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Sparkles className="h-6 w-6 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">High-Quality Output</h3>
            <p className="text-gray-600">
              Professional-grade videos that look like they were created by a video production team.
            </p>
          </div>

          <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Layers className="h-6 w-6 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Customization Options</h3>
            <p className="text-gray-600">Fine-tune your videos with style preferences, tone adjustments, and more.</p>
          </div>

          <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Share2 className="h-6 w-6 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Easy Sharing</h3>
            <p className="text-gray-600">
              Share your videos directly to social media platforms or download for later use.
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-6">Ready to transform your content creation?</h2>
          <Button asChild size="lg" className="px-8">
            <Link href="/get-started">Get Started Now</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}

