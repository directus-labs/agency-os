import type { User } from '../system';
import type { Organization, Contact, OsProject, OsPayment, OsTaxRate, OsExpense, OsItem } from '../os';

export interface OsInvoice {
	id?: string;
	status?: string;
	sort?: number | null;
	user_created?: (string | User) | null;
	date_created?: string | null;
	user_updated?: (string | User) | null;
	date_updated?: string | null;
	invoice_number?: string | null;
	due_date?: string | null;
	reference?: string | null;
	organization?: (string | Organization) | null;
	contact?: (string | Contact) | null;
	issue_date?: string | null;
	project?: (string | OsProject) | null;
	subtotal?: number | null;
	total_tax?: number | null;
	total?: number | null;
	amount_paid?: number | null;
	amount_due?: number | null;
	payments?: (string | OsPayment)[];
	line_items?: (string | OsInvoiceItem)[];
}

export interface OsInvoiceItem {
	id?: string;
	sort?: number | null;
	user_created?: (string | User) | null;
	date_created?: string | null;
	user_updated?: (string | User) | null;
	date_updated?: string | null;
	invoice?: (string | OsInvoice) | null;
	line_item_number?: number | null;
	description?: string | null;
	tax_rate?: (string | OsTaxRate) | null;
	tax_amount?: number | null;
	unit_price?: number | null;
	quantity?: number | null;
	line_amount?: number | null;
	billable_expense?: (string | OsExpense) | null;
	item?: (string | OsItem) | null;
	type?: string | null;
	item_name?: string | null;
	override_unit_price?: boolean | null;
}
