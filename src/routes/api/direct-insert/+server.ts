import { json, type RequestEvent } from '@sveltejs/kit';
import { createServerSupabaseClient } from '$lib/supabase';

export const POST = async ({ request }: RequestEvent) => {
  try {
    const { email } = await request.json();
    
    // Simplified implementation with clear logging
    console.log('🔷 DIRECT INSERT API CALLED');
    console.log('Email to insert:', email);
    
    if (!email || !email.includes('@')) {
      console.log('❌ Invalid email format');
      return json({
        success: false,
        message: 'Please provide a valid email address'
      }, { status: 400 });
    }
    
    try {
      // Get the server-side client with admin privileges
      console.log('Creating server Supabase client with admin rights...');
      const adminClient = createServerSupabaseClient();
      
      // Attempt the insert
      console.log('Attempting direct insert into waitlist_emails table...');
      const { data, error } = await adminClient
        .from('waitlist_emails')
        .insert([{ 
          email, 
          created_at: new Date().toISOString() 
        }])
        .select();
      
      if (error) {
        console.log('❌ DATABASE ERROR:', error);
        // Check for specific error types
        if (error.code === '23505' || error.message.includes('duplicate')) {
          return json({
            success: true,
            message: 'You\'re already on our waitlist! We\'ll notify you when we launch.'
          }, { status: 200 });
        }
        
        return json({
          success: false,
          message: `Database error: ${error.message}`
        }, { status: 500 });
      }
      
      console.log('✅ SUCCESS! Email inserted:', data);
      return json({
        success: true,
        message: 'Email successfully added to waitlist!',
        data
      });
    } catch (err) {
      console.log('❌ EXCEPTION DURING INSERT:', err);
      return json({
        success: false,
        message: 'Server error during database operation'
      }, { status: 500 });
    }
  } catch (err) {
    console.log('❌ REQUEST PARSING ERROR:', err);
    return json({
      success: false,
      message: 'Invalid request format'
    }, { status: 400 });
  }
};
