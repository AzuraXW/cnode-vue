<template>
  <div class="error-404">
    <img src="@/assets/imgs/404.jpg" alt="">
    <el-button type="primary" @click.native="goHome">回到首页</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    goHome () {
      this.$router.push({ name: 'HomeAll' })
    }
  }
}
</script>

<style lang="scss" scoped>
.error-404{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #fbfbfc;
  img{
    max-width: 400px;
  }
}
</style>
