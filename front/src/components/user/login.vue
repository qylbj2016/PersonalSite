<template>
  <div class="user-wrapper login-wrapper">
    <div class="close" @click="changeStatus(0)">X</div>
    <div class="info">
      <label for="emali">
        <span>邮箱：</span>
        <input placeholder="请输入您的邮箱" v-model="email" />
      </label>
      <label for="pwd">
        <span>密码：</span>
        <input  placeholder="请输入您的密码" type="password" v-model="pwd"/>
      </label>
    </div>
    <div class="btns">
      <div  @click="send">登陆</div>
      <div  @click="reset">清空</div>
    </div>
    <div class="tips">
        <span @click="changeStatus(3)">注册</span>
        <span @click="changeStatus(4)">忘记密码?</span>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import checkFormat from '../../util/checkFormat'
export default {
  data () {
    return {
      email: '',
      pwd: ''
    }
  },
  created () {
    this.email = this.$cookies.get('email')
    this.pwd = this.$cookies.get('pwd')
  },
  methods: {
    ...mapMutations(['login', 'changeStatus']),
    reset () {
      this.email = ''
      this.pwd = ''
    },
    send () {
      let res = checkFormat([
        {k: this.email, v: 'email'},
        {k: this.pwd, v: '密码'}
      ])
      if (res === true) {
        this.axios({
          method: 'POST',
          url: 'http://47.105.168.226:8081/users/pwd',
          data: {
            email: this.email,
            pwd: this.pwd
          }
        }).then(res => {
          if( res.data.isExisted === undefined ) {
            res.data.isTrue === true ? this.login(res.data) : alert('密码错误') 
          } else if( res.data.isExisted === false ){
            alert('您的邮箱还没注册,请验证邮箱后再登陆')
          }
        })
        .catch(err => console.log(err))
      } else {
        alert(res)
      }
    }
  },
  components: {}
}
</script>

<style lang="scss">
@import "@/assets/css/user/login.scss";
</style>
