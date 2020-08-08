<template>
<!--  导航-->
  <Navbar class="nav-bar">
    <div slot="center">购物车（{{cartLength}}）</div>
  </Navbar>

<!--  添加商品列表-->
  <CartList></CartList>

<!--  添加底部汇总-->
</template>

<script>
  import Navbar from "../../components/common/navbar/Navbar";
  import CartList from "./shopcartChildren/CartList";

  // 将getters中的函数直接转成这里的计算属性
  import {mapGetters} from 'vuex'
    export default {
      name: "shopcart",
      components:{
        Navbar,
        CartList
      },
      computed:{
        // 数组语法
        ...mapGetters(['cartLength'])
      }
    }
</script>

<style scoped>
  .nav-bar{
    background-color: var(--color-tint);
    color: #fff;
    /*text-align: center;*/
  }
</style>