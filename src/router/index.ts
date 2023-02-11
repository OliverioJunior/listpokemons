import { createRouter, createWebHistory } from "vue-router";
import Home from '../views/Home/Home.vue'

const routes = [{
  path: '/',
  name: 'Home',
  component: Home
},{
  path: '/pokemon/:id',
  component: ()=> import('../views/Pokemon/Pokemon.vue')
}]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
