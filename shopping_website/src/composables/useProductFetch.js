import { ref } from 'vue'
import { getAllProducts } from '@/api/product.js'

export function useProductFetch(initialLimit = 20) {
    const products = ref([])
    const loading = ref(false)
    const error = ref(null)
    const hasMore = ref(true)
    const totalItems = ref(0)

    const page = ref(1)
    const limit = ref(initialLimit)

    const fetchProducts = async (category = null) => {
        if (loading.value || !hasMore.value) return

        const params = {
            page: page.value,
            limit: limit.value,
        }
        if (category) params.category = category

        try {
            loading.value = true
            error.value = null

            const apiResponse = await getAllProducts(params)
            console.log('API 响应:', apiResponse)

            let productsData = []
            let totalCount = 0

            if (apiResponse && apiResponse.data && Array.isArray(apiResponse.data)) {
                productsData = apiResponse.data
                totalCount = apiResponse.meta?.totalItems ?? apiResponse.totalItems ?? 0
            } else if (Array.isArray(apiResponse)) {
                productsData = apiResponse
                totalCount = apiResponse.length
            } else {
                console.warn('无效响应格式', apiResponse)
                productsData = []
                totalCount = 0
            }


            totalItems.value = totalCount

            const loadedSoFar = products.value.length + productsData.length
            hasMore.value = loadedSoFar < totalItems.value

            products.value = [...products.value, ...productsData]
            page.value++

            console.log(`加载 ${productsData.length} 个商品，总计 ${products.value.length}/${totalItems.value}`)
            console.log(`还有更多商品: ${hasMore.value}`)

        } catch (err) {
            error.value = err.message || '获取商品失败'
            console.error('API 错误:', err)
        } finally {
            loading.value = false
        }
    }

    const reset = () => {
        products.value = []
        page.value = 1
        hasMore.value = true
        totalItems.value = 0
        error.value = null
    }

    return {
        products,
        loading,
        error,
        hasMore,
        totalItems,
        fetchProducts,
        reset,
    }
}
