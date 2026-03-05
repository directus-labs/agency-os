import type { Form } from '../content';

export interface BlockForm {
	form?: (string | Form) | null;
	headline?: string | null;
	id?: string;
	title?: string | null;
}
