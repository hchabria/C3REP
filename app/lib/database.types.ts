export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          username: string | null
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          username?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          username?: string | null
          created_at?: string
        }
      }
      video_projects: {
        Row: {
          id: string
          created_at: string
          title: string
          description: string | null
          status: string
          progress: Json | null
          video_url: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          description?: string | null
          status: string
          progress?: Json | null
          video_url?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          description?: string | null
          status?: string
          progress?: Json | null
          video_url?: string | null
        }
      }
      image_prompts: {
        Row: {
          id: string
          created_at: string
          project_id: string
          prompt_index: number
          prompt: string
          image_url: string | null
          video_url: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          project_id: string
          prompt_index: number
          prompt: string
          image_url?: string | null
          video_url?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          project_id?: string
          prompt_index?: number
          prompt?: string
          image_url?: string | null
          video_url?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 