<template>
  <header class="wrapper">
    <div class="site">Cinco's site</div>
    <ul class="nav">
      <router-link :to="{name: 'home'}" tag="li" class="nav-item">主页</router-link>
      <router-link :to="{name: 'article', params:{type: 'all'}}" tag="li" class="nav-item">文章</router-link>
      <router-link :to="{name: 'about'}" tag="li" class="nav-item">关于</router-link>
      <router-link :to="{name: 'comment'}" tag="li" class="nav-item">留言</router-link>
    </ul>
    <ul class="menu" @click="showMenu" >
      <li class="icon"></li>
      <router-link v-show="canShow" :to="{name: 'home'}" tag="li" class="menu-item">主页</router-link>
      <router-link
        v-show="canShow"
        :to="{name: 'article', params:{type: 'all'}}"
        tag="li"
        class="menu-item"
      >文章</router-link>
      <router-link v-show="canShow" :to="{name: 'about'}" tag="li" class="menu-item">关于</router-link>
      <router-link v-show="canShow" :to="{name: 'comment'}" tag="li" class="menu-item">留言</router-link>
    </ul>
  </header>
</template>

<script>
export default {
  data () {
    return {
      canShow: false
    }
  },
  methods: {
    showMenu(){
      this.canShow = !this.canShow
    }
  }
}
</script>

<style lang="scss">
@import "../../assets/css/public/header.scss";
</style>
