<template>
  <div class="page-user">
    <el-row>
      <el-col :lg="18" :md="17" :sm="16">
        <el-card class="box-card">
          <div slot="header" class="card-header">
            <span>最近创建的话题</span>
            <router-link to="/" class="more">
              <span>查看更多</span>
              <i class="el-icon-d-arrow-right"></i>
            </router-link>
          </div>
          <div class="recent_topics" v-loading="loading">
            <topicItem
              v-for="topic in userDetail.recent_topics"
              :key="topic.id"
              :topic="topic"
            ></topicItem>
          </div>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="card-header">
            <span>最近参与的话题</span>
            <router-link to="/" class="more">
              <span>查看更多</span>
              <i class="el-icon-d-arrow-right"></i>
            </router-link>
          </div>
          <div class="recent_replies" v-loading="loading">
            <topicItem
              v-for="topic in userDetail.recent_replies"
              :key="topic.id"
              :topic="topic"
            ></topicItem>
          </div>
        </el-card>
      </el-col>
      <el-col :lg="6" :md="7" :sm="8" style="padding-left:25px" v-response="{size: 'xs', resFunc(el, inRange) {
        if (inRange) {
          el.style.paddingLeft = '0'
          el.style.marginTop = '25px'
        } else {
          el.style.paddingLeft = '25px'
          el.style.marginTop = '0'
        }
      }}">
        <el-card class="box-card user-box">
          <div slot="header" class="card-header">
            <span>个人信息</span>
          </div>
          <div class="userinfo">
            <div class="userinfo-header">
              <el-avatar shape="square" :size="60" :src="userDetail.avatar_url"></el-avatar>
              <span class="name">{{ userDetail.loginname }}</span>
            </div>
            <div class="userinfo-content">
              <p>积分: {{ userDetail.score }}</p>
              <a :href="'https://github.com/' + userDetail.githubUsername" target="_blank">@{{userDetail.githubUsername}}</a>
              <p>注册时间{{userDetail.create_at | datesub}}</p>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import { mapMutations } from 'vuex'
import topicItem from '@/components/topicItem'
export default {
  props: ['username'],
  data () {
    return {
      userDetail: {},
      loading: true
    }
  },
  created () {
    this.changeTitle(`@${this.username}的个人主页`)
    this.getUserDetail()
  },
  methods: {
    async getUserDetail () {
      let res = ''
      try {
        res = await this.$api.user.getUserDetail(this.username)
      } catch (e) {
        // 用户不存在
        this.$msg({
          message: e.response.data.error_msg,
          type: 'error'
        })
      }
      if (res.success) {
        this.userDetail = res.data
        this.loading = false
      }

      // 判断是否有参与或者回复的主题，没有就显示无主题组件
      if (!res.data.recent_topics.length) {
        this.$nodata('.recent_topics')
      }

      if (!res.data.recent_replies.length) {
        console.log('123')
        this.$nodata('.recent_replies')
      }
    }
  },
  components: {
    topicItem
  },
  watch: {
    username () {
      this.getUserDetail()
      this.changeTitle(`@${this.username}的个人主页`)
    }
  }
}
</script>

<style lang="scss" scoped>
.page-user{
  padding: 25px;
  .box-card{
    &:not(:last-child){
      margin-bottom: 25px;
    }
    .card-header{
      display: flex;
      justify-content: space-between;
    }
    .more{
      color: #999;
      font-size: 14px;
      text-decoration: none;
      span{
        display: inline-block;
        margin-right: 2px;
      }
    }
  }

  .topic-list{
    &:empty{
      min-height: 300px;
    }
  }
  .user-box{
    position: sticky;
    top: 70px;
  }
  .userinfo{
    .userinfo-header{
      display: flex;
      align-items: center;
      .name{
        display: inline-block;
        margin-left: 10px;
        color: #999;
      }
    }
  }
}
</style>
