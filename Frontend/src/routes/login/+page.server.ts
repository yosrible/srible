import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');
		const rememberMe = data.get('rememberMe') === 'true';

		if (!email || !password) {
			return fail(400, {
				error: 'Email and password are required'
			});
		}

		try {
			// TODO: Add your authentication logic here
			// For now, we'll just return a success message
			return {
				success: true
			};
		} catch (error) {
			console.error('Login error:', error);
			return fail(500, {
				error: 'An error occurred during login'
			});
		}
	}
} satisfies Actions;
