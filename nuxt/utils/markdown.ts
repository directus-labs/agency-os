import { micromark } from 'micromark';
import { gfm, gfmHtml } from 'micromark-extension-gfm';

export function markdownToHtml(markdown: string) {
	return micromark(markdown, {
		extensions: [gfm()],
		htmlExtensions: [gfmHtml()],
	});
}
