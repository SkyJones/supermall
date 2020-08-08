<template>
  <div class="goodItem" @click="itemClick">
    <img :src="showImage" alt="" @load="imageLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span>{{goodsItem.price}}</span>
      <span>{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props:{
      goodsItem:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    computed:{
      showImage(){
        return this.goodsItem.image || this.goodsItem.show.img
      }
    },
    methods:{
      // 给事件总线发送一个图片加载完成的事件
      // 思路一：由于这个事件不同的组件分区用的情况不一样，所以这里根据路由的path区别他们发出不同的事件
      //思路二使用全局事件取消的操作，这里依然这样发出这个事件
      imageLoad(){
        this.$bus.$emit('imageLoads')

        // if (this.$router.path.indexOf('/home')){
        //   this.$bus.$emit('homeItemImgLoad')
        // }else if(this.$router.path.indexOf('/detail')){
        //   this.$bus.$emit('detailItemImgLoad')
        // }
      },

      // 监听一个点击事件跳转到detail.vue
      itemClick(){
        this.$router.push('/detail/'+ this.goodsItem.iid)
      }
    }
  }
</script>

<style scoped>
  .goodItem {
    padding-bottom: 40px;
    position: relative;
    width: 48%;
  }
  .goods img {
    width: 100%;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: 0;
    width: 14px;
    height: 14px;
    background: url("../../../assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>