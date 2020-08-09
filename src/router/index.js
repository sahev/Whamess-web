import Vue from 'vue'
import Router from 'vue-router'
import ImportMessages from '@/pages/ImportMessages.vue';
import Login from '@/pages/Login.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
        path: '/home',
        name: 'Home',
        component: ImportMessages
      }
  ]
})
