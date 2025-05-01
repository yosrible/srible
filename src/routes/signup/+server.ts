import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import fs from 'fs/promises';
import path from 'path';

const waitlistPath = path.join(process.cwd(), 'src/data/waitlist.json');

// Define an interface for email entries
interface EmailEntry {
	email: string;
	timestamp: string;
}

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { email } = await request.json();
		
		if (!email || typeof email !== 'string' || !email.includes('@')) {
			return json({ success: false, error: 'Invalid email provided' }, { status: 400 });
		}
		
		console.log('Signup received:', email);

		// Ensure the waitlist file exists
		let data: { emails: EmailEntry[] };
		try {
			const fileContent = await fs.readFile(waitlistPath, 'utf-8');
			data = JSON.parse(fileContent);
			
			// Validate structure
			if (!data.emails || !Array.isArray(data.emails)) {
				data = { emails: [] };
			}
		} catch (readError) {
			// If file doesn't exist or has invalid JSON, initialize with empty structure
			console.log('Creating new waitlist file');
			data = { emails: [] };
		}

		// Check if email already exists
		const emailExists = data.emails.some((entry: EmailEntry) => entry.email === email);
		if (emailExists) {
			return json({ success: true, message: 'Email already registered' });
		}

		// Add new email with timestamp
		data.emails.push({
			email,
			timestamp: new Date().toISOString()
		});

		// Make sure the directory exists
		const dir = path.dirname(waitlistPath);
		await fs.mkdir(dir, { recursive: true });

		// Write back to file
		await fs.writeFile(waitlistPath, JSON.stringify(data, null, 2));

		return json({ success: true });
	} catch (error) {
		console.error('Error storing signup data:', error);
		return json({ success: false, error: 'Failed to store signup data' }, { status: 500 });
	}
};
