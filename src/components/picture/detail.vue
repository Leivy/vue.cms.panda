<template>
  <div>
    <div class="news-title">
      <h4 v-text="picInfo.title"></h4>
      <p class='mui-ellipsis'>
        <span>发表时间：{{picInfo.add_time | dateFormat}}</span>
        <span>点击：{{picInfo.click}}次</span>
      </p>
    </div>

    <div class="preview-list">
      <img class="preview-img" v-for="(item, index) in thumbs" :key="index" :src="item.src" @click="$preview.open(index, thumbs)">
    </div>
    <div class="news-content" v-html="picInfo.content">
    </div>

    <!-- {{newsData.id}} -->
    <comments :article-id="this.$route.params.id"></comments>
  </div>
</template>

<script>

import Vue from "vue"
import config from "../../config.js"
import comments from "../subcomps/comments.vue"

import VuePreview from 'vue-preview'
Vue.use(VuePreview)

export default {
  data() {
    return {
      picInfo: {},
      thumbs: [],
      picUrl: config.picUrl
    }
  },
  created() {
    this.$http.get(config.apiUrl + "/api/getimageInfo/" + this.$route.params.id).then(res => {
      var data = res.body;
      if (data.status == 0) {
        // console.log(data);
        this.picInfo = data.message[0];
      }
    })

    this.$http.get(config.apiUrl + "/api/getthumimages/" + this.$route.params.id).then(res => {
      var data = res.body;
      if (data.status == 0) {
        // console.log(data);

        //由于vue-preview要求的数据格式为 对象 对象中包含三个属性 src w h
        //但是我们请求到的数据只有src  
        //下面加工之后，让其符合要求
        data.message.forEach(v=>{
          v.src = this.picUrl + v.src;
          v.w = 600;
          v.h = 400;
        })

        this.thumbs = data.message;
      }
    });
  },
  components: {
    comments
  }
}
</script>

<style>
.news-title {
  border-bottom: 1px solid #ccc;
  color: #26a2ff;
}

.news-content {
  padding: 10px;
}

.news-content img {
  width: 100%
}

.preview-list img{
  margin: 1%;
  width: 23%;
}
</style>
