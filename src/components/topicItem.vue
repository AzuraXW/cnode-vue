<template>
  <div class="topic-item">
    <el-row type="flex" align="middle">
      <el-col :span="1">
        <el-avatar shape="square" :size="35" :src="topic.author.avatar_url"></el-avatar>
      </el-col>
      <el-col :span="20"><h2>{{topic.title}}</h2></el-col>
      <el-col :span="3"><span class="last-date">{{topic.last_reply_at | datesub}}</span></el-col>
    </el-row>
    <div class="nodata-topic">
      <div>
        <i class="iconfont icon-nodata-topic"></i>
        <span>无主题</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['topic']
}
</script>

<style lang="scss">
.topic-item{
  &:not(:last-child) {
    margin-bottom: 15px;
    border-bottom: 1px solid #dcdfe6;
    padding-bottom: 15px;
  }
  h2{
    margin: 0;
    font-weight: 300;
    font-size: 20px;
    color: blueviolet;
    margin-left: 5px;
    cursor: pointer;
  }
  .last-date{
    text-align: right;
    display: inline-block;
    width: 100%;
    font-size: 12px;
    color: #999;
  }
  .nodata-topic{
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    i{
      font-size: 26px;
    }
    span{
      display: inline-block;
      margin-left: 10px;
      font-size: 18px;
    }
  }
}
</style>
