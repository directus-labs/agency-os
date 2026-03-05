import type { File } from '../system';
import type { BlockButtonGroup } from '../blocks';

export interface BlockStep {
	id?: string;
	title?: string | null;
	headline?: string | null;
	/** If enabled, image position is alternated between left and right. */
	alternate_image_position?: boolean;
	/** Show the step numbers on the website. For example: (Step 1, Step 2, etc) */
	show_step_numbers?: boolean | null;
	steps?: (number | BlockStepItem)[];
}
export interface BlockStepItem {
	id?: string;
	title?: string | null;
	content?: string | null;
	image?: (string | File) | null;
	sort?: number | null;
	block_steps?: (string | BlockStep) | null;
	button_group?: (string | BlockButtonGroup) | null;
}
