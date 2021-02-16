<template>
  <header class="header">
    <el-row>
      <el-col :span="1">
        <button class="none">
          <i class="el-icon-s-fold"></i>
        </button>
      </el-col>
      <el-col :span="22" class="center">标题</el-col>
      <el-col :span="1">右</el-col>
    </el-row>
  </header>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.header{
  .center{
    text-align: center;
  }
}
</style>
