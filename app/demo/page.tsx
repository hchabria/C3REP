import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Play } from "lucide-react"
import Navbar from "@/components/navbar"

export default function Demo() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />

      <div className="flex-1 container max-w-4xl px-4 py-16">
        <div className="mb-12">
          <Link href="/" className="inline-flex items-center text-blue-500 hover:text-blue-700 mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold mb-4">Watch Content Genie in Action</h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            See how our AI transforms a simple title into a professional video in minutes.
          </p>
        </div>

        <div className="bg-gray-100 rounded-xl aspect-video flex items-center justify-center mb-12 relative">
          <div className="w-20 h-20 rounded-full bg-white/80 backdrop-blur flex items-center justify-center shadow-lg cursor-pointer hover:bg-white transition-colors">
            <Play className="h-10 w-10 text-blue-500 ml-1" />
          </div>
          <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded text-sm">3:42</div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-xl font-bold mb-4">How the demo works</h2>
            <div className="space-y-4 text-gray-600">
              <p>In this demonstration, we show the complete process of creating a video with Content Genie:</p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Entering a title for the video</li>
                <li>Watching the AI generate a script</li>
                <li>Seeing how visuals are selected and matched to the content</li>
                <li>Viewing the final video assembly process</li>
                <li>Exploring customization options</li>
              </ol>
              <p>
                The entire process takes less than 3 minutes from start to finish, resulting in a professional-quality
                video ready for sharing.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="border rounded-lg p-5">
              <h3 className="font-medium mb-2">Demo video title</h3>
              <p className="text-gray-600">"How to Build a Successful Morning Routine: 5 Science-Backed Strategies"</p>
            </div>

            <div className="border rounded-lg p-5">
              <h3 className="font-medium mb-2">Video length</h3>
              <p className="text-gray-600">3 minutes, 42 seconds</p>
            </div>

            <div className="border rounded-lg p-5">
              <h3 className="font-medium mb-2">Generation time</h3>
              <p className="text-gray-600">2 minutes, 15 seconds</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to create your own video?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Try Content Genie now and transform your ideas into professional videos in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/get-started">Get Started Now</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}

