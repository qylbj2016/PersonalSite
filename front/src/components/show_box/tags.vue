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
  data () {
    return {
      tags: []
    }
  },
  created () {
    this.axios({
      method: 'post',
      url: 'http://localhost:8081/getTags'
    }).then(result => {
      this.tags = result.data
      console.log(this.tags)
    }
    ).catch(err =>
      console.log(err)
    )
  }

}
</script>

<style lang="scss" scoped>
    @import '@/assets/css/show_box/tags.scss';
</style>
