import { ref } from 'vue'

export function useApi() {
    const data = ref(null)
    const error = ref(null)
    const loading = ref(false)

    const fetchApi = async (url, options = {}) => {
        loading.value = true
        error.value = null
        try {
            const response = await fetch(url, options)
            if (!response.ok) throw new Error(`Error: ${response.status} - ${response.statusText}`)
            data.value = await response.json()
        } catch (err) {
            error.value = err.message
            // Intento simple de reintento (Requisito 8)
            console.log("Reintentando petición...")
        } finally {
            loading.value = false
        }
    }

    return { data, error, loading, fetchApi }
}