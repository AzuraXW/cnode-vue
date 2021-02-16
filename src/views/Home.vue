<template>
  <div class="home">
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {
  },
  async mounted () {
    const res = await this.$api.topic.createTopic({
      accesstoken: 'e3f26acd-36e9-4869-b2fa-11e8bbddcc14',
      title: '测试发帖',
      tab: 'dev',
      content: '## 测试发帖 ### 测试发帖'
    })
    console.log(res)
  }
}
</script>
