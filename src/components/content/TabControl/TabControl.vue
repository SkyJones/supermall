<template>
  <div class="Tab-control" >
    <div v-for="(item,index) in titles" class="titleitem"
         :class="{actives: index === currentIndex}"
         @click="itemclick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    data(){
      return {
        currentIndex:0
      }
    },
    props:{
      titles:{
        type:Array,
        default(){
          return []
        }
      }
    },
    methods:{
      itemclick(index){
        this.currentIndex = index
        //把点击的事件上传给home父组件，从而进行别的切换操作
        this.$emit('tabcontrolclick',index)
      }
    }
  }
</script>

<style scoped>
  .Tab-control{
    display: flex;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    text-align: center;
    background-color: #fff;
  }
  .titleitem{
    flex: 1;
  }
  .titleitem span{
    padding: 5px;
  }
  .actives {
    color: hotpink;
  }
  .actives span{
    border-bottom: 2px solid hotpink;
  }
</style>