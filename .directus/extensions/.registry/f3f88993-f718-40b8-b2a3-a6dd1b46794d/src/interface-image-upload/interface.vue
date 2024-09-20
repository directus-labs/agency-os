<template>
    <div>
        <div class="field full">
            <div class="custom-upload">
                <div class="content wrap-view space-y-6">
                    <div class="space-y-4">
						<div class="image group relative">
							<div v-if="value" class="image-preview">

								<v-image
									:src="addTokenToURL(`/assets/${value}`)"
									:width="image?.width"
									:height="image?.height"
									alt=""
									role="presentation"
								/>
							</div>
							<div :class="{'absolute inset-0 opacity-0 group-hover:opacity-100': value}">
								<v-upload from-library from-url @input="uploaded"></v-upload>
								<div v-if="value" class="absolute right-4 top-4">
									<v-button
										v-tooltip="t('deselect')"
										icon
										rounded
										@click="deselect"
										:style="{
											'--v-button-background-color': 'var(--danger)',
											'--v-button-background-color-hover': 'var(--danger-110)',
										}">
										<v-icon name="close" />
									</v-button>
								</div>
							</div>
						</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref } from "vue";
import { useI18n } from 'vue-i18n';
import useDirectusToken from "../shared/composables/use-directus-token";



const props = defineProps({
	value: {
		type: String
    }
});

const emit = defineEmits(["input"])
const { addTokenToURL } = useDirectusToken()
const { t } = useI18n()

const image = ref()

const uploaded = (data) => {
	console.log('image data.id', data.id);
	image.value = data
    emit("input", data.id)
}

const deselect = () => emit('input', null)
</script>

<style lang="scss" scoped>
.image-preview {
	position: relative;
	width: 100%;
	height: var(--input-height-tall);
	overflow: hidden;
	background-color: var(--background-normal-alt);
	border-radius: var(--border-radius);
}

img {
	z-index: 1;
	width: 100%;
	height: 100%;
	max-height: inherit;
	object-fit: contain;
}

.is-svg {
	padding: 32px;

	img {
		object-fit: contain;
	}
}

.image-error {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100%;
	color: var(--foreground-subdued);
	background-color: var(--background-normal);
	padding: 32px;

	.v-icon {
		margin-bottom: 6px;
	}

	.message {
		max-width: 300px;
		padding: 0 16px;
		text-align: center;
	}
}

.image-preview {
	.shadow {
		position: absolute;
		bottom: 0;
		left: 0;
		z-index: 2;
		width: 100%;
		height: 40px;
		overflow: hidden;
		line-height: 1;
		white-space: nowrap;
		text-overflow: ellipsis;
		background: linear-gradient(180deg, rgb(38 50 56 / 0) 0%, rgb(38 50 56 / 0.25) 100%);
		transition: height var(--fast) var(--transition);
	}

	.actions {
		--v-button-color: var(--foreground-subdued);
		--v-button-background-color: var(--white);
		--v-button-color-hover: var(--foreground-normal);
		--v-button-background-color-hover: var(--white);

		position: absolute;
		top: calc(50% - 32px);
		left: 0;
		z-index: 3;
		display: flex;
		justify-content: center;
		width: 100%;

		.v-button {
			margin-right: 12px;
			transform: translateY(10px);
			opacity: 0;
			transition: var(--medium) var(--transition);
			transition-property: opacity transform;

			@for $i from 0 through 4 {
				&:nth-of-type(#{$i + 1}) {
					transition-delay: $i * 25ms;
				}
			}
		}

		.v-button:last-child {
			margin-right: 0px;
		}
	}

	.info {
		position: absolute;
		bottom: 0;
		left: 0;
		z-index: 3;
		width: 100%;
		padding: 8px 12px;
		line-height: 1.2;
	}

	.title {
		color: var(--white);
	}

	.meta {
		height: 17px;
		max-height: 0;
		overflow: hidden;
		color: rgb(255 255 255 / 0.75);
		transition: max-height var(--fast) var(--transition);
	}
}

.image-preview:focus-within,
.image-preview:hover {
	.shadow {
		height: 100%;
		background: linear-gradient(180deg, rgb(38 50 56 / 0) 0%, rgb(38 50 56 / 0.5) 100%);
	}

	.actions .v-button {
		transform: translateY(0px);
		opacity: 1;
	}

	.meta {
		max-height: 17px;
	}
}

.image {
	&.full,
	&.fill {
		.image-preview {
			height: auto;
			max-height: 400px;
		}
	}

	&.crop {
		.image-preview {
			img {
				object-fit: cover;
			}
		}
	}
}

.disabled-placeholder {
	height: var(--input-height-tall);
}

.fallback {
	background-color: var(--background-normal);
	display: flex;
	align-items: center;
	justify-content: center;
	height: var(--input-height-tall);
	border-radius: var(--border-radius);
}
</style>
