import { createRouter, createWebHistory } from 'vue-router'
import Login from '../screens/login.vue'
import Dashboard from '../screens/dashboard.vue'
import Customer from '../screens/customer.vue'
import Order from '../screens/order.vue'
import Courier from '../screens/courier.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/customer',
      name: 'Customer',
      component: Customer
    },
    {
      path: '/order',
      name: 'Order',
      component: Order
    },
    {
      path: '/courier',
      name: 'Courier',
      component: Courier
    }
  ]
})

export default router
