export type StatusProgress = 'pending' | 'generating' | 'completed' | 'error'

export interface VideoStatus {
  id: string
  title: string
  status: StatusProgress
  message?: string
  imageUrl?: string
  videoUrl?: string
  createdAt: string
  updatedAt: string
}

export async function getVideoStatus(projectId: string): Promise<VideoStatus | null> {
  try {
    const response = await fetch(`/api/status/${projectId}`)
    if (!response.ok) {
      throw new Error('Failed to fetch video status')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching video status:', error)
    return null
  }
} 