<template>
    <div class="home-wrapper">
        <blogs />
    </div>
</template>
<script>
import blogs from '@/components/home-blogs.vue'
import home from '../../store/modules/home'
export default {
   async asyncData({store}){
    if( ! store.state.home ){
      store.registerModule("home", home)
    } 
    await store.dispatch('getLikeBlogs')
  },
  components: {
    blogs
  }
}
</script>
<style lang="scss">
@import '@/assets/css/views/home.scss';
</style>
