<script setup>
  import { ref, onMounted } from "vue"

  const time = ref(0)
  const previousTime = ref(0)
  const running = ref(false)
  const overtime = ref(false)
  let interval = null

  function addTime(value) {
    if (running.value) {
      return
    }
    time.value += value
  }

  function clearTime() {
    time.value = 0
    running.value = false
    overtime.value = false
    clearInterval(interval)
  }

  function resetTime() {
    time.value = previousTime.value
    running.value = false
    overtime.value = false
    clearInterval(interval)
  }

  function startCountdown() {
    if (time.value <= 0) {
      return
    }
    previousTime.value = time.value
    running.value = true
    interval = setInterval(() => {
      time.value--
      if (time.value <= 0) {
        overtime.value = true
        clearInterval(interval)
        interval = setInterval(() => {
          time.value++
        }, 1000)
      }
    }, 1000)
  }

  function stopCountdown() {
    running.value = false
    clearInterval(interval)
  }
</script>

<template>
  <div class="fixed inset-0 flex flex-col items-center justify-center p-6">
    <div class="text-6xl font-bold sm:text-[100px] md:text-[150px] lg:text-[200px] 2xl:text-[300px] 3xl:text-[500px]" :class="{'text-red-600': overtime}">{{ Math.floor(time / 3600).toString().padStart(2, "0") }}:{{ Math.floor(time / 60 % 60).toString().padStart(2, "0") }}:{{ (time % 60).toString().padStart(2, "0") }}</div>
    <div class="mt-8 grid w-full max-w-md grid-cols-3 gap-2">
      <template v-if="!running">
        <div class="flex cursor-pointer select-none items-center justify-center rounded bg-green-600 px-2 py-1 text-lg font-medium text-white lg:py-2" @click="startCountdown">
          <div>Start</div>
        </div>
      </template>
      <template v-else>
        <div class="flex cursor-pointer select-none items-center justify-center rounded bg-red-600 px-2 py-1 text-lg font-medium text-white lg:py-2" @click="stopCountdown">
          <div>Stop</div>
        </div>
      </template>
      <div class="flex cursor-pointer select-none items-center justify-center rounded bg-gray-200 px-2 py-1 text-lg text-gray-600 lg:py-2" @click="resetTime">
        <div>Reset</div>
      </div>
      <div class="flex cursor-pointer select-none items-center justify-center rounded bg-gray-200 px-2 py-1 text-lg text-gray-600 lg:py-2" @click="clearTime">
        <div>Clear</div>
      </div>
    </div>
    <div class="mt-4 grid w-full max-w-md grid-cols-5 gap-1 lg:gap-2">
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm hover:bg-gray-50" @click="addTime(30)">
        <div class="text-xl font-bold leading-none lg:text-3xl">30</div>
        <div class="text-sm leading-tight">sec</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm hover:bg-gray-50" @click="addTime(60)">
        <div class="text-xl font-bold leading-none lg:text-3xl">1</div>
        <div class="text-sm leading-tight">min</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm hover:bg-gray-50" @click="addTime(120)">
        <div class="text-xl font-bold leading-none lg:text-3xl">2</div>
        <div class="text-sm leading-tight">min</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm hover:bg-gray-50" @click="addTime(300)">
        <div class="text-xl font-bold leading-none lg:text-3xl">5</div>
        <div class="text-sm leading-tight">min</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm hover:bg-gray-50" @click="addTime(600)">
        <div class="text-xl font-bold leading-none lg:text-3xl">10</div>
        <div class="text-sm leading-tight">min</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm hover:bg-gray-50" @click="addTime(900)">
        <div class="text-xl font-bold leading-none lg:text-3xl">15</div>
        <div class="text-sm leading-tight">min</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm hover:bg-gray-50" @click="addTime(1200)">
        <div class="text-xl font-bold leading-none lg:text-3xl">20</div>
        <div class="text-sm leading-tight">min</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm hover:bg-gray-50" @click="addTime(1800)">
        <div class="text-xl font-bold leading-none lg:text-3xl">30</div>
        <div class="text-sm leading-tight">min</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm hover:bg-gray-50" @click="addTime(2700)">
        <div class="text-xl font-bold leading-none lg:text-3xl">45</div>
        <div class="text-sm leading-tight">min</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm hover:bg-gray-50" @click="addTime(3600)">
        <div class="text-xl font-bold leading-none lg:text-3xl">60</div>
        <div class="text-sm leading-tight">min</div>
      </div>
    </div>
  </div>
</template>
