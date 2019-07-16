<template>
  <div class="mask">
    <login v-if="status === 2"/>
    <registe v-if="status === 3"/>
    <forget v-if="status === 4"/>
  </div>
</template>

<script>
import login from './login.vue'
import registe from './registe.vue'
import forget from './forget.vue'
export default {
  data () {
    return {
    }
  },
  components: {
    login,
    registe,
    forget
  },
  computed: {
    status () {
      return this.$store.state.status
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/css/user/user.scss";
</style>
