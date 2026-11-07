<script setup lang="ts">
export interface MessageListProps {
	projectId: string;
}

const props = defineProps<MessageListProps>();

const { fileUrl } = useFiles();

const {
	data: conversations,
	pending,
	error,
} = await useAsyncData(`${props.projectId}-conversations`, () => {
	return useDirectus(
		readItems('conversations', {
			filter: {
				_and: [
					{
						item: {
							_eq: props.projectId,
						},
					},
				],
			},
		}),
	);
});

const columns = [
	{
		key: 'name',
		label: 'Name',
	},
	{
		key: 'status',
		label: 'Status',
	},
	{
		key: 'date_created',
		label: 'Date Created',
	},
];

const selectedConversationId = ref<string | null>(null);

async function fetchConversationMessages(conversationId: string) {
	const data = await useDirectus(
		readItems('messages', {
			sort: ['date_created'],
			fields: [
				'*',
				{
					user_created: ['id', 'first_name', 'last_name', 'email', 'avatar'],
				},
			],
			filter: {
				_and: [
					{
						conversation: {
							_eq: conversationId,
						},
					},
				],
			},
		}),
	);

	messages.value = data;
}

async function upsertMessage(messageId: string | null = null) {
	const message = {
		text: newMessage.text,
		conversation: selectedConversationId.value,
	};

	if (messageId) {
		await useDirectus(updateItem('messages', messageId, message));
	} else {
		// Create
		await useDirectus(createItem('messages', message));
	}

	messages.value.push(message);
	newMessage.text = '';
}

function openConversation(conversationId: string) {
	selectedConversationId.value = conversationId;
	fetchConversationMessages(conversationId);
}

const messages = ref<any[]>([]);

const newMessage = reactive({
	text: '',
});

function isCurrentUser(message: any) {
	return false;
}

const conversationStatus = [
	{
		key: 'open',
		label: 'Open',
		value: 'open',
	},
	{
		key: 'archived',
		label: 'Closed',
		value: 'archived',
	},
];

const selectedStatus = ref<string | null>('open');
</script>
<template>
	<div class="">
		<!-- Conversations List -->
		<div class="w-full">
			<!-- Filters -->
			<div class="flex items-center justify-between gap-3 py-3 border-b dark:border-gray-700">
				<!-- <UInput v-model="searchQuery" icon="i-heroicons-magnifying-glass-20-solid" placeholder="Search..." /> -->
				<!-- <USelectMenu v-model="selectedStatus" :options="todoStatus" multiple placeholder="Status" class="w-40" /> -->
			</div>

			<UTable :columns="columns" :rows="conversations as any" column-attribute="label">
				<template #name-data="{ row }">
					<div
						:class="{
							'bg-primary-50 dark:bg-primary-900': selectedConversationId === row.id,
						}"
					>
						<UButton variant="link" @click="openConversation(row.id)">{{ row.title }}</UButton>
					</div>
				</template>
				<template #status-data="{ row }">
					<UBadge class="capitalize" variant="subtle">{{ row.status }}</UBadge>
				</template>
			</UTable>
		</div>
		<!-- Messages Window -->
	</div>
</template>
