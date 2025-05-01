import { json, type RequestEvent } from '@sveltejs/kit';
import { createServerSupabaseClient } from '$lib/supabase';

/**
 * This is a diagnostic endpoint to check Supabase connectivity.
 * It should only be used during development/debugging and removed for production.
 */
export const GET = async (event: RequestEvent) => {
  console.log('🔍 SUPABASE DIAGNOSTIC TEST STARTED', new Date().toISOString());
  
  // Gather environment information
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  const supabaseServiceKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY ||
                           process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  const envInfo = {
    supabaseUrl: {
      defined: !!supabaseUrl,
      value: supabaseUrl ? `${supabaseUrl.substring(0, 8)}...` : undefined // Only show beginning for security
    },
    supabaseAnonKey: {
      defined: !!supabaseAnonKey,
      value: supabaseAnonKey ? `${supabaseAnonKey.substring(0, 3)}...` : undefined
    },
    serviceRoleKey: {
      defined: !!supabaseServiceKey,
      value: supabaseServiceKey ? `${supabaseServiceKey.substring(0, 3)}...` : undefined 
    },
    env: import.meta.env.MODE,
    isServer: typeof window === 'undefined',
    timestamp: new Date().toISOString()
  };
  
  console.log('Environment check:', {
    supabaseUrlDefined: envInfo.supabaseUrl.defined,
    supabaseAnonKeyDefined: envInfo.supabaseAnonKey.defined,
    serviceRoleKeyDefined: envInfo.serviceRoleKey.defined,
    env: envInfo.env
  });
  
  // Stop here if environment variables are missing
  if (!envInfo.supabaseUrl.defined || !envInfo.serviceRoleKey.defined) {
    console.error('⚠️ CRITICAL: Missing Supabase environment variables');
    return json({
      status: 'error',
      message: 'Missing required Supabase environment variables',
      envInfo: {
        supabaseUrlDefined: envInfo.supabaseUrl.defined,
        serviceRoleKeyDefined: envInfo.serviceRoleKey.defined,
        env: envInfo.env
      }
    }, { status: 500 });
  }
  
  try {
    // Create admin client
    console.log('Creating server Supabase client...');
    const supabase = createServerSupabaseClient();
    
    // Test connection by getting count
    console.log('Testing Supabase connection...');
    const { data: countData, error: countError } = await supabase
      .from('waitlist_emails')
      .select('*', { count: 'exact', head: true });
      
    if (countError) {
      console.error('⚠️ Connection test failed:', countError);
      return json({
        status: 'error',
        message: 'Connection test failed',
        error: countError
      }, { status: 500 });
    }
    
    // Test inserting a test email
    const testEmail = `test-${Date.now()}@example.com`;
    console.log(`Testing insert with email: ${testEmail}`);
    
    const { data: insertData, error: insertError } = await supabase
      .from('waitlist_emails')
      .insert([{ 
        email: testEmail, 
        created_at: new Date().toISOString() 
      }])
      .select();
      
    // Report results
    console.log('Insert test result:', insertError ? 'Failed' : 'Success');
    
    // Try to clean up the test data
    if (insertData) {
      console.log('Cleaning up test data...');
      await supabase
        .from('waitlist_emails')
        .delete()
        .eq('email', testEmail);
    }
    
    return json({
      status: 'success',
      message: 'Supabase diagnostic completed',
      connectionTest: {
        success: !countError,
        count: countData?.count
      },
      insertTest: {
        success: !insertError,
        error: insertError ? insertError.message : null,
        data: insertData
      },
      envInfo: {
        supabaseUrlDefined: envInfo.supabaseUrl.defined,
        serviceRoleKeyDefined: envInfo.serviceRoleKey.defined,
        env: envInfo.env
      }
    });
    
  } catch (err) {
    console.error('⚠️ Diagnostic test failed with exception:', err);
    return json({
      status: 'error',
      message: 'Diagnostic test failed with exception',
      error: err instanceof Error ? err.message : String(err),
      envInfo: {
        supabaseUrlDefined: envInfo.supabaseUrl.defined,
        serviceRoleKeyDefined: envInfo.serviceRoleKey.defined,
        env: envInfo.env
      }
    }, { status: 500 });
  }
};
