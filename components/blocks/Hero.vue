<script setup lang="ts">
import type { BlockHero, BlockButtonGroup } from "~/types";

const { t } = useI18n();

defineProps<{
  data: BlockHero;
}>();
</script>
<template>
  <BlockContainer class="relative grid gap-12 md:grid-cols-3">
    <!-- <h1 style="color: white">{{ data }}</h1> -->

    <!-- Content -->
    <div class="md:pt-12 md:col-span-2">
      <!-- <TypographyTitle v-if="data.title">
				{{ data.title }}
			</TypographyTitle> -->
      <TypographyTitle v-if="t('data.translations[0].title')">
        {{ t("data.translations[0].title") }}
      </TypographyTitle>
      <TypographyHeadline
        v-if="t('data.translations[0].headline')"
        :content="t('data.translations[0].headline')"
        size="title"
        as="h1" />
      <TypographyProse
        v-if="t('data.translations[0].content')"
        :content="t('data.translations[0].content')"
        size="lg"
        class="py-6 font-display" />
      <BlocksButtonGroup
        v-if="data.button_group"
        :data="data.button_group as BlockButtonGroup" />
    </div>
    <!-- Image -->
    <div
      v-if="data.image"
      class="overflow-hidden border lg:relative lg:h-full dark:border-gray-700 rounded-card"
      :class="
        data.image_position === 'left'
          ? 'order-first lg:-ml-48 md:-ml-16'
          : 'lg:-mr-48 md:-mr-16 '
      ">
      <NuxtImg
        v-if="data.image"
        class="w-full overflow-hidden dark:brightness-90 max-h-[700px] h-full object-cover rounded-card"
        :src="data.image as string"
        alt="" />
    </div>
  </BlockContainer>
</template>
