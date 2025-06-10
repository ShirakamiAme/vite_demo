<template>
  <div class="product-card">
    <div class="product-badge" v-if="product.badge">{{ product.badge }}</div>
    <div class="product-img" :style="{ backgroundImage: `url(${product.image})` }"></div>
    <div class="product-info">
      <h3>{{ product.name }}</h3>
      <div class="product-rating">
        <font-awesome-icon
            v-for="i in 5"
            :key="i"
            :icon="getStarIcon(i)"
            :class="{ 'half-star': i === Math.ceil(product.rating) && product.rating % 1 !== 0 }"
        />
        <span>({{ product.reviews }})</span>
      </div>
      <div class="product-price" v-if="product.discountPrice">
        <span class="original-price">{{ product.originalPrice }}</span>
        <span class="discount-price">{{ product.discountPrice }}</span>
      </div>
      <div class="normal-price" v-else>{{ product.price }}</div>
      <div class="add-to-cart">
        <div class="quantity">
          <button @click="decrement">-</button>
          <span>{{ quantity }}</span>
          <button @click="increment">+</button>
        </div>
        <button class="cart-btn" @click="addToCart">
          <font-awesome-icon :icon="['fas', 'shopping-cart']" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const quantity = ref(1)
const emit = defineEmits(['add-to-cart'])

function getStarIcon(index) {
  const rating = props.product.rating;

  if (index <= Math.floor(rating)) {
    return ['fas', 'star'];
  } else if (index === Math.ceil(rating) && rating % 1 !== 0) {
    return ['fas', 'star-half-alt'];
  } else {
    return ['far', 'star'];
  }
}

function increment() {
  if (quantity.value < 10) quantity.value++
}

function decrement() {
  if (quantity.value > 1) quantity.value--
}

function addToCart() {
  emit('add-to-cart', {
    ...props.product,
    quantity: quantity.value
  })
}
</script>

<style scoped>
.product-rating {
  display: flex;
  align-items: center;
  gap: 3px;
}

.half-star {
  color: #FFC107;
}
.product-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: var(--transition);
  position: relative;
}

.product-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0,0,0,0.15);
}

.product-badge {
  position: absolute;
  top: 15px;
  left: 15px;
  background: var(--color4);
  color: white;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  z-index: 2;
}

.product-img {
  height: 200px;
  background-size: cover;
  background-position: center;
}

.product-info {
  padding: 20px;
}

.product-info h3 {
  margin-bottom: 8px;
  font-size: 18px;
}

.product-price {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
}

.original-price {
  text-decoration: line-through;
  color: #888;
  font-size: 16px;
}

.discount-price {
  font-weight: 700;
  color: var(--color4);
  font-size: 20px;
}

.normal-price {
  font-weight: 700;
  color: var(--color4);
  font-size: 20px;
  margin-bottom: 15px;
}

.product-rating {
  color: #FFC107;
  margin-bottom: 15px;
  display: flex;
  gap: 3px;
}

.product-rating span {
  margin-left: 8px;
  color: var(--color5);
  font-size: 14px;
}

.add-to-cart {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.quantity {
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 30px;
  padding: 5px 15px;
}

.quantity button {
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: var(--color5);
}

.quantity span {
  margin: 0 10px;
}

.cart-btn {
  position: relative;
  background: var(--color3);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--transition);
  color: var(--color5);
  z-index: 1;
}

.cart-btn:hover {
  background: var(--color4);
  color: white;
  transform: scale(1.1);
}
</style>
