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
      url: 'http://47.105.168.226:8081/getTags'
    }).then(result => {
      this.tags = result.data
    }
    ).catch(err =>
      console.log(err)
    )
  }

}
</script>

<style lang="scss">
    @import '@/assets/css/show_box/tags.scss';
</style>
