import { defineInterface } from '@directus/extensions-sdk';
import InterfaceComponent from './interface.vue';

export default defineInterface({
	id: 'group-column',
	name: 'Column',
	icon: 'box',
	description: 'Group column!',
	component: InterfaceComponent,
	localTypes: ['group'],
	group: 'group',
	types: ['alias'],
	options: [
		{
			field: 'start',
			name: '$t:start',
			type: 'string',
			schema: {
				default_value: 'open',
			},
			meta: {
				interface: 'select-dropdown',
				width: 'full',
				options: {
					choices: [
						{
							text: '$t:interfaces.group-detail.start_open',
							value: 'open',
						},
						{
							text: '$t:interfaces.group-detail.start_closed',
							value: 'closed',
						},
					],
				},
			},
		},
	],
});
