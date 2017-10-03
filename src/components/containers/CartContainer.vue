<template>
    <div>
        <div class="goods-list">
            <div class="mui-card" v-for="(item, index) in goodsList" :key="index">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <mt-switch v-model="item.isSelect"></mt-switch>
                        <img :src="picUrl + item.thumb_path" class="thumb_img">
                        <div class="info">
                            <h4>{{item.title}}</h4>
                            <div class="box">
                                <span class="price">￥{{item.sell_price}}</span>
                                <div data-numbox-min="1" class="mui-numbox" style="height: 28px;">
                                    <button type="button" class="mui-btn mui-btn-numbox-minus" disabled="" @click="minusCount(item.id)">-</button>
                                    <input type="number" :value="$store.getters.counts[item.id]" class="mui-input-numbox">
                                    <button type="button" @click="addCount(item.id)" class="mui-btn mui-btn-numbox-plus">+</button>
                                </div>
                                <a href="#" @click.prevent="del(item.id)">删除</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mui-card">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <div class="amount">
                            <p>总计（不含运费）</p>
                            <p>
                                已勾选商品
                                <span class="red">{{totalCount}}</span> 件 总价：
                                <span class="red">￥{{totalPrice}}</span>
                            </p>
                        </div>
                        <button class="mint-button mint-button--danger mint-button--normal">
                            <!---->
                            <label class="mint-button-text">去结算</label>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import config from "../../config"
import mui from "../../../lib/mui/js/mui"
import Vue from "vue"

export default {
    data() {
        return {
            goodsList: [],
            picUrl: config.picUrl
        }
    },
    methods: {
        minusCount(id) {
            //告诉vuex帮我把id为xx的元素的count-1
            this.$store.commit("minusCount", id)
        },
        addCount(id) {
            //告诉vuex帮我把id为xx的元素的count+1
            this.$store.commit("addCount", id)
        },
        del(id){
            this.$store.commit("del", id);
            
            this.goodsList.splice(this.goodsList.findIndex(v=>{
                return v.id == id;
            }), 1);
        }
    },
    created() {
        //先从vuexstore对象中获取出来所有的购物车数据
        //由于购物车数据中数据的格式为 {id: 88, count: 1}
        //我们需要取出来所有的id，所以使用map方法，将所有id拿出来变成一个数组
        //然后调用join方法，将其用,分隔转换成字符串
        var ids = this.$store.state.carts.map(v => {
            return v.id
        }).join(",");

        if (!ids) {
            return;
        }

        this.$http.get(config.apiUrl + "/api/goods/getshopcarlist/" + ids).then(res => {
            var data = res.body;
            if (data.status == 0) {
                // console.log(data);
                data.message.forEach(v => {
                    v.isSelect = true;
                })
                this.goodsList = data.message;

                Vue.nextTick(function() {
                    mui(".mui-numbox").numbox();
                })

            }
        })

        // console.log(this.$store.getters.counts);
    },
    computed: {
        totalCount() {
            //获取到了所有被选中的商品信息
            var selectedGoods = this.goodsList.filter(function(v) {
                return v.isSelect;
            })

            //获取被选中的商品的数量 求总和
            var sum = 0;
            selectedGoods.forEach(v => {
                sum += this.$store.getters.counts[v.id];
            })
            return sum;
        },
        totalPrice() {
            var selectedGoods = this.goodsList.filter(function(v) {
                return v.isSelect;
            })

            var price = 0;
            selectedGoods.forEach(v => {
                price += this.$store.getters.counts[v.id] * v.sell_price;
            })
            return price;

        }
    }
}
</script>

<style>
.goods-list .mui-card-content-inner {
    display: flex;
}


.goods-list .mui-card-content-inner .thumb_img {
    width: 60px;
    height: 60px;
}

.goods-list .mui-card-content-inner .info {
    flex: 1;
}

.goods-list .mui-card-content-inner .info h4 {
    font-size: 14px;
}

.goods-list .mui-card-content-inner .info .box {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.goods-list .mui-card-content-inner .info .box .price {
    font-size: 16px;
    color: red;
}

.mui-card-content-inner .amount {
    flex: 1;
}

.mui-card-content-inner .red {
    color: red;
    font-size: 16px;
    font-weight: bold;
}
</style>


