
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

// Initialize the Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://tyyrqdnfirapivtlnuqg.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5eXJxZG5maXJhcGl2dGxudXFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1MjMyMDYsImV4cCI6MjA1OTA5OTIwNn0.zvAlTs57ORdbBTukbCB09wWexlZ-PE-1Miftfw3uLzE';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
