//1. 导入Vue模块
import Vue from "vue"

//4. 导入路由插件 vue-router
import VueRouter from "vue-router"

//5. 将VueRouter和Vue关联起来
Vue.use(VueRouter);


// 导入相应的组件文件
import HomeContainer from "../components/containers/HomeContainer.vue"
import MemberContainer from "../components/containers/MemberContainer.vue"
import CartContainer from "../components/containers/CartContainer.vue"
import SearchContainer from "../components/containers/SearchContainer.vue"

import NewsList from "../components/news/list.vue"
import NewsDetail from "../components/news/detail.vue"

import PicList from "../components/picture/list.vue"
import PicDetail from "../components/picture/detail.vue"


export default new VueRouter({
    routes: [
        {path: "/", component: HomeContainer},
        {path: "/member", component: MemberContainer},
        {path: "/cart", component: CartContainer},
        {path: "/search", component: SearchContainer},
        {path: "/news/list", component: NewsList},
        {path: "/news/detail/:id", component: NewsDetail},
        
        {path: "/pic/list", redirect: "/pic/list/0"},
        {path: "/pic/list/:id", component: PicList},
        {path: "/pic/detail/:id", component: PicDetail}
    ]
})