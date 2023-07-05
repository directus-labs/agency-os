<script setup lang="ts">
import { ref, reactive } from 'vue'
import { HelpFeedback } from '~~/types'
const session = useCookie('session')
const route = useRoute()

const props = defineProps<{ title: string; url: string }>()

const loading = ref(false)
const error = ref<any>(null)
const success = ref(false)

const feedback = reactive<HelpFeedback>({
  id: null,
  rating: null,
  comments: null,
})

const ratingOptions = [
  {
    label: 'Worst 😭',
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
]

function getRatingOption(rating: number) {
  return ratingOptions.find((option) => option.value === rating)
}

async function handleSubmission(rating?: number) {
  loading.value = true
  if (rating) feedback.rating = rating

  const body = {
    id: feedback.id,
    rating: feedback.rating,
    comments: feedback.comments,
    title: props.title,
    url: props.url,
    visitor_id: session.value.id,
  }

  try {
    const { data } = await useFetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify(body),
    })

    console.log(data.value)

    feedback.id = data.value.id

    // If the reponse has comments, we can assume they've completed the second step.
    if (data.value.comments) {
      success.value = true
    }
  } catch (err) {
    error.value = err
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="">
    <Transition name="fade" mode="out-in">
      <!-- Ask For Rating -->

      <div v-if="!feedback.rating" class="step">
        <TypographyHeadline content="How helpful was this article?" size="sm" />
        <div class="mt-4 space-x-4">
          <VButton
            v-for="item in ratingOptions"
            :key="item.value"
            variant="default"
            size="sm"
            @click="handleSubmission(item.value)"
          >
            <span>{{ item.label }}</span>
          </VButton>
        </div>
      </div>
      <!-- Ask For Comments -->

      <div v-else-if="feedback.rating && !success" class="space-y-4">
        <p class="font-mono dark:text-gray-200">This article is:</p>
        <div class="space-x-4">
          <span class="font-mono text-xl font-bold dark:text-white">
            {{ getRatingOption(feedback.rating)?.label }}
          </span>
          <VButton
            variant="outline"
            size="xs"
            @click="feedback.rating = undefined"
          >
            <Icon name="heroicons:x-mark" class="w-5 h-5" />
          </VButton>
        </div>

        <TypographyHeadline
          :content="getRatingOption(feedback.rating)?.message"
          size="sm"
        />
        <FormKit type="textarea" v-model="feedback.comments" autofocus />
        <VButton
          variant="primary"
          size="md"
          :disabled="!feedback.comments"
          @click="handleSubmission()"
        >
          Send Us Your Feedback
        </VButton>
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
