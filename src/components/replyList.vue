<template>
  <div class="reply-wrpper">
    <ul class="reply-list"
    @click="onProxyClick"
    @mouseover="onMouseover"
    >
      <li class="reply-item"
      v-for="(reply, index) in reply_list"
      :key="reply.id"
      :id="reply.id"
      :data-replyid="reply.reply_id"
      >
        <div class="left">
          <avatar
            :username="reply.author.loginname"
            :avatar_url="reply.author.avatar_url"
            shape="square"
          ></avatar>
        </div>
        <div class="center">
          <div class="content_header">
            <!-- <router-link class="username" :to="{name: 'User', params: {username: reply.author.loginname}}">{{reply.author.loginname}}</router-link> -->
            <a :href="'#' + reply.id">{{index + 1}}楼, {{reply.create_at | datesub}}</a>
            <el-tag
              type="success"
              size="mini"
              v-if="reply.author.loginname === loginname"
            >作者</el-tag>
          </div>
          <div class="content_reply" v-md="reply.content"></div>
        </div>
        <div class="right">
          <span class="reply-icon-wrapper">
            <i class="iconfont icon-huifu"
              data-type="reply"
              :data-replyname="reply.author.loginname"
            ></i>
          </span>
        </div>
      </li>
    </ul>

    <el-dialog
      title="查看对话"
      :visible.sync="modelVisible"
      center
    >
      <ul class="reply-clues">
        <li v-for="reply in replyClues" :key="reply.id" class="reply-wrapper">
          <img :src="reply.author.avatar_url" alt="">
          <div class="reply">
            <div v-md="reply.content"></div>
            <a :href="'#' + reply.id" title="查看原文">
              <i class="el-icon-top"></i>
            </a>
          </div>
        </li>
      </ul>
    </el-dialog>
  </div>
</template>

<script>
import Avatar from './avatar.vue'
import marked from 'marked'
// import hljs from 'highlight.js'
export default {
  props: ['reply_list', 'loginname'],
  components: {
    Avatar
  },
  data () {
    return {
      replyClues: [],
      modelVisible: false
    }
  },
  directives: {
    md: {
      inserted (el, bind) {
        el.innerHTML = marked(bind.value)
      }
    }
  },
  methods: {
    onProxyClick (e) {
      const events = {
        reply: this.onClickReply,
        ups: this.onClickUps
      }
      const eventType = e.target.dataset.type
      if (!eventType) return
      events[eventType](e)
    },
    onClickReply (e) {
      let parent = e.target.parentNode
      while (parent.tagName !== 'LI') {
        parent = parent.parentNode
      }
      // 点击了回复按钮
      this.$emit('replyComment', {
        replyId: parent.getAttribute('id'),
        replyName: e.target.dataset.replyname
      })
    },
    async onClickUps (e) {
      let parent = e.target.parentNode
      while (parent.tagName !== 'LI') {
        parent = parent.parentNode
      }
      const replyId = parent.getAttribute('id')
      try {
        var res = await this.$api.topic.ups({
          accesstoken: this.$store.state.accesstoken,
          replyId
        })
      } catch (e) {
        this.$msg({
          type: 'error',
          message: e.response.data.error_msg
        })
      }
      console.log(res)
    },
    // 查找评论线索，返回一个闭包
    findClue (replyId) {
      const replies = this.reply_list
      if (!replyId) return
      // 筛选出被回复的评论
      const reply = replies.filter((reply) => {
        return reply.id === replyId
      })[0]
      // 添加到线索数组中
      this.replyClues.push(reply)
      // 被回复的评论是否也是回复别人的？
      if (reply.reply_id) {
        this.findClue(reply.reply_id)
      }
      return this.replyClues.reverse()
    },
    onMouseover (e) {
      const target = e.target
      if (target.tagName === 'A' && target.href.indexOf('/user') > 0) {
        // 类似于@xxx的链接，显示评论线索图
        let parent = target.parentNode
        while (parent.tagName !== 'LI') {
          parent = parent.parentNode
        }
        this.modelVisible = true
        this.replyClues = []
        this.replyClues = this.findClue(parent.dataset.replyid)
      }
    }
  },
  filters: {
    render (value) {
      console.log(value)
      return marked(value)
    }
  }
}
</script>

<style lang="scss" scoped>
.reply-list{
  margin: -20px;
  list-style: none;
  padding: 20px;
  a{
    display: inline-block;
  }
  .reply-item{
    display: flex;
    &:not(:last-child){
      border-bottom: 1px solid #f0f0f0;
      margin-bottom: 20px;
      padding-bottom: 20px;
    }
    .left, .right{
      width: 55px;
    }
    .right{
      span{
        display: inline-block;
        &:hover{
          color: turquoise;
        }
        margin-left: 10px;
        i{
          font-size: 18px;
          cursor: pointer;
        }
      }
    }
    .center{
      flex: 1;
      .content_header{
        font-size: 12px;
        a{
          display: inline-block;
          margin-left: 5px;
          text-decoration: none;
          &.username{
            color:cadetblue;
            font-weight: bolder;
          }
        }
      }
      .content_reply{
        margin-top: 5px;
        margin-left: 20px;
        p{
          margin-top: 0px;
        }
      }
    }
  }
}
.reply-clues{
  margin: 0;
  padding: 0;
  list-style: none;
  .reply-wrapper{
    display: flex;
    padding-bottom: 10px;
    &:not(:last-child) {
      margin-bottom: 10px;
      border-bottom: 1px solid #dcdfe6;
    }
    img{
      width: 35px;
      height: 35px;
    }
    .reply{
      display: block;
      margin-left: 10px;
      flex: 1;
      p{
        margin: 0;
        font-size: 14px;
      }
    }
  }
}
</style>
