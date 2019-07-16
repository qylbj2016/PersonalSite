<template>
  <div class="article-box">
    <div class="article-item" v-for="item in curArticleList" :key="item.blog_id">
      <div class="bg"></div>
      <div class="title">{{item.title}}</div>
      <div class="aritcle-info">
        <div class="info-item">
          <img src="/static/images/info/cTime.svg">
          发表于 {{item.ctime}}
        </div>
        <div class="info-item">
          <img src="/static/images/info/tag.svg">
          分类于 {{item.tag}}
        </div>
        <div class="info-item">
          <img src="/static/images/info/like.svg">
          喜欢: {{item.islike}}
        </div>
      </div>
      <div class="aritcle-info">
        <div class="info-item">
          <img src="/static/images/info/author.svg">
          作者: {{item.author}}
        </div>
        <div class="info-item">
          <img src="/static/images/info/views.svg">
          阅读次数: {{item.views}}
        </div>
      </div>
      <div v-if="item.img_src" class="img-box">
        <img v-lazy="item.img_src">
      </div>
      <div class="article">
        <div v-html="item.content"></div>.....
      </div>
      <router-link class="details" :to="{name:'detail', params:{type: item.tag , id: item.id}}">阅读全文</router-link>
    </div>
    <page-turner :dataLen="articleList.length" :limit="limit" @getCurIndex="getCurIndex"/>
  </div>
</template>
<script>
import pageTurner from "@/components/public/page-turner"
export default {  
  components: {
    pageTurner
  },
  data() {
    return {
      curIndex: 1,
      limit: 4
    };
  },
  computed: {
    curArticleList() {
      const pre = (this.curIndex - 1) * this.limit
      const next = this.curIndex * this.limit
      return this.articleList.slice(pre, next);
    },
    articleList() {
      return this.$store.state.home.articleList;
    }
  },
  methods: {
    getCurIndex(curIndex) {
      this.curIndex = curIndex;
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/home-blogs.scss";
</style>
