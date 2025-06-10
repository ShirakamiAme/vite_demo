<template>
  <div class="hero feathered-edge"
       :style="{ background: 'linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url(https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }">
    <div class="hero-content">
      <h1>发现自然之美 享受健康生活</h1>
      <p>探索我们精选的有机、环保产品，为您的日常生活带来自然纯净的体验。每一件商品都经过严格筛选，确保品质与可持续性。</p>
      <a href="#" class="btn">探索商品</a>
    </div>
  </div>
</template>

<style scoped>
.hero {
  position: relative;
  height: 500px;
  border-radius: 20px;
  overflow: hidden;
  margin: 30px 0;
  box-shadow: var(--shadow);
}

.hero-content {
  position: absolute;
  top: 50%;
  left: 50px;
  transform: translateY(-50%);
  width: 45%;
  color: var(--color5);
  z-index: 2;
}

.hero h1 {
  font-size: 48px;
  margin-bottom: 20px;
  line-height: 1.2;
}

.hero p {
  font-size: 18px;
  margin-bottom: 30px;
}
</style>
