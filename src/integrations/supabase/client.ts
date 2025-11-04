// DEPRECATED: This file is kept only for compatibility
// All new code should use Firebase from '@/lib/firebase'

export const supabase = {
  from: () => ({
    select: () => Promise.resolve({ data: [], error: null }),
    insert: () => Promise.resolve({ error: null }),
    update: () => Promise.resolve({ error: null }),
    delete: () => Promise.resolve({ error: null }),
  }),
  auth: {
    getUser: () => Promise.resolve({ data: { user: null }, error: null }),
    signOut: () => Promise.resolve({ error: null }),
  },
  storage: {
    from: () => ({
      upload: () => Promise.resolve({ error: null }),
      getPublicUrl: () => ({ data: { publicUrl: '' } }),
    }),
  },
};
