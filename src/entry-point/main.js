import Vue from 'vue'
import App from '@/entry-point/App.vue'
import router from '@/router/router.js'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
