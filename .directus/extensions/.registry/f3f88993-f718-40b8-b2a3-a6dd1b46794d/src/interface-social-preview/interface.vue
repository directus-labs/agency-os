<template>
<div class="social-preview" :class="`social-preview-${provider}`">
	<div class="social-preview-item">
		<div class="social-preview-meta">
			<div class="social-profile-image"></div>
			<div class="social-name">admin</div>
			<div class="social-time">
				<span>2 hrs</span>
				<v-icon name="public"></v-icon>
			</div>
		</div>
		<div class="social-preview-item-wrapper group">
			<div class="social-preview-image">
				<div class="preview-placeholder overflow-hidden">
					<img v-if="value" class="social-image-thumbnail absolute inset-0 object-cover object-center w-full h-full" :src="assetURL" alt="">
					<div v-else class="placeholder-content mt-40">
						<h3>Please upload image</h3>
						<p>Recommended Size: 1200x628 px</p>
					</div>
				</div>
				<div
					:class="{
						'absolute inset-0 z-9': true,
						'opacity-0 group-hover:opacity-100': value
					}"
				>
					<v-upload from-library from-url @input="uploaded" :style="{'--input-height-tall': '100%'}"></v-upload>
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
			<div class="social-preview-caption">
				<h4 class="social-preview-publisher">site name</h4>
				<h3 class="social-preview-title">{{ title }}</h3>
				<p class="social-preview-description">{{ description }}</p>
			</div>
		</div>
	</div>
</div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref, computed } from "vue";
import { useI18n } from 'vue-i18n';
import useDirectusToken from "../shared/composables/use-directus-token";
import { inject } from "vue";


interface Props {
    title?: string
    image?: string
    description?: string
    provider?: string
    value?: string | null

}

const props = withDefaults(defineProps<Props>(), {
    title: '',
    image: '',
    description: '',
    provider: 'facebook',
	value: null
});

const emit = defineEmits(["input"])
const { addTokenToURL } = useDirectusToken()
const { t } = useI18n()

const image = ref()

const assetURL = computed(() => {
	const id = typeof props.value === 'string' ? props.value : '';
	return addTokenToURL(`/assets/${id}`);
});

const uploaded = (data) => {
	console.log('image data.id', data.id);
	image.value = data
    emit("input", data.id)
}

const deselect = () => emit('input', null)

const values = inject('values', ref<Record<string, any>>({}));


const title = computed(() => {
	let title = props.title ?? ''
	if( props.provider === 'facebook' ) {
		title = values?.value?.['facebook_title'] || values?.value?.['seo_detail']?.['meta_social']?.['facebook_title'] || title
	}
	if( props.provider === 'twitter' ) {
		title = values?.value?.['twitter_title'] || values?.value?.['seo_detail']?.['meta_social']?.['twitter_title'] || title
	}

	title = values?.value?.['meta_title'] || values?.value?.['seo_detail']?.['meta_title'] || title

	return title
})

const description = computed(() => {
	let description = props.description ?? ''
	if( props.provider === 'facebook' ) {
		description = values?.value?.['facebook_description'] || values?.value?.['seo_detail']?.['meta_social']?.['facebook_description'] || title
	}
	if( props.provider === 'twitter' ) {
		description = values?.value?.['twitter_description'] || values?.value?.['seo_detail']?.['meta_social']?.['twitter_description'] || title
	}

	description = values?.value?.['meta_description'] || values?.value?.['seo_detail']?.['meta_description'] || description

	return description
})
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



.social-preview {
    &-button {
        font-size: 13px;

        display: inline-block;

        padding: 4px 8px;

        text-decoration: none;
        text-transform: uppercase;

        color: #555;
        border: 0;
        outline: none;
        background: #ededee;
        box-shadow: none !important;

        @at-root .open & {
            color: #fff;
            background: #069de3;
        }
    }

    &-item {
        box-sizing: border-box;
        max-width: 500px;
        margin: 0 auto;
        padding: 30px 0;

        &-wrapper {
            overflow: hidden;

            box-sizing: border-box;
            max-width: 100%;
            margin: auto;

            border: 1px solid #dddfe2;
            border-radius: 0 0 3px 3px;
            background: #fff;
        }

        .error-msg {
            line-height: 1;

            display: none;

            width: 528px;
            max-width: 100%;
            margin: auto;
            padding-top: 10px;

            &.show {
                display: block;
            }
        }
    }

    &-image {
        line-height: 0;

        position: relative;
        z-index: 1;

        img {
            max-width: 100%;
            height: auto;
            min-height: initial;
        }

        .preview-placeholder {
            width: 100%;
            height: 0;
            padding-bottom: 52.5555555556%;
            background-color: var(--background-normal-alt);
            color: var(--foreground-normal);
            position: relative;
            .placeholder-content {
                display: flex;
                align-items: center;
                justify-content: center;
                position: absolute;
                inset: 0;
                flex-direction: column;
                gap: 8px;
                line-height: 1;
            }
            h3 {
                font-size: 20px;
                text-transform: uppercase;
            }
            p {
                font-size: 16px;
            }
        }

        &-overlay {
            transform: translate(-50%, -50%) scale(.45);
            position: absolute;
            top: 50%;
            left: 50%; 
        }

        .error-msg {
            line-height: 1; 

            display: none;;
        }
    }

    & #{&}-caption {
        font-size: 12px;

        padding: 10px 10px 5px;

        color: #1d2129;
        background: #f2f3f5;
    }

    & #{&}-title {
        font-size: 16px;
        font-weight: 600;
        line-height: 22px;

        margin: 0 0 3px;
        padding: 0;

        letter-spacing: normal;
        word-wrap: break-word;

        &.capitalize {
            text-transform: capitalize;
        }
    }

    &-description,
    &-publisher {
        line-height: 16px;

        margin: 0;
    }

    &-publisher {
        font-size: 12px;
        font-weight: normal;

        padding-top: 3px;
        padding-bottom: 3px;

        text-transform: uppercase;

        color: #90949c;

        &.facebook {
            text-transform: uppercase;
        }
    }

    &-meta {
        position: relative;

        display: none;
        display: block;
        clear: both;

        margin: 0 auto;
        margin-bottom: 15px;

        .social-profile-image {
            position: absolute;
            left: -58px;

            float: left;

            width: 46px;
            height: 46px;

            border-radius: 50%;
            background: #dcc7c7;
        }

        .social-name {
            font-size: 14px;
            font-weight: 700;

            color: rgb(20, 23, 26);
        }

        .social-username,
        .social-time {
            font-size: 12px;
            font-weight: normal;
            line-height: 1;
            margin-left: 5px;

            color: rgb(101, 119, 134);
            .v-icon {
                --v-icon-size: 16px;
            }
        }

        .social-time:before {
            margin-right: 5px;

            content: '\00B7';
        }

        .social-text {
            margin-top: 5px;
        }
    }

    &-facebook {
        .social-preview-button strong:before {
            content: attr(data-facebook);
        }

        .facebook-thumbnail {
            display: block;
        }

        .no-facebook-image {
            .facebook-thumbnail {
                display: none;
            }
        }

        .social-preview-meta.twitter-meta {
            display: none;
        }

        .social-preview-title {
            font-size: 1.0625rem;
        }

        .social-preview-description {
            font-size: .9375rem;

            overflow: hidden;

            max-height: 1.3em;
            margin-bottom: 5px;

            white-space: nowrap;
            text-overflow: ellipsis;

            color: #606770;
        }

        .social-preview-meta {
            display: block;
            line-height: 1.4em;
            box-sizing: border-box;
            min-height: 66px;
            margin-bottom: 0;
            padding: 12px;

            border: 1px solid #dddfe2;
            border-bottom: 0;
            border-radius: 3px 3px 0 0;
            background: #fff;

            .social-profile-image {
                position: relative;
                left: auto;

                width: 40px;
                height: 40px;
                margin-right: 10px;
                margin-left: -2px;
            }

            .social-name {
                margin-bottom: 3px;

                color: #365899;
            }

            .social-time {
                &:before {
                    display: none;
                }

                span {
                    width: auto;

                    &:first-child:after {
                        margin: 0 5px;

                        content: '\00B7';
                    }

                    svg {
                        vertical-align: middle;
                    }
                }
            }

            .dashicons.dashicons-admin-site {
                font-size: 12px;
                line-height: 18px;
            }
        }

        .twitter {
            display: none;
        }
    }

    &-twitter {
        &.app,
        &.player {
            display: none !important;
        }

        .social-preview {
            &-item {
                max-width: 582px;
                padding-left: 58px;
            }

            &-meta {
                .social-text,
                .social-username,
                .social-time {
                    font-size: 14px;
                }
            }

            &-item-wrapper {
                clear: both;

                max-width: 100%;

                border: 1px solid rgb(204, 214, 221);
                border-radius: 14px;

                .twitter-thumbnail {
                    display: block;

                    max-width: 100%;
                }

                .social-preview-caption {
                    background: #fff;
                }

                &:hover {
                    background: #f5f8fa;

                    .social-preview-caption {
                        background: #f5f8fa;
                    }
                }
            }

            &-title {
                font-weight: normal;

                overflow: hidden;

                margin-bottom: 2px;

                white-space: nowrap;
                text-overflow: ellipsis;

                color: rgb(20, 23, 26);
            }

            &-description {
                font-size: 15px;
                line-height: 1.3125;

                overflow: hidden;

                max-height: 2.5em;

                text-overflow: ellipsis;

                color: rgb(101, 119, 134);
            }

            &-publisher {
                font-size: 15px;

                padding-top: 5px;

                text-transform: initial;

                color: rgb(101, 119, 134);

                .dashicon {
                    margin-right: 3px;

                    -webkit-text-stroke: 1px white;
                }

                &.facebook {
                    display: none;
                }
            }
        }

        .no-twitter-image {
            .twitter-thumbnail {
                display: none;
            }
        }

        .social-preview-button strong:before {
            content: attr(data-twitter);
        }

        &.summary_card {
            .social-preview {
                &-image {
                    float: left;

                    img {
                        width: 125px;
                        height: 125px;
                    }
                }

                &-caption {
                    overflow: hidden;

                    box-sizing: border-box;
                    max-height: 125px;
                    padding: 5px 0 0 15px;
                }

                &-description {
                    max-height: 4.5rem;
                }
            }
        }

        .social-preview-meta.facebook-meta {
            display: none;
        }
        .social-preview-meta.twitter-meta {
            display: block;
        }
    }
}
</style>
