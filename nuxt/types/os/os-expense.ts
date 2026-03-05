import type { File, User } from '../system';
import type { OsProject, OsInvoiceItem } from '../os';

export interface OsExpense {
	id?: string;
	sort?: number | null;
	user_created?: (string | User) | null;
	date_created?: string | null;
	user_updated?: (string | User) | null;
	date_updated?: string | null;
	category?: string | null;
	name?: string | null;
	cost?: number | null;
	description?: string | null;
	date?: string | null;
	file?: (string | File) | null;
	project?: (string | OsProject) | null;
	is_billable?: boolean | null;
	invoice_item?: (string | OsInvoiceItem) | null;
	status?: string;
	is_reimbursable?: boolean | null;
}
