<template>
  <div class="cart-container">
    <div class="cart-header">
      <h1 class="section-title">我的购物车</h1>
      <p class="cart-summary" v-if="isLoggedIn">共 {{ cartItems.length }} 件商品</p>
    </div>

    <div v-if="!isLoggedIn" class="not-logged-in">
      <p>您尚未登录，请先 <a href="/login">登录</a> 查看购物车。</p>
    </div>

    <div v-else class="cart-content">
      <div class="cart-items">
        <div v-if="loading" class="loading-message">正在加载购物车...</div>
        <div v-else-if="error" class="error-message">{{ error }}</div>
        <div v-else-if="cartItems.length === 0" class="empty-cart">购物车为空</div>

        <div v-else>
          <div class="cart-item" v-for="item in cartItems" :key="item.cart_id">
            <div class="item-image">
              <img :src="item.image" :alt="item.name" class="product-img">
            </div>
            <div class="item-details">
              <h3 class="product-name">{{ item.name }}</h3>
            </div>
            <div class="item-price">
              <p class="price">¥{{ item.price_at_add.toFixed(2) }}</p>
            </div>
            <div class="item-quantity">
              <span class="quantity">{{ item.quantity }}</span>
            </div>
            <div class="item-subtotal">
              <p class="subtotal">¥{{ (item.price_at_add * item.quantity).toFixed(2) }}</p>
            </div>
            <div class="item-actions">
              <button class="action-btn delete" @click="removeItem(item)">
                <font-awesome-icon :icon="['fas', 'trash']" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="cart-summary feathered-edge" v-if="cartItems.length > 0">
        <div class="summary-header">
          <h3>订单摘要</h3>
        </div>
        <div class="summary-content">
          <div class="summary-row">
            <span>商品小计</span>
            <span>¥{{ subtotal.toFixed(2) }}</span>
          </div>
          <div class="summary-row">
            <span>运费</span>
            <span>¥{{ shippingFee.toFixed(2) }}</span>
          </div>
          <div class="summary-divider"></div>
          <div class="summary-row total">
            <span>总计</span>
            <span>¥{{ total.toFixed(2) }}</span>
          </div>
        </div>
        <button class="btn checkout-btn" @click="proceedToCheckout">
          前往结账
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from '@/api/axios'

const cartItems = ref([])
const loading = ref(true)
const error = ref(null)

const username = ref('游客')
const isLoggedIn = ref(false)
const userId = ref(null)

const subtotal = computed(() =>
    cartItems.value.reduce((sum, item) => sum + item.quantity * item.price_at_add, 0)
)

const shippingFee = computed(() =>
    subtotal.value > 200 ? 0 : 15
)

const total = computed(() =>
    subtotal.value + shippingFee.value
)

onMounted(async () => {
  const userJson = localStorage.getItem('user')
  if (!userJson) {
    isLoggedIn.value = false
    loading.value = false
    return
  }

  try {
    const user = JSON.parse(userJson)
    if (user && user.user_name) {
      username.value = user.user_name
      isLoggedIn.value = true

      const userRes = await axios.get('/users')
      const foundUser = userRes.data.data.find(
          u => u.user_name === username.value
      )

      if (!foundUser) {
        error.value = '未找到该用户'
        loading.value = false
        return
      }

      userId.value = foundUser.user_id

      const cartRes = await axios.get(`/cart/${userId.value}`)
      if (cartRes.data.status === 'success') {
        cartItems.value = cartRes.data.data
      } else {
        error.value = cartRes.data.message
      }
    }
  } catch (err) {
    console.error(err)
    error.value = '加载购物车失败'
  } finally {
    loading.value = false
  }
})

const removeItem = (item) => {
  console.log("删除商品", item);
};

const proceedToCheckout = () => {
  alert(`即将跳转到结算页面，总计 ¥${total.value.toFixed(2)}`);
};
</script>

<style>
.cart-container {
  max-width: 1400px;
  margin: 40px auto;
  padding: 0 20px;
}

.cart-header {
  margin-bottom: 30px;
  border-bottom: 2px solid var(--color3);
  padding-bottom: 20px;
}

.cart-summary {
  color: var(--color4);
  font-size: 18px;
  margin-top: 10px;
}

.cart-content {
  display: flex;
  gap: 30px;
}

.cart-items {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.cart-item {
  display: flex;
  background: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: var(--shadow);
  transition: var(--transition);
  align-items: center;
}

.cart-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.12);
}

.item-image {
  width: 120px;
  height: 120px;
  margin: 0 20px;
  border-radius: 10px;
  overflow: hidden;
}

.product-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--transition);
}

.product-img:hover {
  transform: scale(1.05);
}

.item-details {
  flex: 1;
  padding-right: 20px;
}

.product-name {
  font-family: 'Playfair Display', serif;
  font-size: 20px;
  color: var(--color5);
  margin-bottom: 8px;
}

.item-price {
  width: 120px;
  text-align: right;
  padding-right: 20px;
}

.price {
  font-size: 18px;
  font-weight: 700;
  color: var(--color4);
}

.item-quantity {
  width: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.quantity {
  min-width: 30px;
  text-align: center;
  font-weight: 500;
}

.item-subtotal {
  width: 100px;
  text-align: right;
  padding-right: 20px;
}

.subtotal {
  font-size: 18px;
  font-weight: 700;
  color: var(--color5);
}

.item-actions {
  width: 80px;
  display: flex;
  gap: 10px;
}

.action-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: var(--color1);
  color: var(--color4);
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-btn:hover {
  background: var(--color3);
  color: white;
}

.delete:hover {
  background: #ff6b6b;
}

.cart-summary.feathered-edge {
  width: 350px;
  background: white;
  border-radius: 15px;
  padding: 25px;
  box-shadow: var(--shadow);
  position: relative;
}

.summary-header {
  border-bottom: 2px solid var(--color2);
  padding-bottom: 15px;
  margin-bottom: 20px;
}

.summary-header h3 {
  font-family: 'Playfair Display', serif;
  font-size: 24px;
  color: var(--color5);
}

.summary-content {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 25px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  color: var(--color5);
}

.summary-divider {
  height: 1px;
  background: var(--color2);
  margin: 10px 0;
}

.total {
  font-weight: 700;
  font-size: 20px;
  margin-top: 10px;
}

.checkout-btn {
  width: 100%;
  padding: 16px;
  font-size: 18px;
  font-weight: 600;
}

.not-logged-in {
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: #666;
}

.loading-message,
.error-message,
.empty-cart {
  text-align: center;
  padding: 40px;
  font-size: 18px;
}

.error-message {
  color: #ff6b6b;
}

/* 响应式设计 */
@media (max-width: 992px) {
  .cart-content {
    flex-direction: column;
  }

  .cart-summary.feathered-edge {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .cart-item {
    flex-wrap: wrap;
    position: relative;
    padding: 15px;
  }

  .item-image {
    width: 80px;
    height: 80px;
    margin: 0 10px 0 0;
  }

  .item-price {
    width: auto;
    position: absolute;
    top: 20px;
    right: 20px;
  }

  .item-quantity {
    width: auto;
    margin: 10px 0;
  }

  .item-subtotal {
    width: auto;
    margin-right: 40px;
  }

  .item-actions {
    position: absolute;
    top: 15px;
    right: 15px;
  }
}

@media (max-width: 576px) {
  .cart-header {
    text-align: center;
  }

  .section-title {
    font-size: 28px;
  }

  .cart-item {
    padding: 15px 10px;
  }

  .item-details {
    padding-right: 10px;
  }
}
</style>
