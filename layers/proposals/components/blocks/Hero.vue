<script setup lang="ts">
import type { User } from '~/types';

export interface HeroProps {
	name: string;
	organization: string;
	owner: User;
}

defineProps<HeroProps>();
</script>
<template>
	<div class="relative flex items-center justify-center w-full h-screen border-b-2 border-primary">
		<div
			class="absolute inset-0 bg-gradient-to-br from-white via-gray-300 to-primary/70 dark:from-gray-800 dark:via-gray-900 dark:to-gray-600"
		/>
		<div class="absolute inset-0 opacity-50 grain-bg dark:opacity-10" />

		<div class="relative flex flex-col justify-center">
			<Logo class="h-6 mx-auto dark:text-white text-gray" />
			<div class="mt-12 space-y-6 text-center">
				<TypographyHeadline :content="name" size="title" />
				<div class="flex flex-col items-center justify-center space-y-2">
					<TypographyTitle>For:</TypographyTitle>
					<TypographyHeadline :content="organization" />
				</div>
				<VDivider />
				<div class="flex flex-col items-center justify-center space-y-2">
					<TypographyTitle>Prepared by:</TypographyTitle>
					<!-- <VAvatar :author="owner" /> -->
				</div>
			</div>
			<NuxtLink to="#content" class="mx-auto">
				<UButton icon="material-symbols:arrow-downward-rounded" class="mt-12 animate-bounce" size="xl" />
			</NuxtLink>
		</div>
	</div>
</template>
