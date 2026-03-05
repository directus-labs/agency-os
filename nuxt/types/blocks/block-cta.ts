import type { BlockButtonGroup } from '../blocks';

export interface BlockCta {
	buttons?: { [key: string]: any } | null;
	content?: string | null;
	headline?: string | null;
	id?: string;
	title?: string | null;
	button_group?: (string | BlockButtonGroup) | null;
}
