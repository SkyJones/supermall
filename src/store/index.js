import Vue from 'vue'
import Vuex from 'vuex'

// 1、安装插件
Vue.use(Vuex)
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";
const state = {
  cartList:[]
}

// 2、创建Store对象
const store = new Vuex.Store({
  state,
  /*
   mutations:唯一的目的就是修改state中的状态
   mutations:它里面额每一个方法最好只完成一件事情
   */
  mutations,
  actions,
  getters
})
// 3、挂载到到vue实例上
export default store