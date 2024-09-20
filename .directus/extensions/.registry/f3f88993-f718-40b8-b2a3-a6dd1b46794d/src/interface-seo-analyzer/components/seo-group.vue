<template>
	<div class="sidebar-detail" :class="{ open: true }">
		<button v-tooltip.left="title" class="toggle" :class="{ open: active }" @click="toggle()">
			<div class="icon">
				<v-badge :dot="badge === true" bordered :value="badge" :disabled="!badge">
					<v-icon :name="icon" />
				</v-badge>
			</div>
			<div class="title">
				<span>{{ title }}</span>
				<v-chip v-if="errors" class="error" x-small>{{ errors }} Errors</v-chip>
				<v-chip v-else class="success" x-small>All good</v-chip>
			</div>
			<div v-if="!close" class="icon">
				<v-icon class="expand-icon" :name="active ? 'expand_less' : 'expand_more'" />
			</div>
		</button>
		<transition-expand class="scroll-container">
			<div v-show="active">
				<div class="content">
					<slot />
				</div>
			</div>
		</transition-expand>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs } from 'vue';
// import { useAppStore } from '@/stores/app';
import { useStores } from '@directus/extensions-sdk'
import { useGroupable } from '@directus/composables';
import { useToggle } from '@vueuse/core'

export default defineComponent({
	props: {
		icon: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		badge: {
			type: [Boolean, String, Number],
			default: null,
		},
		close: {
			type: Boolean,
			default: false,
		},
		errors: {
			type: [Boolean, String, Number],
			default: null,
		},
		isActive: {
			type: Boolean,
			default: false,
		},

	},
	setup(props) {
		const [active, toggle] = useToggle();
		// if(props.isActive) {
		// 	value.value = true
		// }



		return { active, toggle };
	},
});
</script>

<style>
body {
	--sidebar-detail-icon-color: var(--foreground-normal-alt);
	--sidebar-detail-color: var(--foreground-normal-alt);
	--sidebar-detail-color-active: var(--primary);
}
</style>

<style lang="scss" scoped>
.sidebar-detail {
	--v-badge-offset-x: 3px;
	--v-badge-offset-y: 4px;
	--v-badge-border-color: var(--background-normal-alt);
	--v-badge-background-color: var(--primary);
	--v-badge-color: var(--background-normal);

	display: contents;

	:deep(.type-label) {
		margin-bottom: 4px;
		font-size: 1rem;
	}

	.toggle {
		position: relative;
		display: flex;
		flex-shrink: 0;
		justify-content: space-between;
		width: 100%;
		height: 60px;
		color: var(--sidebar-detail-color);
		background-color: var(--background-highlight);

		.icon {
			--v-icon-color: var(--sidebar-detail-icon-color);

			display: flex;
			align-items: center;
			justify-content: center;
			width: 60px;
			height: 100%;
		}

		&.open,
		&:hover {
			color: var(--sidebar-detail-color-active);

			.icon {
				--v-icon-color: var(--sidebar-detail-color-active);
			}
		}
	}

	.close {
		position: absolute;
		top: 0;
		right: 0;
		z-index: 50;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 60px;
		height: 60px;
		color: var(--foreground-normal);
		cursor: pointer;
		transition: opacity var(--fast) var(--transition), color var(--fast) var(--transition);

		.v-icon {
			pointer-events: none;
		}

		&:hover {
			color: var(--sidebar-detail-color-active);
		}
	}

	&.open {
		.toggle {
			.close {
				opacity: 1;
				pointer-events: auto;
			}
		}
	}

	.title {
		position: absolute;
		top: 50%;
		left: 52px;
		overflow: hidden;
		white-space: nowrap;
		transform: translateY(-50%);
	}

	.scroll-container {
		overflow-x: hidden;
		overflow-y: auto;
	}

	.content {
		padding: 16px;

		:deep(.page-description) {
			margin-bottom: 8px;
			color: var(--foreground-subdued);
		}

		:deep(.page-description a) {
			color: var(--primary);
		}
	}

	.expand-icon {
		color: var(--foreground-subdued);
	}
}

.sidebar-detail .v-chip {
	margin-left: 8px;
	&.error {
		--v-chip-color: var(--danger);
		--v-chip-background-color: var(--danger-25);
		--v-chip-color-hover: var(--white);
		--v-chip-background-color-hover: var(--danger);
	}
	&.success {
		--v-chip-color: var(--success);
		--v-chip-background-color: var(--success-25);
		--v-chip-color-hover: var(--white);
		--v-chip-background-color-hover: var(--success);
	}
}
</style>
