<template>
  <div class="product-card">
    <div
        class="product-badge"
        v-if="product.discount > 0"
    >
      -{{ Math.round(product.discount * 100) }}%
    </div>

    <div
        class="product-img"
        :style="{ backgroundImage: `url(${product.image})` }"
    ></div>

    <div class="product-info">
      <h3>{{ product.name }}</h3>

      <div class="product-rating">
        <font-awesome-icon
            v-for="i in 5"
            :key="i"
            :icon="getStarIcon(i)"
            :class="{ 'half-star': i === Math.ceil(product.rating) && product.rating % 1 !== 0 }"
        />
      </div>

      <div class="product-price" v-if="product.discount > 0">
        <span class="original-price">${{ product.original_price }}</span>
        <span class="discount-price">
          ${{ calculateDiscountPrice(product.original_price, product.discount) }}
        </span>
      </div>
      <div class="normal-price" v-else>
        ${{ product.original_price }}
      </div>

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

      <div class="stock-info">
        Stock: {{ product.stock }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from '@/api/axios'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const quantity = ref(1)
const emit = defineEmits(['add-to-cart'])

function calculateDiscountPrice(originalPrice, discount) {
  return (originalPrice * (1 - discount)).toFixed(2)
}

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
  if (quantity.value < Math.min(10, props.product.stock)) {
    quantity.value++
  }
}

function decrement() {
  if (quantity.value > 1) quantity.value--
}

async function addToCart() {
  try {
    const userJson = localStorage.getItem('user')
    if (!userJson) {
      alert('请先登录后再添加商品到购物车')
      return
    }

    const user = JSON.parse(userJson)
    if (!user || !user.user_name) {
      alert('用户信息无效，请重新登录')
      return
    }

    const userRes = await axios.get('/users')
    const foundUser = userRes.data.data.find(u => u.user_name === user.user_name)

    if (!foundUser) {
      alert('未找到该用户，请重新登录')
      return
    }

    const userId = foundUser.user_id

    const actualPrice = props.product.discount > 0
        ? parseFloat(calculateDiscountPrice(props.product.original_price, props.product.discount))
        : parseFloat(props.product.original_price)

    // 修复字段名以匹配后端API要求
    const cartItem = {
      cart_user_id: userId, // 后端要求 cart_user_id 而非 user_id
      product_id: props.product.id, // 确保使用正确的产品ID字段
      quantity: quantity.value,
      price_at_add: actualPrice
    }

    // 添加调试信息
    console.log('发送到后端的购物车数据:', cartItem)

    const response = await axios.post('/cart', cartItem)

    if (response.data.status === 'success') {
      emit('add-to-cart', {
        ...props.product,
        quantity: quantity.value,
        actualPrice
      })

      alert('商品已成功添加到购物车！')
    } else {
      throw new Error(response.data.message || '未知错误')
    }
  } catch (error) {
    console.error('添加到购物车失败:', error)
    console.error('错误详情:', error.response?.data)
    alert(`添加到购物车失败: ${error.response?.data?.message || error.message || '请稍后再试'}`)
  }
}
</script>

<style scoped>
.stock-info {
  margin-top: 8px;
  font-size: 14px;
  color: #666;
}

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
