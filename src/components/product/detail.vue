<template>
  <div class="good-details">

    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="reddot" v-show="isRedDotShow"></div>
    </transition>
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper :pic-list="picList"></swiper>
        </div>
      </div>
    </div>

    <div class="mui-card">
      <div class="mui-card-header">{{goodsInfo.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <div class="price">
            <span>市场价：
              <del>￥{{goodsInfo.market_price}}</del>
            </span>&nbsp;&nbsp;&nbsp;&nbsp;
            <span>销售价：
              <span class="sale_price">￥{{goodsInfo.sell_price}}</span>
            </span>
          </div>
          <div class="count">
            <span>购买数量：</span>
            <div data-numbox-min="1" :data-numbox-max="goodsInfo.stock_quantity" class="mui-numbox" style="height: 28px;">
              <button type="button" class="mui-btn mui-btn-numbox-minus" disabled="">-</button>
              <input type="number" value="1" class="mui-input-numbox">
              <button type="button" class="mui-btn mui-btn-numbox-plus">+</button>
            </div>
          </div>
          <div class="operate">
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToCart">加入购物车</mt-button>
          </div>
        </div>
      </div>
    </div>

    <div class="mui-card">
      <div class="mui-card-header mui-card-media">
        商品参数
      </div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号: {{goodsInfo.goods_no}}</p>
          <p>库存情况: {{goodsInfo.stock_quantity}}件</p>
          <p>上架时间: {{goodsInfo.add_time | dateFormat}}</p>
        </div>
      </div>
      <div class="mui-card-footer1">
        <mt-button type="primary" :plain="true" size="large" @click="$router.push('/goods/desc/' + goodsInfo.id)">图文介绍</mt-button>
        <br>
        <mt-button type="danger" :plain="true" size="large" @click="$router.push('/goods/comment/' + goodsInfo.id)">商品评论</mt-button>

      </div>
    </div>
  </div>
</template>

<script>
import swiper from "../subcomps/swiper.vue"
import config from "../../config"
import mui from "../../../lib/mui/js/mui"

export default {
  data() {
    return {
      picList: [],
      picUrl: config.picUrl,
      goodsInfo: {},
      isRedDotShow: false
    }
  },
  components: {
    swiper
  },
  created() {
    //获取商品轮播图的api和图片分享的缩略图用的是同一个api地址
    this.$http.get(config.apiUrl + "/api/getthumimages/" + this.$route.params.id).then(res => {
      var data = res.body;
      if (data.status == 0) {
        console.log(data);
        data.message.forEach(v => {
          v.img = this.picUrl + v.src;
        })
        this.picList = data.message;


      }
    })

    //获取商品的详细信息
    this.$http.get(config.apiUrl + "/api/goods/getinfo/" + this.$route.params.id).then(res => {
      var data = res.body
      if (data.status == 0) {
        console.log(data);
        this.goodsInfo = data.message[0];

        //设置numbox的最大值为商品的库存
        mui(".mui-numbox").numbox().setOption("max", this.goodsInfo.stock_quantity)
      }
    })
  },
  mounted() {
    mui(".mui-numbox").numbox()
  },
  methods: {
    addToCart() {
      this.isRedDotShow = !this.isRedDotShow;

      //获取用户选择的数量
      var buyCount = mui(".mui-numbox").numbox().getValue();

      //将当前商品的信息，以及购买数量存入购物车内

      this.$store.commit("addToCart", { id: this.$route.params.id, count: buyCount })


      //更新tabbar上面的购物车的小圆点数字
    },
    beforeEnter(el) {
      el.style.transform = "translate(0px, 0px)"
    },
    enter(el) {
      el.offsetWidth;
      el.style.transform = "translate(110px, " + (window.pageYOffset + 320) + "px)";
    },
    afterEnter(el) {
      this.isRedDotShow = !this.isRedDotShow;
    }
  }
}
</script>

<style scoped>
.mui-card-media {
  color: #000;
}

.sale_price {
  color: red;
  font-size: 18px;
}

.count {
  margin: 10px auto;
}

p {
  font-size: 14px;
  margin-top: 0;
  margin-bottom: 10px;
  color: #8f8f94;
}

.mui-card-footer1 {
  position: relative;
  min-height: 44px;
  padding: 10px 15px;
  color: #6d6d72;
  border-radius: 0 0 2px 2px;
  border-top: 1px solid #ccc;
}

.reddot {
  width: 20px;
  height: 20px;
  background-color: red;
  position: absolute;
  top: 320px;
  left: 145px;
  z-index: 999;
  border-radius: 50%;
  transition: all .1s cubic-bezier(0, 1.64, .67, -0.65);
}

.good-details {
  position: relative;
}
</style>
