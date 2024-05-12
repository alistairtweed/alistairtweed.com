import { createRouter, createWebHistory } from "vue-router"

import api from "~/api"

import HomePage from "~/pages/HomePage.vue"
import SignInPage from "~/pages/SignInPage.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: HomePage },
    { path: "/sign-in", component: SignInPage }
  ]
})

router.beforeEach((to, from, next) => {
  const publicPages = [
    "/sign-in"
  ]

  if (!publicPages.includes(to.path) && !api.authStore.isValid) {
    return next("/sign-in")
  } else if (to.path == "/sign-in" && api.authStore.isValid) {
    return next("/")
  } else {
    next()
  }
})

export default router
