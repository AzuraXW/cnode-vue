<template>
  <div class="topic-item">
    <el-row type="flex" align="middle">
      <el-col :span="1" :xs="3">
        <el-avatar shape="square" :size="35" :src="topic.author.avatar_url"></el-avatar>
      </el-col>
      <el-col :span="19" :xs="17" :offset="1">
        <router-link :to="{ name: 'Topic', params: { id: topic.id } }">
          <h2 class="ellipsis">{{topic.title}}</h2>
        </router-link>
      </el-col>
      <el-col :span="3"><span class="last-date">{{topic.last_reply_at | datesub}}</span></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: ['topic']
}
</script>

<style lang="scss" scoped>
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
}
</style>
