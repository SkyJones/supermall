import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";
// 图片懒加载
import VueLazyload from "vue-lazyload";
// 解决300ms延迟的问题
import Fastclick from 'fastclick'
Fastclick.attach(document.body)

// 导入插件
import toast from "./components/common/toast";
//安装插件：【本质上是调用Toast的install】
Vue.use(toast)
// 使用懒加载
Vue.use(VueLazyload,{
  // 传入占位图
  loading: require('assets/img/common/placeholder.png')
})
Vue.config.productionTip = false

// 把$bus放入Vue原型中，Vue实例可以作为总线
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
