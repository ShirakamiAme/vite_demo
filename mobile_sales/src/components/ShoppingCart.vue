<template>
  <div>
    <table class="cart-table">
      <thead>
      <tr>
        <th>
          <input type="checkbox" v-model="selectAll" @change="toggleSelectAll" />
        </th>
        <th>商品名称</th>
        <th>单价</th>
        <th>数量</th>
        <th>小计</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in cart" :key="item.id">
        <td>
          <input type="checkbox" v-model="item.selected" />
        </td>
        <td>{{ item.name }}</td>
        <td style="color: #991b1b">¥{{ item.price.toFixed(2) }}</td>
        <td>
          <input type="number" min="1" v-model.number="item.quantity" />
        </td>
        <td style="color: #991b1b">¥{{ (item.price * item.quantity).toFixed(2) }}</td>
        <td class="delete">
          <button class="btn btn-red" @click="removeFromCart(item.id)">
            删除
          </button>
        </td>
      </tr>
      </tbody>
    </table>

    <div class="cart-footer">
      <div>共 {{ totalItems }} 件商品，已选择 {{ selectedItems }} 件</div>
      <div class="flex items-center space-x-4">
        <span class="total">总计：¥{{ total.toFixed(2) }}</span>
        <button class="btn btn-blue" @click="checkout">结算</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cart: Array,
  },
  data() {
    return {
      selectAll: false,
    };
  },
  watch: {
    cart: {
      handler() {
        this.selectAll = this.cart.length > 0 && this.cart.every(item => item.selected);
      },
      deep: true,
      immediate: true,
    }
  },
  methods: {
    toggleSelectAll() {
      this.cart.forEach(item => {
        item.selected = this.selectAll;
      });
    },
    removeFromCart(id) {
      this.$emit('remove', id);
    },
    checkout() {
      this.$emit('checkout');
    }
  },
  computed: {
    totalItems() {
      return this.cart.length;
    },
    selectedItems() {
      return this.cart.filter(item => item.selected).length;
    },
    total() {
      return this.cart
          .filter(item => item.selected)
          .reduce((sum, item) => sum + item.price * item.quantity, 0);
    }
  }
}
</script>

<style scoped>
.delete button{
  box-shadow: 0 0 2px black;
  background: lightblue;
  color: rgba(255,255,255,1);
}
.delete button:hover{
  color: red;
}
</style>
