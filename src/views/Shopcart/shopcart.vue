<template>
  <div class="shop-cart">
    <!--导航-->
    <Navbar class="nav-bar">
      <div slot="center">购物车（{{cartLength}}）</div>
    </Navbar>
    <!--添加商品列表-->
    <listCarter/>
    <!--添加底部汇总-->
    <car-bottom-bar></car-bottom-bar>
  </div>
</template>

<script>
  import Navbar from "../../components/common/navbar/Navbar";
  import listCarter from "./shopcartChildren/listCarter";
  import carBottomBar from "./shopcartChildren/carBottomBar";
  // 将getters中的函数直接转成这里的计算属性
  import {mapGetters} from 'vuex'

    export default {
      name: "shopcart",
      components:{
        Navbar,
        listCarter,
        carBottomBar
      },
      computed:{
        // 数组语法
        ...mapGetters(['cartLength'])
      }
    }

</script>

<style scoped>
  .shop-cart{
    height: 100vh;
  }
  .nav-bar{
    background-color: var(--color-tint);
    color: #fff;
  }

</style>