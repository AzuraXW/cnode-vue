<template>
  <div class="item-wrapper">
    <el-card shadow="always" class="item">
      <el-row>
        <el-col :lg="4" :md="6" :sm="7" class="author-info">
          <div class="avatar">
            <router-link :to="{name: 'UserLately', params: { username: topic.author.loginname }}">
              <img :src="topic.author.avatar_url" alt="">
            </router-link>
            <div class="count">
              <div class="gray-14">评论数：{{topic.reply_count}}</div>
              <div class="gray-14">阅读数：{{topic.visit_count}}</div>
            </div>
          </div>
          <div class="create_at gray-14">创建时间：{{topic.create_at.substr(0, 10)}}</div>
          <div class="last_reply_at gray-14">最后编辑时间：{{topic.last_reply_at.substr(0, 10)}}</div>
        </el-col>
        <el-col :lg="20" :md="17" :sm="16" :xs="{span: 24, offset: 0}">
          <router-link :to="{name: 'Topic', params: {id: topic.id}}">
            <h2 class="title" :title="topic.title">
              <span class="ellipsis">{{topic.title}}</span>
              <el-tag :type="tag.theme">{{tag.text}}</el-tag>
            </h2>
          </router-link>
          <div class="des">{{topic.content | fileterTag}}</div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  props: ['topic'],
  filters: {
    fileterTag: function (value) {
      const reg = /<\/?.+?\/?>/g
      if (value.length < 350) return value.replace(reg, '')
      return value.replace(reg, '').substr(0, 350) + '...'
    }
  },
  computed: {
    tag () {
      const tab = {
        share: '分享',
        good: '精华',
        job: '招聘',
        ask: '问答'
      }
      const theme = {
        share: 'info',
        good: 'success',
        job: 'warning',
        ask: 'danger'
      }
      if (this.topic.top) {
        return {
          text: '置顶',
          theme: 'success'
        }
      }
      return {
        text: tab[this.topic.tab],
        theme: theme[this.topic.tab]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.item{
  margin: 25px;
  .author-info{
    @media screen and (max-width: 768px) {
      display: none;
    }
  }
  .avatar{
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    img{
      width: 50px;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
  a{
    text-decoration: none;
  }
  .title{
    margin-top: 0;
    margin-bottom: 20px;
    font-weight: 300;
    font-size: 26px;
    color: #333;
    text-decoration: none;
    @media screen and (max-width: 768px) {
      display: flex;
      justify-items: center;
      align-content: center;
    }
    span{
      width: max-content;
      display: inline-block;
      margin-right: 15px;
      @media screen and (min-width: 768px) {
        vertical-align: middle;
      }
    }
  }
  .des{
    color: #999;
    word-break: break-all;
  }
}
</style>
