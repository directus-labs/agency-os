import { defineInterface } from '@directus/extensions-sdk';
import InterfaceComponent from './interface.vue';

export default defineInterface({
	id: 'presentation-info',
	name: 'Info',
	icon: 'box',
	description: 'Info!',
	component: InterfaceComponent,
	hideLabel: true,
	hideLoader: true,
	autoKey: true,
	types: ['alias'],
	localTypes: ['presentation'],
	group: 'presentation',
	options: [
		{
			field: 'title',
			name: '$t:title',
			type: 'string',
			meta: {
				width: 'full',
				interface: 'system-input-translated-string',
				options: {
					placeholder: '$t:interfaces.presentation-divider.title_placeholder',
				},
			},
		},
		{
			field: 'color',
			name: '$t:color',
			type: 'string',
			meta: {
				width: 'half',
				interface: 'select-color',
			},
		},
		{
			field: 'icon',
			name: '$t:icon',
			type: 'string',
			meta: {
				width: 'half',
				interface: 'select-icon',
			},
		},
	],
});
