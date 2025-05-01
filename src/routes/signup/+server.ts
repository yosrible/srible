import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { createServerSupabaseClient } from '$lib/supabase';

// This is an updated version of the signup endpoint that uses Supabase
// instead of the local JSON file for storage

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { email } = await request.json();
		
		if (!email || typeof email !== 'string' || !email.includes('@')) {
			console.log('❌ Invalid email format');
			return json({ success: false, error: 'Invalid email provided' }, { status: 400 });
		}
		
		console.log('📝 Signup received at /signup endpoint:', email);

		// Use the Supabase client with admin rights to bypass RLS
		console.log('Creating server Supabase client...');
		const supabase = createServerSupabaseClient();
		
		// First check if email already exists
		console.log('Checking if email already exists...');
		const { data: existingEmails, error: checkError } = await supabase
			.from('waitlist_emails')
			.select('email')
			.eq('email', email)
			.limit(1);
			
		if (checkError) {
			console.error('❌ Error checking for existing email:', checkError);
			return json(
				{ success: false, error: 'Database error when checking email' }, 
				{ status: 500 }
			);
		}
		
		if (existingEmails && existingEmails.length > 0) {
			console.log('✅ Email already exists in database');
			return json({ 
				success: true, 
				message: 'You\'re already on our waitlist! We\'ll notify you when we launch.' 
			});
		}

		// Add new email with timestamp
		console.log('✏️ Inserting new email into Supabase...');
		const { data, error: insertError } = await supabase
			.from('waitlist_emails')
			.insert([{ 
				email,
				created_at: new Date().toISOString()
			}])
			.select();
			
		if (insertError) {
			console.error('❌ Error inserting email:', insertError);
			// Check for specific error types
			if (insertError.code === '23505' || insertError.message.includes('duplicate')) {
				return json(
					{ success: true, message: 'You\'re already on our waitlist! We\'ll notify you when we launch.' }, 
					{ status: 200 }
				);
			}
			
			return json(
				{ success: false, error: `Database error: ${insertError.message}` }, 
				{ status: 500 }
			);
		}
		
		console.log('✅ Email successfully added to waitlist in Supabase');
		return json({ success: true, message: 'Email successfully added to waitlist!' });
	} catch (error) {
		console.error('❌ Unexpected error storing signup data:', error);
		return json({ success: false, error: 'Failed to store signup data' }, { status: 500 });
	}
};
