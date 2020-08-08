import {debounce} from "./Utils";
import BackTop from "../components/content/backTop/BackTop";

export const itemListenerMixin = {
  data(){
    return{
      // 监听图片加载函数的变量
      itemImgListener:null,
      refresh:null
    }
  },
  mounted() {
    // 获取tabControler的offset
    // 所有的组件都有一个属性$el,可以拿到组件模板里的元素
    // 挂载防抖动
    this.refresh = debounce(this.$refs.scrollback.refresh,0)
    // 对监听的事件进行保存
    this.itemImgListener = ()=>{
      this.refresh()
    }
    // 执行刷新操作
    this.$bus.$on('imageLoads',this.itemImgListener)
  },
}





export const backTopmix = {
  components:{
    BackTop
  },
  data(){
    return{
      // 默认显示返回顶部控件不显示
      isShowBackTop:false,
    }
  },
  methods:{
    // 返回顶部
    backClick(){
      this.$refs.scrollback.scrollTos(0,0,1000)
    },
    // 判断是否显示返回顶部控件
    listenerShowBackTop(position) {
      position.y < -1000? this.isShowBackTop=true : this.isShowBackTop=false
    }
  }
}