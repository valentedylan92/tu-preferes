import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import GameScreenRather from '@/views/GameScreenRather.vue'
import GameScreenEver from '@/views/GameScreenEver.vue'

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/jai-deja',
    name: 'GameScreenEver',
    component: GameScreenEver
  },
  {
    path: '/tu-preferes',
    name: 'GameScreenRather',
    component: GameScreenRather
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
