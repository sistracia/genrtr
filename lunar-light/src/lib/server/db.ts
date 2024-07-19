import postgres, { type PostgresError } from 'postgres';
import { PG_URL } from '$env/static/private';

export function isPostgresError(err: unknown): err is PostgresError {
	return err instanceof Error && err.name === 'PostgresError';
}

export const sql = postgres(PG_URL);
