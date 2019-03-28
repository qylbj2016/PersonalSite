<template>
  <div id="app" class="wrapper">
    <header class="top-wrapper">
        <div class="bg-line"></div>
        <div class="site">Cinco's site</div>
        <ul class="nav-box">
          <router-link :to="{name: 'home'}" tag="li" class="nav-item">主页</router-link>
          <router-link :to="{name: 'article', params:{type: 'all'}}" tag="li" class="nav-item">文章</router-link>
          <router-link :to="{name: 'about'}" tag="li" class="nav-item">关于</router-link>
          <router-link :to="{name: 'comment'}" tag="li" class="nav-item">留言</router-link>
        </ul>
        <ul class="menu" @mouseenter="showMenu" @mouseleave="hideMenu">
          <li class="icon"></li>
          <router-link v-show="canShow" :to="{name: 'home'}" tag="li" class="menu-item">主页</router-link>
          <router-link v-show="canShow" :to="{name: 'article', params:{type: 'all'}}" tag="li" class="menu-item">文章</router-link>
          <router-link v-show="canShow" :to="{name: 'about'}" tag="li" class="menu-item">关于</router-link>
          <router-link v-show="canShow" :to="{name: 'comment'}" tag="li" class="menu-item">留言</router-link>
        </ul>
    </header>
    <div class="body-wrapper">
      <show-box />
      <router-view class="router-view"/>
    </div>
    <footer>
      <foot-box />
    </footer>
  </div>
</template>

<script>
import footBox from './components/foot.vue'
import showBox from './components/show_box/index.vue'
export default {
  name: 'App',
  components: {
    footBox,
    showBox
  },
  data () {
    return {
      canShow: false
    }
  },
  methods: {
    showMenu () {
      this.canShow = true
    },
    hideMenu () {
      this.canShow = false
    }
  }
}
</script>
<style lang="scss">
 @import './assets/css/public/init.scss';
 @import './assets/css/page/top.scss';
 @import './assets/css/page/body.scss';
 @import './assets/css/page/foot.scss';
</style>
