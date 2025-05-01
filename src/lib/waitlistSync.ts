import { supabase } from './supabase';

interface WaitlistEntry {
  email: string;
  timestamp: string;
}

/**
 * Attempts to sync locally stored waitlist emails to Supabase.
 * This can be called on client-side when app loads or when online status changes.
 */
export async function syncWaitlistToSupabase() {
  // Only run in browser
  if (typeof window === 'undefined') {
    return {
      success: false,
      message: 'This function is intended for client-side use'
    };
  }

  try {
    let waitlistEmails: WaitlistEntry[] = [];
    
    try {
      const storedEmails = localStorage.getItem('srible_waitlist_emails');
      if (storedEmails) {
        waitlistEmails = JSON.parse(storedEmails);
      }
    } catch (e) {
      console.warn('Could not read from localStorage', e);
      return {
        success: false,
        message: 'Failed to read local storage'
      };
    }
    
    if (!waitlistEmails.length) {
      return {
        success: true,
        message: 'No local emails to sync'
      };
    }
    
    console.log(`📤 Attempting to sync ${waitlistEmails.length} locally stored emails to Supabase...`);
    
    // Process each email
    const results = await Promise.all(
      waitlistEmails.map(async (entry) => {
        const { email, timestamp } = entry;
        
        try {
          // Try to insert via our API endpoint rather than directly
          const response = await fetch('/api/direct-insert', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, syncFromLocal: true })
          });
          
          const result = await response.json();
          
          // Consider success even if the email was already in Supabase
          if (response.ok) {
            return {
              email,
              synced: true,
              status: result.message?.includes('already on our waitlist') 
                ? 'already_exists' 
                : 'synced'
            };
          }
          
          return {
            email,
            synced: false,
            status: 'api_error',
            message: result.message
          };
        } catch (err) {
          console.error(`❌ Exception while syncing email ${email}:`, err);
          return {
            email,
            synced: false,
            status: 'exception',
            message: err instanceof Error ? err.message : String(err)
          };
        }
      })
    );
    
    const syncedCount = results.filter(r => r.synced).length;
    
    if (syncedCount > 0) {
      // Remove synced emails from localStorage
      const remainingEmails = waitlistEmails.filter((entry) => {
        return !results.some(r => r.email === entry.email && r.synced);
      });
      
      // Update localStorage with remaining emails
      localStorage.setItem('srible_waitlist_emails', JSON.stringify(remainingEmails));
      
      console.log(`✅ Successfully synced ${syncedCount}/${waitlistEmails.length} emails to Supabase`);
    }
    
    return {
      success: true,
      message: `Successfully synced ${syncedCount}/${waitlistEmails.length} emails`,
      results
    };
  } catch (err) {
    console.error('❌ Failed to sync emails from localStorage:', err);
    return {
      success: false,
      message: 'Failed to sync emails'
    };
  }
}
