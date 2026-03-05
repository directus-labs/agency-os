<script setup lang="ts">
const showTailwindBreakpoints = ref(true);
</script>
<template>
	<div v-if="showTailwindBreakpoints" class="fixed bottom-0 left-0 z-50 m-8">
		<!-- Tailwind Breakpoints  -->
		<div
			class="flex items-center justify-center text-xs text-white bg-gray-700 rounded-full w-7 h-7 sm:bg-pink-500 md:bg-orange-500 lg:bg-green-500 xl:bg-primary"
		>
			<div class="block sm:hidden md:hidden lg:hidden xl:hidden">--</div>
			<div class="hidden sm:block md:hidden lg:hidden xl:hidden">sm</div>
			<div class="hidden sm:hidden md:block lg:hidden xl:hidden">md</div>
			<div class="hidden sm:hidden md:hidden lg:block xl:hidden">lg</div>
			<div class="hidden sm:hidden md:hidden lg:hidden xl:block">xl</div>
		</div>
	</div>
</template>
