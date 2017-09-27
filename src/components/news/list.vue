<template>
    <div>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="(item, index) in news" :key="index">
                <router-link :to="'/news/detail/' + item.id">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        {{item.title}}
                        <p class='mui-ellipsis'>
                            <span>发表时间：{{item.add_time | dateFormat}}</span>
                            <span>点击：{{item.click}}次</span>
                        </p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import config from "../../config.js"


export default {
    data(){
        return {
            apiUrl: config.apiUrl,
            news: []
        }
    },
    created(){
        this.$http.get(this.apiUrl + "/api/getnewslist").then(function(res){
            var data = res.body;
            if(data.status == 0){
                this.news = data.message;
                // console.log(data);
            }
        })
    }
}
</script>

<style>
.mui-ellipsis{
    color: #26A2FF;
    display: flex;
    justify-content: space-between;
}
</style>


