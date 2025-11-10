import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

export const createAdminUser = async () => {
  try {
    // Check if user exists first (by trying to sign in)
    try {
      await signInWithEmailAndPassword(auth, 'admin@olu-it.com', 'Admin@123');
      return { success: true, message: 'Admin user already exists' };
    } catch (signInError: any) {
      // User doesn't exist, create it
      if (signInError.code === 'auth/user-not-found' || signInError.code === 'auth/wrong-password') {
        const userCredential = await createUserWithEmailAndPassword(
          auth, 
          'admin@olu-it.com', 
          'Admin@123'
        );
        return { success: true, data: userCredential.user };
      }
      
      // Some other error
      console.error('Error checking admin user:', signInError);
      return { success: false, error: signInError };
    }
  } catch (error) {
    console.error('Error in createAdminUser:', error);
    return { success: false, error };
  }
};
