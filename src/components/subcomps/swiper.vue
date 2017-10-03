<template>
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(item, index) in picList" :key="index">
        <img :src="item.img" alt="">
      </mt-swipe-item>
    </mt-swipe>
</template>

<script>
export default {
    props:["picList"]
}
</script>

<style>

.mint-swipe {
  height: 180px;
}

.mint-swipe .mint-swipe-item {
  background-color: #fff;
}

.mint-swipe .mint-swipe-item img {
  max-width: 100%;
  height: 180px;
  display: block;
  margin: 0 auto;
}
</style>


