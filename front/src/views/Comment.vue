<template>
    <div class="comment-wrapper">
      <div class="comment-top">
        <div class="title">留言</div>
        <img src="/static/images/comment.jpg" >
      </div>
      <comment :blogId="blogId" />
    </div>
</template>
<script>
import comment from '@/components/public/comment.vue'
export default {
  components: {
    comment
  },
  data () {
    return {
      blogId: 0
    }
  }

}
</script>

<style lang="scss">
  @import '@/assets/css/views/comment.scss';
</style>
