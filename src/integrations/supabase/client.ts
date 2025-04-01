
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

// Initialize the Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://tyyrqdnfirapivtlnuqg.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5eXJxZG5maXJhcGl2dGxudXFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1MjMyOTgsImV4cCI6MjA1OTEwMDI5OH0.8S7nRK2KFzV0fxh-p-fZg5UJVhN-qnOepyjGtYsyH4I';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
