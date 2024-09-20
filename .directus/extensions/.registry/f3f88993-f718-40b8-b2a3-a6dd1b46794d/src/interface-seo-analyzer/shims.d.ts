declare module '*.vue' {
	import { DefineComponent } from 'vue';
	const component: DefineComponent<{}, {}, any>;
	export default component;
}

declare global {
    interface Window {
		rankMath: any;
	}
}