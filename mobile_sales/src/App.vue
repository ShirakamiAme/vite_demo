<template>
  <div>
    <Tabs :tabs="tabs" v-model:currentTab="currentTab" />

    <main class="container">
      <ProductList
          v-if="currentTab === 'products'"
          :products="products"
          @add-to-cart="handleAddToCart"
      />
      <Cart
          v-else
          :cart="cart"
          @remove="removeFromCart"
          @checkout="handleCheckout"
      />
    </main>
  </div>
</template>

<script>
import {ref} from 'vue';
import Tabs from './components/AppTabs.vue';
import ProductList from './components/ProductList.vue';
import Cart from './components/ShoppingCart.vue';
import {products as productList} from './data/products.js';

export default {
  components: {Tabs, ProductList, Cart},
  setup() {
    const currentTab = ref('products');
    const tabs = [
      {id: 'products', name: '商品列表'},
      {id: 'cart', name: '购物车'}
    ];

    const products = ref(productList);

    const cart = ref([
      {id: 1, name: '高端机械键盘 Cherry轴体', price: 899, quantity: 1, selected: false},
      {id: 2, name: '无线蓝牙耳机 主动降噪', price: 1299, quantity: 2, selected: true}
    ]);

    const removeFromCart = (id) => {
      const index = cart.value.findIndex(item => item.id === id);
      if (index !== -1) cart.value.splice(index, 1);
    };

    const handleAddToCart = ({ product, quantity }) => {
      const item = cart.value.find(i => i.id === product.id);
      if (item) {
        const maxAdd = product.stock - item.quantity;
        const addQty = Math.min(quantity, maxAdd);
        if (addQty > 0) {
          item.quantity += addQty;
          const prod = products.value.find(p => p.id === product.id);
          if (prod) prod.stock -= addQty;

          alert(`成功添加 ${addQty} 个 "${product.name}" 到购物车！`);
        } else {
          alert('该商品库存不足');
        }
      } else {
        const addQty = Math.min(quantity, product.stock);
        if (addQty > 0) {
          cart.value.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: addQty,
            selected: true,
          });
          const prod = products.value.find(p => p.id === product.id);
          if (prod) prod.stock -= addQty;

          alert(`成功添加 ${addQty} 个 "${product.name}" 到购物车！`);
        } else {
          alert('该商品库存不足');
        }
      }
    };

    // 结算处理
    const handleCheckout = () => {
      if (cart.value.length === 0) {
        alert('购物车为空，无法结算');
        return;
      }
      alert('结算成功，欢迎下次购物！');
      cart.value = [];
    };

    return {
      currentTab,
      tabs,
      products,
      cart,
      removeFromCart,
      handleAddToCart,
      handleCheckout,
    };
  }
};
</script>

<style>
@import './assets/styles.css';

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style>
