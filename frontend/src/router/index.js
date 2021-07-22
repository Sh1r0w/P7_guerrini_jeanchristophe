import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Registration from '../views/Registration.vue'
import Message from '../views/Msg.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Groupomania',
    component: Home
  },
  {
    path: '/registration',
    name: 'Registration',
    component: Registration
  },
  {
    path: '/message',
    name: 'forum',
    component: Message,
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
