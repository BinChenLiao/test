import Vue from 'vue'
import App from './App.vue'
import Http from '@utils/http'
Vue.config.productionTip = false
Vue.prototype.$http = Http;
new Vue({
  render: h => h(App),
}).$mount('#app')
