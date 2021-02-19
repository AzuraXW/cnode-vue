<template>
  <div class="home">
    <topicsList
    :topics="topics"
    :disabled="disabledLoadMore"
    @loadMore="getTopics"></topicsList>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import topicsList from '@/components/topicsList.vue'
export default {
  name: 'Home',
  props: ['tab'],
  data () {
    return {
      // 页码
      page: 1,
      limit: 30,
      topics: [],
      disabledLoadMore: false
    }
  },
  created () {
    if (this.$route.fullPath === '/') {
      this.changeTitle('全部')
    } else {
      this.matchTtitle(this.tab)
    }
  },
  async mounted () {
    this.getTopics()
  },
  methods: {
    ...mapMutations([
      'changeTitle'
    ]),
    // 获取主题列表
    async getTopics () {
      const res = await this.$api.topic.getTopics({
        page: this.page,
        limit: this.limit,
        tab: this.tab
      })
      // 禁止加载更多
      if (!res.data.length && this.page > 0) {
        this.disabledLoadMore = true
        return
      }
      if (res) {
        this.topics.push(...res.data)
        this.page++
      }
    },
    // 根据路由参数切换全局标题
    matchTtitle (tab) {
      const map = {
        '': '全部',
        ask: '问答',
        good: '精华',
        job: '招聘',
        share: '分享'
      }
      this.changeTitle(map[tab])
    }
  },
  watch: {
    tab: function (tab) {
      // 匹配标题
      const tabKey = tab === undefined ? '' : tab
      this.matchTtitle(tabKey)
      // 路由参数改变时重置请求参数
      this.page = 1
      this.topics.length = 0
      this.getTopics()
    }
  },
  components: {
    topicsList
  }
}
</script>

<style lang="scss">
</style>
