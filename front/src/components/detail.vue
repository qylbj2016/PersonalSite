<template>
  <div class="detail-wrapper">
    <div class="article-item">
      <div class="title">{{article.title}}</div>
      <div class="aritcle-info">
        <div class="info-item">
          <img src="/static/images/info/cTime.svg">
          发表于{{article.ctime}}
        </div>
        <div class="info-item">
          <img src="/static/images/info/tag.svg">
          分类于 {{article.tag}}
        </div>
        <div class="info-item">
          <img src="/static/images/info/like.svg">
          喜欢: {{curLikeNum}}
        </div>
      </div>
      <div class="aritcle-info">
        <div class="info-item">
          <img src="/static/images/info/author.svg">
          作者: {{article.author}}
        </div>
        <div class="info-item">
          <img src="/static/images/info/views.svg">
          阅读次数: {{curViewNum}}
        </div>
      </div>
      <div v-if="article.img_src" class="img-box">
        <img :src="article.img_src">
      </div>
      <div class="article">
        <div v-html="article.content"></div>
      </div>
      <div class="like-wrapper">
        <div class="islike" @click="addLikes(article.blog_id, curLikeNum)">点赞</div>
        <div class="like-show">当前已有{{curLikeNum}}人点赞</div>
      </div>
    </div>
    <comment :blogId="article.blog_id"/>
  </div>
</template>

<script>
import comment from "@/components/public/comment.vue"
import detail from "../../store/modules/detail"
export default {
  async asyncData({ store, route }) {
    await store.dispatch('getArticle', route)
  },
  components: {
    comment
  },
  data() {
    return {
      canDo: true,
      curLikeNum: '',
      curViewNum: ''
    }
  },
  computed: {
    article() {
      return this.$store.state.detail.article
    },
    blogId(){
      this.curViewNum = this.article.blog_id
      this.curLikeNum = this.article.islike
    }
  },
  watch: {
    blogId() {
      this.curViewNum = this.article.views + 1
      this.axios({
        method: "GET",
        url: `http://47.105.168.226:8081/addViews?blog_id=${this.article.blogId}&num=${this.curViewNum}`
      })
    }
  },
  methods: {
    addLikes(blogId, num) {
      if (this.canDo) {
        this.canDo = false;
        this.axios({
          method: "get",
          url: `http://47.105.168.226:8081/addLikes?blog_id=${blogId}&num=${++num}`
        }).then(() => {
          this.curLikeNum++;
          setTimeout(() => {
            this.canDo = true;
          }, 1000);
        });
      }
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/detail.scss";
</style>
