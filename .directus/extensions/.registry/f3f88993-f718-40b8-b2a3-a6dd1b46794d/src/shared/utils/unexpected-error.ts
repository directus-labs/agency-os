export function unexpectedError(error, store: any, i18n): void {

	const code =
		(error)?.response?.data?.errors?.[0]?.extensions?.code ||
		(error)?.extensions?.code ||
		'UNKNOWN';

	// eslint-disable-next-line no-console
	console.warn(error);

	store.add({
		title: i18n.t(`errors.${code}`),
		type: 'error',
		code,
		dialog: true,
		error,
	});
}
