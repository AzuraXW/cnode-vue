<template>
  <div class="page-user">
    <el-row>
      <el-col :lg="18" :md="17" :sm="16">
        <transition name="route" mode="out-in">
          <router-view></router-view>
        </transition>
      </el-col>
      <el-col :lg="6" :md="7" :sm="8" class="xs-right">
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
              <p>注册时间{{userDetail.create_at | datesub}}</p>
              <p><a :href="'https://github.com/' + userDetail.githubUsername" target="_blank">@{{userDetail.githubUsername}}</a></p>
              <p><router-link :to="{name: 'UserCollect'}">话题收藏</router-link></p>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import { mapMutations } from 'vuex'
export default {
  props: ['username'],
  data () {
    return {
      userDetail: {},
      loading: true
    }
  },
  created () {
    this.changeTitle(`${this.username}的个人主页`)
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
        this.$store.commit('setPageUserInfo', res.data)
        this.loading = false
      }

      // 判断是否有参与或者回复的主题，没有就显示无主题组件
      if (!res.data.recent_topics.length) {
        this.$nodata('.recent_topics')
      }

      if (!res.data.recent_replies.length) {
        this.$nodata('.recent_replies')
      }
    }
  },
  watch: {
    username () {
      this.getUserDetail()
      this.changeTitle(`@${this.username}的个人主页`)
    }
  }
}
</script>

<style lang="scss">
.page-user{
  padding: 25px;
  .user-box{
    position: sticky;
    top: 70px;
  }
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
</style>
