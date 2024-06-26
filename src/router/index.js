import { createRouter, createWebHistory } from "vue-router"

import api from "~/api"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: () => import("~/pages/Home.vue"), meta: { requiresAuth: true } },
    { path: "/calculator", component: () => import("~/pages/Calculator.vue") },
    { path: "/sign-in", component: () => import("~/pages/SignIn.vue") },
    { path: "/spelling", component: () => import("~/pages/Spelling.vue") },
    { path: "/timer", component: () => import("~/pages/Timer.vue") },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && !api.authStore.isValid) {
    return next("/sign-in")
  } else if (to.path == "/sign-in" && api.authStore.isValid) {
    return next("/")
  } else {
    next()
  }
})

export default router
