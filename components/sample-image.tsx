import Image from "next/image"
import { Play } from "lucide-react"

interface SampleImageProps {
  title: string
}

export function SampleImage({ title }: SampleImageProps) {
  return (
    <div className="relative w-full aspect-[9/16] rounded-lg overflow-hidden border border-border group">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background/80 z-10" />
      <Image
        src="/placeholder.jpg"
        alt={`Sample image for: ${title}`}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        priority
      />

      {/* Play Button */}
      <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center">
          <Play className="h-8 w-8 text-primary-foreground" />
        </div>
      </div>

      {/* Content Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-20 bg-gradient-to-t from-background/90 to-transparent">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-foreground">{title}</h3>
          <p className="text-muted-foreground text-sm">
            Sample preview - Click play to see the full video
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary/20 z-30">
        <div className="h-full w-1/3 bg-primary" />
      </div>
    </div>
  )
} 