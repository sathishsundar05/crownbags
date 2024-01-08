import { createRouter, createWebHistory } from 'vue-router'
import Login from '../screens/login.vue'
import Dashboard from '../screens/dashboard.vue'
import Customer from '../screens/customer.vue'
import Order from '../screens/order.vue'
import Courier from '../screens/courier.vue'
import AddOrder from '../screens/addOrder.vue'

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
      path: '/addorder',
      name: 'Add Order',
      component: AddOrder
    },
    {
      path: '/courier',
      name: 'Courier',
      component: Courier
    }
  ]
})

router.beforeEach((to, from, next) => {
  if(to.path !== '/' && !localStorage.getItem('userDetails')) {
    next("/")
  } else if(to.path === '/' && localStorage.getItem('userDetails')) {
    next("/dashboard")
  } else {
    next();
  }
})

export default router
