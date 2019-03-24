<template>
  <div class="article-box">
    <div class="article-item" v-for="item in curArticleList" :key="item.blog_id">
      <div class="bg"></div>
      <div class="title">{{item.title}}</div>
      <div class="aritcle-info">
            <div class="info-item">
                <img src="/static/images/info/cTime.svg" />
                发表于 {{item.ctime}}
            </div>
            <div class="info-item">
                <img src="/static/images/info/tag.svg" />
                分类于 {{item.tag}}
            </div>
            <div class="info-item">
                <img src="/static/images/info/like.svg">
                喜欢 {{item.islike}}
            </div>
        </div>
         <div class="aritcle-info">
            <div class="info-item">
                <img src="/static/images/info/author.svg" />
                作者：{{item.author}}
            </div>
            <div class="info-item">
                <img src="/static/images/info/views.svg" />
                阅读次数：{{item.views}}
            </div>
        </div>
      <div v-if="item.imgSrc" class="img-box">
        <img :src="item.imgSrc">
      </div>
      <div class="article">
          {{item.content}}
      </div>
      <router-link class="details" :to="{name:'detail', params:{type: item.type , id: item.id}}">
        阅读全文
      </router-link>
    </div>
    <to-page :dataLen="articleList.length" @getCurIndex="getCurIndex"/>
  </div>
</template>
<script>
import toPage from '@/components/public/to_page'
export default {
  components: {
    toPage
  },
  data () {
    return {
      curArticleList: [],
      curIndex: null,
      articleList: [],
      likeNum: null
    }
  },
  watch: {
    curIndex (curIndex) {
      const pre = (this.curIndex - 1) * 6
      const next = this.curIndex * 6
      this.curArticleList = this.articleList.slice(pre, next)
    }
  },
  methods: {
    getCurIndex (curIndex) {
      this.curIndex = curIndex
    }
  },
  created () {
    this.axios({
      method: 'get',
      url: 'http://localhost:8081/getLikedArticles'
    }).then(res => {
      this.articleList = res.data
      this.curIndex = 1
    })
  }
}
</script>

<style lang="scss" scoped>
    @import '@/assets/css/article_show.scss';
</style>
