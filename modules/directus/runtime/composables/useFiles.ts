import { useRuntimeConfig } from '#imports';
import type { File } from '~/types';

export default function useFiles() {
	const config = useRuntimeConfig();

	function fileUrl(fileId: string) {
		if (!fileId) return null;

		if (typeof fileId === 'string') {
			return `${config.public.directusUrl}/assets/${fileId}`;
		}

		// Handle case where fileId is an object<File>
		if (fileId as File) {
			return `${config.public.directusUrl}/assets/${(fileId as File).id}`;
		}

		return null;
	}

	return {
		fileUrl,
	};
}
