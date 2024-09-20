import { defineInterface, useStores } from '@directus/extensions-sdk';
import InterfaceComponent from './interface-seo-analyzer.vue';
import { computed } from 'vue';
import { Field } from '@directus/types';

export default defineInterface({
	id: 'seo_analyzer',
	name: 'SEO Analyzer',
	icon: 'box',
	description: 'This is my custom interface!',
	component: InterfaceComponent,
	relational: true,
	group: 'relational',
	types: ['integer'],
	localTypes: ['m2o'],
	options: (args) => {
		const { collection } = args
		
		const stores = useStores()
		const { useFieldsStore } = stores

		const fieldsStore = useFieldsStore();
		const fields = fieldsStore.getFieldsForCollection(collection);
		const selectItems = computed(() =>
			fields.map((field: Field) => {
				let disabled = false;

				if ( field?.schema?.is_primary_key === true) disabled = true;
				// if ( field?.schema?.foreign_key_table) disabled = true;

				return {
					text: field.name,
					value: field.field,
					disabled,
				};
			})
		);
		
		return [
			{
				field: 'isSEOAdvanced',
				name: 'Use on SEO Advanced collection?',
				schema: {
					default_value: false,
				},
				meta: {
					interface: 'boolean',
					options: {
						label: 'Enable',
					},
					// width: 'half',
					// hidden: true
				},
			},
			{
				field: 'map_title',
				name: 'Title field',
				meta: {
					interface: 'select-dropdown',
					options: {
						choices: selectItems
					},
					width: 'half',
					note: 'The field will be used as a Title to analyze SEO Score'
				},
			},
			{
				field: 'map_content',
				name: 'Content field',
				meta: {
					interface: 'select-dropdown',
					options: {
						choices: selectItems
					},
					width: 'half',
					note: 'The field will be used as a Content to analyze SEO Score'
				},
			},
			{
				field: 'map_url',
				name: 'URL/slug field',
				meta: {
					interface: 'select-dropdown',
					options: {
						choices: selectItems
					},
					width: 'half',
					note: 'The field will be used as an URL to analyze SEO Score'
				},
			},
			{
				field: 'map_thumbnail',
				name: 'Thumbnail field',
				meta: {
					interface: 'select-dropdown',
					options: {
						choices: selectItems
					},
					width: 'half',
					note: 'The field will be used as a Thumbnail to analyze SEO Score'
				},
			},
		]
	}
});
