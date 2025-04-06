import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL')
}

if (!supabaseKey) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

// Validate URL format
try {
  new URL(supabaseUrl)
} catch (error) {
  throw new Error(`Invalid NEXT_PUBLIC_SUPABASE_URL: ${supabaseUrl}`)
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
})

export interface VideoProject {
  id: string
  title: string
  status: string
  imageUrl?: string
  videoUrl?: string
  createdAt: string
  updatedAt: string
}

export async function createVideoProject(title: string): Promise<{ data: VideoProject | null; error: any }> {
  try {
    const { data, error } = await supabase
      .from('video_projects')
      .insert([{ title, status: 'pending' }])
      .select()
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error creating video project:', error)
    return { data: null, error }
  }
}

export async function updateVideoProject(id: string, updates: Partial<VideoProject>) {
  try {
    const { data, error } = await supabase
      .from('video_projects')
      .update({ ...updates, updatedAt: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error updating video project:', error)
    return { data: null, error }
  }
} 