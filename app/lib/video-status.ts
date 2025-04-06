import { supabase } from "./supabase"

export type VideoStatus = 
  | "pending"
  | "generating_frames"
  | "generating_images" 
  | "animating_frames"
  | "rendering_video"
  | "completed"
  | "failed"

export type StatusProgress = {
  current: number
  total: number
  message?: string
}

export async function updateVideoStatus(
  projectId: string, 
  status: VideoStatus,
  progress?: StatusProgress
) {
  try {
    const { error } = await supabase
      .from('video_projects')
      .update({ 
        status,
        progress: progress ? JSON.stringify(progress) : null
      })
      .eq('id', projectId)

    if (error) throw error

    return { success: true }
  } catch (error: any) {
    console.error("Error updating video status:", error)
    return { 
      success: false, 
      error: error.message 
    }
  }
}

export async function getVideoStatus(projectId: string) {
  try {
    const { data, error } = await supabase
      .from('video_projects')
      .select('status, progress')
      .eq('id', projectId)
      .single()

    if (error) throw error

    return { 
      success: true,
      status: data.status as VideoStatus,
      progress: data.progress ? JSON.parse(data.progress) : null
    }
  } catch (error: any) {
    console.error("Error getting video status:", error)
    return {
      success: false,
      error: error.message
    }
  }
} 