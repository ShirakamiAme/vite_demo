<template>
  <div class="categories">
    <div class="container category-nav">
      <a href="/products" class="category-link">
        <font-awesome-icon :icon="['fas', 'home']" />
        <span>全部商品</span>
      </a>
      <a href="/categories/有机食品" class="category-link">
        <font-awesome-icon :icon="['fas', 'seedling']" />
        <span>有机食品</span>
      </a>
      <a href="/categories/天然饮品" class="category-link">
        <font-awesome-icon :icon="['fas', 'wine-bottle']" />
        <span>天然饮品</span>
      </a>
      <a href="/categories/身体护理" class="category-link">
        <font-awesome-icon :icon="['fas', 'spa']" />
        <span>身体护理</span>
      </a>
      <a href="/categories/天然织物" class="category-link">
        <font-awesome-icon :icon="['fas', 'tshirt']" />
        <span>天然织物</span>
      </a>
      <a href="/categories/可持续用品" class="category-link">
        <font-awesome-icon :icon="['fas', 'recycle']" />
        <span>可持续用品</span>
      </a>
      <a href="/categories/宠物护理" class="category-link">
        <font-awesome-icon :icon="['fas', 'paw']" />
        <span>宠物护理</span>
      </a>
    </div>
  </div>
</template>

<style scoped>
.categories {
  background: var(--color3);
  padding: 15px 0;
  margin-bottom: 40px;
}

.category-nav {
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
}

.category-link {
  color: var(--color5);
  text-decoration: none;
  font-weight: 500;
  padding: 8px 15px;
  border-radius: 20px;
  transition: var(--transition);
  display: flex;
  align-items: center;
  gap: 8px;
}

.category-link:hover {
  background: var(--color4);
  color: white;
  transform: translateY(-3px);
}
</style>
<script setup lang="ts">
</script>
