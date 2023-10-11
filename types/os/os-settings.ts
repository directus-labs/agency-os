import type { User } from '../system';

export interface OsSettings {
	id?: string;
	next_invoice_number?: number | null;
	next_proposal_number?: number | null;
}

export interface OsEmailTemplate {
	id?: string;
	sort?: number | null;
	user_created?: (string | User) | null;
	date_created?: string | null;
	user_updated?: (string | User) | null;
	date_updated?: string | null;
	subject?: string | null;
	body?: string | null;
	name?: string | null;
}
