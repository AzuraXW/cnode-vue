<template>
  <div class="user-message">
    <el-card>
      <div slot="header">
        未读消息
      </div>
      <no-data text="无消息" v-if="hasnotReadMessages.length <= 0"></no-data>
      <div class="list-wrapper" v-else>
        <messageList :messages="hasnotReadMessages"></messageList>
      </div>
    </el-card>
    <el-card class="mt-25">
      <div slot="header">
        已读消息
      </div>
      <no-data text="无消息" v-if="hasReadMessages.length <= 0"></no-data>
      <div class="list-wrapper" v-else>
        <messageList :messages="hasReadMessages"></messageList>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import messageList from '@/components/messageList'
export default {
  props: ['username'],
  data () {
    return {
      hasReadMessages: [],
      hasnotReadMessages: []
    }
  },
  mounted () {
    this.changeTitle(`${this.username}的个人主页-消息列表`)
    setTimeout(() => {
      this.getMessage()
    }, 500)
  },
  methods: {
    async getMessage () {
      const res = await this.$api.user.getMessage(this.accesstoken)
      if (res.success) {
        this.hasReadMessages = res.data.has_read_messages
        this.hasnotReadMessages = res.data.hasnot_read_messages
      }
    }
  },
  computed: {
    ...mapState(['accesstoken', 'userInfo'])
  },
  components: {
    messageList
  },
  watch: {
    hasnotReadMessages (messages, old) {
      if (messages.length === old.length) return
      this.$api.user.markAll(this.accesstoken)
    }
  }
}
</script>

<style>
</style>
