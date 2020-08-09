<template>
  <div class="button">
    <img src="../../../assets/img/cart/tick.svg"
         :class="{checked:isChecked}"
         alt="">
  </div>
</template>

<script>
  export default {
    name: "CheckButton",
    props:{
      isChecked:{
        type:Boolean,
        default:true
      }
    }
  }
</script>

<style scoped>
  img{
    border: 2px solid #9c9696;
    background-color: #c4c3c3;
    border-radius: 50%;
  }
  .checked{
    border: 2px solid red;
    background-color: red;
    border-radius: 50%;
  }
</style>