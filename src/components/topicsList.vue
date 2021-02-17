<template>
  <div class="topics"
    v-loading="loading"
    v-infinite-scroll="loadMore"
    infinite-scroll-delay="300"
    :infinite-scroll-distance="80"
    :infinite-scroll-immediate="false"
    >
    <el-card shadow="always" class="item" v-for="(topic) in topics" :key="topic.id">
      <el-row>
        <el-col :span="4">
          <div class="avatar">
            <router-link to="/">
              <img :src="topic.author.avatar_url" alt="">
            </router-link>
            <div class="count">
              <div class="gray-14">评论数：{{topic.reply_count}}</div>
              <div class="gray-14">阅读数：{{topic.visit_count}}</div>
            </div>
          </div>
          <div class="create_at gray-14">创建时间：{{topic.create_at.substr(0, 10)}}</div>
          <div class="last_reply_at gray-14">最后编辑时间：{{topic.last_reply_at.substr(0, 10)}}</div>
        </el-col>
        <el-col :span="19" :offset="1">
          <router-link to="/"><h2 class="title">{{topic.title}}</h2></router-link>
          <div class="des">{{topic.content | fileterTag}}</div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    topics: {
      type: Array,
      required: true,
      default: function () {
        return []
      }
    }
  },
  filters: {
    fileterTag: function (value) {
      const reg = /<\/?.+?\/?>/g
      return value.replace(reg, '').substr(0, 250) + '...'
    }
  },
  computed: {
    loading: function () {
      if (this.topics.length > 0) {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    loadMore: function () {
      this.$emit('loadMore')
    }
  }
}
</script>

<style lang="scss">
  .topics{
    min-height: calc(100vh - 61px);
    .item{
      margin: 25px;
      .avatar{
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        img{
          width: 50px;
          border-radius: 50%;
          margin-right: 10px;
        }
      }
      a{
        text-decoration: none;
      }
      .title{
        margin-top: 0;
        margin-bottom: 20px;
        font-weight: 300;
        font-size: 26px;
        color: #333;
        text-decoration: none;
        &:hover{
          text-decoration: underline;
          text-decoration-style: dashed;
        }
      }
      .des{
        color: #999;
      }
    }
  }
</style>
