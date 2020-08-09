import {
  ADD_COUNTER,
  ADD_TO_CART
} from "./mutation-types";

export default {
  // 这里的context指的是store
  addCart (context,payload) {
    return new Promise((resolve,reject)=>{
      // 箭头函数简写
      let product = context.state.cartList.find(item => item.iid === payload.iid)
      // 判断情况，我们只需要给旧的商品里面的count属性添加1
      if (product){
        context.commit(ADD_COUNTER,product)
        resolve('商品数量加+1')
      } else {
        // 如果这个商品是第一次加入购物车，默认给商品的count属性赋值1，然后添加到购物车
        payload.count = 1
        context.commit(ADD_TO_CART,payload)
        resolve('添加新的商品')
      }
    })
  }
}