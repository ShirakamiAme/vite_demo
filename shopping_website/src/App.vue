<template>
  <SiteHeader />
  <CategoriesNav v-if="route.path === '/' || route.path === '/products'" />
  <main class="container">
    <router-view />
  </main>
  <SiteFooter v-if="route.path !== '/login'"/>
</template>

<script setup>
import { useRoute } from 'vue-router'
import SiteHeader from '@/components/layout/SiteHeader.vue'
import SiteFooter from '@/components/layout/SiteFooter.vue'
import CategoriesNav from "@/components/layout/CategoriesNav.vue"

const route = useRoute()
</script>

<style scoped>
.container {
  margin: 30px auto;
}
</style>
