import { autoAnimatePlugin } from '@formkit/auto-animate/vue';
export default defineNuxtPlugin(({ vueApp }) => {
	vueApp.use(autoAnimatePlugin);
});
