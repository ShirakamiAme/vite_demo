<template>
  <div class="auth-container">
    <div class="form-wrapper feathered-edge">
      <div class="form-header">
        <h1 class="app-title">生态绿意</h1>
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
          >
        </div>

        <div class="form-group">
          <label for="email">邮箱</label>
          <input
              type="email"
              id="email"
              v-model="formData.email"
              placeholder="输入您的邮箱"
              required
          >
        </div>

        <div class="form-group">
          <label for="password">密码</label>
          <input
              :type="showPassword ? 'text' : 'password'"
              id="password"
              v-model="formData.password"
              placeholder="输入您的密码"
              required
          >
          <span class="toggle-password" @click="showPassword = !showPassword">
            <i :class="['icon', showPassword ? 'icon-eye-off' : 'icon-eye']"></i>
          </span>
        </div>

        <div class="form-group" v-if="!isLogin">
          <label for="confirm-password">确认密码</label>
          <input
              :type="showConfirmPassword ? 'text' : 'password'"
              id="confirm-password"
              v-model="formData.confirmPassword"
              placeholder="再次输入密码"
              required
          >
          <span class="toggle-password" @click="showConfirmPassword = !showConfirmPassword">
            <i :class="['icon', showConfirmPassword ? 'icon-eye-off' : 'icon-eye']"></i>
          </span>
        </div>

        <div class="remember-forgot" v-if="isLogin">
          <label class="remember-me">
            <input type="checkbox" v-model="rememberMe">
            <span>记住我</span>
          </label>
          <a href="#" class="forgot-password">忘记密码?</a>
        </div>

        <button type="submit" class="btn submit-btn">
          {{ isLogin ? '登录' : '注册' }}
        </button>

        <div class="divider">
          <span>或</span>
        </div>

        <div class="social-login">
          <button type="button" class="social-btn google">
            <i class="icon icon-google"></i>
            Google
          </button>
          <button type="button" class="social-btn facebook">
            <i class="icon icon-facebook"></i>
            Facebook
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

const isLogin = ref(true);
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const rememberMe = ref(false);

const formData = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
});

const submitForm = () => {
  if (isLogin.value) {
    console.log('登录请求:', {
      email: formData.email,
      password: formData.password,
      rememberMe: rememberMe.value
    });
    alert(`登录成功，欢迎回来${formData.email}`);
  } else {
    if (formData.password !== formData.confirmPassword) {
      alert('两次输入的密码不一致');
      return;
    }
    console.log('注册请求:', formData);
    alert(`注册成功，欢迎${formData.name}`);
  }

  formData.name = '';
  formData.email = '';
  formData.password = '';
  formData.confirmPassword = '';
};
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background-color: var(--color1);
}

.form-wrapper {
  width: 100%;
  max-width: 500px;
  background-color: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: var(--shadow);
  position: relative;
  overflow: hidden;
}

.form-header {
  text-align: center;
  margin-bottom: 30px;
}

.app-title {
  font-family: 'Playfair Display', serif;
  font-size: 36px;
  color: var(--color5);
  margin-bottom: 10px;
  letter-spacing: -0.5px;
}

.section-title {
  font-family: 'Playfair Display', serif;
  font-size: 28px;
  color: var(--color4);
  margin-bottom: 15px;
  position: relative;
}

.section-title::after {
  content: "";
  display: block;
  width: 60px;
  height: 3px;
  background: var(--color3);
  margin: 10px auto;
  border-radius: 2px;
}

.tabs {
  display: flex;
  margin-bottom: 25px;
  border-bottom: 1px solid var(--color2);
}

.tab-btn {
  flex: 1;
  padding: 12px 0;
  background: none;
  border: none;
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 18px;
  font-weight: 500;
  color: var(--color5);
  cursor: pointer;
  transition: var(--transition);
  position: relative;
}

.tab-btn.active {
  color: var(--color4);
  font-weight: 700;
}

.tab-btn.active::after {
  content: "";
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--color4);
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  position: relative;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: var(--color5);
}

.form-group input {
  width: 100%;
  padding: 14px 16px;
  border: 1px solid var(--color2);
  border-radius: 10px;
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 16px;
  transition: var(--transition);
  background-color: rgba(210, 221, 148, 0.1);
}

.form-group input:focus {
  outline: none;
  border-color: var(--color3);
  box-shadow: 0 0 0 3px rgba(171, 192, 92, 0.2);
}

.toggle-password {
  position: absolute;
  right: 15px;
  top: 40px;
  transform: translateY(-50%);
  cursor: pointer;
  color: var(--color4);
}

.icon {
  font-size: 18px;
}

.remember-forgot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: -10px;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
}

.remember-me input {
  accent-color: var(--color4);
}

.forgot-password {
  color: var(--color4);
  text-decoration: none;
  font-size: 14px;
  transition: var(--transition);
}

.forgot-password:hover {
  color: var(--color5);
  text-decoration: underline;
}

.submit-btn {
  width: 100%;
  margin-top: 10px;
  font-size: 18px;
  padding: 16px;
}

.divider {
  position: relative;
  text-align: center;
  margin: 20px 0;
}

.divider::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--color2);
  z-index: 1;
}

.divider span {
  display: inline-block;
  position: relative;
  padding: 0 15px;
  background: white;
  color: var(--color4);
  z-index: 2;
  font-size: 14px;
}

.social-login {
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
}

.social-btn {
  flex: 1;
  padding: 12px;
  border-radius: 30px;
  border: 1px solid var(--color2);
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-family: 'Noto Sans SC', sans-serif;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
}

.social-btn:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow);
}

.google {
  color: #DB4437;
}

.google:hover {
  background: rgba(219, 68, 55, 0.05);
  border-color: #DB4437;
}

.facebook {
  color: #4267B2;
}

.facebook:hover {
  background: rgba(66, 103, 178, 0.05);
  border-color: #4267B2;
}

.toggle-form {
  text-align: center;
  color: var(--color5);
  margin-top: 25px;
}

.toggle-form a {
  color: var(--color4);
  text-decoration: none;
  font-weight: 500;
  transition: var(--transition);
}

.toggle-form a:hover {
  color: var(--color5);
  text-decoration: underline;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .form-wrapper {
    padding: 30px;
  }

  .app-title {
    font-size: 32px;
  }

  .section-title {
    font-size: 24px;
  }

  .social-login {
    flex-direction: column;
  }
}

@media (max-width: 576px) {
  .form-wrapper {
    padding: 25px 20px;
  }

  .app-title {
    font-size: 28px;
  }

  .section-title {
    font-size: 22px;
  }

  .tab-btn {
    font-size: 16px;
  }

  .submit-btn {
    padding: 14px;
    font-size: 16px;
  }
}
</style>
