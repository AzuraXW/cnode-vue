<template>
  <el-avatar
    :src="avatar_url"
    @click.native="jumpUser"
    :size='size || 35'
    :shape="shape"
    style="cursor: pointer"
  >
  </el-avatar>
</template>

<script>
export default {
  props: ['username', 'avatar_url', 'size', 'shape'],
  methods: {
    jumpUser () {
      this.$router.push({ name: 'User', params: { username: this.username } })
    }
  }
}
</script>
