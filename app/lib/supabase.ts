import { createClient } from '@supabase/supabase-js'
import { Database } from './database.types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient<Database>(supabaseUrl, supabaseKey)

export type VideoProject = Database['public']['Tables']['video_projects']['Row']
export type ImagePrompt = Database['public']['Tables']['image_prompts']['Row']

export async function createVideoProject(data: {
  title: string
  description: string
  status: string
}) {
  return await supabase
    .from('video_projects')
    .insert({
      title: data.title,
      description: data.description,
      status: data.status,
      created_at: new Date().toISOString()
    })
    .select()
    .single()
}

export async function createImagePrompts(
  projectId: string,
  prompts: string[]
) {
  const imagePrompts = prompts.map((prompt, index) => ({
    project_id: projectId,
    prompt_index: index,
    prompt: prompt,
    created_at: new Date().toISOString()
  }))

  return await supabase
    .from('image_prompts')
    .insert(imagePrompts)
    .select()
}

export async function updateImagePrompt(
  id: string,
  data: Partial<ImagePrompt>
) {
  return await supabase
    .from('image_prompts')
    .update(data)
    .eq('id', id)
    .select()
    .single()
}

export async function getVideoProject(id: string) {
  return await supabase
    .from('video_projects')
    .select(`
      *,
      image_prompts (*)
    `)
    .eq('id', id)
    .single()
} 