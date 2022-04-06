import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/style/global.css'
import mitt from 'mitt'


const app = createApp(App).use(store).use(router)

const emitter = mitt()
app.config.globalProperties.emitter = emitter;

app.mount('#app')