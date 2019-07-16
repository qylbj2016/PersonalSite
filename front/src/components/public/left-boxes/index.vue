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
import articleList from './hot-list.vue'
import common from '../../../../store/modules/common'

export default {
  async asyncData({ store }) {
    await store.dispatch('getInitData')
  },
  components: {
    info,
    tags,
    articleList
  },
}
</script>

<style lang="scss">
@import "@/assets/css/left-boxes/index.scss";
</style>
