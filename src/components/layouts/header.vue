<template>
  <header class="header">
    <el-row type="flex" align="center" style="width: 100%">
      <el-col :span="1" :xs="3" class="center">
        <button class="none menu-btn">
          <i class="iconfont" :class="leftMenuVisible ? 'icon-iconfront-' : 'icon-zhuti'"
          @click.self.stop="changeMenuVisible"></i>
        </button>
      </el-col>
      <el-col :span="22" :xs="18" class="center">{{ title }}</el-col>
      <el-col :span="1" :xs="3" class="center">右</el-col>
    </el-row>
  </header>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  methods: {
    ...mapMutations([
      'changeMenuVisible'
    ])
  },
  computed: mapState(['leftMenuVisible', 'title'])
}
</script>

<style lang="scss">
.header{
  height: 60px;
  display: flex;
  align-items: center;
  background-color: #fff;
  box-shadow: 13px 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid #dcdfe6;
  .center{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .menu-btn{
    cursor: pointer;
    i{
      font-size: 24px;
    }
  }
}
</style>
