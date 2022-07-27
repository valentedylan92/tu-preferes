import { createRouter, createWebHistory } from 'vue-router'
import GameScreen from '../views/GameScreen.vue'

const routes = [
  {
    path: '/',
    name: 'GameScreen',
    component: GameScreen
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
