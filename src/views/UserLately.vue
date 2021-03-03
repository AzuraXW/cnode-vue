<template>
  <div class="lately">
      <el-card class="box-card">
        <div slot="header" class="card-header">
          <span>最近创建的话题</span>
        </div>
        <div class="recent_topics">
          <noData v-if="userDetail.recent_topics <= 0"></noData>
          <topicUserItem
            v-else
            v-for="topic in userDetail.recent_topics"
            :key="topic.id"
            :topic="topic"
          ></topicUserItem>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="card-header">
          <span>最近参与的话题</span>
        </div>
        <div class="recent_replies">
          <noData v-if="userDetail.recent_replies <= 0"></noData>
          <topicUserItem
            v-else
            v-for="topic in userDetail.recent_replies"
            :key="topic.id"
            :topic="topic"
          ></topicUserItem>
        </div>
      </el-card>
  </div>
</template>

<script>
import topicUserItem from '@/components/topicUserItem'
import { mapState } from 'vuex'
export default {
  data () {
    return {
    }
  },
  components: {
    topicUserItem
  },
  computed: {
    ...mapState({
      userDetail: 'pageUserInfo'
    })
  }
}
</script>

<style lang="scss" scoped>
.box-card{
  &:not(:last-child){
    margin-bottom: 25px;
  }
}

.topic-list{
  &:empty{
    min-height: 300px;
  }
}
</style>
