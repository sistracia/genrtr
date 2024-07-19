import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import util from 'node:util';
import { exec } from 'node:child_process';
import { generateId } from 'lucia';

const execAsync = util.promisify(exec);

export const POST: RequestHandler = async () => {
	const authorize = await fetch(`http://localhost:8055/auth/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			email: 'admin@example.com',
			password: 'admin123'
		})
	});

	const authorization = await authorize.json();
	const token: string = authorization.data.access_token;

	await fetch(`http://localhost:8055/items/pages`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token
		},
		body: JSON.stringify({
			content: '<p>test</p>',
			title: 'test',
			slug: generateId(32)
		})
	});

	await execAsync('cd ../gullible-gravity && bun run build');
	return json({ hello: 'world' });
};
