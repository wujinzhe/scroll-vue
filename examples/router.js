import VueRouter from 'vue-router'
import Vue from 'vue'
// import home from './views/home.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/home.vue')
    },
    {
      path: '/demo1',
      name: 'demo1',
      component: () => import('./views/demo1.vue')
    }
  ]
})

export default router
