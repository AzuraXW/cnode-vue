<template>
  <div id="app">
    <menuVue></menuVue>
    <div :class="{collapse: leftMenuVisible}" class="content" @click="collapseMenu">
      <headerVue></headerVue>
        <div class="wrapper">
          <el-scrollbar :noresize="false" wrapClass="custom-scroll-wrap">
            <transition name="route" mode="out-in">
              <router-view/>
            </transition>
          </el-scrollbar>
        </div>
    </div>
    <el-backtop target=".el-scrollbar__wrap" :bottom="100">
      <div
        style="{
          height: 100%;
          width: 100%;
          background-color: #f2f5f6;
          box-shadow: 0 0 6px rgba(0,0,0, .12);
          text-align: center;
          line-height: 40px;
          color: #1989fa;
        }"
      >
        UP
      </div>
    </el-backtop>
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
  .wrapper{
    height: calc(100vh - 61px);
    overflow: hidden;
    .el-scrollbar{
      height: 100%;
    }
    .el-scrollbar__wrap{
      overflow-x: hidden;
    }
    .el-scrollbar__thumb{
      background-color: red;
    }
  }
}
.route-enter{
 opacity: 0;
}
.route-enter-active{
 transition: 0.5s;
}
.route-enter-to{
 opacity: 1;
}
.route-leave{
 opacity: 1;
}
.route-leave-to{
 opacity:0;
}
.route-leave-active{
 transition: 0.5s;
}
</style>
