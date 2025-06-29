import { createClient } from '@supabase/supabase-js';

// Load environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Check for required values and provide graceful error handling
const isBrowser = typeof window !== 'undefined';
const hasRequiredVars = supabaseUrl && supabaseAnonKey;

// Create a dummy client if variables are missing during build
const createDummyClient = () => {
  // Only log during development or in browser
  if (isBrowser || import.meta.env.DEV) {
    console.warn('⚠️ Missing Supabase environment variables. Using dummy client.');
  }
  
  // Return a mock client that won't crash but also won't work
  return {
    from: () => ({
      select: () => Promise.resolve({ data: null, error: new Error('Missing Supabase credentials') }),
      insert: () => Promise.resolve({ data: null, error: new Error('Missing Supabase credentials') }),
      update: () => Promise.resolve({ data: null, error: new Error('Missing Supabase credentials') }),
      delete: () => Promise.resolve({ data: null, error: new Error('Missing Supabase credentials') }),
      eq: () => ({ data: null, error: new Error('Missing Supabase credentials') }),
      limit: () => ({ data: null, error: new Error('Missing Supabase credentials') })
    }),
    auth: {
      signIn: () => Promise.resolve({ user: null, error: new Error('Missing Supabase credentials') }),
      signOut: () => Promise.resolve({ error: null })
    }
  } as any;
};

// This client should only be used on the client side
export const supabase = hasRequiredVars 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createDummyClient();

// For server-side operations that need to bypass RLS
// This is safe to use in SvelteKit server routes (+server.ts files)
// DO NOT use or expose this client on the client side
export const createServerSupabaseClient = () => {
  // Check if we're in a server context
  if (typeof window !== 'undefined') {
    console.error('Attempted to use server Supabase client in browser context!');
    return supabase; // Fall back to anon client
  }

  // Handle missing URL and service role key
  if (!supabaseUrl) {
    console.error('⚠️ CRITICAL ERROR: Missing VITE_SUPABASE_URL environment variable');
    return createDummyClient();
  }

  // Be very explicit about the service role key
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 
                      import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY || 
                      '';
  
  if (!serviceRoleKey) {
    console.error('⚠️ CRITICAL ERROR: Missing SUPABASE_SERVICE_ROLE_KEY - falling back to anonymous client');
    console.error('This will prevent writing to Supabase tables with RLS enabled!');
    console.error('Check your .env file and make sure VITE_SUPABASE_SERVICE_ROLE_KEY is set');
    return supabase;
  }
  
  try {
    console.log('Creating Supabase admin client with service role...');
    return createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });
  } catch (err) {
    console.error('⚠️ CRITICAL ERROR creating Supabase admin client:', err);
    return createDummyClient();
  }
};
