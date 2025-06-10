<template>
  <div class="promo-banner feathered-edge">
    <h2>夏日健康节</h2>
    <p>全场精选商品低至7折，有机食品满300减50</p>
    <p>优惠截止时间：</p>
    <div class="timer">
      <div class="timer-item">
        <div class="timer-number">{{ days }}</div>
        <div class="timer-label">天</div>
      </div>
      <div class="timer-item">
        <div class="timer-number">{{ hours }}</div>
        <div class="timer-label">时</div>
      </div>
      <div class="timer-item">
        <div class="timer-number">{{ minutes }}</div>
        <div class="timer-label">分</div>
      </div>
      <div class="timer-item">
        <div class="timer-number">{{ seconds }}</div>
        <div class="timer-label">秒</div>
      </div>
    </div>
    <a href="#" class="btn" style="margin-top: 30px; background: white; color: var(--color5);">立即抢购</a>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const days = ref('02')
const hours = ref('14')
const minutes = ref('28')
const seconds = ref('45')

let timerInterval

function updateCountdown() {
  const now = new Date()
  const endDate = new Date(now)
  endDate.setDate(now.getDate() + 2)
  const diff = endDate - now

  const daysValue = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hoursValue = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutesValue = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const secondsValue = Math.floor((diff % (1000 * 60)) / 1000)

  days.value = daysValue.toString().padStart(2, '0')
  hours.value = hoursValue.toString().padStart(2, '0')
  minutes.value = minutesValue.toString().padStart(2, '0')
  seconds.value = secondsValue.toString().padStart(2, '0')
}

onMounted(() => {
  updateCountdown()
  timerInterval = setInterval(updateCountdown, 1000)
})

onUnmounted(() => {
  clearInterval(timerInterval)
})
</script>

<style scoped>
.promo-banner {
  background: linear-gradient(to right, var(--color4), var(--color5));
  color: white;
  padding: 50px 0;
  margin: 60px 0;
  text-align: center;
  border-radius: 15px;
}

.promo-banner h2 {
  font-size: 36px;
  margin-bottom: 20px;
}

.timer {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
}

.timer-item {
  background: rgba(255, 255, 255, 0.2);
  padding: 15px 20px;
  border-radius: 10px;
  min-width: 80px;
}

.timer-number {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 5px;
}

.timer-label {
  font-size: 14px;
  opacity: 0.8;
}
</style>
