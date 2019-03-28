<template>
    <div class="detail-wrapper">
        <div class="article-item">
            <div class="title">{{article.title}}</div>
        <div class="aritcle-info">
            <div class="info-item">
                <img src="/static/images/info/cTime.svg" />
                发表于{{article.ctime}}
            </div>
            <div class="info-item">
                <img src="/static/images/info/tag.svg" />
                分类于 {{article.tag}}
            </div>
            <div class="info-item">
                <img src="/static/images/info/like.svg">
                喜欢 {{likeNum}}
            </div>
        </div>
         <div class="aritcle-info">
            <div class="info-item">
                <img src="/static/images/info/author.svg" />
                作者：{{article.author}}
            </div>
            <div class="info-item">
                <img src="/static/images/info/views.svg" />
                阅读次数：{{article.views}}
            </div>
        </div>
        <div v-if="article.img_src" class="img-box">
            <img :src="article.img_src">
        </div>
        <div class="article">
           <div v-html="article.content"></div>
        </div>
        <div class="like-wrapper">
          <div class="islike" @click="addLikes(article.blog_id)">点赞</div>
          <div class="like-show">当前已有{{likeNum}}人点赞</div>
        </div>
        </div>
        <comment :blogId="article.blog_id"/>
    </div>
</template>

<script>
import comment from '@/components/public/comment.vue'
export default {
  components: {
    comment
  },
  data () {
    return {
      article: {},
      likeNum: null,
      canDo: true
    }
  },
  methods: {
    addLikes (blogId) {
      if (this.canDo) {
        this.canDo = false
        this.axios({
          method: 'get',
          url: 'http://47.105.168.226:8081/addLikes?blog_id=' + blogId
        }).then(() => {
          this.likeNum++
          setTimeout(() => {
            this.canDo = true
          }, 1000)
        })
      }
    },
    getCurArticle (blogId) {
      this.axios({
        method: 'get',
        url: 'http://47.105.168.226:8081/getArticles?id=' + blogId
      }).then(res => {
        this.article = res.data[0]
        this.likeNum = this.article.islike
      })
    },
    addViews (blogId) {
      return this.axios({
        method: 'get',
        url: 'http://47.105.168.226:8081/addViews?blog_id=' + blogId
      })
    }
  },
  watch: {
    $route (to, from) {
      this.addViews(to.params.id)
        .then(() => {
          this.getCurArticle(to.params.id)
        })
    }
  },
  created () {
    this.addViews(this.$route.params.id)
      .then(() => {
        this.getCurArticle(this.$route.params.id)
      })
  }
}
</script>

<style lang="scss">
    @import '@/assets/css/detail.scss';
</style>
