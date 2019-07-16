<template>
  <div class="comment-body">
    <div class="show-comments">
      <div class="show-tip" v-if="curComments.length === 0&&blogId !== 0">该文章目前还没有评论，快来抢沙发吧~</div>
      <div class="show-item" v-for="(item , index) in curComments" :key="item + index">
          <comment-item :comment="item" @getInfo="getInfo"/>
          <comment-item
            :comment="cItem"
            @getInfo="getInfo"
            class="c-items"
            v-for="(cItem, cIndex) in cComments[item['comment_id']]"
            :key="cItem + cIndex" />
      </div>
      <page-turner :dataLen="dataLen" :limit="6" @getCurIndex="getCurIndex" />
    </div>
    <div class="write-comments" id="write">
      <div class="reply">
        to: {{parentName}}
        <span class="toMe" v-if="parentName !== 'cinco'" @click="changeToMe">给Cinco留言</span>
      </div>
      <textarea v-model="content" placeholder="登陆后才可以评论哟"></textarea>
      <div class="btns">
        <div @click="changeStatus(2)" v-if="curStatus !== 1">登陆</div>
        <div @click="logout" v-if="curStatus !== 0">注销</div>
        <div @click="sendComment" >发表评论</div>
      </div>
    </div>
  </div>
</template>
<script>
import pageTurner from '@/components/public/page-turner'
import userAlert from '@/components/user'
import commentItem from '@/components/public/comment-item'

import { mapState, mapMutations } from 'vuex'
import checkFormat from '../../util/checkFormat'
import getCurTime from '../../util/getCurTime'

export default {
  components: {
    pageTurner,
    userAlert,
    commentItem
  },
  props: { blogId: Number },
  data () {
    return {
      parent: 0,
      parentName: 'cinco',
      content: '',
      curIndex: 0,
      comments: [], // 所有评论
      pComments: [], // 祖先评论
      curComments: [], // 当前页评论
      cComments: [] // 子孙评论
    }
  },
  computed: {
    dataLen () {
      return this.pComments.length
    },
    ...mapState({
      curStatus: state => state.status,
      name: state => state.userName,
      email: state => state.userEmail,
      imgSrc: state => state.userImg
    })
  },
  watch: {
    curIndex () {
      this.getCurComments()
    },
    blogId (newId) {
      this.getComments(newId).catch(err => {
        console.log(err) 
      })
    }
  },
  methods: {
    ...mapMutations(['changeStatus']),
    
    getCurIndex (curIndex) {
      this.curIndex = curIndex
    },
    getCurComments(){
      const pre = (this.curIndex - 1) * 6
      const next = this.curIndex * 6
      this.curComments = this.pComments.slice(pre, next)
    },
    getComments (blogId) {
      if (!blogId) {
        blogId = 0
      }
      return this.axios({
        method: 'GET',
        url: 'http://localhost:8081/getComments?bid=' + blogId
      }).then(res => {
        this.comments = res.data
        this.pComments = this.comments.filter(item => item.parent === 0)
        this.filterComments()
      })
    },
    getInfo (parent) {
      this.parent = parent.parent === 0 ? parent['comment_id'] : parent.parent
      this.parentName = parent['user_name']
    },
    changeToMe () {
      this.parentName = 'cinco'
      this.parent = 0
    },
    logout () {
      alert('您确认要注销吗？')
      this.changeStatus(0)
    },
    sendComment () {
      let res = checkFormat([{k: this.content, v: '评论内容'}])
      if (res === true && this.curStatus === 1) {
        this.axios({
          method: 'POST',
          url: 'http://localhost:8081/sendComment',
          data: {
            blog_id: this.blogId,
            user_name: this.name,
            email: this.email,
            comment: this.content,
            parent: this.parent,
            parent_name: this.parentName,
            comment_id: this.dataLen + 1,
            ctime: new Date().toLocaleString(),
            user_img: this.imgSrc
          }
        }).then(res => {
          if (res.data) {
            this.parent = 0
            this.parentName = 'cinco'
            this.getComments(this.blogId).then( () => {
              this.dataLen % 6 === 1 && this.dataLen !== 1 ? '' : this.getCurComments()
            })
            .then(() => alert('评论成功'))
          } else {
            alert('评论失败')
          }
        })
      } else if (this.curStatus === 0) {
        alert('请您先登陆再评论')
      } else {
        alert(res)
      }
    },
    checkEmail () {
      this.axios({
        method: 'post',
        url: 'http://www.cinco.site:8081/checkVisitor',
        data: {
          email: this.email
        }
      }).then(res => {
        alert(res.data)
      })
    },
    filterComments () {
      this.pComments.forEach(item => {
        this.cComments[item['comment_id']] = []
      })
      this.comments.forEach(item => {
        if (item.parent !== 0) {
          this.cComments[item['parent']].push(item)
        }
      })
    }
  },
  created () {
    this.getComments(this.blogId).then( () => {
      this.getCurIndex(1)
    })
  }
}
</script>

<style lang="scss">
@import "@/assets/css/public/comment.scss";
</style>
