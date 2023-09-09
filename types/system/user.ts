import type { Role } from './role.js';

export interface User {
	/** Unique identifier for the user. */
	id: string;
	/** First name of the user. */
	first_name: string;
	/** Last name of the user. */
	last_name: string;
	/** Unique email address for the user. */
	email: string;
	/** Password of the user. */
	password: string;
	/** The user's location. */
	location: string | null;
	/** The user's title. */
	title: string | null;
	/** The user's description. */
	description: string | null;
	/** The user's tags. */
	tags: string[] | null;
	/** The user's avatar. */
	avatar: string | File | null;
	/** The user's language used in Directus. */
	language: string;
	/** What theme the user is using. */
	theme: 'light' | 'dark' | 'auto';
	/** The 2FA secret string that's used to generate one time passwords. */
	tfa_secret: string | null;
	/** Status of the user. */
	status: 'active' | 'invited' | 'draft' | 'suspended' | 'deleted';
	/** Unique identifier of the role of this user. */
	role: string | Role;
	/** Static token for the user. */
	token: string | null;
	last_access: string | null;
	/** Last page that the user was on. */
	last_page: string | null;
	provider: string;
	external_identifier: string | null;
	auth_data: { [key: string]: any } | null;
	github: string | null;
	linkedin: string | null;
	start_date: string | null;
	pronouns: string | null;
	nickname: string | null;
	birthday: string | null;
	personal_email: string | null;
	classification: string | null;
	timezone: string | null;
	phone: string | null;
	email_notifications: boolean | null;
	company_info: string;
	preferences_divider: string;
	admin_divider: string;
}
