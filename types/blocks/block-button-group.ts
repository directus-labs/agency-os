import type { BlockButton } from './block-button';

export interface BlockButtonGroup {
	id: string;
	buttons: number[] | BlockButtonGroupBlockButton[] | null;
	alignment: 'left' | 'center' | null;
	style: 'default' | 'pill';
}

export interface BlockButtonGroupBlockButton {
	id: string;
	block_button_group_id: BlockButtonGroup | string;
	block_button_id: BlockButton | string;
	sort: number | null;
}
