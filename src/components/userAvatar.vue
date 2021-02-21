<template>
  <div class="user-avatar">
    <el-popover v-model="visible">
      <div class="avatar" slot="reference">
        <el-avatar :size="35" :src="userInfo.avatar_url"></el-avatar>
        <span class="down-icon-wrapper"><i class="el-icon-caret-bottom"></i></span>
      </div>
      <div class="userinfo">
        <ul @click="proxyClick">
          <li>
            <el-link :underline="false" @click="$router.push({name: 'User', params: {username: userInfo.loginname}})">
              {{userInfo.loginname}}
            </el-link>
          </li>
          <li>积分: {{userInfo.score}}</li>
          <li>{{userInfo.create_at | datesub}}加入CNode社区</li>
          <li><el-link :underline="false">未读消息: {{messageCount}}</el-link></li>
          <li><el-link :underline="false" @click="loginout">退出</el-link></li>
        </ul>
      </div>
    </el-popover>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import loginout from '@/utils/loginout'
export default {
  props: ['userInfo'],
  data () {
    return {
      messageCount: 0,
      visible: false
    }
  },
  created () {
  },
  computed: mapState(['loginStatus', 'accesstoken']),
  methods: {
    async getHasnotMessageCount () {
      if (this.accesstoken) {
        const count = await this.$api.notice.getMessageCount(this.accesstoken)
        if (count.success) {
          this.messageCount = count.data
        }
      }
    },
    proxyClick (e) {
      if (e.target.tagName === 'SPAN') {
        this.visible = false
      }
    },
    loginout () {
      const flag = loginout()
      if (flag) {
        this.$msg({
          message: '退出登录',
          type: 'success'
        })
      }
    }
  },
  watch: {
    loginStatus: {
      immediate: true,
      async handler () {
        this.getHasnotMessageCount()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.user-avatar{
  .avatar{
    display: flex;
    align-items: center;
    cursor: pointer;
    &:hover{
      color: blueviolet;
    }
    .down-icon-wrapper{
      display: inline-block;
      margin-left: 5px;
    }
  }
}
.userinfo{
  ul{
    margin: 0;
    padding: 0;
    list-style-type: none;
    li{
      padding: 10px 0;
    }
  }
}
</style>
