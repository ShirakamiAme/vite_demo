import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginAndRegister.vue'
import ShoppingCart from '@/views/ShoppingCart.vue'

import ProductDetailView from '@/views/ProductDetailView.vue'
import ProductView from '@/views/ProductView.vue'
import CategoryView from '@/views/CategoryView.vue'

const routes = [
    { path: '/', name: 'Home', component: HomeView },
    { path: '/login', name: 'Login', component: LoginView },
    { path: '/shoppingcart', name: 'ShoppingCart', component: ShoppingCart },
    { path: '/products', name: 'Products', component: ProductView },
    { path: '/products/:id', name: 'ProductDetail', component: ProductDetailView },
    { path: '/categories/:category', name: 'Category', component: CategoryView },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
