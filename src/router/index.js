import { createRouter } from 'vue-router'
import GameScreenRather from '@/views/GameScreenRather.vue'
import GameScreenEver from '@/views/GameScreenEver.vue'

const routes = [
  {
    path: '/',
    name: 'GameScreenRather',
    component: GameScreenRather
  },
  {
    path: '/jai-deja',
    name: 'GameScreenEver',
    component: GameScreenEver
  },
]

const router = createRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
