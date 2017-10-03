<template>
    <div class="goods-list">
        <div class="goods-item" v-for="(item, index) in goodsList" :key="index" @click="goto(item.id)">
            <img :src="item.img_url" alt="">
            <h4>{{item.title}}</h4>
            <div class="info">
                <p class="price">
                    <span class="nowPrice">￥{{item.sell_price}}</span>
                    <span>
                        <del>￥{{item.market_price}}</del>
                    </span>
                </p>
                <p class="sale">
                    <span>热卖中</span>
                    <span>剩{{item.stock_quantity}}件</span>
                </p>
            </div>
        </div>
        
        <mt-button type="danger" size="large" :plain="true" @click="getMore" :disabled="isNoMoreData" v-show="goodsList.length>0">加载更多</mt-button>
    </div>
</template>

<script>
import config from "../../config.js"

import {Toast} from "mint-ui"

export default {
    data() {
        return {
            pageIndex: 1,
            goodsList: [],
            picUrl: config.picUrl,
            isNoMoreData: false
        }
    },
    created() {
        this.getData();
    },
    methods: {
        goto(id){
            this.$router.push({name: "goodsdetail", params: {id}})
        },
        getMore() {
            this.pageIndex++;
            this.getData();
        },
        getData() {
            this.$http.get(config.apiUrl + "/api/getgoods?pageindex=" + this.pageIndex).then(res => {
                var data = res.body;
                if (data.status == 0) {
                    if (data.message.length > 0) {
                        this.goodsList = this.goodsList.concat(data.message);
                    } else {
                        if (this.pageindex != 1) {
                            Toast({
                                message: '没有更多内容了',
                                duration: 500
                            });
                            this.isNoMoreData = true;
                        }

                    }
                }
            })
        }
    }
}
</script>

<style scoped>
.goods-list {
    display: flex;
    flex-wrap: wrap;
    padding: 3px;
}

.goods-list .goods-item {
    width: 48%;
    border: 1px solid #ccc;
    margin: 1%;
    box-shadow: 0 0 7px #aaa;
    padding: 2px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.goods-list .goods-item img {
    width: 100%;
}

.goods-list .goods-item h4 {
    font-size: 14px;
}

.goods-list .goods-item .info p:nth-child(1) .nowPrice {
    color: red;
    font-size: 15px;
    margin-right: 8px;
}

.goods-list .goods-item .info p {
    margin: 0;
    margin-top: 10px;
    font-size: 13px;
}

.goods-list .goods-item .info {
    background-color: #eee;
}
</style>
