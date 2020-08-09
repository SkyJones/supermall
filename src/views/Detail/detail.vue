<template>
  <div class="details">
    <detail-nav-bar
            class="detail-nav"
            ref="nav"
            @titleClick="titleClicker">
    </detail-nav-bar>
    <scroll class="content"
            @scroll="contentScroll"
            :probe-type="3"
            ref="scrollback">
      <div>
        <Detail-swiper :top-images="topImages"></Detail-swiper>
        <Detail-base-info :goods="goods"></Detail-base-info>
        <Detail-shop-info :shop="shop"></Detail-shop-info>
        <Detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoader"></Detail-goods-info>
        <Detail-param-info
                ref="params"
                :param-info="paramInfo">
        </Detail-param-info>
        <Detail-commend ref="comment"></Detail-commend>
        <GoodsList
                ref="recommend"
                :goods="recommend">
        </GoodsList>
      </div>
    </scroll>
    <Detail-bottom-bar @addToCart="addToCart"></Detail-bottom-bar>
    <BackTop @click.native="backClick()" v-show="isShowBackTop"></BackTop>
  </div>
</template>

<script>
  import detailNavBar from "./childComps/detailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommend from "./childComps/DetailCommend";
  import GoodsList from "../../components/content/Goods/GoodsList";
  import DetailBottomBar from "./childComps/DetailBottomBar";

  import scroll from "../../components/common/scroll/scroll"
  import {getDetail, Goods, Shop,GoodsParam,getRecommend} from "../../network/detail";
  import {itemListenerMixin,backTopmix} from "../../common/mixin";
  import {debounce} from "../../common/Utils";
  import {mapActions} from "vuex";

  export default {
    name: "detail",
    components:{
      detailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommend,
      GoodsList,
      DetailBottomBar,
      scroll,
    },
    data(){
      return{
        iid:null,
        topImages:[],
        goods:{},
        shop:{},
        detailInfo:{},
        paramInfo:{},
        recommend:[],
        themeTopYs:[],
        getThemeTopy:null,
        currentIndex:0,
      }
    },
    created() {
      // 保存传入的iid
      this.iid = this.$route.params.iid
      // 根据iid请求数据详情页的数据
      getDetail(this.iid).then((res)=>{
        const data = res.result
        this.topImages = data.itemInfo.topImages

        // 获取商品数据
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
        // 获取店铺信息
        this.shop = new Shop(data.shopInfo)
        // 获取下面的详情信息[因为这里的数据比较单一，没有上面两个复杂，所以没有用类保存]
        this.detailInfo = data.detailInfo
        // 获取商品参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
      })
      // 请求详情页中推荐数据
      getRecommend().then((res)=>{
        this.recommend = res.data.list
      })
      // 给getThemeTopY 赋值
      this.getThemeTopy = debounce(()=>{
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      },300)
    },
    // 混入
    mixins:[itemListenerMixin,backTopmix],

    mounted() {
    },
      // 因为这里没有进行缓存，所以离开时候调用的是destroy
    destroyed() {
      this.$bus.$off('imageLoads',this.itemImgListener)
    },
    methods:{
      ...mapActions(['addCart']),
      // Detail-goods-info图片加载刷新事件
      imageLoader(){
        this.$refs.scrollback.refresh
        // 图片加载完以后进行调用获取高度
        this.getThemeTopy()
      },
      // 监听导航栏点击事件
      titleClicker(index){
        this.$refs.scrollback.scrollTos(0,-this.themeTopYs[index],200)
      },
      // 监听页面滚动的时间
      contentScroll(position){
        // 获取position中的y值
        const y = -position.y
        //判断nav和页面的匹配
        let length = this.themeTopYs.length
        for (let i=0;i<length;i++){
          if (this.currentIndex !== i && (i<length-1 && y>=this.themeTopYs[i] && y<this.themeTopYs[i+1] )||(i === length-1 &&
              y>=this.themeTopYs[i])){
                this.currentIndex = i
                this.$refs.nav.currentIndex = this.currentIndex
          }
        }
        this.listenerShowBackTop(position)
      },
      // 监听添加到购物车
      addToCart(){
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        product.iid = this.iid
        // 将商品添加到购物车
        // Actions返回promise
        // this.$store.dispatch('addCart',product).then(res=>{
        //   console.log(res);
        // })

        // 将商品添加到购物车【使用Actions映射】
        this.addCart(product).then(res=>{
          this.$toast.show(res, 1500)
        })
      }
    }
  }
</script>

<style scoped>
  .details{
    position: relative;
    z-index: 9;
    background-color: white;
    height: 100vh;
  }
  .content{
    height: calc(100% - 44px - 55px);
  }
  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: white;
  }
</style>