import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Check } from "lucide-react"
import Navbar from "@/components/navbar"

export default function Pricing() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />

      <div className="flex-1 container max-w-6xl px-4 py-16">
        <div className="mb-12 text-center">
          <Link href="/" className="inline-flex items-center text-blue-500 hover:text-blue-700 mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the plan that's right for you and start creating amazing videos today.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="border rounded-xl p-6 flex flex-col">
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Basic</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold">$19</span>
                <span className="text-gray-500">/month</span>
              </div>
              <p className="text-gray-600 mt-2">Perfect for individuals and small content creators.</p>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                <span>5 videos per month</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                <span>720p video quality</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                <span>Basic customization</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                <span>Standard support</span>
              </li>
            </ul>

            <Button asChild variant="outline" className="mt-auto">
              <Link href="/signup?plan=basic">Get Started</Link>
            </Button>
          </div>

          <div className="border rounded-xl p-6 flex flex-col relative bg-blue-50 border-blue-200">
            <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 text-xs font-medium rounded-bl-lg rounded-tr-lg">
              Popular
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Pro</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold">$49</span>
                <span className="text-gray-500">/month</span>
              </div>
              <p className="text-gray-600 mt-2">Ideal for businesses and professional content creators.</p>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                <span>20 videos per month</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                <span>1080p video quality</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                <span>Advanced customization</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                <span>Priority support</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                <span>Brand customization</span>
              </li>
            </ul>

            <Button asChild className="mt-auto">
              <Link href="/signup?plan=pro">Get Started</Link>
            </Button>
          </div>

          <div className="border rounded-xl p-6 flex flex-col">
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Enterprise</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold">$199</span>
                <span className="text-gray-500">/month</span>
              </div>
              <p className="text-gray-600 mt-2">For teams and organizations with high-volume needs.</p>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                <span>Unlimited videos</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                <span>4K video quality</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                <span>Full customization suite</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                <span>Dedicated support</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                <span>API access</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                <span>Custom integrations</span>
              </li>
            </ul>

            <Button asChild variant="outline" className="mt-auto">
              <Link href="/signup?plan=enterprise">Contact Sales</Link>
            </Button>
          </div>
        </div>

        <div className="mt-16 text-center bg-gray-50 p-8 rounded-xl max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-2">Need a custom solution?</h2>
          <p className="text-gray-600 mb-6">We offer tailored plans for organizations with specific requirements.</p>
          <Button asChild variant="outline">
            <Link href="/contact">Contact Our Team</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}

