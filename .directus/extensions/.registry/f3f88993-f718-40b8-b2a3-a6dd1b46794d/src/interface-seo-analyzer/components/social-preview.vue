<template>
    <div class="social-preview" :class="`social-preview-${type}`">
        <div class="social-preview-item">
            <div class="social-preview-meta">
                <div class="social-profile-image"></div>
                <div class="social-name">admin</div>
                <div class="social-time">
                    <span>2 hrs</span>
                    <v-icon name="public"></v-icon>
                </div>
            </div>
            <div class="social-preview-item-wrapper">
                <div class="social-preview-image">
                    <img v-if="image" class="social-image-thumbnail" :src="assetURL" alt="">
                    <div v-else class="preview-placeholder">
                        <div class="placeholder-content">
                            <h3>Please upload image</h3>
                            <p>Recommended Size: 1200x628 px</p>
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
<script setup lang="ts">
import { computed } from 'vue';
import useImage from '../composables/use-image'

interface Props {
    title?: string
    image?: string
    description?: string
    type?: string
}

const props = withDefaults(defineProps<Props>(), {
    title: '',
    image: '',
    description: '',
    type: 'facebook'
});

const { idToUrl } = useImage()

const assetURL = computed(() => {
	const id = typeof props.image === 'string' ? props.image : '';
	return idToUrl(id);
});
</script>

<style lang="scss" scoped>
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