<template>
  <div class="toast" v-show="isshow">
    <div>{{message}}</div>
  </div>
</template>

<script>
  export default {
    name: "Toast",
    props:{
    },
    data(){
      return{
        message:'',
        isshow:false
      }
    },
    methods:{
      show(mess,duration=1500){
        this.isshow = true
        this.message = mess
        setTimeout(()=>{
          this.isshow = false
          this.message = ''
        },duration)
      }
    }
  }
</script>

<style scoped>
  .toast{
    color: white;
    position: fixed;
    top: 50%;
    left: 50%;
    background-color: rgba(0,0,0,0.8);
    transform: translate(-50%,-50%);
    z-index: 9999;
  }
</style>