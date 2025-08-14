export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      about_content: {
        Row: {
          created_at: string
          cta_text_ar: string
          cta_text_en: string
          description_ar: string
          description_en: string
          id: string
          image_url: string | null
          innovation_text_ar: string
          innovation_text_en: string
          is_active: boolean
          partnership_text_ar: string
          partnership_text_en: string
          quality_text_ar: string
          quality_text_en: string
          subtitle_ar: string
          subtitle_en: string
          title_ar: string
          title_en: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          cta_text_ar: string
          cta_text_en: string
          description_ar: string
          description_en: string
          id?: string
          image_url?: string | null
          innovation_text_ar: string
          innovation_text_en: string
          is_active?: boolean
          partnership_text_ar: string
          partnership_text_en: string
          quality_text_ar: string
          quality_text_en: string
          subtitle_ar: string
          subtitle_en: string
          title_ar: string
          title_en: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          cta_text_ar?: string
          cta_text_en?: string
          description_ar?: string
          description_en?: string
          id?: string
          image_url?: string | null
          innovation_text_ar?: string
          innovation_text_en?: string
          is_active?: boolean
          partnership_text_ar?: string
          partnership_text_en?: string
          quality_text_ar?: string
          quality_text_en?: string
          subtitle_ar?: string
          subtitle_en?: string
          title_ar?: string
          title_en?: string
          updated_at?: string
        }
        Relationships: []
      }
      contact_inquiries: {
        Row: {
          created_at: string
          email: string
          id: string
          is_read: boolean
          message: string
          name: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          is_read?: boolean
          message: string
          name: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          is_read?: boolean
          message?: string
          name?: string
        }
        Relationships: []
      }
      contact_settings: {
        Row: {
          address_ar: string
          address_en: string
          created_at: string
          email: string
          id: string
          is_active: boolean
          map_embed_url: string | null
          phone: string
          updated_at: string
        }
        Insert: {
          address_ar: string
          address_en: string
          created_at?: string
          email: string
          id?: string
          is_active?: boolean
          map_embed_url?: string | null
          phone: string
          updated_at?: string
        }
        Update: {
          address_ar?: string
          address_en?: string
          created_at?: string
          email?: string
          id?: string
          is_active?: boolean
          map_embed_url?: string | null
          phone?: string
          updated_at?: string
        }
        Relationships: []
      }
      cta_buttons: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          link: string
          location: string
          name: string
          order_index: number
          style: string | null
          text_ar: string
          text_en: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          link: string
          location: string
          name: string
          order_index?: number
          style?: string | null
          text_ar: string
          text_en: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          link?: string
          location?: string
          name?: string
          order_index?: number
          style?: string | null
          text_ar?: string
          text_en?: string
          updated_at?: string
        }
        Relationships: []
      }
      faqs: {
        Row: {
          answer_ar: string
          answer_en: string
          created_at: string
          id: string
          is_active: boolean
          order_index: number
          question_ar: string
          question_en: string
          updated_at: string
        }
        Insert: {
          answer_ar: string
          answer_en: string
          created_at?: string
          id?: string
          is_active?: boolean
          order_index?: number
          question_ar: string
          question_en: string
          updated_at?: string
        }
        Update: {
          answer_ar?: string
          answer_en?: string
          created_at?: string
          id?: string
          is_active?: boolean
          order_index?: number
          question_ar?: string
          question_en?: string
          updated_at?: string
        }
        Relationships: []
      }
      footer_content: {
        Row: {
          address_ar: string
          address_en: string
          company_description_ar: string
          company_description_en: string
          copyright_text_ar: string
          copyright_text_en: string
          created_at: string
          email: string
          id: string
          phone: string
          updated_at: string
          working_hours_ar: string
          working_hours_en: string
        }
        Insert: {
          address_ar: string
          address_en: string
          company_description_ar: string
          company_description_en: string
          copyright_text_ar: string
          copyright_text_en: string
          created_at?: string
          email: string
          id?: string
          phone: string
          updated_at?: string
          working_hours_ar: string
          working_hours_en: string
        }
        Update: {
          address_ar?: string
          address_en?: string
          company_description_ar?: string
          company_description_en?: string
          copyright_text_ar?: string
          copyright_text_en?: string
          created_at?: string
          email?: string
          id?: string
          phone?: string
          updated_at?: string
          working_hours_ar?: string
          working_hours_en?: string
        }
        Relationships: []
      }
      footer_links: {
        Row: {
          category: string | null
          created_at: string
          id: string
          is_active: boolean
          link: string
          name_ar: string
          name_en: string
          order_index: number
          updated_at: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          link: string
          name_ar: string
          name_en: string
          order_index?: number
          updated_at?: string
        }
        Update: {
          category?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          link?: string
          name_ar?: string
          name_en?: string
          order_index?: number
          updated_at?: string
        }
        Relationships: []
      }
      hero_content: {
        Row: {
          background_image_url: string | null
          created_at: string
          cta_link: string
          cta_text_ar: string
          cta_text_en: string
          id: string
          is_active: boolean
          subtitle_ar: string
          subtitle_en: string
          title_ar: string
          title_en: string
          updated_at: string
        }
        Insert: {
          background_image_url?: string | null
          created_at?: string
          cta_link: string
          cta_text_ar: string
          cta_text_en: string
          id?: string
          is_active?: boolean
          subtitle_ar: string
          subtitle_en: string
          title_ar: string
          title_en: string
          updated_at?: string
        }
        Update: {
          background_image_url?: string | null
          created_at?: string
          cta_link?: string
          cta_text_ar?: string
          cta_text_en?: string
          id?: string
          is_active?: boolean
          subtitle_ar?: string
          subtitle_en?: string
          title_ar?: string
          title_en?: string
          updated_at?: string
        }
        Relationships: []
      }
      page_sections: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          meta_data: Json | null
          order_index: number
          section_name: string
          title_ar: string
          title_en: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          meta_data?: Json | null
          order_index?: number
          section_name: string
          title_ar: string
          title_en: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          meta_data?: Json | null
          order_index?: number
          section_name?: string
          title_ar?: string
          title_en?: string
          updated_at?: string
        }
        Relationships: []
      }
      partners: {
        Row: {
          created_at: string
          id: string
          logo_url: string
          name: string
          order_index: number
        }
        Insert: {
          created_at?: string
          id?: string
          logo_url: string
          name: string
          order_index?: number
        }
        Update: {
          created_at?: string
          id?: string
          logo_url?: string
          name?: string
          order_index?: number
        }
        Relationships: []
      }
      portfolio_items: {
        Row: {
          category: string
          created_at: string
          description: string
          id: string
          image_url: string
          order_index: number
          technologies: string[]
          title: string
        }
        Insert: {
          category: string
          created_at?: string
          description: string
          id?: string
          image_url: string
          order_index?: number
          technologies: string[]
          title: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          id?: string
          image_url?: string
          order_index?: number
          technologies?: string[]
          title?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          created_at: string
          description: string
          icon: string
          id: string
          order_index: number
          title: string
        }
        Insert: {
          created_at?: string
          description: string
          icon: string
          id?: string
          order_index?: number
          title: string
        }
        Update: {
          created_at?: string
          description?: string
          icon?: string
          id?: string
          order_index?: number
          title?: string
        }
        Relationships: []
      }
      site_analytics: {
        Row: {
          created_at: string
          event_type: string
          id: string
          ip_address: unknown | null
          meta_data: Json | null
          page_path: string | null
          user_agent: string | null
        }
        Insert: {
          created_at?: string
          event_type: string
          id?: string
          ip_address?: unknown | null
          meta_data?: Json | null
          page_path?: string | null
          user_agent?: string | null
        }
        Update: {
          created_at?: string
          event_type?: string
          id?: string
          ip_address?: unknown | null
          meta_data?: Json | null
          page_path?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          created_at: string
          id: string
          key: string
          meta_data: Json | null
          updated_at: string
          value_ar: string | null
          value_en: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          key: string
          meta_data?: Json | null
          updated_at?: string
          value_ar?: string | null
          value_en?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          key?: string
          meta_data?: Json | null
          updated_at?: string
          value_ar?: string | null
          value_en?: string | null
        }
        Relationships: []
      }
      social_links: {
        Row: {
          created_at: string
          icon: string
          id: string
          is_active: boolean
          order_index: number
          platform: string
          updated_at: string
          url: string
        }
        Insert: {
          created_at?: string
          icon: string
          id?: string
          is_active?: boolean
          order_index?: number
          platform: string
          updated_at?: string
          url: string
        }
        Update: {
          created_at?: string
          icon?: string
          id?: string
          is_active?: boolean
          order_index?: number
          platform?: string
          updated_at?: string
          url?: string
        }
        Relationships: []
      }
      stats: {
        Row: {
          created_at: string
          icon: string
          id: string
          name: string
          order_index: number
          value: string
        }
        Insert: {
          created_at?: string
          icon?: string
          id?: string
          name: string
          order_index?: number
          value: string
        }
        Update: {
          created_at?: string
          icon?: string
          id?: string
          name?: string
          order_index?: number
          value?: string
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
      [_ in never]: never
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
    Enums: {},
  },
} as const
