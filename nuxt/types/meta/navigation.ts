import type { User } from '../system/index.js';
import type { Page } from '../content/index.js';

export interface Navigation {
	date_created?: string | null;
	date_updated?: string | null;
	id?: string;
	status?: string;
	title?: string | null;
	user_created?: string | User | null;
	user_updated?: string | User | null;
	items?: (string | NavigationItem)[];
}
export interface NavigationItem {
	has_children?: boolean | null;
	/** Icon that displays in dropdown menus on website. */
	icon?: string | null;
	id?: string;
	/** Label to help User. Displays below the link in dropdown nav menus. */
	label?: string | null;
	navigation?: (string | Navigation) | null;
	open_in_new_tab?: boolean | null;
	page?: (string | Page) | null;
	parent?: (string | NavigationItem) | null;
	sort?: number | null;
	title?: string | null;
	type?: string | null;
	url?: string | null;
	children?: (string | NavigationItem)[];
	/** Control the icon and label displayed on the website. */
	display_details?: string;
}
