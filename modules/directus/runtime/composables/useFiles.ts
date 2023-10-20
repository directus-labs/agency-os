import { useRuntimeConfig } from '#imports';

export default function useFiles() {
	const config = useRuntimeConfig();

	function fileUrl(fileId: string) {
		return `${config.public.directusUrl}/assets/${fileId}`;
	}

	return {
		fileUrl,
	};
}
