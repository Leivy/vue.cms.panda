<template>
    <div>
        <div class="news-title">
            <h4 v-text="goodsDesc.title"></h4>
        </div>
        <div class="news-content" v-html="goodsDesc.content">

        </div>
    </div>
</template>

<script>
import config from "../../config"

export default {
    data() {
        return {
            goodsDesc: {},
        }
    },
    created() {
        this.$http.get(config.apiUrl + "/api/goods/getdesc/" + this.$route.params.id).then(function(res) {
            var data = res.body;
            if (data.status == 0) {
                console.log(data);
                this.goodsDesc = data.message[0]
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

.news-title{
    border-bottom: 1px solid #ccc;
}

.news-content{
    padding:10px;
}

.news-content img{
    width: 100%
}
</style>


