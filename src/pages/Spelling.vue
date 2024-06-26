<script setup>
  import { ref, onMounted } from "vue"
  import confetti from "https://cdn.skypack.dev/canvas-confetti"

  const vowels = ref(["a", "e", "i", "o", "u"])
  const words = ref([])
  const currentWord = ref(null)
  const currentVowel = ref(null)
  const guesses = ref([])
  const guessed = ref(false)
  const showAnswer = ref(false)

  function startOver() {
    guesses.value = []
    guessed.value = false
    showAnswer.value = false

    currentWord.value = words.value[Math.floor(Math.random() * words.value.length)]

    const wordVowels = currentWord.value.split("").map((letter, index) => {
      if (vowels.value.includes(letter)) {
        return { letter, index }
      }
    }).filter(Boolean)

    currentVowel.value = wordVowels[Math.floor(Math.random() * wordVowels.length)]
  }

  function guess(vowel) {
    if (showAnswer.value) return

    if (vowel === currentVowel.value.letter) {
      guessed.value = true
      showAnswer.value = true
      confetti()
    } else {
      guesses.value.push(vowel)
    }
  }

  function revealAnswer() {
    showAnswer.value = true
  }

  async function fetchWords() {
    const response = await fetch("/words.txt")
    const text = await response.text()
    words.value = text.trim().split("\n")
  }

  onMounted(async () => {
    await fetchWords()
    startOver()
  })
</script>

<template>
  <div class="mx-auto flex max-w-md flex-col items-center px-6">
    <div class="mt-24 mb-12">
      <div class="text-5xl font-bold text-center" v-if="currentWord">
        <span v-for="(letter, index) in currentWord" :key="index">
          <span v-if="currentVowel && currentVowel.index === index" class="Blank" :class="{ '--correct': showAnswer }">{{ letter }}</span>
          <span v-else>{{ letter }}</span>
        </span>
      </div>
    </div>
    <div class="grid grid-cols-5 gap-2">
      <div class="Vowel" v-for="vowel in vowels" :key="vowel" @click="guess(vowel)" :class="{ '--incorrect': guesses.includes(vowel), '--correct': showAnswer && vowel === currentVowel.letter }">{{ vowel }}</div>
    </div>
    <div class="mt-4 flex items-center justify-center space-x-2">
      <div class="Button" @click="revealAnswer">Reveal</div>
      <div class="Button" @click="startOver">Next</div>
    </div>
  </div>
</template>

<style scoped>
  .Blank {
    @apply inline-block min-w-4 select-none border-b-2 border-gray-300 text-white;
  }

  .Blank.--correct {
    @apply text-green-600 select-auto border-transparent min-w-0;
  }

  .Button {
    @apply cursor-pointer select-none rounded bg-gray-200 px-4 py-1 text-center;
  }

  .Vowel {
    @apply cursor-pointer select-none rounded border border-gray-300 px-4 py-3 text-center text-2xl leading-none shadow-sm;
  }

  .Vowel.--correct {
    @apply border-green-600 bg-green-100 text-green-700;
  }

  .Vowel.--incorrect {
    @apply border-red-600 bg-red-100 text-red-700;
  }
</style>
