<script setup>
  import { ref } from "vue"

  import api from "~/api"
  import router from "~/router"
  import useStore from "~/store"

  const store = useStore()

  const isDisabled = ref(false)
  const email = ref("")
  const password = ref("")

  async function handleSignIn() {
    isDisabled.value = true
    try {
      await api.collection("users").authWithPassword(email.value, password.value)
      store.setCurrentUser(api.authStore.model)
      router.push("/")
    } catch(e) {
    }
    isDisabled.value = false
  }
</script>

<template>
  <div class="container py-6">
    <h1 class="font-bold text-2xl mb-2">Sign In</h1>

    <form class="space-y-2" @submit.prevent="handleSignIn" v-if="!isDisabled">
      <div><input class="form-input" type="email" placeholder="Email" v-model="email"></div>
      <div><input class="form-input" type="password" placeholder="Password" v-model="password"></div>
      <div><input class="button" type="submit" value="Sign In"></div>
    </form>

    <div v-if="isDisabled">
      Loading...
    </div>
  </div>
</template>
