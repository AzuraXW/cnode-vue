<template>
  <div class="page-user">
    <el-row>
      <el-col :span="18">
        <el-card class="box-card">
          <div slot="header" class="card-header">
            <span>最近创建的话题</span>
            <router-link to="/" class="more">
              <span>查看更多</span>
              <i class="el-icon-d-arrow-right"></i>
            </router-link>
          </div>
          <div class="topic-list" v-loading="loading">
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
          <div class="topic-list" v-loading="loading">
            <topicItem
              v-for="topic in userDetail.recent_replies"
              :key="topic.id"
              :topic="topic"
            ></topicItem>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6" style="padding-left:25px">
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
import { mapMutations } from 'vuex'
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
    ...mapMutations(['changeTitle']),
    async getUserDetail () {
      const res = await this.$api.user.getUserDetail(this.username)
      if (res.success && res.data) {
        this.userDetail = res.data
        this.loading = false
      }
    }
  },
  components: {
    topicItem
  }
}
</script>

<style lang="scss">
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
