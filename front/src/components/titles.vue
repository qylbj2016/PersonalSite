<template>
  <div class="title-wrapper">
    <router-link
      :to="{name: 'detail',
          params: {type:item.tag, id: item.blog_id}}"
      class="title-item"
      v-for="item in curTitles"
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
    <to-page :dataLen="dataLen" @getCurIndex="getCurIndex"/>
  </div>
</template>

<script>
import toPage from '@/components/public/to_page.vue'
export default {
  components: {
    toPage
  },
  data () {
    return {
      titleList: [],
      curTitles: [],
      curIndex: 1,
      imgSrc: {
        js: '/static/images/type/js.svg',
        html: '/static/images/type/HTML5.svg',
        css: '/static/images/type/CSS3.svg',
        vue: '/static/images/type/Vue.svg',
        else: '/static/images/type/else.svg'
      }

    }
  },
  computed: {
    dataLen () {
      return this.titleList.length
    }
  },
  created () {
    this.getCurTitles(this.$route.params.type)
  },
  methods: {
    getCurIndex (newIndex) {
      this.curIndex = newIndex
    },
    updateCurList (newIndex) {
      const pre = (this.curIndex - 1) * 6
      const next = this.curIndex * 6
      this.curTitles = this.titleList.slice(pre, next)
    },
    getCurTitles (curType) {
      this.axios({
        method: 'get',
        url: 'http://localhost:8081/getTitles?type=' + curType
      }).then(result => {
        this.titleList = result.data
        this.curTitles = this.titleList.slice(0, 6)
      })
    }
  },
  watch: {
    $route (to, from) {
      this.getCurTitles(to.params.type)
    },
    titleList () {
      this.updateCurList(this.curIndex)
    },
    curIndex (newIndex) {
      this.updateCurList(newIndex)
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/css/titles.scss";
</style>
