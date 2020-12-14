import Vue from 'vue'
import Router from 'vue-router'
import home from '@/pages/home.vue';
import Login from '@/pages/login.vue'
import account from '@/pages/account.vue'
import signup from '@/pages/signup.vue'
import api from '@/pages/api.vue'

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
      name: 'home',
      component: home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/account',
      name: 'account',
      component: account,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: signup,
    },
    {
      path: '/api',
      name: 'api',
      component: api,
      meta: {
        requiresAuth: true
      }
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
