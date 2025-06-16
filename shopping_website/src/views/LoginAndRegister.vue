<template>
  <div class="auth-container">
    <div class="form-wrapper feathered-edge">
      <div class="form-header">
        <h1 class="app-title"><font-awesome-icon :icon="['fas', 'leaf']" />绿意生活</h1>
        <h2 class="section-title">{{ isLogin ? '欢迎回来' : '加入我们' }}</h2>
      </div>

      <div class="tabs">
        <button
            :class="['tab-btn', { active: isLogin }]"
            @click="isLogin = true"
        >
          登录
        </button>
        <button
            :class="['tab-btn', { active: !isLogin }]"
            @click="isLogin = false"
        >
          注册
        </button>
      </div>

      <form @submit.prevent="submitForm" class="auth-form">
        <div class="form-group" v-if="!isLogin">
          <label for="name">用户名</label>
          <input
              type="text"
              id="name"
              v-model="formData.name"
              placeholder="输入您的用户名"
              required
              :disabled="loading"
          >
          <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
        </div>

        <div class="form-group">
          <label for="email">邮箱</label>
          <input
              type="email"
              id="email"
              v-model="formData.email"
              placeholder="输入您的邮箱"
              required
              :disabled="loading"
          >
          <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
        </div>

        <div class="form-group">
          <label for="password">密码</label>
          <input
              :type="showPassword ? 'text' : 'password'"
              id="password"
              v-model="formData.password"
              placeholder="输入您的密码"
              required
              :disabled="loading"
          >
          <span class="toggle-password" @click="showPassword = !showPassword">
            <font-awesome-icon :icon="[ 'fas', showPassword ? 'eye-slash' : 'eye' ]" />
          </span>
          <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
        </div>

        <div class="form-group" v-if="!isLogin">
          <label for="confirm-password">确认密码</label>
          <input
              :type="showConfirmPassword ? 'text' : 'password'"
              id="confirm-password"
              v-model="formData.confirmPassword"
              placeholder="再次输入密码"
              required
              :disabled="loading"
          >
          <span class="toggle-password" @click="showConfirmPassword = !showConfirmPassword">
            <font-awesome-icon :icon="[ 'fas', showConfirmPassword ? 'eye-slash' : 'eye' ]" />
          </span>
          <span v-if="errors.confirmPassword" class="error-message">{{ errors.confirmPassword }}</span>
        </div>

        <div class="remember-forgot" v-if="isLogin">
          <label class="remember-me">
            <input type="checkbox" v-model="rememberMe" :disabled="loading">
            <span>记住我</span>
          </label>
          <a href="#" class="forgot-password">忘记密码?</a>
        </div>

        <div v-if="loading" class="loading-container">
          <div class="loader"></div>
          <p>处理中...</p>
        </div>

        <div v-if="error" class="error-card">
          <p>{{ error }}</p>
        </div>

        <button type="submit" class="btn submit-btn" :disabled="loading">
          {{ isLogin ? '登录' : '注册' }}
        </button>

        <div class="divider">
          <span>或</span>
        </div>

        <div class="social-login">
          <button type="button" class="social-btn google">
            <font-awesome-icon :icon="['fab', 'qq']" />
            QQ登录
          </button>
          <button type="button" class="social-btn facebook">
            <font-awesome-icon :icon="['fab', 'weixin']" />
            微信登录
          </button>
        </div>
      </form>

      <p class="toggle-form">
        {{ isLogin ? '还没有账号?' : '已有账号?' }}
        <a href="#" @click.prevent="isLogin = !isLogin">
          {{ isLogin ? '立即注册' : '立即登录' }}
        </a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { registerUser, loginUser } from '@/api/user.js';

import '../assets/css/LoginAndRegister.css'

const router = useRouter();

const isLogin = ref(true);
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const rememberMe = ref(false);
const loading = ref(false);
const error = ref('');

const formData = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
});

const errors = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
});

const validateForm = () => {
  Object.keys(errors).forEach(key => errors[key] = '');

  let isValid = true;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email || !emailRegex.test(formData.email)) {
    errors.email = '请输入有效的邮箱地址';
    isValid = false;
  }

  if (!formData.password || formData.password.length < 6) {
    errors.password = '密码长度至少为6位';
    isValid = false;
  }

  if (!isLogin.value) {
    if (!formData.name || formData.name.length < 3) {
      errors.name = '用户名长度至少为3位';
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = '两次输入的密码不一致';
      isValid = false;
    }
  }

  return isValid;
};

const submitForm = async () => {
  if (!validateForm()) return;

  loading.value = true;
  error.value = '';

  try {
    if (isLogin.value) {
      const credentials = {
        email: formData.email,
        password: formData.password
      };

      const response = await loginUser(credentials);

      localStorage.setItem('authToken', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));

      alert(`登录成功，欢迎回来${response.user.user_name}`);
      window.location.href = '/'
      router.push('/');
    } else {
      const userData = {
        user_name: formData.name,
        email: formData.email,
        user_password: formData.password
      };

      await registerUser(userData);

      alert(`注册成功，欢迎${formData.name}`);
      isLogin.value = true;
    }

    formData.name = '';
    formData.email = '';
    formData.password = '';
    formData.confirmPassword = '';
  } catch (err) {
    console.error('认证错误:', err);
    error.value = err.response?.data?.message || err.message || '发生未知错误，请重试';
  } finally {
    loading.value = false;
  }
};
</script>
