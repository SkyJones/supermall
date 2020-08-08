import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";

Vue.config.productionTip = false

// 把$bus放入Vue原型中，Vue实例可以作为总线
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
