import type { User } from '../system';

export interface OsTaxRate {
	id?: string;
	status?: string;
	sort?: number | null;
	user_created?: (string | User) | null;
	date_created?: string | null;
	user_updated?: (string | User) | null;
	date_updated?: string | null;
	name?: string | null;
	rate?: number | null;
}
