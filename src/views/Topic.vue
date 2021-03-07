<template>
  <div class="topic-wrapper">
    <el-row :gutter="25">
      <el-col :lg="18" :md="17" :sm="16">
        <el-card class="main-content">
          <div slot="header" class="topic-header">
            <div class="left">
              <h1>{{ topicDetail.title }}</h1>
              <p class="info">
                <span>发布于{{topicDetail.create_at | datesub}}</span>
                <span>作者{{topicDetail.author.loginname}}</span>
                <span>{{topicDetail.visit_count}}次浏览</span>
                <span>最后一次编辑是{{topicDetail.last_reply_at | datesub}}</span>
                <span>来自{{tab[topicDetail.tab]}}</span>
              </p>
            </div>
            <div class="right" v-if="loginStatus">
              <el-button
              type="success"
              @click.native="jumpEdit"
              v-if="myTopic"
              >
                编辑
              </el-button>
              <el-button
                :type="collect ? 'info' : 'success'"
                @click="changeCollect"
              >
                {{collect ? '取消收藏' : '收藏'}}
              </el-button>
            </div>
          </div>
          <article id="nice" v-html="renderConent">
          </article>
        </el-card>
        <el-card class="mt-25">
          <div slot="header">
             回复
          </div>
          <noData
            v-if="topicDetail.replies.length<=0"
            text="无回复"
          ></noData>
          <replyList
            v-else
            :reply_list="topicDetail.replies"
            :loginname="topicDetail.author.loginname"
            @replyComment="openReplyDialog"
          ></replyList>
        </el-card>
        <el-card class="mt-25">
          <div slot="header">
             新建回复
          </div>
          <div class="edit-area">
            <mavon-editor
              v-model="replyContent"
              :toolbars="toolbars"
              defaultOpen="edit"
              placeholder="请输入回复..."
              :autofocus="false"
            />
            <el-button type="primary" class="mt-25" @click.native="onReplyContent">回复</el-button>
          </div>
        </el-card>
      </el-col>
      <el-col :lg="6" :md="7" :sm="8" class="right xs-right">
        <el-card>
          <div slot="header">
            作者
          </div>
          <div class="userinfo">
            <div class="userinfo-header">
              <avatar shape="square" :size="60" :avatar_url="topicDetail.author.avatar_url" :username="topicDetail.author.loginname"></avatar>
              <span class="name">{{ topicDetail.author.loginname }}</span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.visible"
    >
      <mavon-editor
        v-model="replyComment.content"
        :toolbars="toolbars"
        defaultOpen="edit"
        placeholder="请输入回复..."
      />
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onRreplyComment">回 复</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import avatar from '@/components/avatar'
import replyList from '@/components/replyList'
import toolbars from '@/utils/markdown-edit-toolbar-config'
import debounce from '@/utils/debounce.js'
import marked from 'marked'
import hljs from 'highlight.js'
export default {
  props: ['id'],
  data () {
    return {
      topicDetail: {},
      tab: {
        share: '分享',
        good: '精华',
        job: '招聘',
        ask: '问答'
      },
      collect: false,
      toolbars,
      replyContent: '',
      replyComment: {
        replyId: '',
        replyName: '',
        content: ''
      },
      dialog: {
        title: '',
        visible: false
      },
      collectDebounce: debounce(this.Collect, 1000, true)
    }
  },
  created () {
    this.changeTitle('主题详情')
    setTimeout(() => {
      this.getTopicDetail()
      console.log(this.accesstoken)
    }, 500)
  },
  methods: {
    // 获取主题详情
    async getTopicDetail () {
      const res = await this.$api.topic.getTopicsDateil({
        topicId: this.id,
        accesstoken: this.accesstoken,
        mdrender: false
      })
      this.topicDetail = res.data
      this.collect = res.data.is_collect
      console.log(res)
    },
    // 改变收藏状态
    async changeCollect () {
      this.collectDebounce(function () {
        this.$msg({
          type: 'warning',
          message: '您操作的太频繁了'
        })
      }.bind(this))
    },
    async Collect () {
      let res
      if (this.collect) {
        res = await this.$api.user.deCollect({
          accesstoken: this.accesstoken,
          topicId: this.id
        })
      } else {
        res = await this.$api.user.collect({
          accesstoken: this.accesstoken,
          topicId: this.id
        })
      }
      if (res.success) {
        this.collect = !this.collect
      }
    },
    // 通用回复函数
    reply (options) {
      return new Promise((resolve, reject) => {
        this.$api.topic.createTopicReply({
          accesstoken: options.accesstoken,
          content: options.content,
          topicId: options.topicId,
          replyId: options.replyId
        }).then(res => {
          if (res.success) {
            this.$msg({
              type: 'success',
              message: '回复成功'
            })
            this.replyContent = ''
            // 重新拉取数据
            this.getTopicDetail().then(res => {
              resolve(true)
            })
            console.log(res)
          }
        })
      })
    },
    // 回复帖子
    async onReplyContent () {
      if (!this.replyContent) {
        this.$msg({
          type: 'warning',
          message: '请输入回复内容'
        })
        return
      }
      // 调用回复函数
      await this.reply({
        accesstoken: this.accesstoken,
        content: this.replyContent,
        topicId: this.id
      })
    },

    async openReplyDialog (options) {
      const { replyId, replyName } = options
      this.replyComment.replyId = replyId
      this.replyComment.replyName = replyName
      this.replyComment.content = '@' + replyName + ' '
      this.dialog.title = '回复' + replyName
      this.dialog.visible = true
    },

    async onRreplyComment () {
      if (
        this.replyComment.content === '@' + this.replyComment.replyName + ' ' ||
        this.replyComment.content === ''
      ) {
        this.$msg({
          type: 'warning',
          message: '回复内容不能为空'
        })
        return
      }
      const isReply = await this.reply({
        accesstoken: this.accesstoken,
        content: this.replyComment.content,
        topicId: this.id,
        replyId: this.replyComment.replyId
      })
      console.log(isReply)
      if (isReply) {
        this.dialog.visible = false
      }
    },
    jumpEdit () {
      this.$router.push({ name: 'EditTopic', params: { id: this.topicDetail.id } })
    }
  },
  computed: {
    ...mapState(['accesstoken', 'loginStatus', 'loginname']),
    renderConent () {
      const mdhtml = marked(this.topicDetail.content, {
        highlight (code) {
          return hljs.highlightAuto(code).value
        }
      })
      return mdhtml
    },
    myTopic () {
      return this.topicDetail.author.loginname === this.$store.getters.loginname
    }
  },
  components: {
    replyList,
    avatar
  }
}
</script>

<style lang="scss" scoped>
.topic-wrapper{
  .main-content{
    .topic-header{
      display: flex;
      align-items: center;
      .left{
        flex: 2;
      }
      .right{
        flex: 1;
        display: flex;
        justify-content: flex-end;
      }
    }
    h1{
      font-size: 22px;
      user-select: all;
    }
    .info{
      color: #999;
      font-size: 12px;
      span{
        display: inline-block;
        margin-right: 15px;
        position: relative;
        user-select: all;
        &:not(:last-child)::after {
          content: '';
          display: block;
          width: 5px;
          height: 5px;
          position: absolute;
          right: -10px;
          top: 50%;
          transform: translateY(-50%);
          border-radius: 50%;
          background-color: #999;
        }
      }
    }
  }
  padding: 25px;
}
</style>
