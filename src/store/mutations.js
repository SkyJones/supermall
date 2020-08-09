import {
 ADD_COUNTER,
 ADD_TO_CART
} from "./mutation-types";

export default {
  [ADD_COUNTER](state,payload){
    payload.count++
  },
  [ADD_TO_CART](state,payload){
    // 默认购物车中是选中的
    payload.checked = true
    state.cartList.push(payload)
  }
}