<template>
  <div class="user-wrapper registe-wrapper">
    <div class="close" @click="changeStatus(0)">X</div>
    <div class="info">
      <label for="name">
        <span>昵称：</span>
        <input
          id="name"
          type="input"
          :class="{ repeated : userIsRepeated }"
          placeholder="一经注册不能更改"
          v-model="name"
          @blur="checkName"
        >
      </label>
      <div class="sex-box">
        <span>性别：</span>
        <span>
          <input type="radio" name="sex" value="m" v-model="sex">男
          <input type="radio" name="sex" value="f" v-model="sex">女
          <input type="radio" name="sex" value="x" checked v-model="sex">X
        </span>
      </div>
      <label for="email">
        <span>邮箱：</span>
        <input
          id="email"
          :class="{ repeated : nameIsRepeated }"
          type="input"
          placeholder="需要验证邮箱"
          v-model="email"
          @blur="checkUser"
        >
      </label>
      <label for="pwd">
        <span>密码：</span>
        <input id="pwd" type="password" placeholder="请不要少于6位" v-model="pwd">
      </label>
      <label for="repwd">
        <span>重复：</span>
        <input id="repwd" type="password" placeholder="请再属于一次您设置的密码" v-model="repwd">
      </label>
    </div>
    <div class="btns">
      <div @click="submit">提交</div>
      <div @click="reset">清空</div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import checkFormat from '../../util/checkFormat'
export default {
  data () {
    return {
      sex: 'x',
      email: '',
      name: '',
      pwd: '',
      repwd: '',
      nameIsRepeated: false,
      userIsRepeated: false,
    }
  },
  methods: {
    ...mapMutations(['changeStatus']),
    reset () {
      this.email = ''
      this.name = ''
      this.pwd = ''
      this.repwd = ''
    },
    checkName () {
      this.name &&
      this.axios({
        method: 'GET',
        url: `http://47.105.168.226:8081/users/name?name=${this.name}`
      }).then(res => {
        res = res.data.isRepeated ? this.nameIsRepeated = true : this.nameIsRepeated = false
      })
    },
    checkUser () {
      this.email &&
      this.axios({
        method: 'GET',
        url: `http://47.105.168.226:8081/users/user?email=${this.email}`
      }).then(res => {
        res = res.data.isRepeated ? this.userIsRepeated = true : this.userIsRepeated = false
      })
    },
    submit () {
      let res = checkFormat([
        {k: this.email, v: 'email'},
        {k: this.name, v: '昵称'},
        {k: this.pwd, v: '密码'}
      ])
      if (res === true && this.pwd === this.repwd && ! this.nameIsRepeated && ! this.userIsRepeated ) {
        const fd = new FormData()
        fd.append('sex', this.sex)
        fd.append('name', this.name)
        fd.append('pwd', this.pwd)
        fd.append('email', this.email)
        this.axios({
          method: 'POST',
          url: 'http://47.105.168.226:8081/users/email',
          data: fd,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
          .then(res => {
            alert(res.data)
          })
      } else if (res !== true) {
        alert(res)
      } else {
        if( this.nameIsRepeated === true ){
          alert( "您的名字已经被注册过了" )
        } else if( this.userIsRepeated === true ){
          alert( "您的邮箱已经被注册过了")
        } else {
          alert( "您两次输入的密码不匹配，请重新输入" )
        }
      } 
    },
  }
}
</script>

<style lang="scss">
@import "@/assets/css/user/registe.scss";
</style>
