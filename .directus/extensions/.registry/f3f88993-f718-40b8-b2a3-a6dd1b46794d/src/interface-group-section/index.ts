import { defineInterface } from '@directus/extensions-sdk';
import InterfaceComponent from './interface.vue';

export default defineInterface({
	id: 'group-section',
	name: 'Section',
	icon: 'box',
	description: 'Group section!',
	component: InterfaceComponent,
	localTypes: ['group'],
	group: 'group',
	types: ['alias'],
	options: null,
});
