<template>
  <div id="app">
    <headerVue></headerVue>
    <router-view/>
  </div>
</template>

<script>
import headerVue from './components/layouts/header'
export default {
  components: {
    headerVue
  }
}
</script>

<style lang="scss">
</style>
