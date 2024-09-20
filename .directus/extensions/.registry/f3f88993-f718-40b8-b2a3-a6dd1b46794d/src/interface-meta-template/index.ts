import { defineInterface } from '@directus/utils';
import Interface from './interface.vue';

export default defineInterface({
	id: 'meta-template',
	name: '$t:interfaces.system-display-template.display-template',
	description: '$t:interfaces.system-display-template.description',
	icon: 'arrow_drop_down_circle',
	component: Interface,
	types: ['string'],
	system: true,
	options: null,
});
