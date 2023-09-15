import type { File } from '../system';

export interface BlockStep {
	/** If enabled, image position is alternated between left and right. */
	alternate_image_position?: boolean;
	headline?: string | null;
	id?: string;
	/** Show the step numbers on the website. For example: (Step 1, Step 2, etc) */
	show_step_numbers?: boolean | null;
	title?: string | null;
	steps?: (number | BlockStepItem)[];
}
export interface BlockStepItem {
	block_steps?: (string | BlockStep) | null;
	content?: string | null;
	id?: string;
	image?: (string | File) | null;
	sort?: number | null;
	title?: string | null;
}
