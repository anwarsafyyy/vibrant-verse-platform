
export type Database = {
  public: {
    Tables: {
      contact_inquiries: {
        Row: {
          id: string;
          name: string;
          email: string;
          message: string;
          created_at: string;
          is_read: boolean;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          message: string;
          created_at?: string;
          is_read?: boolean;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          message?: string;
          created_at?: string;
          is_read?: boolean;
        };
      };
      partners: {
        Row: {
          id: string;
          name: string;
          logo_url: string;
          created_at: string;
          order_index: number;
        };
        Insert: {
          id?: string;
          name: string;
          logo_url: string;
          created_at?: string;
          order_index?: number;
        };
        Update: {
          id?: string;
          name?: string;
          logo_url?: string;
          created_at?: string;
          order_index?: number;
        };
      };
      services: {
        Row: {
          id: string;
          title: string;
          description: string;
          icon: string;
          created_at: string;
          order_index: number;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          icon: string;
          created_at?: string;
          order_index?: number;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          icon?: string;
          created_at?: string;
          order_index?: number;
        };
      };
      portfolio_items: {
        Row: {
          id: string;
          title: string;
          category: string;
          description: string;
          image_url: string;
          technologies: string[];
          created_at: string;
          order_index: number;
        };
        Insert: {
          id?: string;
          title: string;
          category: string;
          description: string;
          image_url: string;
          technologies: string[];
          created_at?: string;
          order_index?: number;
        };
        Update: {
          id?: string;
          title?: string;
          category?: string;
          description?: string;
          image_url?: string;
          technologies?: string[];
          created_at?: string;
          order_index?: number;
        };
      };
    };
  };
};
