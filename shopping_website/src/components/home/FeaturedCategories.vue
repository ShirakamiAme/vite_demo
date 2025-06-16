<template>
  <section class="featured-categories">
    <h2 class="section-title">特色类别</h2>
    <div class="categories-grid">
      <div class="category-card" v-for="category in categories" :key="category.id">
        <div class="category-img" :style="{ backgroundImage: `url(${category.image})` }"></div>
        <div class="category-info">
          <h3>{{ category.name }}</h3>
          <p>{{ category.description }}</p>
          <div class="product-count">{{ category.count }}件商品</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const categories = [
  {
    id: 1,
    name: '有机食品',
    description: '新鲜采摘的有机水果、蔬菜和谷物',
    count: 128,
    image: 'https://images.unsplash.com/photo-1506806732259-39c2d0268443?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80'
  }
];
</script>

<style scoped>
.featured-categories {
  margin: 60px 0;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
}

.category-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: var(--transition);
  position: relative;
}

.category-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0,0,0,0.15);
}

.category-img {
  height: 200px;
  background-size: cover;
  background-position: center;
}

.category-info {
  padding: 25px;
  text-align: center;
}

.category-info h3 {
  margin-bottom: 10px;
  font-size: 22px;
}

.product-count {
  color: var(--color4);
  font-weight: 500;
}
</style>
