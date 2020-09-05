import Vue from 'vue'
import Router from 'vue-router'
import ImportMessages from '@/pages/ImportMessages.vue';
import Login from '@/pages/login.vue'
import qrCode from '@/pages/qrCode.vue'

Vue.use(Router)


export default new Router({
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
    }
  ]
})
