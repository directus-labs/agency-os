import type { Testimonial } from '../content';

export interface BlockTestimonial {
	headline?: string | null;
	id?: string;
	title?: string | null;
	testimonials?: (number | BlockTestimonialItem)[];
}
export interface BlockTestimonialItem {
	block_testimonials_id?: (string | BlockTestimonial) | null;
	id?: number;
	sort?: number | null;
	testimonial?: (string | Testimonial) | null;
}
