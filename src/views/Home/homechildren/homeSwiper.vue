<template>
    <Swiper>
      <SwiperItem v-for="item in banners">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imageLoad">
        </a>
      </SwiperItem>
    </Swiper>
</template>

<script>
  import {Swiper,SwiperItem} from '../../../components/common/swiper/index'

  export default {
    name: "homechildren",
    data(){
      return{
        // 默认没有加载
        isload:false
      }
    },
    props:{
      banners:{
        type:Array,
        default(){
          return []
        }
      }
    },
    components:{
      Swiper,
      SwiperItem
    },
    methods:{
      imageLoad(){
        //因为这里影响页面加载布局的是轮播图，只要有一个图片加载完就OK了
        // 这样可以让图片加载完成的事件发出一次就行了
        if (!this.isload){
          this.$emit('swiperImageLoad')
          this.isload = true
        }
      },
    }
  }
</script>

<style scoped>

</style>