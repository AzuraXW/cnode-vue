<template>
  <div>精华</div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  created () {
    this.changeTitle('精华')
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
