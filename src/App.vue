<template>
    <div class="app">
        <!-- 1. 头部 -->
        <mt-header fixed title="固定在顶部">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <!-- 2. router-view -->
        <router-view></router-view>
        <!-- 3. 导航 -->
        <nav class="mui-bar mui-bar-tab">
            <router-link class="mui-tab-item mui-active" to="/">
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link class="mui-tab-item" to="/member">
                <span class="mui-icon mui-icon-contact">
                </span>
                <span class="mui-tab-label">会员</span>
            </router-link>
            <router-link class="mui-tab-item" to="/cart">
                <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
                    <span class="mui-badge">0</span>
                </span>
                <span class="mui-tab-label">购物车</span>
            </router-link>
            <router-link class="mui-tab-item" to="/search">
                <span class="mui-icon mui-icon-search"></span>
                <span class="mui-tab-label">搜索</span>
            </router-link>
        </nav>
    </div>
</template>



<script>
export default {
    data() {
        return {
            name: "易俊雄"
        }
    }
}
</script>

<style>

body{
    background-color: white;
}

.app{
    padding-top: 40px;
    padding-bottom: 50px;
}
</style>

