<template>
  <div class="comment-item">
    <div class="info">
      <img :src="comment['user_img']">
      <div class="info-detils">
        <div class="name">
          {{comment.user_name}}
          <div class="reply" v-if="comment.parent > 0">回复{{comment.parent_name}}</div>
        </div>
        <div class="time">
          <span>发表于</span>
          {{comment.ctime}}
        </div>
      </div>
    </div>
    <div class="text">{{comment.comment}}</div>
    <div class="reply-wrapper">
      <div class="btn" @click="replay">
        <a href="#write">回复</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['comment'],
  methods: {
    replay () {
      this.$emit('getInfo', this.comment)
    }
  }
}
</script>

<style>
</style>
