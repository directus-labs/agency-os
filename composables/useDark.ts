import { useDark, useToggle } from '@vueuse/core'

export default function useDarkMode() {
  const isDark = useDark()
  const toggleDark = useToggle(isDark)

  return {
    isDark,
    toggleDark,
  }
}
