<template>
  <div>
    <h1>商品详情</h1>
    <pre>{{ product }}</pre>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getProductById } from '@/api/product.js'

const route = useRoute()
const product = ref(null)

onMounted(async () => {
  product.value = await getProductById(route.params.id)
})
</script>
