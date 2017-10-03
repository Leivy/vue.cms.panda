<template>
  <div>
    <comments :article-id="$route.params.id"></comments>
  </div>
</template>

<script>
import comments from "../subcomps/comments.vue"

export default {
  components:{
    comments
  }
}
</script>

<style>

</style>
