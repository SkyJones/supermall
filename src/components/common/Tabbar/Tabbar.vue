<template>
    <div id="tab-bar">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "Tabbar",
    }
</script>

<style scoped>
    #tab-bar{
        /*设置大盒子为弹性盒模型*/
        display: flex;
        background-color: #f6f6f6;
        /*为大盒子的上边设置盒子阴影效果*/
        box-shadow: 0 -1px 1px rgba(100,100,100,.2);
        /*设置固定定位永远在底部*/
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
    }

</style>