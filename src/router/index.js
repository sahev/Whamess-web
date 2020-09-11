import Vue from 'vue'
import Router from 'vue-router'
import ImportMessages from '@/pages/ImportMessages.vue';
import Login from '@/pages/login.vue'
import qrCode from '@/pages/qrCode.vue'
import account from '@/pages/account.vue'
import signup from '@/pages/signup.vue'
import dashboard from '@/pages/dashboard.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: ImportMessages,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/getqrcode',
      name: 'getQrCode',
      component: qrCode,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/account',
      name: 'account',
      component: account,
      // meta: {
      //   requiresAuth: true
      // }
    },
    {
      path: '/signup',
      name: 'signup',
      component: signup,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: dashboard,
      // meta: {
      //   requiresAuth: true
      // }
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('token') === null) {
      next({
        path: '/'
      })
    } else {
      next();
    }
  } else {
    next();
  }
})

export default router;
