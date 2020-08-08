<template>
  <div class="cart-list">
<!--    <ul>-->
<!--&lt;!&ndash;      <li v-for="item in cartList">{{item}}</li>&ndash;&gt;-->
<!--    </ul>-->
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: "CartList",
    computed:{
      ...mapGetters([
          'cartList'
      ])
    }
  }
</script>

<style scoped>

</style>