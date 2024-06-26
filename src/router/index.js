import { createRouter, createWebHistory } from "vue-router"

import api from "~/api"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: () => import("~/pages/Home.vue") },
    { path: "/calculator", component: () => import("~/pages/Calculator.vue") },
    { path: "/sign-in", component: () => import("~/pages/SignIn.vue") },
    { path: "/timer", component: () => import("~/pages/Timer.vue") },
  ]
})

router.beforeEach((to, from, next) => {
  const publicPages = [
    "/calculator",
    "/sign-in",
    "/timer"
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
