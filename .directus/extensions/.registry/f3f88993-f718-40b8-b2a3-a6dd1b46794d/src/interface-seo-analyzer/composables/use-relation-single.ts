// import api from '@/api';
import { useStores } from '@directus/extensions-sdk';
import { getEndpoint } from '@directus/utils';
// import { unexpectedError } from '@/utils/unexpected-error';
import merge from 'lodash/merge';
import { computed, ref, Ref, watch, inject, toValue, MaybeRefOrGetter } from 'vue';
import { RelationM2O } from './use-relation-m2o';
import { useI18n } from 'vue-i18n';
import { unexpectedError } from '../../shared/utils/unexpected-error';

export type RelationQuerySingle = {
	fields: string[];
};

export type UseRelationSingleOptions = {
	enabled?: MaybeRefOrGetter<boolean>;
};

export function useRelationSingle(
	value: Ref<number | string | Record<string, any> | null>,
	previewQuery: Ref<RelationQuerySingle>,
	relation: Ref<RelationM2O | undefined>,
	options?: UseRelationSingleOptions,
) {
	const displayItem = ref<Record<string, any> | null>(null);
	const loading = ref(false);
	const enabled = computed(() => (options?.enabled === undefined ? true : toValue(options?.enabled)));

	const api = inject('api')
	const stores = useStores()
	const { useNotificationsStore } = stores
	const notify = useNotificationsStore();
	const i18n = useI18n()

	watch(
		[value, previewQuery, relation, enabled],
		() => {
			if (enabled.value) getDisplayItem();
		},
		{ immediate: true },
	);

	return { update, remove, refresh, displayItem, loading };

	// function unexpectedError(error: any): void {
	// 	const code =
	// 	error?.response?.data?.errors?.[0]?.extensions?.code ||
	// 	error?.extensions?.code ||
	// 	'UNKNOWN';

	// 	// eslint-disable-next-line no-console
	// 	console.warn(error);

	// 	notify.add({
	// 		title: t(`errors.${code}`),
	// 		type: 'error',
	// 		code,
	// 		dialog: true,
	// 		error,
	// 	});
	// }

	function update(item: Record<string, any> | string | number) {
		if (!relation.value) return;

		const pkField = relation.value.relatedPrimaryKeyField.field;

		// make sure when updating from an existing primary key, we also have it inside the changes
		if (value.value && typeof item === 'object' && pkField in item === false) {
			const existingPk: string | number = typeof value.value === 'object' ? value.value[pkField] : value.value;

			item[pkField] = existingPk;
		}

		value.value = item;
	}

	function remove() {
		value.value = null;
	}

	async function refresh() {
		await getDisplayItem();
	}

	async function getDisplayItem() {
		const val = value.value;

		if (!val) {
			displayItem.value = null;
			return;
		}

		if (!relation.value) return;

		const relatedCollection = relation.value.relatedCollection.collection;
		const pkField = relation.value.relatedPrimaryKeyField.field;

		const id = typeof val === 'object' ? val[relation.value.relatedPrimaryKeyField.field] : val;

		if (!id) {
			displayItem.value = val as T;
			return;
		}

		const fields = new Set(previewQuery.value.fields);
		fields.add(pkField);

		loading.value = true;

		try {
			const response = await api.get(getEndpoint(relatedCollection) + `/${encodeURIComponent(id)}`, {
				params: {
					fields: Array.from(fields),
				},
			});

			if (typeof val === 'object') {
				displayItem.value = merge({}, response.data.data, val);
			} else {
				displayItem.value = response.data.data;
			}
		} catch (error: any) {
			// if the item has a manually entered primary key, we can ignore the error
			if (typeof val === 'object' && error.response && error.response.status === 403) {
				displayItem.value = val as T;
			} else {
				unexpectedError(error, notify, i18n);
			}
		} finally {
			loading.value = false;
		}
	}
}
