
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
    component: AdminUser,
    beforeEnter: (to, from, next) => {
      if (store.state.user.is_admin) {
        next()
      } else {
        store.commit('removeToken') // Remove the token if unauthorized
        next('/log-in') // Redirect to login page
      }
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
    component: StoreOwner,
    beforeEnter: (to, from, next) => {
      if (store.state.user.is_store_owner) {
        next()
      } else {
        store.commit('removeToken') // Remove the token if unauthorized
        next('/log-in') // Redirect to login page
      }
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.state.isAuthenticated
  const isAdmin = store.state.user.is_admin
  const isStoreOwner = store.state.user.is_store_owner

  if (to.matched.some(record => record.meta.requiresAdmin) && (!isAuthenticated || !isAdmin)) {
    // Log out and redirect to login if trying to access an admin page without permission
    store.commit('removeToken')
    localStorage.removeItem('token')
    next('/login')
  } else if (to.matched.some(record => record.meta.requiresStoreOwner) && (!isAuthenticated || !isStoreOwner)) {
    // Log out and redirect to login if trying to access a store owner page without permission
    store.commit('removeToken')
    localStorage.removeItem('token')
    next('/login')
  } else {
    next()
  }
})

export default router
