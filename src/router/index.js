import Vue from 'vue'
import Router from 'vue-router'

// 使用懒加载的方式配置路由
const home = () => import('../views/Home/home')
const category = () => import('../views/Category/category')
const shopcart = () => import('../views/Shopcart/shopcart')
const profile = () => import('../views/Profile/profile')
const detail = () => import('../views/Detail/detail')

Vue.use(Router)

const routes = [
  // 配置默认的首页
  {
    path:'',
    redirect:'/home'
  },
  {
    path: '/home',
    component: home
  },
  {
    path: '/category',
    component: category
  },
  {
    path: '/shopcart',
    component:shopcart
  },
  {
    path: '/profile',
    component:profile
  },
  {
    path: '/detail/:iid',
    component:detail
  }
]
export default new Router({
  routes,
  mode:'history'
})

