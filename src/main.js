import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import Vconsole from 'vconsole'

import '@/lib/import-components.js'
Vue.config.productionTip = false

// eslint-disable-next-line no-new
// if (process.env.NODE_ENV === 'development') new Vconsole()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
