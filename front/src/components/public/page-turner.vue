 <template>
     <div class="toPage-wrapper" v-if="dataLen >= limit + 1">
         <div class="first-btn btn" @click="pageMove(1)"></div>
         <div class="pre-btn btn"  @click="pageMove('pre')"></div>
         <ul class="page-box">
             <li :class="index + 1 === curIndex ? 'cur-item' : 'page-item'"
                v-for="(item, index) in curPageNum"
                :key="item"
                v-show="index < curIndex + 2  && index > curIndex - 4"
                @click="pageMove(item)">
                {{item}}
            </li>
         </ul>
         <div class="next-btn btn"  @click="pageMove('next')"></div>
         <div class="last-btn btn" @click="pageMove(curPageNum)"></div>
     </div>
 </template>
<script>
export default {
  data () {
    return {
      curPageNum: 1,
      curIndex: 1
    }
  },
  props: { dataLen: Number, limit: Number },
  watch: {
    dataLen (curLen) {
      this.curPageNum = Math.ceil(curLen / this.limit)
      this.curIndex = this.curPageNum
    },
    curIndex (curIndex) {
      this.$emit('getCurIndex', curIndex)
    }
  },
  created () {
    this.curPageNum = Math.ceil(this.dataLen / this.limit)
  },
  methods: {
    pageMove (flag) {
      if (flag === 'pre') {
        if (this.curIndex > 1) {
          this.curIndex--
        }
      } else if (flag === 'next') {
        if (this.curIndex < this.curPageNum) {
          this.curIndex++
        }
      } else {
        this.curIndex = flag
      }
    }
  }
}
</script>

<style lang="scss">
    @import '@/assets/css/public/to_page.scss';
</style>
