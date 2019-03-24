<template>
  <div class="comment-wrapper">
    <div class="show-comments">
      <div class="show-tip" v-if="curComments.length === 0">该文章目前还没有评论，快来抢沙发吧~</div>
      <div class="show-item" v-for="(item , index) in curComments" :key="item + index">
        <div class="info">
          <img src="/static/images/head.JPG">
          <div class="info-detils">
            <div class="name">
              {{item.user_name}}
              <div class="reply" v-if="item.parent > 0">回复 {{item.parent_name}}</div>
            </div>
            <div class="time">
              <span>发表于</span>
              {{item.ctime}}
            </div>
          </div>
        </div>
        <div class="text">{{item.comment}}</div>
        <div class="reply-wrapper">
          <div class="btn" @click="getInfo(item)">回复</div>
        </div>
      </div>
      <toPage :dataLen="dataLen" @getCurIndex="getCurIndex"/>
    </div>
    <div class="write-comments">
      <div class="reply">to: {{parentName}}</div>
      <textarea v-model="content"></textarea>
      <div class="input-wrapper">
        <label for="name">
          <img src="/static/images/nick.svg">
        </label>
        <input type="text" id="name" v-model="name" placeholder="昵称">
      </div>
      <div class="input-wrapper">
        <label for="email">
          <img src="/static/images/email.svg">
        </label>
        <input type="text" id="email" v-model="email" placeholder="邮箱">
      </div>
      <div class="send" @click="checkEmail">首次评论需要邮箱验证</div>
      <div class="send" @click="sendComment">发表评论</div>
    </div>
  </div>
</template>
<script>
import toPage from '@/components/public/to_page.vue'
export default {
  components: {
    toPage
  },
  props: { blogId: Number },
  data () {
    return {
      parent: 0,
      parentName: 'camy',
      content: '',
      name: '',
      email: '',
      curComments: [],
      curIndex: 1,
      comments: []
    }
  },
  computed: {
    dataLen () {
      return this.comments.length
    }
  },
  watch: {
    curIndex (curIndex) {
      const pre = (this.curIndex - 1) * 6
      const next = this.curIndex * 6
      this.curComments = this.comments.slice(pre, next)
    },
    blogId (newId) {
      this.getCurComments(newId).catch(err => {
        console.log(err)
      })
    }
  },
  methods: {
    getCurIndex (curIndex) {
      this.curIndex = curIndex
    },
    getCurComments (blogId) {
      if (!blogId) {
        blogId = 0
      }
      return this.axios({
        method: 'get',
        url: 'http://localhost:8081/getComments?bid=' + blogId
      }).then(res => {
        this.comments = res.data
        this.curComments = this.comments.slice(0, 6)
      })
    },
    getInfo (parent) {
      this.parent = parent.id
      this.parentName = parent['user_name']
    },
    sendComment () {
      var canSend = this.checkFormat()
      console.log(this.checkFormat())
      if (canSend === true) {
        this.axios({
          method: 'post',
          url: 'http://localhost:8081/sendComment',
          data: {
            blogId: this.blogId,
            name: this.name,
            email: this.email,
            content: this.content,
            parent: this.parent,
            parentName: this.parentName,
            ctime: new Date().toLocaleString()
          }
        }).then(res => {
          if (res.data == false) {
            this.parent = 0
            this.parentName = null
            this.getCurComments(this.blogId).then(() => {
              this.curIndex = Math.ceil(this.comments.length / 6)
            })
          } else {
            alert(res.data)
          }
        })
      } else {
        alert(canSend)
      }
    },
    checkEmail () {
      this.axios({
        method: 'post',
        url: 'http://localhost:8081/checkVisitor',
        data: {
          email: this.email
        }
      }).then(res => {
        alert(res.data)
      })
    },
    checkFormat () {
      var canSend = true
      var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
      var arr = [this.content, this.name, this.email]
      arr.forEach((item, index, arr) => {
        arr[index] = item.replace(/(^\s*)|(\s*$)/g, '')
      })
      if (arr[0] == null || arr[0] == '') {
        canSend = '评论不能为空'
        return canSend
      }
      if (arr[1] == null || arr[1] == '') {
        canSend = '名字不能为空'
        return canSend
      }
      if (arr[2] == null || arr[2] == '') {
        canSend = '邮箱不能为空'
        return canSend
      } else {
        if (!reg.test(this.email)) {
          canSend = '邮箱格式不正确'
          return canSend
        }
      }
      return canSend
    }
  },
  created () {
    this.getCurComments(this.blogId)
  }
}
</script>

<style lang="scss">
@import "@/assets/css/public/comment.scss";
</style>
