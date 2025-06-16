<template>
  <div class="product-view">
    <h1>全部商品</h1>

    <div v-if="loading && products.length === 0" class="loading-container">
      <div class="loader"></div>
      <p>加载商品中...</p>
    </div>

    <div v-else-if="error" class="error-card">
      <h3>加载失败</h3>
      <p>{{ error }}</p>
      <button @click="fetchProducts">重试</button>
    </div>

    <div v-else-if="products.length === 0" class="empty-state">
      <p>暂无商品数据</p>
    </div>

    <div v-else class="product-grid">
      <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
          @add-to-cart="handleAddToCart"
      />
    </div>

    <div v-if="loading && products.length > 0" class="loading-more">
      <div class="loader small"></div>
      <p>加载更多商品中...</p>
    </div>

    <div v-else-if="!hasMore && products.length > 0" class="no-more">
      <p>没有更多商品了 (共 {{ totalItems }} 件商品)</p>
    </div>

    <div v-else-if="hasMore && !loading" class="load-more-container">
      <button @click="fetchProducts" class="load-more-btn">加载更多</button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, onBeforeUnmount } from 'vue'
import { useProductFetch } from '@/composables/useProductFetch.js'
import ProductCard from '@/components/common/ProductCard.vue'

const {
  products,
  loading,
  error,
  hasMore,
  totalItems,
  fetchProducts,
} = useProductFetch(99999)

const scrollContainer = ref(null)

onMounted(() => {
  fetchProducts()
  scrollContainer.value = window
  scrollContainer.value.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  scrollContainer.value?.removeEventListener('scroll', handleScroll)
})

let currentPage = ref(1)
const pageSize = ref(20)

function handleScroll() {
  if (loading.value || !hasMore.value) return

  const scrollY = window.scrollY
  const visibleHeight = window.innerHeight
  const pageHeight = document.documentElement.scrollHeight
  const threshold = 200

  if (scrollY + visibleHeight >= pageHeight - threshold) {
    currentPage.value++
    fetchProducts(currentPage.value, pageSize.value)
  }
}


function handleAddToCart(item) {
  console.log('添加到购物车:', item)
}
</script>

<style scoped>
.load-more-container {
  text-align: center;
  margin: 30px 0;
}

.load-more-btn {
  background: var(--color5);
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 30px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.load-more-btn:hover {
  background: var(--color3);
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
}

.no-more p {
  color: #666;
  font-style: italic;
}
</style>
