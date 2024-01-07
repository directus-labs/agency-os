<script setup lang="ts">
import { ref, reactive } from 'vue';
import type { HelpFeedback } from '~/types';
import type { Session } from '~/middleware/session.global';

const session: Ref<Session> = useCookie('session');

const props = defineProps<{ title: string; url: string }>();

const loading = ref(false);
const error = ref<any>(null);
const success = ref(false);

const feedback = reactive<HelpFeedback>({
	id: undefined,
	rating: null,
	comments: null,
});

const ratingOptions = [
	{
		label: 'The Worst 😭',
		value: 1,
		message: 'Sorry about that. How do we fix it?',
	},
	{
		label: 'Not Helpful 😡',
		value: 2,
		message: 'How can we improve this article?',
	},
	{
		label: 'Helpful 😃',
		value: 3,
		message: 'Nice! 👍 Anything we can improve upon?',
	},
	{
		label: 'Amazing 🤩',
		value: 4,
		message: `Awesome! 🥳🎉🎊 Anything you'd like to add?`,
	},
];

function getRatingOption(rating: number) {
	return ratingOptions.find((option) => option.value === rating);
}

async function handleSubmission(rating?: number) {
	loading.value = true;
	if (rating) feedback.rating = rating;

	const body = {
		id: feedback.id,
		rating: feedback.rating,
		comments: feedback.comments,
		title: props.title,
		url: props.url,
		visitor_id: session?.value?.id ?? undefined,
	};

	try {
		const { data }: { data: Ref<HelpFeedback> } = await useFetch('/api/feedback', {
			method: 'POST',
			body: JSON.stringify(body),
		});

		if (data.value.id) {
			feedback.id = data.value.id;
		}

		// If the reponse has comments, we can assume they've completed the second step.
		if (data.value.comments) {
			success.value = true;
		}
	} catch (err) {
		error.value = err;
	} finally {
		loading.value = false;
	}
}
</script>

<template>
	<div class="">
		<Transition name="fade" mode="out-in">
			<!-- Ask For Rating -->
			<div v-if="!feedback.rating" class="step">
				<TypographyHeadline content="How <em>helpful</em> was this article?" size="xs" />
				<div class="flex flex-col gap-3 mt-4 md:flex-row">
					<UButton
						v-for="item in ratingOptions"
						:key="item.value"
						size="lg"
						color="white"
						@click="handleSubmission(item.value)"
					>
						<span>{{ item.label }}</span>
					</UButton>
				</div>
			</div>
			<!-- Ask For Comments -->
			<div v-else-if="feedback?.rating && !success" class="space-y-4">
				<p class="dark:text-gray-200">You chose:</p>
				<div class="space-x-4">
					<span class="text-xl font-bold dark:text-white">
						{{ getRatingOption(feedback.rating)?.label }}
					</span>
					<UButton variant="outline" size="xs" icon="heroicons:x-mark" @click="feedback.rating = undefined" />
				</div>

				<TypographyHeadline
					v-if="feedback?.rating"
					:content="getRatingOption(feedback.rating)?.message as string"
					size="sm"
				/>
				<!-- @vue-ignore - UTextArea component from NuxtUI is missing proper types -->
				<UTextarea v-model="feedback.comments" autofocus class="max-w-lg" autoresize />
				<UButton :disabled="!feedback.comments" size="lg" @click="handleSubmission()">Send Us Your Feedback</UButton>
			</div>
			<!-- Success State -->
			<div v-else>
				<TypographyHeadline content="Thanks for your feedback!" size="sm" />
			</div>
		</Transition>
	</div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
