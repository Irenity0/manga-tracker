import { createClient } from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ""
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || ""

export const supabase = createClient(supabaseUrl, supabaseAnonKey)


export interface Manga {
  id: string
  title: string
  original_title: string
  author: string
  status: "ongoing" | "hiatus" | "completed" | "dropped"
  genres?: string[]
  star_rating?: number
  total_chapters: number
  current_chapter: number
  reading_status:
    | "reading"
    | "plan-to-read"
    | "completed"
    | "on-hold"
    | "dropped"
  notes?: string
  rating: number
  created_at: string
  updated_at: string
}