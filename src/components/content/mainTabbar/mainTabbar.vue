<template>
    <Tabbar>
        <Tabbaritem path="/home" >
            <img slot="item-icon" src="../../../assets/img/tabbar/home.svg" alt="">
            <img slot="item-icon-active" src="../../../assets/img/tabbar/home_active.svg" alt="">
            <div slot="item-text">首页</div>
        </Tabbaritem>

        <Tabbaritem path="/category" activeColor="blue">
            <img slot="item-icon" src="../../../assets/img/tabbar/category.svg" alt="">
            <img slot="item-icon-active" src="../../../assets/img/tabbar/category_active.svg" alt="">
            <div slot="item-text">分类</div>
        </Tabbaritem>

        <Tabbaritem path="/shopcart" activeColor="blue">
            <img slot="item-icon" src="../../../assets/img/tabbar/cart.svg" alt="">
            <img slot="item-icon-active" src="../../../assets/img/tabbar/cart_active.svg" alt="">
            <div slot="item-text">购物车</div>
        </Tabbaritem>

        <Tabbaritem path="/profile" activeColor="blue">
            <img slot="item-icon" src="../../../assets/img/tabbar/profile.svg" alt="">
            <img slot="item-icon-active" src="../../../assets/img/tabbar/profile_active.svg" alt="">
            <div slot="item-text">我的</div>
        </Tabbaritem>
    </Tabbar>
</template>


<script>
import Tabbar from "../../common/Tabbar/Tabbar";
import Tabbaritem from "../../common/Tabbar/Tabbaritem";
    export default {
        name: "mainTabbar",
        components:{
            Tabbar,
            Tabbaritem
        }
    }
</script>

<style scoped>

</style>