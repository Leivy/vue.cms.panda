<template>
    <div>
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a class="mui-control-item" @click.prevent="goCategory(0)" >
                        全部
                    </a> 

                    <!-- 这里如果直接使用router-link 由于mui样式类的原因，会导致连接跳转不正常！ -->
                    <!-- 就换一种实现方式，点击连接的时候，不使用to进行跳转，而是直接使用js代码的方式，进行跳转操作 -->
                    <a class="mui-control-item" @click.prevent="goCategory(item.id)" v-for="(item, index) in categories" :key="index">
                        {{item.title}}
                    </a>
                </div>
            </div>
        </div>

        <div class="pic-list">
            <img v-for="(item, index) in pictures" :key="index" :src="picUrl + item.img_url" alt="">
        </div>
    </div>
</template>

<script>

//1. 将滑动的分类的html代码粘贴进来
//2. 引入 mui的js 代码
//3. 使用官方文档说明的js代码形式，调用mui的方法
//4. 由于babel自动将所有的js代码转化成严格模式，但是严格模式下不能使用caller callee arguments，可是mui的js文件中用到了
//5. 下载babel的一个插件babel-plugin-transform-remove-strict-mode 
//6. 在.babelrc中配置这个插件
//{
    //preset: ["env"],
    //plugins: ["transform-remove-strict-mode"]
// }
//7. 重新运行一次npm run dev

//8. 由于粘贴进来的代码中有，fullScreen的类，所以需要将其移除！

import mui from "../../../lib/mui/js/mui"

import config from "../../config.js"



export default {
    data(){
        return {
            categories: [],
            pictures: [],
            picUrl: "http://ofv795nmp.bkt.clouddn.com/"
        }
    },
    mounted(){
        //mui提供的方法，就是让指定的元素，可以滚动起来
        //所以，我们需要在元素加载完成之后，再去使用mui提供的方法
        //所以，将如下的代码，写在 mounted钩子函数中！
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    },
    created(){
        //1. 获取顶部分类的数据
        this.$http.get(config.apiUrl + "/api/getimgcategory").then(function(res){
            var data = res.body;
            if(data.status == 0){
                // console.log(data);
                this.categories = data.message;
            }
        })

        //2. 获取当前分类中所有图片的数据
        this.getPicData();
    },
    methods: {
        getPicData(){
            this.$http.get(config.apiUrl + "/api/getimages/" + this.$route.params.id).then(function(res){
                var data = res.body;
                if(data.status == 0){
                    // console.log(data);
                    this.pictures = data.message;
                }
            })
        },
        goCategory(id){
            this.$router.push("/pic/list/" + id);
        }
    },
    watch: {
        $route(){
            this.getPicData();
        }
    }
}
</script>

<style>

</style>
