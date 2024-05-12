import "~/index.css"

import { createApp } from "vue"
import { createPinia } from "pinia"

import router from "~/router"

import Application from "~/Application.vue"

const app = createApp(Application)
const pinia = createPinia()

app.use(router)
app.use(pinia)

app.mount("#app")
