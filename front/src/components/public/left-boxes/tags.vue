<template>
    <div class="tags-wrapper item-wrapper">
      <div class="bg"></div>
      <router-link :to="{name: 'article', params: {type: item.type}}" tag="div"
      class="tag-item" v-for="item in tags" :key="item.tag"
      >
      {{item.tag}}
      </router-link>
    </div>
</template>

<script>
export default {
  computed: {
    tags () {
      return this.$store.state.common.tags
    }
  }
}
</script>

<style lang="scss">
    @import '@/assets/css/left-boxes/tags.scss';
</style>
