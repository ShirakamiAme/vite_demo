<template>
  <div class="category-view">
    <h1>{{ categoryName || '所有分类' }}</h1>

    <div v-if="loading && products.length === 0" class="loading-container">
      <div class="loader"></div>
      <p>加载商品中...</p>
    </div>

    <div v-else-if="error" class="error-card">
      <h3>加载失败</h3>
      <p>{{ error }}</p>
      <button @click="fetchCategoryProducts">重试</button>
    </div>

    <div v-else-if="products.length === 0" class="empty-state">
      <p>该分类下暂无商品</p>
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
      <p>没有更多商品了</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useProductFetch } from '@/composables/useProductFetch.js'
import ProductCard from '@/components/common/ProductCard.vue'

import '../assets/css/category.css';

const route = useRoute()
const category = route.params.category

const {
  products,
  loading,
  error,
  hasMore,
  fetchProducts,
  reset
} = useProductFetch()

const categoryName = computed(() => {
  if (!category) return null
  return decodeURIComponent(category)
})

const fetchCategoryProducts = () => {
  reset()
  fetchProducts(category)
}

onMounted(() => {
  fetchCategoryProducts()
})

watch(() => route.params.category, (newCategory) => {
  if (newCategory !== category) {
    fetchCategoryProducts()
  }
})

function handleAddToCart(item) {
  console.log('添加到购物车:', item)
}
</script>

<style scoped>
.category-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
</style>
