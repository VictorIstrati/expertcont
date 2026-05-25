export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      book_a_call_submission_translations: {
        Row: {
          language: Database["public"]["Enums"]["language"]
          notes: string | null
          submission_id: string
        }
        Insert: {
          language: Database["public"]["Enums"]["language"]
          notes?: string | null
          submission_id: string
        }
        Update: {
          language?: Database["public"]["Enums"]["language"]
          notes?: string | null
          submission_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "book_a_call_submission_translations_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "book_a_call_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      book_a_call_submissions: {
        Row: {
          company: string | null
          created_at: string
          email: string
          id: string
          ip_hash: string | null
          language: Database["public"]["Enums"]["language"]
          name: string
          phone: string | null
          preferred_at: string | null
          source_url: string | null
          status: Database["public"]["Enums"]["submission_status"]
          user_agent: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string
          email: string
          id?: string
          ip_hash?: string | null
          language: Database["public"]["Enums"]["language"]
          name: string
          phone?: string | null
          preferred_at?: string | null
          source_url?: string | null
          status?: Database["public"]["Enums"]["submission_status"]
          user_agent?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string
          email?: string
          id?: string
          ip_hash?: string | null
          language?: Database["public"]["Enums"]["language"]
          name?: string
          phone?: string | null
          preferred_at?: string | null
          source_url?: string | null
          status?: Database["public"]["Enums"]["submission_status"]
          user_agent?: string | null
        }
        Relationships: []
      }
      contact_submission_translations: {
        Row: {
          language: Database["public"]["Enums"]["language"]
          message: string
          subject: string | null
          submission_id: string
        }
        Insert: {
          language: Database["public"]["Enums"]["language"]
          message: string
          subject?: string | null
          submission_id: string
        }
        Update: {
          language?: Database["public"]["Enums"]["language"]
          message?: string
          subject?: string | null
          submission_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "contact_submission_translations_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "contact_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_submissions: {
        Row: {
          company: string | null
          created_at: string
          email: string
          id: string
          ip_hash: string | null
          language: Database["public"]["Enums"]["language"]
          name: string
          phone: string | null
          source_url: string | null
          status: Database["public"]["Enums"]["submission_status"]
          user_agent: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string
          email: string
          id?: string
          ip_hash?: string | null
          language: Database["public"]["Enums"]["language"]
          name: string
          phone?: string | null
          source_url?: string | null
          status?: Database["public"]["Enums"]["submission_status"]
          user_agent?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string
          email?: string
          id?: string
          ip_hash?: string | null
          language?: Database["public"]["Enums"]["language"]
          name?: string
          phone?: string | null
          source_url?: string | null
          status?: Database["public"]["Enums"]["submission_status"]
          user_agent?: string | null
        }
        Relationships: []
      }
      faq_categories: {
        Row: {
          created_at: string
          id: string
          published: boolean
          slug: string
          sort_order: number
        }
        Insert: {
          created_at?: string
          id?: string
          published?: boolean
          slug: string
          sort_order?: number
        }
        Update: {
          created_at?: string
          id?: string
          published?: boolean
          slug?: string
          sort_order?: number
        }
        Relationships: []
      }
      faq_category_translations: {
        Row: {
          category_id: string
          language: Database["public"]["Enums"]["language"]
          name: string
        }
        Insert: {
          category_id: string
          language: Database["public"]["Enums"]["language"]
          name: string
        }
        Update: {
          category_id?: string
          language?: Database["public"]["Enums"]["language"]
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "faq_category_translations_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "faq_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      faq_question_submission_translations: {
        Row: {
          language: Database["public"]["Enums"]["language"]
          question: string
          submission_id: string
        }
        Insert: {
          language: Database["public"]["Enums"]["language"]
          question: string
          submission_id: string
        }
        Update: {
          language?: Database["public"]["Enums"]["language"]
          question?: string
          submission_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "faq_question_submission_translations_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "faq_question_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      faq_question_submissions: {
        Row: {
          created_at: string
          email: string
          id: string
          ip_hash: string | null
          language: Database["public"]["Enums"]["language"]
          name: string
          source_url: string | null
          status: Database["public"]["Enums"]["submission_status"]
          topic: string | null
          user_agent: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          ip_hash?: string | null
          language: Database["public"]["Enums"]["language"]
          name: string
          source_url?: string | null
          status?: Database["public"]["Enums"]["submission_status"]
          topic?: string | null
          user_agent?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          ip_hash?: string | null
          language?: Database["public"]["Enums"]["language"]
          name?: string
          source_url?: string | null
          status?: Database["public"]["Enums"]["submission_status"]
          topic?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      faq_translations: {
        Row: {
          answer: string
          faq_id: string
          language: Database["public"]["Enums"]["language"]
          question: string
        }
        Insert: {
          answer: string
          faq_id: string
          language: Database["public"]["Enums"]["language"]
          question: string
        }
        Update: {
          answer?: string
          faq_id?: string
          language?: Database["public"]["Enums"]["language"]
          question?: string
        }
        Relationships: [
          {
            foreignKeyName: "faq_translations_faq_id_fkey"
            columns: ["faq_id"]
            isOneToOne: false
            referencedRelation: "faqs"
            referencedColumns: ["id"]
          },
        ]
      }
      faqs: {
        Row: {
          category_id: string | null
          created_at: string
          id: string
          published: boolean
          slug: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          category_id?: string | null
          created_at?: string
          id?: string
          published?: boolean
          slug: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          category_id?: string | null
          created_at?: string
          id?: string
          published?: boolean
          slug?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "faqs_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "faq_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      newsletter_subscribers: {
        Row: {
          confirmation_token: string | null
          confirmed_at: string | null
          created_at: string
          email: string
          id: string
          ip_hash: string | null
          language: Database["public"]["Enums"]["language"]
          source_url: string | null
          status: Database["public"]["Enums"]["newsletter_status"]
          unsubscribed_at: string | null
          user_agent: string | null
        }
        Insert: {
          confirmation_token?: string | null
          confirmed_at?: string | null
          created_at?: string
          email: string
          id?: string
          ip_hash?: string | null
          language: Database["public"]["Enums"]["language"]
          source_url?: string | null
          status?: Database["public"]["Enums"]["newsletter_status"]
          unsubscribed_at?: string | null
          user_agent?: string | null
        }
        Update: {
          confirmation_token?: string | null
          confirmed_at?: string | null
          created_at?: string
          email?: string
          id?: string
          ip_hash?: string | null
          language?: Database["public"]["Enums"]["language"]
          source_url?: string | null
          status?: Database["public"]["Enums"]["newsletter_status"]
          unsubscribed_at?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      quote_translations: {
        Row: {
          language: Database["public"]["Enums"]["language"]
          message: string | null
          submission_id: string
        }
        Insert: {
          language: Database["public"]["Enums"]["language"]
          message?: string | null
          submission_id: string
        }
        Update: {
          language?: Database["public"]["Enums"]["language"]
          message?: string | null
          submission_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "quote_translations_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "quotes"
            referencedColumns: ["id"]
          },
        ]
      }
      quotes: {
        Row: {
          company: string | null
          created_at: string
          email: string | null
          id: string
          ip_hash: string | null
          items: Json
          language: Database["public"]["Enums"]["language"]
          name: string
          phone: string
          source_url: string | null
          status: Database["public"]["Enums"]["submission_status"]
          total_mdl: number
          user_agent: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string
          email?: string | null
          id?: string
          ip_hash?: string | null
          items?: Json
          language: Database["public"]["Enums"]["language"]
          name: string
          phone: string
          source_url?: string | null
          status?: Database["public"]["Enums"]["submission_status"]
          total_mdl: number
          user_agent?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string
          email?: string | null
          id?: string
          ip_hash?: string | null
          items?: Json
          language?: Database["public"]["Enums"]["language"]
          name?: string
          phone?: string
          source_url?: string | null
          status?: Database["public"]["Enums"]["submission_status"]
          total_mdl?: number
          user_agent?: string | null
        }
        Relationships: []
      }
      review_translations: {
        Row: {
          content: string
          language: Database["public"]["Enums"]["language"]
          submission_id: string
          title: string | null
        }
        Insert: {
          content: string
          language: Database["public"]["Enums"]["language"]
          submission_id: string
          title?: string | null
        }
        Update: {
          content?: string
          language?: Database["public"]["Enums"]["language"]
          submission_id?: string
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "review_translations_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "reviews"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          created_at: string
          email: string | null
          id: string
          ip_hash: string | null
          language: Database["public"]["Enums"]["language"]
          name: string
          published: boolean
          rating: number
          source_url: string | null
          status: Database["public"]["Enums"]["submission_status"]
          user_agent: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          ip_hash?: string | null
          language: Database["public"]["Enums"]["language"]
          name: string
          published?: boolean
          rating: number
          source_url?: string | null
          status?: Database["public"]["Enums"]["submission_status"]
          user_agent?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          ip_hash?: string | null
          language?: Database["public"]["Enums"]["language"]
          name?: string
          published?: boolean
          rating?: number
          source_url?: string | null
          status?: Database["public"]["Enums"]["submission_status"]
          user_agent?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      language: "ro" | "ru" | "en"
      newsletter_status: "pending" | "confirmed" | "unsubscribed" | "bounced"
      submission_status: "new" | "in_progress" | "done" | "spam"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      language: ["ro", "ru", "en"],
      newsletter_status: ["pending", "confirmed", "unsubscribed", "bounced"],
      submission_status: ["new", "in_progress", "done", "spam"],
    },
  },
} as const

