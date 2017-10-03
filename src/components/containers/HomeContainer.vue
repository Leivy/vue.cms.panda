<template>
  <div>
    
    <swiper :pic-list="picList"></swiper>

    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/news/list">
          <!-- <span class="mui-icon mui-icon-home"></span> -->
          <img src="../../images/menu3.png" alt="">
          <div class="mui-media-body">
            新闻资讯
          </div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/pic/list">
          <!-- <span class="mui-icon mui-icon-email">
              <span class="mui-badge">5</span>
            </span> -->
          <img src="../../images/menu4.png" alt="">

          <div class="mui-media-body">
            图片分享
          </div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/goods/list">
          <!-- <span class="mui-icon mui-icon-chatbubble"></span> -->
          <img src="../../images/menu5.png" alt="">
          <div class="mui-media-body">
            商品购买
          </div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/news/list">
          <!-- <span class="mui-icon mui-icon-location"></span> -->

          <img src="../../images/menu6.png" alt="">
          <div class="mui-media-body">
            留言反馈
          </div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/news/list">
          <!-- <span class="mui-icon mui-icon-search"></span> -->
          <img src="../../images/menu9.png" alt="">
          <div class="mui-media-body">
            视频专区
          </div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/news/list">
          <!-- <span class="mui-icon mui-icon-phone"></span> -->

          <img src="../../images/menu10.png" alt="">
          <div class="mui-media-body">
            联系我们
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import config from "../../config"

import swiper from "../subcomps/swiper.vue"

export default {
  data() {
    return {
      picList: [],
      apiUrl: config.apiUrl
    }
  },
  created() {
    this.$http.get(this.apiUrl + "/api/getlunbo").then(function(res) {
      var data = res.body;
      if (data.status == 0) {
        data.message.forEach(v=>{
            v.img = this.apiUrl + v.img;
        })
        this.picList = data.message;
      }
    })
  },
  components: {
    swiper
  }
}
</script>

<style scoped>


.mui-grid-view.mui-grid-9 {
    background-color: white;
    border-top: none;
}

.mui-table-view-cell img{
  width: 60px;
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell{
  border: none;
}
</style>