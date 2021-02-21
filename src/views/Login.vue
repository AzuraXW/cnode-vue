<template>
  <div class="login">
    <el-form label-width="120px" :model="loginModel" :rules="rules" ref="form">
      <el-form-item label="AccessToken" prop="accesstoken">
        <el-input v-model="loginModel.accesstoken"></el-input>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="remember">下次免登录</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import login from '@/utils/login'
export default {
  props: ['from'],
  created () {
    this.changeTitle('用户登录')
  },
  data () {
    return {
      loginModel: {
        accesstoken: ''
      },
      remember: false,
      rules: {
        accesstoken: [
          { required: true, message: '请输入accesstoken', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    ...mapMutations(['setLoginStatus', 'setUserInfo']),
    onSubmit () {
      this.$refs.form.validate(async vaild => {
        if (vaild) {
          const isLogin = await login(this.loginModel.accesstoken)
          if (isLogin) {
            localStorage.setItem('accesstoken', this.loginModel.accesstoken)
            this.$router.push(this.from || '/')
          }
        }
      })
    }
  },
  computed: mapState(['loginStatus'])
}
</script>

<style lang="scss" scoped>
.login{
  display: flex;
  justify-content: center;
  margin-top: 15%;
  .el-form{
    width: 30%;
    button{
      width: 100%;
    }
  }
}
</style>
