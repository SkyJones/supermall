<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BS from 'better-scroll'

  export default {
    name: "scroll",
    data(){
      return{
        scrolls: null
      }
    },
    props:{
      probeType:{
        type:Number,
        default:0
      },
      pullUpLoad:{
        type:Boolean,
        default:false
      }
    },
    mounted() {
      // 创建scrolls对象  这里不要使用queryselect拿dom节点
      this.scrolls = new BS(this.$refs.wrapper,{
        // 设置为true，里面的div元素才能发生点击事件
        click:true,
        // 通过父元素传入的情况设置是否要监听
        probeType:this.probeType,
        // 上拉加载更多
        pullUpLoad:this.pullUpLoad
      })

      // 监听滚动事件
      if (this.probeType == 2 || this.probeType == 3){
        this.scrolls.on('scroll',(position)=>{
          this.$emit('scroll',position)
        })
      }

      // 监听到滚到底部
      if (this.pullUpLoad){
        this.scrolls.on('pullingUp',()=>{
          this.$emit('pullingUp')
        })
      }
    },
    methods:{
      // 返回顶部
      scrollTos(x,y,time=1000){
        this.scrolls && this.scrolls.scrollTo(x, y, time)
      },

      // 多次上拉加载更多
      finishPullUp(){
       this.scrolls.finishPullUp()
      },

      // 刷新scroll的方法，会从新计算scroll的height
      refresh(){
        // 保证是在有值的情况下调用方法
        // console.log('------');
        this.scrolls && this.scrolls.refresh()
      },
      // 拿到首页y值
      getScrollY(){
        return this.scrolls ? this.scrolls.y :0
      }
    }
  }
</script>

<style scoped>

</style>