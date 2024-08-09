
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import AdminUser from '@/views/dashboard/AdminUser.vue'
import AddOwner from '@/views/dashboard/AddOwner.vue'
import StoreOwner from '@/views/dashboard/StoreOwner.vue'
// import Dashboard from '@/views/dashboard/Dashboard.vue'
import LogIn from '../views/LogIn.vue'

import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/log-in',
    name: 'LogIn',
    component: LogIn
  },
  {
    path: '/adminuser',
    name: 'AdminUser',
    component: AdminUser,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/adminuser/add-owner',
    name: 'AddOwner',
    component: AddOwner,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/store-owner',
    name: 'StoreOwner',
    component: StoreOwner,
    meta: {
      requireLogin: true
    }
  },
  // {
  //   path: '/dashboard',
  //   name: 'Dashboard',
  //   component: Dashboard,
  //   meta: {
  //     requireLogin: true
  //   }
  // },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireLogin) && !store.state.isAuthenticated) {
    next('/log-in')
  } else {
    next()
  }
})

export default router
