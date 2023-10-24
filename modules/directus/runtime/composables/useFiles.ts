import { useRuntimeConfig } from '#imports';
import type { File } from '~/types';

export default function useFiles() {
	const config = useRuntimeConfig();

	function fileUrl(fileId: string) {
		if (!fileId) return undefined;

		if (typeof fileId === 'string') {
			return `${config.public.directus.rest.baseUrl}/assets/${fileId}`;
		}

		// Handle case where fileId is an object<File>
		if (fileId as File) {
			return `${config.public.directus.rest.baseUrl}/assets/${(fileId as File).id}`;
		}

		return undefined;
	}

	return {
		fileUrl,
	};
}
