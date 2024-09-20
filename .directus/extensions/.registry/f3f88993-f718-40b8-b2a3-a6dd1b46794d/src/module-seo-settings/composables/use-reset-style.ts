import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export const useResetStyle = () => {

    const router = useRouter()
    const route = useRoute()

    const resetStyle = (to) => {
        const isSEORoute = to.fullPath.includes('seo-settings')
        
        document.body.classList.add(isSEORoute ? 'seo-settings' : '')
        document.documentElement.style.fontSize = isSEORoute ? '16px' : ''
    }

    resetStyle(route)

    router.afterEach((to, from, next) => {
        resetStyle(to)
    })


}