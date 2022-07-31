import { createRouter, createWebHistory } from 'vue-router'
import GameScreenRather from '@/views/GameScreenRather.vue'
import GameScreenEverHave from '@/views/GameScreenEverHave.vue'

const routes = [
  {
    path: '/',
    name: 'GameScreenRather',
    component: GameScreenRather
  },
  {
    path: '/jai-deja',
    name: 'GameScreenEverHave',
    component: GameScreenEverHave
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
