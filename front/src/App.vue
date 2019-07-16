<template>
<div id="app">
  <myheader />
  <section class="mybody">
    <leftbody />
    <router-view />
    <user v-if="status !== 0 && status !== 1"/>
  </section>
  <myfooter />
</div>
</template>
<script>
import myheader from './components/public/header'
import myfooter from './components/public/footer'
import leftbody from './components/public/left-boxes'
import user from './components/user'
export default {
  name: 'App',
  components: {
    user,
    myheader,
    myfooter,
    leftbody
  },
  computed: {
    status () {
      return this.$store.state.status
    }
  }
}
</script>

<style lang="scss">
@import "./assets/css/public/init.scss";
@import "./assets/css/public/mybody.scss";
</style>
