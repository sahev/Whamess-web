import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'chart.js'
import 'hchs-vue-charts'


axios.defaults.baseURL = 'http://localhost:3000/'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)



new Vue({
  render: h => h(App),
  router
}).$mount('#app')
