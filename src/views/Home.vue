<template>
  <div class="home">
    <topicsList :topics="topics"></topicsList>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import topicsList from '@/components/topicsList.vue'
export default {
  name: 'Home',
  data () {
    return {
      // 页码
      page: 1,
      limit: 30,
      topics: []
    }
  },
  created () {
    this.changeTitle('全部')
  },
  components: {
    topicsList
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
        limit: this.limit
      })
      if (res) {
        this.topics = res.data
        this.page++
      }
      console.log(this.topics)
    }
  }
}
</script>
