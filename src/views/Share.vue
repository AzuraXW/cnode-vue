<template>
  <div>分享</div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  created () {
    this.changeTitle('分享')
  },
  methods: {
    ...mapMutations([
      'changeTitle'
    ])
  }
}
</script>

<style>

</style>
