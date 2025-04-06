import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Navbar from "@/components/navbar"

export default function About() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />

      <div className="flex-1 container max-w-6xl px-4 py-16">
        <div className="mb-12">
          <Link href="/" className="inline-flex items-center text-blue-500 hover:text-blue-700 mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold mb-4">About Content Genie</h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            We're on a mission to democratize video content creation with the power of AI.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Content Genie was founded in 2023 by a team of AI researchers and content creators who saw the potential
                for artificial intelligence to revolutionize video production.
              </p>
              <p>
                After experiencing firsthand the challenges of creating high-quality video content—the time investment,
                technical skills required, and high costs—we set out to build a solution that would make professional
                video creation accessible to everyone.
              </p>
              <p>
                Today, Content Genie helps thousands of creators, marketers, educators, and businesses transform their
                ideas into compelling videos in minutes, not days.
              </p>
            </div>
          </div>
          <div className="bg-gray-100 rounded-lg aspect-video flex items-center justify-center">
            <span className="text-gray-400">Company Image</span>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Accessibility</h3>
              <p className="text-gray-600">
                We believe everyone should have access to powerful content creation tools, regardless of technical skill
                or budget.
              </p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Innovation</h3>
              <p className="text-gray-600">
                We're constantly pushing the boundaries of what's possible with AI to deliver cutting-edge solutions.
              </p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Quality</h3>
              <p className="text-gray-600">
                We're committed to delivering professional-grade results that help our users stand out.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-2xl font-bold mb-6">The Team</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="text-center">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <h3 className="font-medium">Team Member {i}</h3>
                <p className="text-gray-500 text-sm">Position</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Join Our Journey</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            We're just getting started on our mission to revolutionize content creation. Join us and be part of the
            future of video.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/get-started">Get Started</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/careers">Join Our Team</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}

