<template>
  <div id="home">
    <Navbar class="homeNavbar"><div slot="center">购物街</div></Navbar>
    <TabControl :titles="['流行','新款','精选']"
                class="tab-control"
                ref="tabControler1"
                v-show="isTabFixed"
                @tabcontrolclick="tabcontrolclick">
    </TabControl>

    <scroll class="content"
            ref="scrollback"
            :probe-type="3"
            :pull-up-load="true"
            @pullingUp = 'LoadMore'
            @scroll="contentScroll">
      <homeSwiper :banners="banners" @swiperImageLoad="swiperImageLoad"></homeSwiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <Feature></Feature>
      <TabControl :titles="['流行','新款','精选']"
                  ref="tabControler"
                  @tabcontrolclick="tabcontrolclick">
      </TabControl>
      <GoodsList :goods="showGoods"></GoodsList>
    </scroll>

    <BackTop @click.native="backClick()" v-show="isShowBackTop"></BackTop>
  </div>
</template>

<script>
  import Navbar from "../../components/common/navbar/Navbar"
  import TabControl from "../../components/content/TabControl/TabControl";
  import GoodsList from "../../components/content/Goods/GoodsList";

  import homeSwiper from "./homechildren/homeSwiper"
  import recommendView from "./homechildren/recommendview"
  import Feature from "./homechildren/Feature"
  import scroll from "../../components/common/scroll/scroll";

  // 导入首页home的网络请求
  import {getHomeMutidata,getHomeGood} from '../../network/home'
  import {itemListenerMixin,backTopmix} from "../../common/mixin";

    export default {
      name: "home",
      components:{
        Navbar,
        TabControl,
        GoodsList,
        homeSwiper,
        recommendView,
        Feature,
        scroll
      },
      computed:{
        // 商品数据的切换类型控制
        showGoods(){
          return this.goods[this.currentType].list
        }
      },
      data(){
        return{
          // 保存好请求回来的数据
          banners:[],
          recommends:[],
          // 建立商品的数据保存结构
          goods:{
            'pop':{page:0,list:[]},
            'new':{page:0,list:[]},
            'sell':{page:0,list:[]}
          },
          //默认初始化的类型是pop
          currentType:'pop',
          // 控制栏距离页面窗口左上角的y向距离
          tabOffsetTop:597,
          // 判断控制栏是否吸顶:默认是不吸顶
          isTabFixed:false,
          // 记录离开时候的位置
          savey:0,
        }
      },
      methods:{
        /*
         *    网络请求相关的方法
         */
        // 拿到多条数据
        getHomeMutidata(){
          getHomeMutidata().then(res => {
            // 把请求的结果保存到一个变量中去
            /*
            this:箭头函数的this 会向上找第一个有this定义的对象，
            而这里上一个有this定义的对象就是当前的组件对象
             */
            this.banners = res.data.banner.list;
            this.recommends = res.data.recommend.list;
          })
        },
        // 拿到商品数据
        getHomeGood(type){
          const page = this.goods[type].page+1
          getHomeGood(type,page).then(res =>{
            // 这里使用了push方法的可变参数
            this.goods[type].list.push(...res.data.list)
            this.goods[type].page+=1
            this.$refs.scrollback.finishPullUp()
          })
        },

        /*
         *   事件监听相关的方法
         */
        //响应tabcontrolclick事件，展示不同的goods数据
        tabcontrolclick(index){
          switch (index) {
            case 0:
              this.currentType = 'pop'
              break;
            case 1:
              this.currentType = 'new'
              break;
            case 2:
              this.currentType = 'sell'
              break;
          }
          this.$refs.tabControler1.currentIndex = index
          this.$refs.tabControler.currentIndex = index
        },
        // 返回顶部
        backClick(){
          this.$refs.scrollback.scrollTos(0,0,1000)
        },
        // 是否显示返回顶部
        contentScroll(position){
          // 判断是否显示返回顶部控件
         this.listenerShowBackTop(position)
          // 判断tabControl是否吸顶【通过isTabFixed来决定tabControl的吸顶样式】
          this.isTabFixed = (-position.y)>this.tabOffsetTop
        },
        // 上拉加载更多
        LoadMore(){
          this.getHomeGood(this.currentType)
        },
        // 监听轮播图加载完成
        swiperImageLoad(){
          this.tabOffsetTop = this.$refs.tabControler.$el.offsetTop
        }
      },
      created() {
        // 请求多个参数
        this.getHomeMutidata()
        // 初始化请求商品数据
        this.getHomeGood('pop')
        this.getHomeGood('new')
        this.getHomeGood('sell')
      },
      // 针对商品条目GoodsListItem
      mixins:[itemListenerMixin,backTopmix],
      mounted() {
      },
      // 这两个方法是在keep-alive后才会调用的
      activated() {
        this.$refs.scrollback.scrollTos(0,44,0)
        this.$refs.scrollback.refresh()
      },
      // 由于better-scroll这个框架不持之获取content的y所以功能无法实现
      deactivated() {
        // 取消某个全局事件的监听【需要指定事件名和药执行的函数】
        this.$bus.$off('imageLoads',this.itemImgListener)
        // this.savey = this.$refs.scrollback.scrollHeight
        // console.log(this.savey);
      },

    }
</script>

<style scoped>
 #home{
   /*padding-top: 44px;*/
   /*表示视口的高度，设备视口*/
   height: 100vh;
   position: relative;
 }
 .homeNavbar{
   background-color: var(--color-tint);
   color: white;
 }
 .tab-control{
   position: relative;
   z-index: 9;
 }
  .content{
    /*计算滚动部分的高度第一种方案*/
    /*height: calc(100% - 93px);*/
    /*第二种方案*/
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }


</style>