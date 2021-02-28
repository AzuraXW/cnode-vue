<template>
  <div class="topics"
    v-loading="loading"
    element-loading-text="拼命加载中......"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    v-infinite-scroll="loadMore"
    :infinite-scroll-delay="300"
    infinite-scroll-distance="0"
    :infinite-scroll-disabled="disabled"
    infinite-scroll-immediate="false"
    >
      <topicItem v-for="item in topics" :key="item.id" :topic="item"></topicItem>
    <div v-if="loadingMore" class="loadMore">
      <i class="el-icon-loading"></i>
      <span>加载中...</span>
    </div>
  </div>
</template>

<script>
import topicItem from '@/components/topicItem'
export default {
  props: {
    topics: {
      type: Array,
      required: true,
      default: function () {
        return []
      }
    },
    disabled: {}
  },
  data () {
    return {
      loadingMore: false
    }
  },
  computed: {
    loading () {
      if (this.topics.length > 0) {
        return false
      } else {
        return true
      }
    },
    disabledLoadMore () {
      return this.disabled
    }
  },
  methods: {
    loadMore: function () {
      this.loadingMore = true
      this.$emit('loadMore')
    }
  },
  components: {
    topicItem
  }
}
</script>

<style lang="scss" scoped>
  .topics{
    min-height: calc(100vh - 61px);
    // overflow: auto;
    .loadMore{
      width: 100%;
      display: flex;
      margin: 15px 0;
      justify-content: center;
      i{
        font-size: 14px;
      }
      span{
        display: inline-block;
        margin-left: 5px;
        font-size: 14px;
        color: #999;
      }
    }
  }
</style>
