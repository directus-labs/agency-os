<script setup lang="ts">
export interface DarkModeToggleProps {
	bg?: 'dark' | 'light';
}

withDefaults(defineProps<DarkModeToggleProps>(), {
	bg: 'light',
});

const colorMode = useColorMode();

const isDark = computed({
	get() {
		return colorMode.value === 'dark';
	},
	set() {
		colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
	},
});
</script>
<template>
	<ClientOnly>
		<UButton
			:icon="isDark ? 'material-symbols:mode-night' : 'material-symbols:light-mode'"
			variant="ghost"
			color="gray"
			aria-label="Theme"
			size="lg"
			:class="[bg === 'dark' ? 'text-white' : '']"
			@click="isDark = !isDark"
		/>
		<template #fallback>
			<div class="w-10 h-10" />
		</template>
	</ClientOnly>
</template>
