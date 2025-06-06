<template>
  <div class="product-list-container">
    <div
        v-for="product in products"
        :key="product.id"
        :class="['product-card', { 'opacity-50': product.stock === 0 }]"
        @click="product.stock > 0 && openBuyDialog(product)"
    >
      <div class="image-wrapper">
        <img :src="product.image" :alt="product.name" />
      </div>
      <div class="product-info">
        <h3 :class="{ 'line-through': product.stock === 0 }">{{ product.name }}</h3>
        <p class="price">¥{{ product.price.toFixed(2) }}</p>
        <span :class="getStockClass(product.stock)" class="stock-label">
          {{ getStockLabel(product.stock) }}
        </span>
      </div>
    </div>

    <div v-if="showDialog" class="dialog-overlay" @click.self="closeBuyDialog">
      <div class="dialog">
        <h2>购买 {{ selectedProduct.name }}</h2>
        <p>库存: {{ selectedProduct.stock }}</p>
        <label>
          购买数量:
          <input type="number" v-model.number="buyQuantity" :min="1" :max="selectedProduct.stock" />
        </label>
        <div class="dialog-buttons">
          <button @click="confirmAddToCart">确定</button>
          <button @click="closeBuyDialog">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductList',
  props: {
    products: Array,
    cart: Array,
  },
  data() {
    return {
      showDialog: false,
      selectedProduct: null,
      buyQuantity: 1,
    };
  },
  methods: {
    getStockLabel(stock) {
      if (stock === 0) return '无货';
      if (stock > 1000) return '库存充裕';
      if (stock > 100) return '100+';
      return stock.toString();
    },
    getStockClass(stock) {
      if (stock > 1000) return 'stock-high';
      if (stock > 100) return 'stock-mid';
      if (stock > 0) return 'stock-low';
      return 'stock-none';
    },
    openBuyDialog(product) {
      this.selectedProduct = product;
      this.buyQuantity = 1;
      this.showDialog = true;
    },
    closeBuyDialog() {
      this.showDialog = false;
      this.selectedProduct = null;
    },
    confirmAddToCart() {
      if (!this.selectedProduct) return;

      if (this.buyQuantity < 1) this.buyQuantity = 1;
      if (this.buyQuantity > this.selectedProduct.stock) this.buyQuantity = this.selectedProduct.stock;

      this.$emit('add-to-cart', {
        product: this.selectedProduct,
        quantity: this.buyQuantity,
      });

      this.closeBuyDialog();
    },
  },
};
</script>

<style scoped>
.product-list-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
  max-width: 1024px;
  margin: 0 auto;
}

.product-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.1);
  cursor: pointer;
  overflow: hidden;
  transition: box-shadow 0.3s ease;
}

.product-card:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.opacity-50 {
  opacity: 0.5;
  cursor: not-allowed;
}

.image-wrapper {
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
}

.product-info {
  padding: 12px;
}

.product-info h3 {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.line-through {
  text-decoration: line-through;
}

.price {
  margin-top: 6px;
  font-size: 1.25rem;
  font-weight: 700;
  color: #dc2626;
}

.stock-label {
  margin-top: 8px;
  display: inline-block;
  padding: 4px 8px;
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 9999px;
}

.stock-high {
  background-color: #d1fae5;
  color: #065f46;
}

.stock-mid {
  background-color: #fef3c7;
  color: #713f12;
}

.stock-low {
  background-color: #fee2e2;
  color: #991b1b;
}

.stock-none {
  background-color: #f3f4f6;
  color: #374151;
}

.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.dialog {
  background: white;
  border-radius: 8px;
  padding: 24px;
  width: 320px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
}

.dialog h2 {
  margin-top: 0;
  margin-bottom: 12px;
}

.dialog label {
  display: flex;
  flex-direction: column;
  font-weight: 600;
  margin-bottom: 16px;
}

.dialog input[type="number"] {
  margin-top: 8px;
  padding: 8px;
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 100%;
}

.dialog-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.dialog-buttons button {
  padding: 8px 16px;
  font-weight: 600;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.dialog-buttons button:first-child {
  background-color: #2563eb;
  color: white;
}

.dialog-buttons button:last-child {
  background-color: #e5e7eb;
  color: #374151;
}
</style>
