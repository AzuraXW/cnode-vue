<template>
  <header class="header">
    <el-row type="flex" align="center" style="width: 100%">
      <el-col :span="2" :xs="4" class="center">
        <button class="none menu-btn">
          <i class="iconfont" :class="leftMenuVisible ? 'icon-iconfront-' : 'icon-zhuti'"
          @click.self.stop="changeMenuVisible"></i>
        </button>
      </el-col>
      <el-col :span="20" :xs="16" class="center" style="justify-content:center;">{{ title }}</el-col>
      <el-col :span="2" :xs="4" class="center" style="justify-content:flex-end;">
        <el-link @click="jumplogin" v-if="!userInfo.loginname">
          <i class="el-icon-user el-icon--left"></i>
          登录
        </el-link>
        <userAvatar :userInfo="userInfo" v-else></userAvatar>
      </el-col>
    </el-row>
  </header>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import userAvatar from '@/components/userAvatar'
export default {
  methods: {
    ...mapMutations([
      'changeMenuVisible'
    ]),
    jumplogin () {
      if (this.$route.fullPath === '/login') {
        return
      }
      this.$router.push({
        name: 'Login',
        query: { from: this.$route.fullPath }
      })
    }
  },
  computed: mapState(['leftMenuVisible', 'title', 'userInfo']),
  components: {
    userAvatar
  }
}
</script>

<style lang="scss" scoped>
.header{
  user-select: none;
  height: 60px;
  padding: 0 25px;
  display: flex;
  align-items: center;
  background-color: #fff;
  box-shadow: 13px 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid #dcdfe6;
  .center{
    display: flex;
    align-items: center;
  }
  .menu-btn{
    padding: 0;
    cursor: pointer;
    i{
      font-size: 24px;
    }
  }
}
</style>
