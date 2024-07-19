import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { CF_TOKEN, CF_DNS_ZONE_ID } from '$env/static/private';
import util from 'node:util';
import { exec } from 'node:child_process';
import { generateId } from 'lucia';

const execAsync = util.promisify(exec);

export const POST: RequestHandler = async () => {
	await execAsync('cd ../gullible-gravity && bun run build');
	// TODO #1: Run the web
	// TODO #2: Expose the web
	await fetch(`https://api.cloudflare.com/client/v4/zones/${CF_DNS_ZONE_ID}/dns_records`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + CF_TOKEN
		},
		body: JSON.stringify({
			content: '198.51.100.4',
			name: 'example.com',
			proxied: false,
			type: 'A',
			comment: 'Domain verification record',
			id: generateId(32),
			tags: [],
			ttl: undefined
		})
	});
	return json({ hello: 'world' });
};
