import { defineInterface } from '@directus/extensions-sdk';
import InterfaceComponent from './interface.vue';

export default defineInterface({
	id: 'comments',
	name: 'Comments',
	type: 'interface',
	icon: 'chat_bubble',
	description: 'Loads the comments for a given item.',
	component: InterfaceComponent,
	options: ({ relations }) => {
		const collection = relations.m2o?.related_collection;
		return [
			{
				field: 'message',
				name: 'Message Field',
				meta: {
					interface: 'system-field',
					options: {
						collectionName: collection,
					},
					width: 'half',
					note: 'The field that contains the message.',
				},
			},
			{
				field: 'author',
				name: 'Author Field',
				meta: {
					interface: 'system-field',
					options: {
						collectionName: collection,
					},
					width: 'half',
					note: 'The field that contains the comment author.',
				},
			},
			{
				field: 'date',
				name: 'Date Field',
				meta: {
					interface: 'system-field',
					options: {
						collectionName: collection,
					},
					width: 'half',
					note: 'The field that contains the comment date.',
				},
			},
			{
				field: 'is_threads_enabled',
				name: 'Enable Threads',
				meta: {
					interface: 'boolean',
					width: 'half',
					note: 'Enable threaded comments.',
				},
			},
			{
				field: 'parent',
				name: 'Parent Field',
				meta: {
					interface: 'system-field',
					hidden: true,
					options: {
						collectionName: collection,
					},
					conditions: [
						{
							rule: {
								is_threads_enabled: {
									_eq: true,
								},
							},
							hidden: false,
						},
					],
					width: 'half',
					note: 'The field that contains the parent comment.',
				},
			},
			{
				field: 'divider',
				meta: {
					interface: 'presentation-divider',
					width: 'full',
				},
			},
			{
				field: 'collection',
				name: 'Collection Field',
				meta: {
					interface: 'system-field',
					options: {
						collectionName: collection,
					},
					width: 'half',
					note: 'The field that contains the collection name.',
				},
			},
			{
				field: 'item',
				name: 'Item Field',
				meta: {
					interface: 'system-field',
					options: {
						collectionName: collection,
					},
					width: 'half',
					note: 'The field that contains the item id.',
				},
			},
		];
	},
	localTypes: ['m2o'],
	group: 'relational',
	types: ['uuid', 'string', 'integer'],
});
