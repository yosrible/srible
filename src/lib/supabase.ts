// This is a placeholder for the Supabase client
// You'll need to install the @supabase/supabase-js package with:
// pnpm add @supabase/supabase-js

import { createClient } from '@supabase/supabase-js';

// Environment variables should be set in .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// This client should only be used on the client side
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// For server-side operations that need to bypass RLS
// This is safe to use in SvelteKit server routes (+server.ts files)
// DO NOT use or expose this client on the client side
export const createServerSupabaseClient = () => {
  // Check if we're in a server context
  if (typeof window !== 'undefined') {
    console.error('Attempted to use server Supabase client in browser context!');
    return supabase; // Fall back to anon client
  }

  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY;
  
  if (!serviceRoleKey) {
    console.warn('Missing SUPABASE_SERVICE_ROLE_KEY - falling back to anonymous client');
    return supabase;
  }
  
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
};
