import { json } from '@sveltejs/kit';
import { AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_TABLE_NAME } from '$env/static/private';
import type { RequestHandler } from './$types';

const EMAIL_RE = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

function sanitizeEmail(raw: string): string {
	return raw.trim().slice(0, 254).replace(/[<>"'&\\]/g, '');
}

export const POST: RequestHandler = async ({ request }) => {
	let body: unknown;
	try {
		body = await request.json();
	} catch {
		return json({ error: 'Invalid JSON' }, { status: 400 });
	}

	const { email: rawEmail } = body as { email?: string };

	if (!rawEmail || typeof rawEmail !== 'string') {
		return json({ error: 'Email is required' }, { status: 400 });
	}

	const email = sanitizeEmail(rawEmail);

	if (!EMAIL_RE.test(email)) {
		return json({ error: 'Invalid email address' }, { status: 400 });
	}

	const res = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${AIRTABLE_API_KEY}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			records: [
				{
					fields: {
						Email: email
					}
				}
			]
		})
	});

	if (!res.ok) {
		const text = await res.text();
		console.error('Airtable error:', res.status, text);
		return json({ error: 'Failed to save RSVP' }, { status: 502 });
	}

	return json({ success: true });
};
