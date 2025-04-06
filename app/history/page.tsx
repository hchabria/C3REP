"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Download, MoreHorizontal, Pencil, Share2, Trash2, Video } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Mock data for video history
const initialVideos = [
  {
    id: "1",
    title: "How to Boost Productivity",
    createdAt: "Apr 3, 2025",
    duration: "2:34",
    views: 124,
    status: "completed",
  },
  {
    id: "2",
    title: "10 Tips for Better Sleep",
    createdAt: "Apr 1, 2025",
    duration: "3:45",
    views: 89,
    status: "completed",
  },
  {
    id: "3",
    title: "Healthy Meal Prep Ideas",
    createdAt: "Mar 28, 2025",
    duration: "4:12",
    views: 210,
    status: "completed",
  },
  {
    id: "4",
    title: "Home Office Setup Guide",
    createdAt: "Mar 25, 2025",
    duration: "5:08",
    views: 156,
    status: "completed",
  },
  {
    id: "5",
    title: "Digital Marketing Strategies",
    createdAt: "Mar 20, 2025",
    duration: "6:22",
    views: 302,
    status: "completed",
  },
  {
    id: "6",
    title: "Financial Planning Basics",
    createdAt: "Mar 15, 2025",
    duration: "7:15",
    views: 178,
    status: "completed",
  },
]

export default function HistoryPage() {
  const [videos, setVideos] = useState(initialVideos)

  const handleDelete = (id: string) => {
    setVideos(videos.filter((video) => video.id !== id))
  }

  return (
    <div className="h-full p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Video History</h1>
        <p className="text-gray-500">View and manage all your created videos</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Videos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {videos.map((video) => (
                <TableRow key={video.id}>
                  <TableCell className="font-medium">{video.title}</TableCell>
                  <TableCell>{video.createdAt}</TableCell>
                  <TableCell>{video.duration}</TableCell>
                  <TableCell>{video.views}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                      {video.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Video className="mr-2 h-4 w-4" />
                          <span>View</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Pencil className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          <span>Download</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share2 className="mr-2 h-4 w-4" />
                          <span>Share</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(video.id)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Previous</Button>
          <Button variant="outline">Next</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

