import { defineInterface } from '@directus/extensions-sdk';
import InterfaceComponent from './interface.vue';

export default defineInterface({
	id: 'image-upload',
	name: 'Image Upload',
	icon: 'insert_photo',
	description: 'Image upload!',
	component: InterfaceComponent,
	hideLabel: true,
	// hideLoader: true,
	types: ['uuid'],
	localTypes: ['other'],
	group: 'other',
	options: null,
});
