<template>
  <div class="bottom-bar">
    <!--左边：全选和选中-->
    <div class="check-content">
      <Check-button
              :is-checked="isSelectAll"
              @click.native="checkClick"
              class="button-class">
      </Check-button>
      <span>全选</span>
    </div>
    <!--中间总价-->
    <div class="p">
      合计：{{totalPrice}}
    </div>

    <!--右边总数-->
    <div class="t" @click="calcClick()">
      总数（ {{totalLength}} ）
    </div>
  </div>
</template>

<script>
  import CheckButton from "../../../components/content/CheckButton/CheckButton";
  import {mapGetters} from 'vuex'
  export default {
    name: "carBottomBar",
    components:{
      CheckButton,
    },
    computed:{
      ...mapGetters(['cartList']),
      // 商品总计
      totalPrice(){
        return '￥' + this.$store.state.cartList.filter(item => {
          return item.checked === true
        }).reduce((prevalue,n) =>{
          return prevalue + n.price * n.count
        },0).toFixed(2)
      },
      // 商品数量
      totalLength(){
        return this.$store.state.cartList.filter(item => {
          return item.checked === true
        }).length
      },
      // 全选按钮
      isSelectAll(){
        if (this.cartList.length ===0 ){
            return false
        } else{
            return !this.cartList.find(item=>!item.checked)
        }
      }
    },
    methods:{
      checkClick(){
        if (this.isSelectAll){   //全部选中   ---->改为全部不选中
          this.cartList.forEach(item =>{
            item.checked = false
          })
        }else{               //不是全部选中    ----->改为全部选中
          this.cartList.forEach(item =>{
            item.checked = true
          })
        }
      },
      calcClick(){
        if (!this.isSelectAll){  //全部没有选中
          this.$toast.show('请选择购买的商品',1500)
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar{
    display: flex;
    height: 40px;
    width: 100%;
    background-color: #eeeeee;
    position: relative;
  }
  .check-content{
    height: 100%;
    width: 20%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }
  .p{
    height: 100%;
    flex: 1;
    margin-left: 20px;
    color: red;
    line-height: 40px;
  }
  .t{
    height: 100%;
    width:30%;
    color:white;
    background-color: rgba(241, 39, 39, 0.99);
    line-height: 40px;
    text-align: center;
  }
</style>