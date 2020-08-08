<template>
    <Swiper  class="swiperr">
      <Swiper-item v-for="item in topImages">
        <img :src="item" alt="">
      </Swiper-item>
    </Swiper>
</template>

<script>
  import {Swiper,SwiperItem} from '../../../components/common/swiper/index'

  export default {
    name: "DetailSwiper",
    components:{
      Swiper,
      SwiperItem
    },
    props:{
      topImages:{
        type:Array,
        default(){
          return[]
        }
      }
    }
  }
</script>

<style scoped>
  .swiperr{
    height: 300px;
    overflow: hidden;
  }
</style>