"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { LayoutDashboard, Clock, BarChart3, Coins, Plus, Video } from "lucide-react"
import { useState } from "react"

// Mock data for recent videos
const initialVideos = [
  {
    id: "1",
    title: "How to Boost Productivity",
    createdAt: "3 days ago",
    duration: "2:34",
    views: 124,
  },
  {
    id: "2",
    title: "How to Boost Productivity",
    createdAt: "3 days ago",
    duration: "2:34",
    views: 124,
  },
  {
    id: "3",
    title: "How to Boost Productivity",
    createdAt: "3 days ago",
    duration: "2:34",
    views: 124,
  },
]

export default function DashboardPage() {
  const [videos, setVideos] = useState(initialVideos)

  return (
    <div className="h-full p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/pricing" className="text-sm font-medium">
            Upgrade Plan
          </Link>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create New Video
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Videos</p>
                <h3 className="text-2xl font-bold mt-1">12</h3>
                <p className="text-xs text-gray-500 mt-1">+2 from last month</p>
              </div>
              <div className="bg-gray-100 p-2 rounded-md">
                <LayoutDashboard className="h-5 w-5 text-gray-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Processing</p>
                <h3 className="text-2xl font-bold mt-1">2</h3>
                <p className="text-xs text-gray-500 mt-1">Videos in progress</p>
              </div>
              <div className="bg-gray-100 p-2 rounded-md">
                <Clock className="h-5 w-5 text-gray-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Views</p>
                <h3 className="text-2xl font-bold mt-1">1,234</h3>
                <p className="text-xs text-gray-500 mt-1">+24% from last month</p>
              </div>
              <div className="bg-gray-100 p-2 rounded-md">
                <BarChart3 className="h-5 w-5 text-gray-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Available Credits</p>
                <h3 className="text-2xl font-bold mt-1">8</h3>
                <p className="text-xs text-gray-500 mt-1">Videos remaining</p>
              </div>
              <div className="bg-gray-100 p-2 rounded-md">
                <Coins className="h-5 w-5 text-gray-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Recent Videos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <Card key={video.id} className="overflow-hidden">
              <div className="aspect-video bg-gray-100 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                  <Video className="h-6 w-6 text-gray-400" />
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium">{video.title}</h3>
                <p className="text-sm text-gray-500 mt-1">Created {video.createdAt}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm text-gray-500">
                    {video.duration} • {video.views} views
                  </span>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

