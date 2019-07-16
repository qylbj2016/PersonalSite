<template>
  <div class="title-wrapper">
    <router-link
      :to="{name: 'detail',
      params: {type:item.tag, id: item.blog_id}}"
      class="title-item"
      v-for="item in titleList.slice(pre, next)"
      :key="item.id"
    >
      <img :src="imgSrc[item.tag]">
      <div class="right-content">
        <div class="title">{{item.title}}</div>
        <div class="info">
          <div class="info-item">
            <img src="/static/images/info/cTime.svg">
            {{item.ctime}}
          </div>
        </div>
      </div>
    </router-link>
    <page-turner :dataLen="dataLen" :limit="limit" @getCurIndex="getCurIndex"/>
  </div>
</template>

<script>
import pageTurner from '@/components/public/page-turner.vue'
import title from '../../store/modules/title'
export default {
  async asyncData ({ store, route }) {
    await store.dispatch('getCurTitles', route)
  },
  components: {
    pageTurner
  },
  data () {
    return {
      limit: 6,
      curIndex: 1,
      imgSrc: {
        js: '/static/images/type/js.svg',
        html: '/static/images/type/HTML5.svg',
        css: '/static/images/type/CSS3.svg',
        vue: '/static/images/type/Vue.svg',
        react: '/static/images/type/React.svg',
        pro: '/static/images/type/Pro.svg',
        net: '/static/images/type/Net.svg',
        server: '/static/images/type/Server.svg',
        else: '/static/images/type/else.svg',
        think: '/static/images/type/Think.svg'
      }
    }
  },
  computed: {
    titleList () {
      return this.$store.state.title.titleList
    },
    pre () {
      return (this.curIndex - 1) * 6
    },
    next() {
      return this.curIndex * 6
    },
    dataLen () {
      return this.titleList.length
    }
  },
  methods: {
    getCurIndex (newIndex) {
      this.curIndex = newIndex
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/css/titles.scss";
</style>
