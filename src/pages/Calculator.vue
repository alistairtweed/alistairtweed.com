<script setup>
  import { ref, computed } from "vue"

  const listening = ref(0)
  const reading = ref(0)
  const w1ta = ref(0)
  const w1cc = ref(0)
  const w1lr = ref(0)
  const w1gra = ref(0)
  const w2tr = ref(0)
  const w2cc = ref(0)
  const w2lr = ref(0)
  const w2gra = ref(0)
  const sfc = ref(0)
  const slr = ref(0)
  const sgra = ref(0)
  const spr = ref(0)

  function roundedScore(score) {
    return Math.round(score * 2) / 2
  }

  function ensureDecimal(score) {
    return parseFloat(score).toFixed(1)
  }

  function calculateAverage(scores) {
    return roundedScore(scores.reduce((sum, score) => sum + score, 0) / scores.length)
  }

  function allScoresPositive(scores) {
    return scores.every(score => score > 0)
  }

  const listeningScore = computed(() => listening.value)
  const readingScore = computed(() => reading.value)

  const writing1score = computed(() => {
    const scores = [w1ta.value, w1cc.value, w1lr.value, w1gra.value]
    return allScoresPositive(scores) ? calculateAverage(scores) : 0
  })

  const writing2score = computed(() => {
    const scores = [w2tr.value, w2cc.value, w2lr.value, w2gra.value]
    return allScoresPositive(scores) ? calculateAverage(scores) : 0
  })

  const writingScore = computed(() => {
    const scores = [writing1score.value, writing2score.value]
    return allScoresPositive(scores) ? calculateAverage([...scores, writing2score.value]) : 0
  })

  const speakingScore = computed(() => {
    const scores = [sfc.value, slr.value, sgra.value, spr.value]
    return allScoresPositive(scores) ? calculateAverage(scores) : 0
  })

  const overallScore = computed(() => {
    const scores = [listeningScore.value, readingScore.value, writingScore.value, speakingScore.value].filter(score => score > 0)
    return scores.length ? calculateAverage(scores) : 0
  })

  function reset() {
    listening.value = 0
    reading.value = 0
    w1ta.value = 0
    w1cc.value = 0
    w1lr.value = 0
    w1gra.value = 0
    w2tr.value = 0
    w2cc.value = 0
    w2lr.value = 0
    w2gra.value = 0
    sfc.value = 0
    slr.value = 0
    sgra.value = 0
    spr.value = 0
  }
</script>

<template>
  <div class="sticky top-0 flex w-full flex-col items-center bg-white p-6 shadow-md">
    <div class="fixed right-4 top-4 cursor-pointer select-none rounded border border-gray-300 bg-white px-2 py-1 text-xs shadow-sm" @click="reset">Reset</div>
    <div class="border-4 rounded-full w-[160px] h-[160px] flex items-center justify-center">
      <div class="text-6xl font-bold">{{ ensureDecimal(overallScore) }}</div>
    </div>
    <div class="mt-2 grid grid-cols-4 gap-1 w-full">
      <div class="flex flex-col items-center">
        <div class="text-2xl text-gray-500">L</div>
        <div class="text-3xl font-bold">{{ ensureDecimal(listeningScore) }}</div>
      </div>
      <div class="flex flex-col items-center">
        <div class="text-2xl text-gray-500">R</div>
        <div class="text-3xl font-bold">{{ ensureDecimal(readingScore) }}</div>
      </div>
      <div class="flex flex-col items-center">
        <div class="text-2xl text-gray-500">W</div>
        <div class="text-3xl font-bold">{{ ensureDecimal(writingScore) }}</div>
      </div>
      <div class="flex flex-col items-center">
        <div class="text-2xl text-gray-500">S</div>
        <div class="text-3xl font-bold">{{ ensureDecimal(speakingScore) }}</div>
      </div>
    </div>
  </div>
  <div class="flex flex-col items-center p-6">
    <div class="font-bold">Listening</div>
    <div class="mt-2 grid w-full max-w-md grid-cols-5 gap-1 lg:gap-2">
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': listening === 9}" @click="listening = 9">
        <div class="text-xl font-bold leading-none lg:text-3xl">9.0</div>
        <div class="text-xs leading-4 text-gray-700">39 - 40</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': listening === 8.5}" @click="listening = 8.5">
        <div class="text-xl font-bold leading-none lg:text-3xl">8.5</div>
        <div class="text-xs leading-4 text-gray-700">37 - 38</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': listening === 8}" @click="listening = 8">
        <div class="text-xl font-bold leading-none lg:text-3xl">8.0</div>
        <div class="text-xs leading-4 text-gray-700">35 - 36</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': listening === 7.5}" @click="listening = 7.5">
        <div class="text-xl font-bold leading-none lg:text-3xl">7.5</div>
        <div class="text-xs leading-4 text-gray-700">32 - 34</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': listening === 7}" @click="listening = 7">
        <div class="text-xl font-bold leading-none lg:text-3xl">7.0</div>
        <div class="text-xs leading-4 text-gray-700">30 - 31</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': listening === 6.5}" @click="listening = 6.5">
        <div class="text-xl font-bold leading-none lg:text-3xl">6.5</div>
        <div class="text-xs leading-4 text-gray-700">26 - 29</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': listening === 6}" @click="listening = 6">
        <div class="text-xl font-bold leading-none lg:text-3xl">6.0</div>
        <div class="text-xs leading-4 text-gray-700">23 - 25</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': listening === 5.5}" @click="listening = 5.5">
        <div class="text-xl font-bold leading-none lg:text-3xl">5.5</div>
        <div class="text-xs leading-4 text-gray-700">18 - 22</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': listening === 5}" @click="listening = 5">
        <div class="text-xl font-bold leading-none lg:text-3xl">5.0</div>
        <div class="text-xs leading-4 text-gray-700">16 - 17</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': listening === 4.5}" @click="listening = 4.5">
        <div class="text-xl font-bold leading-none lg:text-3xl">4.5</div>
        <div class="text-xs leading-4 text-gray-700">13 - 15</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': listening === 4}" @click="listening = 4">
        <div class="text-xl font-bold leading-none lg:text-3xl">4.0</div>
        <div class="text-xs leading-4 text-gray-700">10 - 12</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': listening === 3.5}" @click="listening = 3.5">
        <div class="text-xl font-bold leading-none lg:text-3xl">3.5</div>
        <div class="text-xs leading-4 text-gray-700">8 - 9</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': listening === 3}" @click="listening = 3">
        <div class="text-xl font-bold leading-none lg:text-3xl">3.0</div>
        <div class="text-xs leading-4 text-gray-700">6 - 7</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': listening === 2.5}" @click="listening = 2.5">
        <div class="text-xl font-bold leading-none lg:text-3xl">2.5</div>
        <div class="text-xs leading-4 text-gray-700">4 - 5</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': listening === 2}" @click="listening = 2">
        <div class="text-xl font-bold leading-none lg:text-3xl">2.0</div>
        <div class="text-xs leading-4 text-gray-700">3</div>
      </div>
    </div>
    <div class="mt-8 font-bold">Reading</div>
    <div class="mt-2 grid w-full max-w-md grid-cols-5 gap-1 lg:gap-2">
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': reading === 9}" @click="reading = 9">
        <div class="text-xl font-bold leading-none lg:text-3xl">9.0</div>
        <div class="text-xs leading-4 text-gray-700">39 - 40</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': reading === 8.5}" @click="reading = 8.5">
        <div class="text-xl font-bold leading-none lg:text-3xl">8.5</div>
        <div class="text-xs leading-4 text-gray-700">37 - 38</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': reading === 8}" @click="reading = 8">
        <div class="text-xl font-bold leading-none lg:text-3xl">8.0</div>
        <div class="text-xs leading-4 text-gray-700">35 - 36</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': reading === 7.5}" @click="reading = 7.5">
        <div class="text-xl font-bold leading-none lg:text-3xl">7.5</div>
        <div class="text-xs leading-4 text-gray-700">32 - 34</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': reading === 7}" @click="reading = 7">
        <div class="text-xl font-bold leading-none lg:text-3xl">7.0</div>
        <div class="text-xs leading-4 text-gray-700">30 - 31</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': reading === 6.5}" @click="reading = 6.5">
        <div class="text-xl font-bold leading-none lg:text-3xl">6.5</div>
        <div class="text-xs leading-4 text-gray-700">26 - 29</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': reading === 6}" @click="reading = 6">
        <div class="text-xl font-bold leading-none lg:text-3xl">6.0</div>
        <div class="text-xs leading-4 text-gray-700">23 - 25</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': reading === 5.5}" @click="reading = 5.5">
        <div class="text-xl font-bold leading-none lg:text-3xl">5.5</div>
        <div class="text-xs leading-4 text-gray-700">18 - 22</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': reading === 5}" @click="reading = 5">
        <div class="text-xl font-bold leading-none lg:text-3xl">5.0</div>
        <div class="text-xs leading-4 text-gray-700">16 - 17</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': reading === 4.5}" @click="reading = 4.5">
        <div class="text-xl font-bold leading-none lg:text-3xl">4.5</div>
        <div class="text-xs leading-4 text-gray-700">13 - 15</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': reading === 4}" @click="reading = 4">
        <div class="text-xl font-bold leading-none lg:text-3xl">4.0</div>
        <div class="text-xs leading-4 text-gray-700">10 - 12</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': reading === 3.5}" @click="reading = 3.5">
        <div class="text-xl font-bold leading-none lg:text-3xl">3.5</div>
        <div class="text-xs leading-4 text-gray-700">8 - 9</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': reading === 3}" @click="reading = 3">
        <div class="text-xl font-bold leading-none lg:text-3xl">3.0</div>
        <div class="text-xs leading-4 text-gray-700">6 - 7</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': reading === 2.5}" @click="reading = 2.5">
        <div class="text-xl font-bold leading-none lg:text-3xl">2.5</div>
        <div class="text-xs leading-4 text-gray-700">4 - 5</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': reading === 2}" @click="reading = 2">
        <div class="text-xl font-bold leading-none lg:text-3xl">2.0</div>
        <div class="text-xs leading-4 text-gray-700">3</div>
      </div>
    </div>
    <div class="mt-8 font-bold">Writing Task 1 ({{ ensureDecimal(writing1score) }})</div>
    <div class="mt-2 grid w-full max-w-md grid-cols-4 gap-1 lg:gap-2">
      <div class="text-center text-sm">TA</div>
      <div class="text-center text-sm">CC</div>
      <div class="text-center text-sm">LR</div>
      <div class="text-center text-sm">GRA</div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': w1ta === 8}" @click="w1ta = 8">
        <div class="text-xl font-bold leading-none lg:text-3xl">8</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': w1cc === 8}" @click="w1cc = 8">
        <div class="text-xl font-bold leading-none lg:text-3xl">8</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': w1lr === 8}" @click="w1lr = 8">
        <div class="text-xl font-bold leading-none lg:text-3xl">8</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': w1gra === 8}" @click="w1gra = 8">
        <div class="text-xl font-bold leading-none lg:text-3xl">8</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': w1ta === 7}" @click="w1ta = 7">
        <div class="text-xl font-bold leading-none lg:text-3xl">7</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': w1cc === 7}" @click="w1cc = 7">
        <div class="text-xl font-bold leading-none lg:text-3xl">7</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': w1lr === 7}" @click="w1lr = 7">
        <div class="text-xl font-bold leading-none lg:text-3xl">7</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': w1gra === 7}" @click="w1gra = 7">
        <div class="text-xl font-bold leading-none lg:text-3xl">7</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': w1ta === 6}" @click="w1ta = 6">
        <div class="text-xl font-bold leading-none lg:text-3xl">6</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': w1cc === 6}" @click="w1cc = 6">
        <div class="text-xl font-bold leading-none lg:text-3xl">6</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': w1lr === 6}" @click="w1lr = 6">
        <div class="text-xl font-bold leading-none lg:text-3xl">6</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': w1gra === 6}" @click="w1gra = 6">
        <div class="text-xl font-bold leading-none lg:text-3xl">6</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': w1ta === 5}" @click="w1ta = 5">
        <div class="text-xl font-bold leading-none lg:text-3xl">5</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': w1cc === 5}" @click="w1cc = 5">
        <div class="text-xl font-bold leading-none lg:text-3xl">5</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': w1lr === 5}" @click="w1lr = 5">
        <div class="text-xl font-bold leading-none lg:text-3xl">5</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': w1gra === 5}" @click="w1gra = 5">
        <div class="text-xl font-bold leading-none lg:text-3xl">5</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': w1ta === 4}" @click="w1ta = 4">
        <div class="text-xl font-bold leading-none lg:text-3xl">4</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': w1cc === 4}" @click="w1cc = 4">
        <div class="text-xl font-bold leading-none lg:text-3xl">4</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': w1lr === 4}" @click="w1lr = 4">
        <div class="text-xl font-bold leading-none lg:text-3xl">4</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': w1gra === 4}" @click="w1gra = 4">
        <div class="text-xl font-bold leading-none lg:text-3xl">4</div>
      </div>
    </div>
    <div class="mt-8 font-bold">Writing Task 2 ({{ ensureDecimal(writing2score) }})</div>
    <div class="mt-2 grid w-full max-w-md grid-cols-4 gap-1 lg:gap-2">
      <div class="text-center text-sm">TA</div>
      <div class="text-center text-sm">CC</div>
      <div class="text-center text-sm">LR</div>
      <div class="text-center text-sm">GRA</div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': w2tr === 8}" @click="w2tr = 8">
        <div class="text-xl font-bold leading-none lg:text-3xl">8</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': w2cc === 8}" @click="w2cc = 8">
        <div class="text-xl font-bold leading-none lg:text-3xl">8</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': w2lr === 8}" @click="w2lr = 8">
        <div class="text-xl font-bold leading-none lg:text-3xl">8</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': w2gra === 8}" @click="w2gra = 8">
        <div class="text-xl font-bold leading-none lg:text-3xl">8</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': w2tr === 7}" @click="w2tr = 7">
        <div class="text-xl font-bold leading-none lg:text-3xl">7</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': w2cc === 7}" @click="w2cc = 7">
        <div class="text-xl font-bold leading-none lg:text-3xl">7</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': w2lr === 7}" @click="w2lr = 7">
        <div class="text-xl font-bold leading-none lg:text-3xl">7</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': w2gra === 7}" @click="w2gra = 7">
        <div class="text-xl font-bold leading-none lg:text-3xl">7</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': w2tr === 6}" @click="w2tr = 6">
        <div class="text-xl font-bold leading-none lg:text-3xl">6</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': w2cc === 6}" @click="w2cc = 6">
        <div class="text-xl font-bold leading-none lg:text-3xl">6</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': w2lr === 6}" @click="w2lr = 6">
        <div class="text-xl font-bold leading-none lg:text-3xl">6</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': w2gra === 6}" @click="w2gra = 6">
        <div class="text-xl font-bold leading-none lg:text-3xl">6</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': w2tr === 5}" @click="w2tr = 5">
        <div class="text-xl font-bold leading-none lg:text-3xl">5</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': w2cc === 5}" @click="w2cc = 5">
        <div class="text-xl font-bold leading-none lg:text-3xl">5</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': w2lr === 5}" @click="w2lr = 5">
        <div class="text-xl font-bold leading-none lg:text-3xl">5</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': w2gra === 5}" @click="w2gra = 5">
        <div class="text-xl font-bold leading-none lg:text-3xl">5</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': w2tr === 4}" @click="w2tr = 4">
        <div class="text-xl font-bold leading-none lg:text-3xl">4</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': w2cc === 4}" @click="w2cc = 4">
        <div class="text-xl font-bold leading-none lg:text-3xl">4</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': w2lr === 4}" @click="w2lr = 4">
        <div class="text-xl font-bold leading-none lg:text-3xl">4</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': w2gra === 4}" @click="w2gra = 4">
        <div class="text-xl font-bold leading-none lg:text-3xl">4</div>
      </div>
    </div>
    <div class="mt-8 font-bold">Speaking</div>
    <div class="mt-2 grid w-full max-w-md grid-cols-4 gap-1 lg:gap-2">
      <div class="text-center text-sm">FC</div>
      <div class="text-center text-sm">LR</div>
      <div class="text-center text-sm">GRA</div>
      <div class="text-center text-sm">PR</div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': sfc === 8}" @click="sfc = 8">
        <div class="text-xl font-bold leading-none lg:text-3xl">8</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': slr === 8}" @click="slr = 8">
        <div class="text-xl font-bold leading-none lg:text-3xl">8</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': sgra === 8}" @click="sgra = 8">
        <div class="text-xl font-bold leading-none lg:text-3xl">8</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': spr === 8}" @click="spr = 8">
        <div class="text-xl font-bold leading-none lg:text-3xl">8</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': sfc === 7}" @click="sfc = 7">
        <div class="text-xl font-bold leading-none lg:text-3xl">7</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': slr === 7}" @click="slr = 7">
        <div class="text-xl font-bold leading-none lg:text-3xl">7</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': sgra === 7}" @click="sgra = 7">
        <div class="text-xl font-bold leading-none lg:text-3xl">7</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': spr === 7}" @click="spr = 7">
        <div class="text-xl font-bold leading-none lg:text-3xl">7</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': sfc === 6}" @click="sfc = 6">
        <div class="text-xl font-bold leading-none lg:text-3xl">6</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': slr === 6}" @click="slr = 6">
        <div class="text-xl font-bold leading-none lg:text-3xl">6</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': sgra === 6}" @click="sgra = 6">
        <div class="text-xl font-bold leading-none lg:text-3xl">6</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': spr === 6}" @click="spr = 6">
        <div class="text-xl font-bold leading-none lg:text-3xl">6</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': sfc === 5}" @click="sfc = 5">
        <div class="text-xl font-bold leading-none lg:text-3xl">5</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': slr === 5}" @click="slr = 5">
        <div class="text-xl font-bold leading-none lg:text-3xl">5</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': sgra === 5}" @click="sgra = 5">
        <div class="text-xl font-bold leading-none lg:text-3xl">5</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': spr === 5}" @click="spr = 5">
        <div class="text-xl font-bold leading-none lg:text-3xl">5</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': sfc === 4}" @click="sfc = 4">
        <div class="text-xl font-bold leading-none lg:text-3xl">4</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': slr === 4}" @click="slr = 4">
        <div class="text-xl font-bold leading-none lg:text-3xl">4</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': sgra === 4}" @click="sgra = 4">
        <div class="text-xl font-bold leading-none lg:text-3xl">4</div>
      </div>
      <div class="flex cursor-pointer select-none flex-col items-center rounded border border-gray-300 bg-white px-2 py-2 shadow-sm" :class="{'border-green-600 bg-green-100': spr === 4}" @click="spr = 4">
        <div class="text-xl font-bold leading-none lg:text-3xl">4</div>
      </div>
    </div>
  </div>
</template>
