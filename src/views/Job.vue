<template>
  <div>招聘</div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  created () {
    this.changeTitle('招聘')
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
