import type { Testimonial } from '../content';

export interface BlockTestimonial {
	headline?: string | null;
	id?: string;
	title?: string | null;
	testimonials?: (string | BlockTestimonialItem)[];
}
export interface BlockTestimonialItem {
	block_testimonials_slider_id?: (string | BlockTestimonial) | null;
	id?: string;
	sort?: number | null;
	testimonials_id?: (string | Testimonial) | null;
}
