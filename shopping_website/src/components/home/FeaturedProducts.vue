<template>
  <section class="featured-products">
    <h2 class="section-title">热门商品</h2>
    <div class="products-grid">
      <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
          @add-to-cart="handleAddToCart"
      />
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import ProductCard from '../common/ProductCard.vue'

const products = ref([
  {
    id: 1,
    name: '有机冷压椰子油',
    badge: '热卖',
    image: 'https://images.unsplash.com/photo-1506806732259-39c2d0268443?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80',
    rating: 4.5,
    reviews: 142,
    originalPrice: '¥128.00',
    discountPrice: '¥98.00',
    price: null
  }
]);


function handleAddToCart(product) {
  console.log('添加到购物车:', product)
}
</script>

<style scoped>
.featured-products {
  margin: 60px 0;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px;
}
</style>
