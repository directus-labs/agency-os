import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export const useResetStyle = () => {
    
    const doc = ref(document)

    const router = useRouter()
    const route = useRoute()

    const resetStyle = (to) => {
        const isSEORoute = to.fullPath.includes('seo-settings')
        
        document.body.classList.add(isSEORoute ? 'seo-settings' : '')
        doc.value.documentElement.style.fontSize = isSEORoute ? '16px' : ''
    }
    
    onMounted(() => {
        document.body.classList.add('seo-settings')
        resetStyle(route)
    })

    router.afterEach((to, from, next) => {
        resetStyle(to)
    })

    return {
        doc,
        resetStyle
    }

}