<template>
  <div class="show-wrapper">
    <div class="sticky-wrapper">
      <info/>
      <tags/>
      <article-list/>
    </div>
  </div>
</template>

<script>
import info from './info.vue'
import tags from './tags.vue'
import articleList from './article_list.vue'

export default {
  components: {
    info,
    tags,
    articleList
  }
}
</script>

<style lang="scss">
@import "@/assets/css/show_box/index.scss";
</style>
