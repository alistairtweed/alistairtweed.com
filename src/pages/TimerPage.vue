<script setup>
  import { ref, onMounted } from "vue"

  const originalTime = ref(0)
  const time = ref(0)
  const timer = ref(null)
  const status = ref("stopped")

  onMounted(() => {
    originalTime.value = 60
    time.value = originalTime.value
  })

  function startTimer() {
    time.value = originalTime.value
    status.value = "running"

    timer.value = setInterval(() => {
      time.value--
      if (time.value === 0) {
        clearInterval(timer.value)
      }
    }, 1000)
  }

  function stopTimer() {
    clearInterval(timer.value)
    status.value = "stopped"
  }

  function resetTimer() {
    clearInterval(timer.value)
    time.value = originalTime.value
  }

  function setTimer(seconds) {
    stopTimer()
    resetTimer()
    originalTime.value = seconds
    time.value = seconds
  }
</script>

<template>
  <div class="flex flex-col justify-center items-center h-screen">
    <div class="text-6xl xl:text-[500px] font-bold">
      {{ Math.floor(time / 3600).toString().padStart(2, "0") }}:{{ Math.floor(time / 60 % 60).toString().padStart(2, "0") }}:{{ (time % 60).toString().padStart(2, "0") }}
    </div>
    <div class="mt-12 flex space-x-2">
      <div><input class="form-input" type="number" v-model="originalTime"></div>
      <div><input class="button" type="button" :value="status === 'running' ? 'Stop' : 'Start'" @click="status === 'running' ? stopTimer() : startTimer()"></div>
      <div><input class="button" type="button" :disabled="status === 'running'" value="Reset" @click="resetTimer"></div>
    </div>
    <div class="mt-4 flex space-x-2">
      <div><input class="button" type="button" value="1 min" @click="setTimer(60)"></div>
      <div><input class="button" type="button" value="2 mins" @click="setTimer(120)"></div>
      <div><input class="button" type="button" value="5 mins" @click="setTimer(300)"></div>
      <div><input class="button" type="button" value="10 mins" @click="setTimer(600)"></div>
      <div><input class="button" type="button" value="15 mins" @click="setTimer(900)"></div>
      <div><input class="button" type="button" value="20 mins" @click="setTimer(1200)"></div>
      <div><input class="button" type="button" value="30 mins" @click="setTimer(1800)"></div>
      <div><input class="button" type="button" value="45 mins" @click="setTimer(2700)"></div>
      <div><input class="button" type="button" value="1 hour" @click="setTimer(3600)"></div>
    </div>
  </div>
</template>
