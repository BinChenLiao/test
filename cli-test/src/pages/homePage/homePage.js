import Vue from 'vue'
import App from './App.vue'
import Http from '@utils/http'
import datePicker from 'multifunctional-datepicker'
Vue.config.productionTip = false
Vue.prototype.$http = Http;
Vue.prototype.$datePicker = datePicker;
new Vue({
  render: h => h(App),
}).$mount('#app')
