<template>
  <div id="app">
    <menuVue></menuVue>
    <div :class="{collapse: leftMenuVisible}" class="content" @click="collapseMenu">
      <headerVue></headerVue>
        <div class="topic-wrapper">
          <el-scrollbar>
          <router-view/>
          </el-scrollbar>
        </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import headerVue from '@/components/layouts/header'
import menuVue from '@/components/layouts/menu'
export default {
  computed: mapState(['leftMenuVisible']),
  components: {
    headerVue,
    menuVue
  },
  methods: {
    ...mapMutations([
      'changeMenuVisible'
    ]),
    collapseMenu () {
      if (this.leftMenuVisible) {
        this.changeMenuVisible()
      }
    }
  }
}
</script>

<style lang="scss">
#app{
  overflow: hidden;
}
.content{
  transition: all .4s;
  position: absolute;
  width: 100%;
  right: 0;
  top: 0;
  &.collapse{
    transform: translateX(251px);
  }
  .topic-wrapper{
    height: calc(100vh - 61px);
    overflow: hidden;
    .el-scrollbar{
      height: 100%;
    }
    .el-scrollbar__wrap{
      overflow: auto;
    }
    .el-scrollbar__thumb{
      background-color: red;
    }
  }
}
</style>
