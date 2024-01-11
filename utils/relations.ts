export function safeRelation(
	idOrObject: string | { [key: string]: any } | null | undefined,
): { id: string; [key: string]: any } | null | undefined {
	if (!idOrObject) return undefined;

	if (typeof idOrObject === 'string') {
		return {
			id: idOrObject,
		};
	}

	if (idOrObject.id) {
		return idOrObject.id;
	}

	return null;
}

export function safeRelationId(
	idOrObject: string | { [key: string]: any } | null | undefined,
): string | null | undefined {
	if (!idOrObject) return null;

	if (typeof idOrObject === 'string') {
		return idOrObject;
	}

	if (idOrObject.id) {
		return idOrObject.id;
	}

	return null;
}
