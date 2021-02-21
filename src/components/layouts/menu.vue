<template>
  <transition name="fade">
    <div class="active-menu" :class="{open: visible}">
      <nav class="nav">
        <router-link :to="{name: 'HomeAll'}">
          <i class="iconfont icon-icon_huabanfuben" style="font-size: 20px"></i>
          <span>全部</span>
        </router-link>
        <router-link :to="{name: 'Home', params: { tab: 'good' }}">
          <i class="iconfont icon-weibiaoti-_huaban" style="font-size: 19px"></i>
          <span>精华</span>
        </router-link>
        <router-link :to="{name: 'Home', params: { tab: 'share' }}">
          <i class="iconfont icon-fenxiang"></i>
          <span>分享</span>
        </router-link>
        <router-link :to="{name: 'Home', params: { tab: 'ask' }}">
          <i class="iconfont icon-wenda"></i>
          <span>问答</span>
        </router-link>
        <router-link :to="{name: 'Home', params: { tab: 'job' }}">
          <i class="iconfont icon-zhaopinhui"></i>
          <span>招聘</span>
        </router-link>
      </nav>
    </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: mapState({
    visible: 'leftMenuVisible'
  })
}
</script>

<style lang="scss" scoped>
.active-menu{
  position: absolute;
  left: 0px;
  top: 0;
  height: 100vh;
  width: 250px;
  background-color: #fff;
  box-shadow: -2px 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-right: 1px solid #dcdfe6;
  transition: all .4s;
  transform: translateX(-251px);
  &.open{
    transform: translateX(0);
  }
  .nav{
    margin-top: 20px;
    a{
      display: block;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      text-decoration: none;
      color: rgb(49, 49, 49);
      margin: 10px 0;
      &:hover{
        color: rgb(147, 66, 223);
      }
      i{
        display: inline-block;
        width: 25px;
        text-align: center;
      }
      span{
        display: inline-block;
        margin: 5px;
        letter-spacing: 20px;
      }
      &.router-link-exact-active{
        color: rgb(147, 66, 223);
      }
    }
  }
}
</style>
