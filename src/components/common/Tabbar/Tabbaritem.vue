<template>
    <div class="tab-bar-item" @click="itemClick">

        <div v-if="!isActive">
            <slot name="item-icon"></slot>
        </div>

        <div v-else>
            <slot name="item-icon-active"></slot>
        </div>

        <div :class="{active:isActive}" :style="activeStyle">
            <slot name="item-text"></slot>
        </div>

    </div>
</template>

<script>
    export default {
        name: "Tabbaritem",
        props:{
            path:String,
            activeColor:{
                type:String,
                default: 'red'
            }
        },


        computed:{
            isActive(){
                return this.$route.path.indexOf(this.path) != -1
            },
            activeStyle(){
                return this.isActive? {color:this.activeColor} : {}
            }
        },
        methods:{
            itemClick(){
                this.$router.replace(this.path)
            }
        }
    }
</script>

<style scoped>

    .tab-bar-item{
        /*设置每个小盒子平均分配*/
        flex: 1;
        height: 49px;
        text-align: center;
        padding-bottom: 5px;
    }

    .tab-bar-item img{
        margin-top: 3px;
        height: 24px;
    }

</style>