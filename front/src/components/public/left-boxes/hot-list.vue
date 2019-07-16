<template>
    <div class="articles-wrapper item-wrapper">
        <div class="bg"></div>
        <router-link tag="div" :to="{name: 'detail',params: {type: item.tag, id: item.blog_id}}" class="article-item" v-for="item in articleList" :key="item.blog_id">
              <div class="num-box">{{item.views}}</div>
              <div class="title-box">{{item.title}}</div>
              <div class="date-box">{{item.ctime}}</div>
        </router-link>
    </div>
</template>

<script>
export default {
  computed: {
    articleList () {
      return this.$store.state.common.titleList
    }
  }
}
</script>

<style lang="scss">
    @import '@/assets/css/left-boxes/hot-list.scss';
</style>
