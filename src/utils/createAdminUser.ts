
import { supabase } from "@/integrations/supabase/client";

export const createAdminUser = async () => {
  try {
    // Check if user exists first (by trying to sign in)
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: 'admin@olu-it.com',
      password: 'Admin@123',
    });

    if (signInError && signInError.message.includes('Invalid login credentials')) {
      // User doesn't exist, create it
      const { data, error } = await supabase.auth.signUp({
        email: 'admin@olu-it.com',
        password: 'Admin@123',
      });

      if (error) {
        console.error('Error creating admin user:', error);
        return { success: false, error };
      }

      return { success: true, data };
    }

    // User exists or some other error
    return { success: !signInError, error: signInError };
  } catch (error) {
    console.error('Error in createAdminUser:', error);
    return { success: false, error };
  }
};
