import type { Post, Page } from '../content';

export interface BlockButton {
	id: string;
	sort: number | null;
	type: ('pages' | 'posts' | 'external') | null;
	label: string | null;
	color: 'primary' | 'white' | 'gray' | 'white' | 'black';
	variant: 'solid' | 'outline' | 'ghost' | 'link' | 'soft';
	page: string | Page | null;
	post: string | Post | null;
	external_url: string | null;
	icon: string | null;
}
