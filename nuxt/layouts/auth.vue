<script setup lang="ts">
definePageMeta({
	middleware: ['guest'],
});
</script>
<template>
	<div
		class="relative flex min-h-full overflow-hidden antialiased transition duration-150 bg-white visual-effects bg-gradient-to-br from-white to-gray-100 dark:from-gray-950 dark:to-gray-700"
	>
		<div class="flex flex-col justify-center flex-1 px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
			<div class="w-full max-w-sm mx-auto space-y-8 lg:w-96">
				<DarkModeToggle />
				<Logo class="w-auto h-12" />
				<slot />
			</div>
		</div>
		<div class="relative flex-1 hidden bg-white border-l-2 border-primary/50 lg:block">
			<div
				class="absolute inset-0 bg-gradient-to-br from-white via-gray-300 to-primary dark:from-gray-700 dark:via-gray-900 dark:to-primary"
			/>
			<div class="absolute inset-0 opacity-50 grain-bg dark:opacity-10" />
		</div>
	</div>
</template>
<style>
html {
	@apply h-full;
}
body {
	@apply h-full;
}
#__nuxt {
	@apply h-full;
	@apply overflow-y-auto !important;
}
</style>
