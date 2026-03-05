import type { User } from './user.js';

export interface Role {
	/** Unique identifier for the role. */
	id: string;
	/** Name of the role. */
	name: string;
	/** The role's icon. */
	icon: string;
	/** Description of the role. */
	description: string | null;
	/** Array of IP addresses that are allowed to connect to the API as a user of this role. */
	ip_access: string[];
	/** Whether or not this role enforces the use of 2FA. */
	enforce_tfa: boolean;
	/** Admin role. If true, skips all permission checks. */
	admin_access: boolean;
	/** The users in the role are allowed to use the app. */
	app_access: boolean;
	users: string | User[];
}
