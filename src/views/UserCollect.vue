<template>
  <div class="user-collect">
    <el-card>
      <div slot="header">
        用户收藏的主题
      </div>
      <noData v-if="collects.length===0" text="无收藏主题"></noData>
      <div class="collect-wrapper" v-else>
        <topicUserItem
          v-for="collect in collectList"
          :key="collect.id"
          :topic="collect"
        >
        </topicUserItem>
        <el-pagination
          :page-count="collects.length - 1"
          :page-size="5"
          @current-change="pageChange"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import topicUserItem from '@/components/topicUserItem'
export default {
  props: ['username'],
  data () {
    return {
      collects: [],
      limit: 5,
      curPage: 0
    }
  },
  mounted () {
    this.getCollectList()
  },
  methods: {
    async getCollectList () {
      const res = await this.$api.user.getCollects(this.username)
      if (res.success && res.data) {
        this.collects = this.toMultiData(res.data, 5)
      }
    },
    toMultiData (arr, limit) {
      const count = Math.ceil(arr.length / limit)
      const result = []
      for (let i = 0; i < count; i++) {
        const floor = []
        for (let j = i * limit; j < (i + 1) * limit; j++) {
          if (!arr[j]) continue
          floor.push(arr[j])
        }
        result[i] = floor
      }
      return result
    },
    pageChange (page) {
      this.curPage = page - 1
    }
  },
  components: {
    topicUserItem
  },
  computed: {
    collectList () {
      return this.collects[this.curPage]
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
