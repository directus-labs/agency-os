<template>
	<div class="comment-interface">
		<div class="comment-window" ref="commentWindow">
			<div class="no-results" v-if="comments && comments.length === 0">
				<VInfo icon="chat_bubble" title="No Comments" type="info">
					There are comments here yet. Be the first to add one!
				</VInfo>
			</div>
			<div v-for="comment in comments" :key="comment.id">
				<CommentItem :comment="comment" />
			</div>
		</div>
		<div class="comment-input">
			<VTextarea
				class="textarea"
				v-model="newComment"
				expand-on-focus
				placeholder="Add your comments..."
				ref="commentElement"
			/>
			<div class="button-group">
				<VButton small :disabled="!newComment" @click="createComment">
					Add Comment
					<VIcon name="send" right />
				</VButton>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useApi, useStores } from '@directus/extensions-sdk';
import { defineComponent, ref, computed, watch, onMounted } from 'vue';
import CommentItem from './comment-item.vue';
import { useShortcut } from '../composables/use-shortcut';

const props = defineProps<{
	collection: string;
	primaryKey: string;
}>();

// const { useCollectionsStore, useRelationsStore, useFieldsStore } = useStores();
// const collectionsStore = useCollectionsStore();
// const relationsStore = useRelationsStore();
// const fieldsStore = useFieldsStore();
// console.log('stores', collectionsStore, relationsStore, fieldsStore);
// const { relatedCollection } = useRelation();

// const primaryKey = fieldsStore.getPrimaryKeyFieldForCollection(relatedCollection.value.collection);

const api = useApi();

const newComment = ref('');
const commentElement = ref(null);
const comments = ref([]);
const commentWindow = ref(null);

useShortcut('meta+enter', createComment, commentElement);

const commentsToDisplay = computed(() => {
	return comments.value;
});

// Poll for new comments every 10 seconds
onMounted(() => {
	fetchComments();
	setInterval(fetchComments, 10000);
});

function scrollToBottom() {
	if (commentWindow.value) {
		commentWindow.value.scrollTop = commentWindow.value.scrollHeight;
	}
}

async function fetchComments() {
	try {
		const response = await api.get(`/items/comments`, {
			params: {
				filter: {
					_and: [{ collection: { _eq: props.collection } }, { item: { _eq: props.primaryKey } }],
				},
				fields: ['*', 'user_created.first_name', 'user_created.last_name', 'user_created.avatar', 'user_created.id'],
				sort: ['date_created'],
			},
		});

		comments.value = response.data.data;
		scrollToBottom();
	} catch (error) {
		console.error(error);
	}
}

async function createComment() {
	try {
		await api.post(`/items/comments`, {
			collection: props.collection,
			item: props.primaryKey,
			message: newComment.value,
		});

		newComment.value = '';
		await fetchComments();
		scrollToBottom();
	} catch (error) {
		console.error(error);
	}
}

watch(props, () => {
	if (props.primaryKey !== '+') {
		fetchComments();
	}
});
</script>

<style scoped lang="scss">
.comment-window {
	overflow-y: scroll;
	height: 400px;
	border: var(--border-width) solid var(--border-normal);
	border-radius: var(--border-radius);
	padding-bottom: 8px;
}

.comment-input {
	margin-top: -8px;
}

.button-group {
	margin-top: 4px;
	display: flex;
	justify-content: flex-end;
}

.no-results {
	margin-top: 16px;
}
</style>
