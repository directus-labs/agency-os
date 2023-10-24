import type { File } from '../system';
import type { BlockButtonGroup } from '../blocks';

export interface BlockHero {
	id?: string;
	title?: string | null;
	headline?: string | null;
	content?: string | null;
	image?: (string | File) | null;
	image_position?: 'left' | 'right' | null;
	button_group?: (string | BlockButtonGroup) | null;
}
