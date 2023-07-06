import { generateId } from '~~/utils/strings'

export interface Session {
  id: string
  date_created: string
}

export default defineNuxtRouteMiddleware((to, from) => {
  // Create a unique session ID for each visitor to track feedback through /help/articles/[slug] and Chat Widget
  const session = useCookie('session')

  if (!session.value) {
    const newSession = {
      id: generateId(),
      date_created: new Date().toISOString(),
    }
    session.value = newSession
  }
})
