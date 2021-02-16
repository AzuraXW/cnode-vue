<template>
  <div>问答</div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  created () {
    this.changeTitle('问答')
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
