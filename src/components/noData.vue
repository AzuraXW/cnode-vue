<template>
  <div class="nodata">
    <i :class="[icon]"></i>
    <span>{{text}}</span>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: 'iconfont icon-wushuju'
    },
    text: {
      type: String,
      default: '无数据'
    }
  }
}
</script>

<style lang="scss" scoped>
.nodata{
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #87848a;
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
