import { defineInterface } from '@directus/extensions-sdk';
import InterfaceComponent from './interface.vue';

export default defineInterface({
	id: 'radio-button',
	name: 'True Radio Buttons',
	icon: 'box',
	description: 'Radio Buttons!',
	component: InterfaceComponent,
	recommendedDisplays: ['badge'],
	types: ['string', 'integer', 'float', 'bigInteger'],
	group: 'selection',
	options: ({ field }) => [
		{
			field: 'choices',
			type: 'json',
			name: '$t:choices',
			meta: {
				width: 'full',
				interface: 'list',
				options: {
					template: '{{ text }}',
					fields: [
						{
							field: 'text',
							type: 'string',
							name: '$t:text',
							meta: {
								width: 'half',
								required: true,
								interface: 'system-input-translated-string',
							},
						},
						{
							field: 'value',
							type: field.type,
							name: '$t:value',
							meta: {
								width: 'half',
								interface: 'input',
								required: true,
								options: {
									font: 'monospace',
								},
							},
						},
						{
							field: 'iconOn',
							name: '$t:icon_on',
							type: 'string',
							meta: {
								width: 'half',
								interface: 'select-icon',
							},
							schema: {
								default_value: 'no',
							},
						},
						{
							field: 'iconOff',
							name: '$t:icon_off',
							type: 'string',
							meta: {
								width: 'half',
								interface: 'select-icon',
							},
							schema: {
								default_value: 'no',
							},
						},
					],
				},
			},
		},
		{
			field: 'iconOn',
			name: '$t:icon_on',
			type: 'string',
			meta: {
				width: 'half',
				interface: 'select-icon',
			},
			schema: {
				default_value: 'radio_button_checked',
			},
		},
		{
			field: 'iconOff',
			name: '$t:icon_off',
			type: 'string',
			meta: {
				width: 'half',
				interface: 'select-icon',
			},
			schema: {
				default_value: 'radio_button_unchecked',
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
			field: 'allowOther',
			name: '$t:interfaces.select-dropdown.allow_other',
			type: 'string',
			meta: {
				width: 'half',
				interface: 'boolean',
				options: {
					label: '$t:interfaces.select-dropdown.allow_other_label',
				},
			},
			schema: {
				default_value: false,
			},
		},
	],
});
