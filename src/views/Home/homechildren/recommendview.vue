<template>
  <div class="recommend">
    <div v-for="item in recommends" class="recommenditem">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "recommendview",
    props:{
      recommends:{
        type:Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>
 .recommend{
   display: flex;
   text-align: center;
   padding: 12px 0 30px;
   border-bottom: 8px solid #eee;
 }
 .recommenditem{
   flex: 1;
   color: rgb(119,119,119);

 }
  .recommenditem img {
    height: 80px;
    width: 80px;
    margin-bottom: 10px;
  }

</style>