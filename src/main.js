import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import router from './router'
import mitt from 'mitt';
import './assets/scss/main.scss'

const pinia = createPinia()
const emitter = mitt();
const app = createApp(App);

app.config.globalProperties.emitter = emitter;

app.use(pinia)
app.use(router)
app.mount('#app')
