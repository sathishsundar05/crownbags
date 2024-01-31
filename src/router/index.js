import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/screens/login.vue'
import Dashboard from '@/screens/Admin/dashboard.vue'
import Customer from '@/screens/Admin/customer.vue'
import CustomerUser from '@/screens/Customer/customer.vue'
import Order from '@/screens/Admin/order.vue'
import Courier from '@/screens/Admin/courier.vue'
import AddOrder from '@/screens/Admin/addOrder.vue'
import ErrorScreen from '@/screens/ErrorScreen.vue'
import Details from '@/screens/Customer/details.vue';
import ViewOrder from '@/screens/Admin/ViewOrder.vue';
import { menuStore } from "@/store/menu";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: { requiresAuth: true, role: 'A' }
    },
    {
      path: '/customer',
      name: 'Customer',
      component: Customer,
      meta: { requiresAuth: true, role: 'A' }
    },
    {
      path: '/user/customer',
      name: 'Customer User',
      component: CustomerUser,
      meta: { requiresAuth: true, role: 'C' }
    },
    {
      path: '/user/customer/details/:id',
      name: 'Details',
      component: Details,
      meta: { requiresAuth: true, role: 'C' }
    },
    {
      path: '/order',
      name: 'Order',
      component: Order,
      meta: { requiresAuth: true, role: 'A' }
    },
    {
      path: '/order/:id',
      name: 'Edit/Update Order',
      component: AddOrder,
      meta: { requiresAuth: true, role: 'A' }
    },
    {
      path: '/order/view/:id',
      name: 'View Order Detail',
      component: ViewOrder,
      meta: { requiresAuth: true, role: 'A' }
    },
    {
      path: '/courier',
      name: 'Courier',
      component: Courier,
      meta: { requiresAuth: true, role: 'A' }
    },
    {
      path: '/404',
      name: '404 Error',
      component: ErrorScreen
    }
  ]
})


router.beforeEach(async (to, from, next) => {
  const isAuthenticated = JSON.parse(localStorage.getItem('userDetails'));
  if (!isAuthenticated && to.path !== '/') {
    next('/')
  } else {
    if(to.matched.some(record => record.meta.requiresAuth)) {
      if(to.matched[0].meta.role === isAuthenticated.type) {
        next()
      } else {
        next('/404')
      }
    } else {
      if(to.path === '/404') {
        return next();
      } else if(to.path !== '/dashboard' && isAuthenticated?.type === 'A') {
        next('/dashboard')
      } else if(to.path !== '/user/customer' && isAuthenticated?.type === 'C') {
        next('/user/customer')
      } else {
        next()
      }
    }
  }
})

router.afterEach((to, from , next) => {
  const mStore = menuStore();
  const isAuthenticated = JSON.parse(localStorage.getItem('userDetails'));

  if(isAuthenticated && isAuthenticated?.type === 'A') {
    mStore.$updateMenu([
      {
        name: "Customers",
        to: "/customer",
      },
      {
        name: "Orders",
        to: "/order",
      },
      {
        name: "Courier",
        to: "/courier",
      },
    ]);
  } else {
    mStore.$updateMenu([]);
  }
})

export default router