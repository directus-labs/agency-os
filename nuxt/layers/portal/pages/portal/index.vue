<script setup lang="ts">
function useGreetings() {
	type Message = string;

	const messages: Message[] = [
		'Remember, <em>every challenge</em> is easier together.',
		"Your vision is our mission. Together, we'll create <em>something outstanding</em>.",
		"The best projects are <em>fueled by partnership</em>. Here's to another successful day working together!",
		'Every detail, every idea, every feedback. <em>It all matters</em>. Thank you for entrusting us with your vision.',
		"Project management isn't just about the destination, it's about <em>enjoying and learning from the journey</em>. We're thrilled to be on this adventure with you.",
		'With every challenge, we <em>grow stronger</em>. Thanks for pushing us to be our best!',
		"From concept to completion, your aspirations are in <em>dedicated hands</em>. Let's keep moving forward, together.",
		"Like a symphony, <em>every note counts</em>. We're harmonizing perfectly with your vision, creating a masterpiece in progress.",
		"As we tackle today's tasks, know that our <em>commitment</em> to your success is unwavering.",
		'Every step with you is a step towards <em>brilliance</em>. Thanks for making this journey shine brighter.',
	];

	function getTodaysMessage(): Message {
		// Use the current day as the seed for the message index so that the message stays consistent throughout the day.
		const now = new Date();
		const start = new Date(now.getFullYear(), 0, 0);
		const difference = now.getTime() - start.getTime();
		const oneDay = 1000 * 60 * 60 * 24;
		const dayOfYear = Math.floor(difference / oneDay);
		const messageIndex = dayOfYear % messages.length;

		return messages[messageIndex];
	}

	return {
		getTodaysMessage,
	};
}

const { getTodaysMessage } = useGreetings();
const { user } = useDirectusAuth();
</script>
<template>
	<PageContainer>
		<img class="w-48 ml-auto mr-0" src="~/assets/illustrations/tokyo-luminous-table-lamp-on-boxes.svg" />
		<TypographyTitle class="normal-case">{{ greetUser() }} {{ user?.first_name ?? 'friend' }},</TypographyTitle>
		<TypographyHeadline :content="getTodaysMessage()" size="xl" />
		<VDivider class="my-8" />
		<div class="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
			<PortalInvoiceWidget />
			<PortalTaskWidget />
		</div>
	</PageContainer>
</template>
