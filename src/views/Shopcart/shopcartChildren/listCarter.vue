<template>
  <div class="cart-list">
    <scroll class="content" ref="scroller">
      <cart-list-item v-for="(item,index) in cartList"
                      :key="index"
                      :item-info="item">{{item}}
      </cart-list-item>
    </scroll>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import scroll from "../../../components/common/scroll/scroll";
  import cartListItem from "./cartListItem";

  export default {
    name: "listCarter",
    components:{
      scroll,
      cartListItem
    },
    computed:{
      ...mapGetters(['cartList'])
    },
    activated() {
      this.$refs.scroller.refresh()
    }
  }
</script>

<style scoped>
  .cart-list{
    height: calc(100% - 44px - 49px - 40px);
  }
  .content{
    height: 100%;
    overflow: hidden;
  }
</style>