<template>
  <Navbar>
    <div slot="left"
         @click="backClick"
         class="back">
      <img src="../../../assets/img/common/back.svg" alt="">
    </div>
    <div slot="center" class="title">
      <div  v-for="(item,index) in titles"
            :class="{active:currentIndex == index}"
            @click="titleClick(index)"
            class="item">
        {{item}}
      </div>
    </div>
  </Navbar>
</template>

<script>
  import Navbar from "../../../components/common/navbar/Navbar";

  export default {
    name: "detailNavBar",
    data(){
      return{
        titles:['商品','参数','评论','推荐'],
        currentIndex:0
      }
    },
    methods:{
      titleClick(index){
        this.currentIndex = index
        this.$emit('titleClick',index)
      },
      backClick(){
        this.$router.back()
      }
    },
    components:{
      Navbar
    }
  }
</script>

<style scoped>
 .title{
   display: flex;
   font-size: 16px;
 }
  .item{
    flex: 1;
  }
  .active{
    color: var(--color-high-text);
  }
  .back{
    margin-top: 6px;
  }
</style>