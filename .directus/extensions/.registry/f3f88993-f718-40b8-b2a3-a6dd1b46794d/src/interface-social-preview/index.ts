import { defineInterface } from '@directus/extensions-sdk';
import InterfaceComponent from './interface.vue';

export default defineInterface({
	id: 'social-preview',
	name: 'Social Preview',
	icon: 'insert_photo',
	description: 'Social preview!',
	component: InterfaceComponent,
	hideLabel: true,
	// hideLoader: true,
	types: ['uuid'],
	localTypes: ['other'],
	group: 'other',
	options: null,
});
