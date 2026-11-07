import type { User } from '../system';
import type { OsTaxRate } from '../os';

export interface OsItem {
	id?: string;
	status?: string | null;
	sort?: number | null;
	user_created?: (string | User) | null;
	date_created?: string | null;
	user_updated?: (string | User) | null;
	date_updated?: string | null;
	name?: string | null;
	description?: string | null;
	unit_price?: number | null;
	default_tax_rate?: (string | OsTaxRate) | null;
	icon?: string | null;
	unit_cost?: number | null;
}
