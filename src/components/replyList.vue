<template>
  <ul class="reply-list" @click="onProxyClick">
    <li class="reply-item"
    v-for="(reply, index) in reply_list"
    :key="reply.id"
    :id="reply.id"
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
          <router-link class="username" :to="{name: 'User', params: {username: reply.author.loginname}}">{{reply.author.loginname}}</router-link>
          <a :href="'#' + reply.id">{{index}}楼, {{reply.create_at | datesub}}</a>
        </div>
        <div class="content_reply" v-html="reply.content"></div>
      </div>
      <div class="right">
        <span><i class="iconfont icon-dianzan"></i></span>
        <span>
          <i class="el-icon-bottom-left" data-reply="comment" :data-replyname="reply.author.loginname"></i>
        </span>
      </div>
    </li>
  </ul>
</template>

<script>
import Avatar from './avatar.vue'
export default {
  props: ['reply_list'],
  components: {
    Avatar
  },
  methods: {
    onProxyClick (e) {
      if (e.target.dataset.reply === 'comment') {
        let parent = e.target.parentNode
        while (parent.tagName !== 'LI') {
          parent = parent.parentNode
        }
        // 点击了回复按钮
        this.$emit('replyComment', {
          replyId: parent.getAttribute('id'),
          replyName: e.target.dataset.replyname
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.reply-list{
  margin: -20px;
  list-style: none;
  padding: 20px;
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
</style>
