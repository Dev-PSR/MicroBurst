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
          name: string
          subscription: string
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          name: string
          subscription?: string
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          subscription?: string
          created_at?: string
        }
      }
      courses: {
        Row: {
          id: string
          user_id: string
          name: string
          type: 'youtube' | 'pdf'
          source_url: string | null
          delivery_schedule: 'daily' | 'weekdays' | 'weekends' | 'custom'
          delivery_time: string
          total_lessons: number
          created_at: string
          status: 'active' | 'paused' | 'completed'
          phone_number: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          type: 'youtube' | 'pdf'
          source_url?: string | null
          delivery_schedule: 'daily' | 'weekdays' | 'weekends' | 'custom'
          delivery_time: string
          total_lessons: number
          created_at?: string
          status?: 'active' | 'paused' | 'completed'
          phone_number: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          type?: 'youtube' | 'pdf'
          source_url?: string | null
          delivery_schedule?: 'daily' | 'weekdays' | 'weekends' | 'custom'
          delivery_time?: string
          total_lessons?: number
          created_at?: string
          status?: 'active' | 'paused' | 'completed'
          phone_number?: string
        }
      }
      lessons: {
        Row: {
          id: string
          course_id: string
          order_number: number
          title: string
          content: string
          scheduled_for: string
          completed_at: string | null
          status: 'pending' | 'completed' | 'skipped'
        }
        Insert: {
          id?: string
          course_id: string
          order_number: number
          title: string
          content: string
          scheduled_for: string
          completed_at?: string | null
          status?: 'pending' | 'completed' | 'skipped'
        }
        Update: {
          id?: string
          course_id?: string
          order_number?: number
          title?: string
          content?: string
          scheduled_for?: string
          completed_at?: string | null
          status?: 'pending' | 'completed' | 'skipped'
        }
      }
    }
  }
}