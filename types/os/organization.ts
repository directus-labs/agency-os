import type { User, File } from '../system';
import type { OsPaymentTerm, Contact } from '../os';

export interface Organization {
	id?: string;
	status?: string;
	user_created?: (string | User) | null;
	date_created?: string | null;
	user_updated?: (string | User) | null;
	date_updated?: string | null;
	name?: string | null;
	website?: string | null;
	logo?: string | File | null;
	brand_color?: string | null;
	organization_notes?: string | null;
	/** Company email address (sales@company.com) */
	email?: string | null;
	ap_contact?: (string | Contact) | null;
	payment_terms?: (string | OsPaymentTerm) | null;
	owner?: (string | User) | null;
	/** Company phone number */
	phone?: string | null;
	branding?: string;
	contacts?: (string | OrganizationContact)[];
	addresses?: (string | OrganizationAddress)[];
	billing?: string;
	stripe_customer_id?: string | null;
}

export interface OrganizationAddress {
	id?: string;
	sort?: number | null;
	user_created?: (string | User) | null;
	date_created?: string | null;
	user_updated?: (string | User) | null;
	date_updated?: string | null;
	organization?: (string | Organization) | null;
	name?: string | null;
	street_address?: string | null;
	postal_code?: string | null;
	/** State (or region if outside US) */
	address_region?: string | null;
	address_country?: string | null;
	/** City */
	address_locality?: string | null;
	is_primary_billing?: boolean | null;
}

export interface OrganizationContact {
	id?: string;
	contacts_id?: (string | Contact) | null;
	organizations_id?: (string | Organization) | null;
	sort?: number | null;
}
