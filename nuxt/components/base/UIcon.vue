<script lang="ts" setup>
/*
	This component overwrites the default NuxtUI Icon component so that we can use dynamic icon names coming from Directus. The internal NuxtUI Icon component doesn't support dynamic icon names. The tradeoff is that the icons are downloaded on demand inside the browser, so there is a slight delay when loading the icons.
*/
export interface IconProps {
	name: string;
}

defineProps<IconProps>();
</script>

<template>
	<Icon :name="name" />
</template>
