import type { User } from '../system';
import type { Organization, Contact, OsInvoice } from '../os';

export interface OsPayment {
	id?: string;
	status?: string;
	sort?: number | null;
	user_created?: (string | User) | null;
	date_created?: string | null;
	user_updated?: (string | User) | null;
	date_updated?: string | null;
	payment_date?: string | null;
	amount?: number | null;
	stripe_payment_id?: string;
	transaction_fee?: number | null;
	organization?: (string | Organization) | null;
	contact?: (string | Contact) | null;
	invoice?: (string | OsInvoice) | null;
	metadata?: object | null;
	receipt_url?: string | null;
}

export interface OsPaymentTerm {
	id?: string;
	user_created?: (string | User) | null;
	date_created?: string | null;
	user_updated?: (string | User) | null;
	date_updated?: string | null;
}
