import { generateId } from '~~/utils/strings'
export default defineNuxtRouteMiddleware((to, from) => {
  const session = useCookie('session')
  if (!session.value) {
    const newSession = {
      id: generateId(),
      date_created: new Date().toISOString(),
    }
    session.value = newSession
  }
})
