<template>
  <div class="user-wrapper forget-wrapper">
    <div class="close" @click="changeStatus(0)">X</div>
    <div class="info">
      <label for="email">
        <span>邮箱：</span>
        <input id="email" type="input" placeholder="请输入您注册过的邮箱" v-model="email" />
      </label>
      <div class="sendCode">
        <div @click="sendCode">发送验证码</div>
      </div>
      <label for="code">
        <span>验证码：</span>
        <input id="code" type="input" placeholder="请输入验证码" v-model="code" />
      </label>
      <label for="pwd">
        <span>密码：</span>
        <input type="password" id="pwd" placeholder="请输入您的密码" v-model="pwd" />
      </label>
      <label for="repwd">
        <span>重复：</span>
        <input id="repwd" type="password" placeholder="请再属于一次您设置的密码" v-model="repwd" />
      </label>
    </div>
    <div class="btns">
      <div id="submit" @click="submit">提交</div>
      <div id="reset">清空</div>
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
      code: '',
      pwd: '',
      repwd: ''
    }
  },
  methods: {
    ...mapMutations(['changeStatus']),
    reset () {
      this.email = ''
      this.code = ''
      this.pwd = ''
      this.repwd = ''
    },
    sendCode () {
      this.axios({
        method: 'GET',
        url: `http://47.105.168.226:8081/users/forget?email=${this.email}`
      })
    },
    submit () {
      let res = checkFormat([
        {k: this.email, v: 'email'},
        {k: this.code, v: '验证码'},
        {k: this.pwd, v: '密码'},
        {k: this.repwd, v: '重复输入密码'}
      ])
      if (res === true && this.pwd === this.repwd) {
        this.axios({
          method: 'POST',
          url: 'http://47.105.168.226:8081/users/upsetPwd',
          data: {
            code: this.code,
            email: this.email,
            pwd: this.pwd
          }
        }).then(res => {
          if (res.data === false) {
            alert('您的验证码不正确')
          } else {
            alert('修改密码成功')
          }
        }).catch(err => {
          console.log(err)
        })
      } else {
        alert(res)
      }
    }
  },
  components: {}
}
</script>

<style lang="scss">
@import "@/assets/css/user/forget.scss";
</style>
