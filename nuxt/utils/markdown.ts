import { micromark, type Options } from 'micromark';
import { gfm, gfmHtml } from 'micromark-extension-gfm';

export function markdownToHtml(markdown: string) {
	// The lockfile resolves micromark-extension-gfm to an older micromark-util-types than micromark, so the
	// otherwise identical extension types don't match
	return micromark(markdown, {
		extensions: [gfm()],
		htmlExtensions: [gfmHtml()],
	} as Options);
}
