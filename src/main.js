import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from "./router";
import Notifications from 'notiwind'
import VueLazyLoad from 'vue-lazyload'

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(Notifications)
app.use(VueLazyLoad)

app.mount('#app')
