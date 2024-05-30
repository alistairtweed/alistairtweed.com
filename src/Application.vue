<script setup>
  import { onMounted } from "vue"

  import api from "~/api"
  import router from "~/router"
  import useStore from "~/store"

  const store = useStore()

  function handleSignOut() {
    api.authStore.clear()
    store.setCurrentUser(null)
    router.push("/sign-in")
  }

  onMounted(() => {
    store.setCurrentUser(api.authStore.model)
  })
</script>

<template>
  <div class="container py-4">
    <div class="flex justify-between">
      <div v-if="!$route.path.includes('timer')">
        <router-link class="font-bold" to="/">Alistair Tweed</router-link>
      </div>
      <div v-if="store.currentUser">
        <div class="link" @click="handleSignOut">Sign Out</div>
      </div>
    </div>
  </div>
  <router-view></router-view>
</template>
