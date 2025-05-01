import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import fs from 'fs/promises';
import path from 'path';

const waitlistPath = path.join(process.cwd(), 'src/data/waitlist.json');

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { email } = await request.json();
		console.log('Signup received:', email);

		// Read existing data
		const data = JSON.parse(await fs.readFile(waitlistPath, 'utf-8'));

		// Add new email with timestamp
		data.emails.push({
			email,
			timestamp: new Date().toISOString()
		});

		// Write back to file
		await fs.writeFile(waitlistPath, JSON.stringify(data, null, 2));

		return json({ success: true });
	} catch (error) {
		console.error('Error storing signup data:', error);
		return json({ success: false, error: 'Failed to store signup data' }, { status: 500 });
	}
};
