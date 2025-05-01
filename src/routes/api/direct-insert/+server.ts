import { json, type RequestEvent } from '@sveltejs/kit';
import { createServerSupabaseClient } from '$lib/supabase';

export const POST = async ({ request }: RequestEvent) => {
  try {
    const data = await request.json();
    const email = data.email;
    const syncFromLocal = data.syncFromLocal || false; // Flag to handle synced data
    
    // Simplified implementation with clear logging
    console.log('🔷 DIRECT INSERT API CALLED');
    console.log('Email to insert:', email);
    if (syncFromLocal) {
      console.log('This is a sync from localStorage');
    }
    
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
      
      // First check if email already exists
      console.log('Checking if email already exists...');
      const { data: existingData, error: checkError } = await adminClient
        .from('waitlist_emails')
        .select('email')
        .eq('email', email)
        .limit(1);
        
      if (checkError) {
        console.log('❌ ERROR CHECKING FOR DUPLICATE:', checkError);
        return json({
          success: false,
          message: `Database error: ${checkError.message}`
        }, { status: 500 });
      }
      
      // If email already exists, return a success message
      if (existingData && existingData.length > 0) {
        console.log('📝 Email already exists in waitlist:', email);
        return json({
          success: true,
          message: 'You\'re already on our waitlist! We\'ll notify you when we launch.'
        }, { status: 200 });
      }
      
      // Attempt the insert
      console.log('Attempting direct insert into waitlist_emails table...');
      const { data: insertData, error } = await adminClient
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
      
      console.log('✅ SUCCESS! Email inserted:', insertData);
      return json({
        success: true,
        message: 'Email successfully added to waitlist!',
        data: insertData
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
