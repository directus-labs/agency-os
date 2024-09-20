import { defineInterface } from '@directus/extensions-sdk';
import InterfaceComponent from './interface.vue';

export default defineInterface({
	id: 'social-table',
	name: 'Social Table',
	icon: 'box',
	description: 'Social Table!',
	component: InterfaceComponent,
	options: null,
	types: ['string'],
});
