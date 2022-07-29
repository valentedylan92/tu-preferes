import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import mitt from 'mitt';
import './assets/scss/main.scss'
const emitter = mitt();
const app = createApp(App);
app.config.globalProperties.emitter = emitter;

app.use(router).mount('#app')
