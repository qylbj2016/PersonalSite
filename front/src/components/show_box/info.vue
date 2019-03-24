<template>
  <div class="info-wrapper item-wrapper">
    <div class="bg"></div>
    <div class="imgBox">
      <img src="/static/images/head.JPG">
    </div>
    <div class="name">Camy</div>
    <div class="contact">
      <div class="contact-item" v-for="item in contactList" :key="item.name" >
        <a  :href="'https://' + item.number" target="_blank">
          <img :src="item.iconURL" :alt="item.name">
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      curIndex: -1,
      contactList: [
        {
          name: 'email',
          iconURL: '/static/images/email.svg',
          number: 'mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=2OHs7erp7e3h7Zipqfa7t7U'
        },
        {
          name: 'github',
          iconURL: '/static/images/github.svg',
          number: 'github.com/qylbj2016'
        },
        {
          name: 'sina',
          iconURL: '/static/images/sina.svg',
          number: 'weibo.com/u/5100551194'
        }
      ]
    }
  },
  methods: {
    getIndex (index) {
      this.curIndex = index
    },
    clearIndex () {
      this.curIndex = -1
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/css/show_box/info.scss";
</style>
