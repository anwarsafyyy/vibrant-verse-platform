
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
    };
  };
};
