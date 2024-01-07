<script setup lang="ts">
import type { Team } from '~/types';

defineProps<{
	person: Team;
}>();

const flipped = ref(false);
</script>
<template>
	<div class="opacity-0 cursor-pointer select-none animate-fade-in" @click="flipped = !flipped">
		<div class="relative w-full h-full overflow-hidden group rounded-card">
			<!-- Front of Team Card -->
			<NuxtImg
				v-if="person.image"
				class="object-cover w-full h-full transition duration-300 grayscale group-hover:grayscale-0"
				:src="person.image as string"
				:alt="person.name ?? ''"
			/>
			<!-- Back of Team Card -->
			<Motionable
				v-motion
				name="team"
				:show="flipped"
				class="absolute inset-0 p-2 -m-2 overflow-hidden bg-primary/80 backdrop-blur-sm"
				:initial="{
					opacity: 0,
					y: 100,
					x: 100,
					scale: 0.9,
				}"
				:enter="{
					opacity: 1,
					scale: 1,
					x: 0,
					y: 0,
					transformOrigin: 'bottom right',
				}"
				:leave="{
					opacity: 0,
					scale: 0.9,
					x: 100,
					y: 100,
					transformOrigin: 'bottom right',
				}"
			>
				<div class="relative p-4 space-y-2">
					<p class="font-mono tracking-wider uppercase">Links</p>
					<NuxtLink
						v-for="link in person.social_media"
						:key="link?.service"
						class="inline-flex w-full border border-gray-900 hover:border-white hover:text-white"
						:href="link?.url"
						target="_blank"
					>
						<div class="flex items-center justify-center flex-none w-14">
							<Icon class="w-8 h-8" :name="`uil:${link?.service}`" />
						</div>
						<p
							class="flex flex-col justify-center py-2 pb-1 pl-3 pr-2 overflow-hidden text-lg font-semibold leading-none tracking-tight capitalize truncate md:py-3 text-bold font-display word-spacing-tight"
						>
							{{ link?.service }}
						</p>
					</NuxtLink>
				</div>
			</Motionable>

			<div class="absolute z-10 bottom-4 left-7 right-7">
				<TypographyHeadline v-if="person.name" :content="person.name" size="sm" class="text-white drop-shadow">
					{{ person?.name }}
				</TypographyHeadline>
				<TypographyTitle v-if="person.job_title">
					{{ person?.job_title }}
				</TypographyTitle>
			</div>

			<div class="absolute bottom-0 left-0 right-0 bg-gradient-to-b from-transparent to-black h-1/3 opacity-80"></div>
		</div>
	</div>
</template>
