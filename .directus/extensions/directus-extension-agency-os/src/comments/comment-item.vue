<template>
	<div class="comment-item">
		<div class="comment-header">
			<VAvatar x-small>
				<VImage v-if="avatarSource" :src="avatarSource" />
				<VIcon v-else name="person_outline" />
			</VAvatar>
			<div class="name">
				<span>
					<template v-if="comment.user_created">
						{{ userName(comment.user_created) }}
					</template>
				</span>
			</div>
		</div>

		<!-- <comment-item-header :refresh="refresh" :activity="activity" @edit="editing = true" /> -->

		<!-- <comment-input
			v-if="editing"
			:existing-comment="activity"
			:primary-key="primaryKey"
			:collection="collection"
			:refresh="refresh"
			:previews="userPreviews"
			@cancel="cancelEditing"
		/> -->

		<div class="content selectable">
			<div v-html="comment.message" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineProps, ref, computed, watch, onMounted } from 'vue';
import { useApi, useStores } from '@directus/extensions-sdk';
import { userName } from '../utils/user-name';

const props = defineProps<{
	comment: {
		id: string;
		date_created: string;
		user_created: string;
		date_updated: string;
		user_updated: string;
		collection: string;
		message: string;
		item: string;
		comment: string;
	};
}>();

const avatarSource = computed(() => {
	if (!props.comment?.user_created?.avatar) return null;

	return `/assets/${props.comment?.user_created.avatar}?key=system-small-cover`;
});
</script>

<style lang="scss" scoped>
.comment-item {
	position: relative;
	margin-bottom: 8px;
	padding: 16px;
	background-color: var(--background-page);
	border-radius: var(--border-radius);

	&:hover {
		background-color: var(--background-highlight);
	}
}

.comment-item:last-of-type {
	margin-bottom: 8px;
}

.comment-item .content {
	display: inline-block;
	max-height: 300px;
	overflow-y: auto;
	min-width: 100%;
	max-width: 100%;
	margin-bottom: -6px;
	line-height: 1.4;
}

.comment-item .content :deep(> *:first-child),
.comment-item .content :deep(p > *:first-child) {
	margin-top: 0;
}

.comment-item .content :deep(> *:last-child),
.comment-item .content :deep(p > *:last-child) {
	margin-bottom: 0;
}

.comment-item .content :deep(a) {
	color: var(--primary);
}

.comment-item .content :deep(blockquote) {
	margin: 8px 0;
	padding-left: 6px;
	color: var(--foreground-subdued);
	font-style: italic;
	border-left: 2px solid var(--border-normal);
}

.comment-item .content :deep(img) {
	max-width: 100%;
	margin: 8px 0;
	border-radius: var(--border-radius);
	display: block;
}

.comment-item .content :deep(hr) {
	height: 2px;
	margin: 12px 0;
	border: 0;
	border-top: 2px solid var(--border-normal);
}

.comment-item .content :deep(mark) {
	display: inline-block;
	padding: 2px 4px;
	color: var(--primary);
	line-height: 1;
	background: var(--primary-alt);
	border-radius: var(--border-radius);
	user-select: text;
	pointer-events: none;
}

.comment-item .content :deep(pre) {
	padding: 2px 4px;
	color: var(--foreground-normal);
	background-color: var(--background-normal);
	border-radius: var(--border-radius);
	margin: 2px 0;
	font-family: var(--family-monospace);
	white-space: nowrap;
	max-width: 100%;
	overflow-x: auto;
}

.comment-item .content :deep(code) {
	padding: 2px 4px;
	color: var(--foreground-normal);
	background-color: var(--background-normal);
	border-radius: var(--border-radius);
	margin: 2px 0;
	font-family: var(--family-monospace);
}

.comment-item .content :deep(pre > code) {
	padding: 0;
	margin: 0;
	white-space: pre;
}

.comment-item .content :deep(:is(h1, h2, h3, h4, h5, h6)) {
	margin-top: 12px;
	font-weight: 600;
	font-size: 16px;
	color: var(--foreground-normal-alt);
}

.comment-item.expand .content::after {
	position: absolute;
	right: 0;
	bottom: 4px;
	left: 0;
	z-index: 1;
	height: 40px;
	background: linear-gradient(
		180deg,
		rgb(var(--background-page-rgb), 0) 0%,
		rgb(var(--background-page-rgb), 0.8) 25%,
		rgb(var(--background-page-rgb), 1) 100%
	);
	content: '';
}

.comment-item.expand .content .expand-text {
	position: absolute;
	right: 0;
	bottom: 8px;
	left: 0;
	z-index: 2;
	height: 24px;
	text-align: center;
	cursor: pointer;
}

.comment-item.expand .content .expand-text span {
	padding: 4px 12px 5px;
	color: var(--foreground-subdued);
	font-weight: 600;
	font-size: 12px;
	background-color: var(--background-normal);
	border-radius: 12px;
	transition:
		color var(--fast) var(--transition),
		background-color var(--fast) var(--transition);
}

.comment-item.expand .content .expand-text:hover span {
	color: var(--foreground-inverted);
	background-color: var(--primary);
}

.comment-item:hover :deep(.comment-header .header-right .time) {
	opacity: 0;
}

.comment-item:hover :deep(.comment-header .header-right .more) {
	opacity: 1;
}

.user-name {
	color: var(--primary);
}

.buttons {
	position: absolute;
	right: 8px;
	bottom: 8px;
}

.cancel {
	margin-right: 4px;
}

.comment-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 8px;

	.v-avatar {
		--v-avatar-color: var(--background-normal-alt);
		flex-shrink: 0;
		flex-basis: 24px;
		margin-right: 8px;

		.v-icon {
			--v-icon-color: var(--foreground-subdued);
		}
	}

	.name {
		flex-grow: 1;
		margin-right: 8px;
		font-weight: 600;
	}

	.header-right {
		position: relative;
		flex-basis: 24px;
		color: var(--foreground-subdued);

		.more {
			cursor: pointer;
			opacity: 0;
			transition: all var(--slow) var(--transition);

			&:hover {
				color: var(--foreground-normal);
			}

			&.active {
				opacity: 1;
			}
		}

		.time {
			position: absolute;
			top: 0;
			right: 0;
			display: flex;
			align-items: center;
			font-size: 12px;
			white-space: nowrap;
			text-align: right;
			text-transform: lowercase;
			opacity: 1;
			transition: opacity var(--slow) var(--transition);
			pointer-events: none;
		}

		.more.active + .time {
			opacity: 0;
		}
	}
}

.action-delete {
	--v-button-background-color: var(--danger-25);
	--v-button-color: var(--danger);
	--v-button-background-color-hover: var(--danger-50);
	--v-button-color-hover: var(--danger);
}

.dot {
	display: inline-block;
	width: 6px;
	height: 6px;
	margin-right: 4px;
	vertical-align: middle;
	background-color: var(--warning);
	border-radius: 3px;
}
</style>
