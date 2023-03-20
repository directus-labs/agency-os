import { useThrottleFn } from '@vueuse/core'

export default function useScroll() {
  const progress = ref(0)

  const updateProgress = useThrottleFn(() => {
    const bodyHeight =
      document.body.clientHeight - document.documentElement.clientHeight
    const scrollPosition = window.scrollY

    progress.value = scrollPosition / bodyHeight
  }, 50)

  onMounted(() => {
    window.addEventListener('scroll', updateProgress)
  })
  onUnmounted(() => {
    window.removeEventListener('scroll', updateProgress)
  })

  return { progress: readonly(progress) }
}
