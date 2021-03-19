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
          <div class="main-content">
            <div class="content_header">
              <a href="#">
                {{reply.author.loginname}}
              </a>
              <a :href="'#' + reply.id">{{index + 1}}楼, {{reply.create_at | datesub}}</a>
              <el-tag
                type="success"
                size="mini"
                v-if="reply.author.loginname === loginname"
              >作者</el-tag>
            </div>
            <div class="content_reply" v-md="reply.content"></div>
          </div>
        </div>
        <div class="right">
          <button class="assist-btn" @click="ups(reply.id, $event)">
            <span>
              <i :class="['iconfont', reply.is_uped ? 'icon-dianzan' : 'icon-zan']"></i>
            </span>
            <span>
              {{ reply.ups.length }}
            </span>
          </button>
          <button class="assist-btn xs-hidden">
            <span class="reply-icon-wrapper reaction">
              <i class="iconfont icon-huifu"
                data-type="reply"
                :data-replyname="reply.author.loginname"
              ></i>
            </span>
          </button>
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
  name: 'replyList',
  props: ['reply_list', 'loginname'],
  components: {
    Avatar
  },
  data () {
    return {
      replyClues: [],
      modelVisible: false,
      curUpsBtn: null
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
    },
    // 通知父组件用户点击了点赞按钮
    async ups (replyId, e) {
      const target = e.target
      let parentBtn = target.parentNode
      while (parentBtn.className !== 'assist-btn' && parentBtn.tagName !== 'BUTTON') {
        parentBtn = parentBtn.parentNode
      }
      this.curUpsBtn = parentBtn
      this.$emit('ups', replyId)
    },
    changeUpsView (action) {
      const increment = action === 'up' ? 1 : -1
      const iconCls = action === 'up' ? 'iconfont icon-dianzan' : 'iconfont icon-zan'
      this.curUpsBtn.querySelector('span:first-child i').className = iconCls
      const count = this.curUpsBtn.querySelector('span:last-child').innerHTML
      this.curUpsBtn.querySelector('span:last-child').innerHTML = parseInt(count) + increment
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
    flex-wrap: wrap;
    justify-content: flex-end;
    &:not(:last-child){
      border-bottom: 1px solid #f0f0f0;
      margin-bottom: 20px;
      padding-bottom: 20px;
    }
    .left{
      flex-grow: 1;
      display: flex;
      @media screen and (max-width: 768px) {
        width: 100%;
      }
      .main-content{
        margin-left: 25px;
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
          img{
            width: 100%;
          }
        }
      }
    }
    .right{
      width: max-content;
      .assist-btn{
        outline: none;
        border: none;
        background: transparent;
        ~ &{
          margin-left: 30px;
        }
        span{
          display: inline-block;
          width: 20px;
          text-align: center;
          color: rgb(185, 185, 185);
          &:nth-child(2) {
            font-size: 14px;
          }
        }
        i{
          font-size: 18px;
          cursor: pointer;
          &.icon-zan:hover, &.icon-huifu:hover{
            transition: all .3s;
            color: rgb(135, 26, 207);
          }
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
