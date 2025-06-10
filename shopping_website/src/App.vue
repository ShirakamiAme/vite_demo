<template>
  <SiteHeader />
  <CategoriesNav />
  <div class="container">
    <HeroBanner />
    <FeaturedCategories />
    <FeaturedProducts />
    <PromoBanner />
  </div>
  <SiteFooter />
</template>

<script setup>
import SiteHeader from './components/SiteHeader.vue'
import CategoriesNav from './components/CategoriesNav.vue'
import HeroBanner from './components/HeroBanner.vue'
import FeaturedCategories from './components/FeaturedCategories.vue'
import FeaturedProducts from './components/FeaturedProducts.vue'
import PromoBanner from './components/PromoBanner.vue'
import SiteFooter from './components/SiteFooter.vue'
</script>

<style scoped>
.container {
  margin: 30px auto;
}
</style>
