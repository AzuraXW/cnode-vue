<template>
  <div class="nodata">
    <i class="iconfont icon-nodata-topic"></i>
    <span>无主题</span>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.nodata{
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  i{
    font-size: 36px;
  }
  span{
    display: inline-block;
    margin-left: 10px;
    font-size: 16px;
    vertical-align: middle;
  }
}
</style>
