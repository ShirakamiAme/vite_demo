<template>
  <header>
    <div class="container header-content">
      <a href="/" class="logo">
        <font-awesome-icon :icon="['fas', 'leaf']" />
        <span>绿意生活</span>
      </a>

      <form class="search">
        <button type="submit" class="search__button">
          <div class="search__icon">
            <!-- 图标1 -->
          </div>
        </button>
        <input
            type="text"
            class="search__input"
            placeholder="搜索商品..."
            aria-label="搜索商品"
        />
        <button class="mic__button" type="button">
          <div class="mic__icon">
            <!-- 图标2 -->
          </div>
        </button>
        <button class="picture__button" type="button">
          <div class="picture__icon">
            <!-- 图标3 -->
          </div>
        </button>
      </form>

      <div class="nav-icons">
        <a
            href="#"
            class="nav-icon"
            :class="LoginStatus ? 'logged_in' : 'not_logged_in'"
            @click.prevent="handleUserIconClick"
        >
          <font-awesome-icon :icon="['fas', 'user']" />
          <span>{{ username }}</span>
        </a>

        <div v-if="showLogoutConfirm" class="logout-confirm-popup">
          <p>确定要退出登录吗？</p>
          <div class="popup-buttons">
            <button class="confirm-btn" @click="logout">确认退出</button>
            <button class="cancel-btn" @click="showLogoutConfirm = false">取消</button>
          </div>
        </div>

        <a href="#" class="nav-icon">
          <font-awesome-icon :icon="['fas', 'heart']" />
        </a>

        <a href="/shoppingcart" class="nav-icon cart-icon">
          <font-awesome-icon :icon="['fas', 'shopping-cart']" />
        </a>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import '../../assets/css/SiteHeader.css'

const LoginStatus = ref(false)
const username = ref('游客')
const showLogoutConfirm = ref(false)

onMounted(() => {
  const userJson = localStorage.getItem('user')
  if (userJson) {
    try {
      const user = JSON.parse(userJson)
      if (user && user.user_name) {
        username.value = user.user_name
        LoginStatus.value = true
      }
    } catch (e) {
      console.error('解析用户数据失败', e)
    }
  }
})

function toggleLogoutConfirm() {
  if (LoginStatus.value) {
    showLogoutConfirm.value = !showLogoutConfirm.value
  }
}

function handleUserIconClick() {
  if (LoginStatus.value) {
    toggleLogoutConfirm()
  } else {
    window.location.href = '/login'
  }
}


function logout() {
  localStorage.removeItem('user')
  localStorage.removeItem('authToken')
  username.value = '游客'
  LoginStatus.value = false
  showLogoutConfirm.value = false
  window.location.href = '/'
}
</script>

