<template>
  <nav>
    <div class="container nav-inner">
      <div class="tabs">
        <div
            v-for="tab in tabs"
            :key="tab.id"
            :class="['tab', currentTab === tab.id ? 'active' : '']"
            @click="$emit('update:currentTab', tab.id)"
        >
          <span class="tab-text">{{ tab.name }}</span>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    currentTab: String,
    tabs: Array
  }
}
</script>
